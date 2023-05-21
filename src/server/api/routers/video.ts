import { Prisma } from "@prisma/client"
import { inferAsyncReturnType } from "@trpc/server"
import { z } from "zod"

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
  createTRPCContext,
} from "~/server/api/trpc"

export const videoRouter = createTRPCRouter({
  infiniteFeed: publicProcedure
    .input(
      z.object({
        limit: z.number().optional(),
        cursor: z.object({
          id: z.string(),
          publishDate: z.date()
        }).optional()
      })
    ).query(async ({ input: { limit = 20, cursor }, ctx }) => {
      return await getInfiniteVideos({
        limit,
        ctx,
        cursor
      })
    }),
  getAll: publicProcedure
    .query(async ({ ctx }) => {
      const currentUserId = ctx.session?.user.id
      const videos = await ctx.prisma.video.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          views: true,
          videoId: true,
          publishDate: true,
          _count: { select: { likes: true } },
          likes: currentUserId == null ? false : {
            where: {
              userId: currentUserId
            }
          },
        }
      })

      return videos
    }),
  getById: publicProcedure
    .input(z.object({ videoId: z.string() }))
    .query(async ({ input: { videoId }, ctx }) => {
      const currentUserId = ctx.session?.user.id
      const video = await ctx.prisma.video.findFirst({
        where: {
          videoId
        },
        select: {
          name: true,
          description: true,
          views: true,
          publishDate: true,
          _count: {
            select: {
              likes: true
            }
          },
          likes: currentUserId == null ? false : {
            where: {
              userId: currentUserId
            }
          },
          user: {
            select: {
              name: true,
              id: true,
              image: true
            }
          }
        }
      })

      if (video == null) return

      return {
        name: video.name,
        description: video.description,
        views: video.views,
        likes: video.likes,
        publishDate: video.publishDate,
        likesCount: video._count.likes,
        user: {
          id: video.user.id,
          name: video.user.name,
          image: video.user.image
        }
      }
    }),
  create: protectedProcedure
    .input(z.object({
      name: z.string(),
      description: z.string().optional(),
      videoId: z.string()
    }))
    .mutation(async ({ input: {
      name,
      description,
      videoId
    }, ctx }) => {
      if (description === "" || description == null) {
        const video = await ctx.prisma.video.create({
          data: {
            name,
            description: null,
            views: 0,
            videoId, 
            userId: ctx.session.user.id
          }
        })
  
        return video
      } else {
        const video = await ctx.prisma.video.create({
          data: {
            name,
            description,
            views: 0,
            videoId,
            userId: ctx.session.user.id
          }
        })
  
        return video
      }
    }),
  toggleLike: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: { id }, ctx }) => {
      const data: Prisma.LikeUserIdVideoIdCompoundUniqueInput = {
        userId: ctx.session.user.id,
        videoId: id
      }

      const existingLike = await ctx.prisma.like.findUnique({
        where: {
          userId_videoId: data
        }
      })

      if (existingLike == null) {
        await ctx.prisma.like.create({ data })
        return { addedLike: true }
      } else {
        await ctx.prisma.like.delete({ where: { userId_videoId: data } })
        return { addedLike: false }
      }
    })
})

async function getInfiniteVideos({
  ctx,
  limit,
  cursor
}: {
  limit: number,
  cursor: { id: string, publishDate: Date } | undefined,
  ctx: inferAsyncReturnType<typeof createTRPCContext>
}) {
  const currentUserId = ctx.session?.user.id
  const data = await ctx.prisma.video.findMany({
    take: limit + 1,
    cursor: cursor ? { publishDate_id: cursor } : undefined,
    orderBy: [{ publishDate: "desc" }, { id: "desc" }],
    select: {
      id: true,
      name: true,
      description: true,
      videoId: true,
      publishDate: true,
      views: true,
      _count: { select: { likes: true } },
      likes: currentUserId == null ? false : {
        where: {
          userId: currentUserId
        }
      },
      user: {
        select: {
          name: true,
          id: true,
          image: true
        }
      }
    }
  })

  let nextCursor: typeof cursor | undefined
  if (data.length > limit) {
    const nextItem = data.pop()
    if (nextItem != null) {
      nextCursor = {
        id: nextItem.id,
        publishDate: nextItem.publishDate
      }
    }
  }

  return {
    videos: data.map(video => {
      return {
        id: video.id,
        name: video.name,
        description: video.description,
        publishDate: video.publishDate,
        videoId: video.videoId,
        views: video.views,
        likeCount: video._count.likes,
        user: video.user,
        likedByMe: video.likes?.length > 0
      }
    }),
    nextCursor
  }
}