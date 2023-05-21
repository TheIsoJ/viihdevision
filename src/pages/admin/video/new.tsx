import { useRouter } from "next/router"
import Head from "next/head"
import Header from "../../../components/Header"
import VideoInputBox from "../../../components/VideoInputBox"
import Footer from "../../../components/Footer"

const NewRickroll = () => {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col flex-1">
      <Head>
        <title>Lisää uusi video - ViihdeVision</title>
      </Head>

      <div className="h-auto flex flex-col items-center justify-center mt-8">
        <button
          onClick={() => router.push("/admin")}
          className="flex items-center uppercase justify-center bg-[#ec008c] text-white hover:shadow-lg hover:shadow-gray-500 rounded-full font-[Poppins] font-bold px-12 mx-12 py-[0.75rem] transition-all duration-500 ease-in-out hover:bg-[#ec008c]/80"
          type="button"
        >
          Takaisin
        </button>
      </div>

      <div className="flex flex-col items-center px-6">
        <VideoInputBox />
      </div>

      <Footer />
    </div>
  )
}
export default NewRickroll
