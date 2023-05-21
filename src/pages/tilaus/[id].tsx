import Head from "next/head"
import { useRouter } from "next/router"
import { useProductFetch } from "../../hooks/regular-user/useProductFetch"
import { CREATE_CHECKOUT_SESSION_BASE_URL } from "../../config"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { BellAlertIcon } from "@heroicons/react/24/solid"
import Loading from "../../components/Loading"

const Product = () => {
  const router = useRouter()
  const { id } = router.query

  if (!id) return
  const { res, loading } = useProductFetch(id as string)

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
    <>
      <Head>
        <title>
          {res?.product?.name ? `Tilaa ${res?.product?.name}` : "Tilaus"} -
          Supliikki
        </title>
      </Head>

      <Header sticky themeColor="bg-white" />

      <div className="flex items-center justify-center h-auto w-full py-16 lg:py-16">
        <div className="px-10 flex flex-col items-center lg:items-center lg:justify-between text-center lg:text-start text-black">
          {res?.product?.images![0] ? (
            <div className="w-48 h-48 bg-gray-400 md:inline rounded-[20%] overflow-hidden">
              <img
                className="w-full h-full rounded-[20%] fade-semifast object-cover"
                src={`${res.product?.images![0]}`}
                alt=""
              />
            </div>
          ) : null}
          {!res && (
            <>
              <div className="flex flex-col items-center justify-center h-96 space-y-3 font-[Poppins] text-center mx-16 my-8 text-white">
                <BellAlertIcon className="w-24 h-24 object-cover" />
                <h1 className="font-bold text-2xl sm:text-lg">
                  Tuotteita ei voitu ladata.
                </h1>
                <p className="text-xs">
                  Tässä saattaa olla sattunut verkkovirhe tai palvelin{" "}
                  {process.env.NEXT_PUBLIC_SERVER_URL} ei vastaa.
                </p>
                <p className="text-xs">
                  Kokeile myöhemmin uudelleen päivittämällä tämä sivu.
                </p>
              </div>
            </>
          )}
          {res && (
            <>
              <h1 className="max-w-xl font-[Poppins] font-extrabold text-5xl mt-8">
                {res?.product?.name}
              </h1>
              <p className="max-w-xl mt-4 whitespace-pre-wrap font-[Poppins] text-black font-normal">
                {new Intl.NumberFormat(undefined, {
                  style: "currency",
                  currency: "eur",
                }).format((res?.product?.price as number) / 100)}
                /{res?.product?.interval === "month" && "kk"}
              </p>
              <p className="my-6 max-w-xl whitespace-pre-wrap font-[Poppins] font-normal text-center text-slate-500">
                {res?.product?.description}
              </p>
              <form action={CREATE_CHECKOUT_SESSION_BASE_URL} method="POST">
                <input
                  type="hidden"
                  name="priceId"
                  value={res?.product?.priceId}
                />
                <input
                  type="hidden"
                  name="apiKey"
                  value={process.env.NEXT_PUBLIC_API_KEY}
                />
                <button
                  className="flex items-center uppercase justify-center text-white bg-[#ec008c] hover:shadow-lg hover:shadow-gray-400 rounded-full font-[Poppins] font-bold px-12 py-[0.75rem] transition-all duration-500 ease-in-out hover:bg-[#ec008c]/70"
                  type="submit"
                >
                  TILAA NYT
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      <Footer themeColor="bg-white" />
    </>
  )
}
export default Product
