import Link from "next/link"
import InfiniteScroll from "react-infinite-scroll-component"
import { useSession } from "next-auth/react"
import { api } from "~/utils/api"
import Loading from "./Loading"
import IconHoverEffect from "./IconHoverEffect"
import { VscHeart, VscHeartFilled } from "react-icons/vsc"

type Video = {
  id: string
  name: string
  description: string
  videoId: string
  views: number
  publishDate: Date
  likeCount: number
  likedByMe: boolean
  user: { id: string; name: string | null; image: string | null }
}

type InfiniteVideoListProps = {
  isLoading: boolean
  isError: boolean
  hasMore: boolean | undefined
  fetchNewVideos: () => Promise<unknown>
  videos?: Video[]
}

export function InfiniteVideoList({
  videos,
  isError,
  isLoading,
  fetchNewVideos,
  hasMore = false,
}: InfiniteVideoListProps) {
  if (isLoading) return <Loading />
  if (isError) return <h1>Virhe</h1>

  if (videos == null || videos.length === 0) {
    return (
      <h2 className="my-4 text-center text-2xl text-gray-500">Ei videoita</h2>
    )
  }

  return (
    <ul>
      <InfiniteScroll
        dataLength={videos.length}
        next={fetchNewVideos}
        hasMore={hasMore}
        loader={<Loading />}
      >
        {videos.map((video) => (
          <VideoCard key={video.id} {...video} />
        ))}
      </InfiniteScroll>
    </ul>
  )
}

const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "short",
})

function VideoCard({
  id,
  name,
  description,
  user,
  views,
  likeCount,
  likedByMe,
  videoId,
  publishDate,
}: Video) {
  const trpcUtils = api.useContext()
  const toggleLike = api.video.toggleLike.useMutation({
    onSuccess: ({ addedLike }) => {
      const updateData: Parameters<
        typeof trpcUtils.video.infiniteFeed.setInfiniteData
      >[1] = (oldData) => {
        if (oldData == null) return
        const countModifier = addedLike ? 1 : -1
        return {
          ...oldData,
          pages: oldData.pages.map((page) => {
            return {
              ...page,
              videos: page.videos.map((video) => {
                if (video.id === id) {
                  return {
                    ...video,
                    likeCount: video.likeCount + countModifier,
                    likedByMe: addedLike,
                  }
                }

                return video
              }),
            }
          }),
        }
      }
      trpcUtils.video.infiniteFeed.setInfiniteData({}, updateData)
    },
  })

  function handleToggleLike() {
    toggleLike.mutate({ id })
  }

  return (
    <li className="flex gap-4 border-b p-4">
      <div className="flex flex-grow flex-col">
        <div className="flex gap-1">
          <Link
            href={`/profiles/${videoId}`}
            className="font-bold outline-none hover:underline focus-visible:underline"
          >
            {name}
          </Link>
          <span className="text-gray-500">-</span>
          <span className="text-gray-500">
            {dateTimeFormatter.format(publishDate)}
          </span>
        </div>
        <p className="whitespace-pre-wrap">{description}</p>
        <HeartButton
          onClick={handleToggleLike}
          isLoading={toggleLike.isLoading}
          likedByMe={likedByMe}
          likeCount={likeCount}
        />
      </div>
    </li>
  )
}

type HeartButtonProps = {
  onClick: () => void
  isLoading: boolean
  likedByMe: boolean
  likeCount: number
}

function HeartButton({
  likedByMe,
  likeCount,
  isLoading,
  onClick,
}: HeartButtonProps) {
  const { status } = useSession()
  const HeartIcon = likedByMe ? VscHeartFilled : VscHeart
  if (status !== "authenticated") {
    return (
      <div className="mb-1 mt-1 flex items-center gap-3 self-start text-gray-500">
        <HeartIcon />
        <span>{likeCount}</span>
      </div>
    )
  }

  return (
    <button
      disabled={isLoading}
      onClick={onClick}
      className={`group -ml-2 flex items-center gap-1 self-start transition-colors duration-200 ${
        likedByMe
          ? "text-red-500"
          : "text-gray-500 hover:text-red-500 focus-visible:text-red-500"
      }`}
    >
      <IconHoverEffect red>
        <HeartIcon
          className={`transition-colors duration-200 ${
            likedByMe
              ? "fill-red-500"
              : "fill-gray-500 group-hover:fill-red-500 group-focus-visible:fill-red-500"
          }`}
        />
      </IconHoverEffect>
      <span>{likeCount}</span>
    </button>
  )
}
