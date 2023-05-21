import { DotPulse } from "@uiball/loaders"
import Head from "next/head"
import { useRouter } from "next/router"
import Header from "../../../../components/Header"
import { useAdminPodcastFetch } from "../../../../hooks/admin/podcasts/useAdminPodcastFetch"
import PodcastInputBox from "../../../../components/PodcastInputBox"
import Footer from "../../../../components/Footer"
import Loading from "../../../../components/Loading"

const EditPodcast = () => {
  const router = useRouter()

  const { slugOrId } = router.query
  const { res, loading } = useAdminPodcastFetch(slugOrId as string)

  if (loading) {
    return (
      <>
        <Head>
          <title>Ladataan...</title>
        </Head>
        <Loading />
      </>
    )
  }

  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <Head>
        <title>Päivitä podcastia - Supliikki</title>
      </Head>

      <Header sticky themeColor="bg-white" />

      <div className="flex flex-col items-center justify-center mt-12 mb-8 space-y-6">
        <h1 className="flex items-center justify-center text-2xl sm:text-lg font-bold font-[Poppins] text-center">
          {res?.podcast?.name}
        </h1>
        <button
          onClick={() => router.push("/admin")}
          className="flex items-center uppercase justify-center bg-[#ec008c] text-white hover:shadow-lg hover:shadow-gray-500 rounded-full font-[Poppins] font-bold px-12 py-[0.75rem] transition-all duration-500 ease-in-out hover:bg-[#ec008c]"
          type="button"
        >
          Takaisin
        </button>
      </div>

      <div className="flex flex-col items-center px-6">
        {res && <PodcastInputBox initialValue={res} isEditing />}
      </div>

      <Footer themeColor="bg-white" />
    </div>
  )
}

export default EditPodcast
