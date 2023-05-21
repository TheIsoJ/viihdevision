import { type NextPage } from "next"
import { InfiniteVideoList } from "~/components/InfiniteVideoList"
import { api } from "~/utils/api"

const Home: NextPage = () => {
  return <RecentVideos />
}

function RecentVideos() {
  const videos = api.video.infiniteFeed.useInfiniteQuery(
    {},
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  )
  return (
    <InfiniteVideoList
      videos={videos.data?.pages.map((page) => page.videos)}
      isError={videos.isError}
      isLoading={videos.isLoading}
      hasMore={videos.hasNextPage}
      fetchNewVideos={videos.fetchNextPage}
    />
  )
}

export default Home
