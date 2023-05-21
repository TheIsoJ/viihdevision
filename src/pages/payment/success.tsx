import Head from "next/head"
import Footer from "../../components/Footer"
import Header from "../../components/Header"

const Success = () => {
  return (
    <>
      <Head>
        <title>Maksu onnistui - Supliikki</title>
      </Head>

      <Header sticky themeColor="bg-white" />

      <div
        className={`flex items-center justify-center h-screen w-full py-32 lg:py-0 bg-[#002f6c]`}
      >
        <div className="space-y-5 px-10 text-center">
          <h1 className="max-w-xl font-[Poppins] font-extrabold text-5xl text-white">
            Maksu onnistui!
          </h1>
          <h2 className="max-w-xl whitespace-pre-wrap font-[Poppins] font-normal text-white">
            Olet onnistuneesti tilannut Rickrolls+-palvelun!
          </h2>
        </div>
      </div>

      <Footer themeColor="bg-white" />
    </>
  )
}
export default Success
