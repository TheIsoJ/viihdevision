import { BellAlertIcon } from "@heroicons/react/24/solid"
import { DotPulse } from "@uiball/loaders"
import Head from "next/head"
import Link from "next/link"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { useProductsFetch } from "../hooks/regular-user/useProductsFetch"
import Loading from "../components/Loading"

const Plus = () => {
  const { res, loading } = useProductsFetch()

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
    <div className="bg-white items-center justify-center min-h-screen">
      <Head>
        <title>Tilaa - Supliikki</title>
      </Head>

      <Header sticky themeColor="bg-white" />

      <h1 className="text-3xl font-bold text-center mx-4 my-5 font-[Poppins] whitespace-pre-wrap">
        Eiköhän pistetä vielä paremmaksi?
      </h1>

      {!res && (
        <>
          <div className="flex flex-col items-center justify-center h-96 space-y-3 font-[Poppins] text-center mx-16 my-8">
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

      {res?.products?.data?.length === 0 ||
        (res?.products?.data?.find((product) => product.active === false) && (
          <div className="flex flex-col items-center justify-center h-96 space-y-3 font-[Poppins] text-center mx-16 my-8">
            <BellAlertIcon className="w-24 h-24 object-cover" />
            <h1 className="font-bold text-2xl sm:text-lg">Tilauksia ei ole.</h1>
            <p className="text-xs">
              Näyttää siltä, että tilauksia ei ole saatavilla.
            </p>
            <p className="text-xs">Tilanne paranee, kun tilauksia lisätään.</p>
            <p className="text-xs">Yritä myöhemmin uudelleen.</p>
          </div>
        ))}
      {res?.products?.data
        ?.filter((product) => product.active !== false)
        .map(({ id, name, description, default_price, images }) => (
          <>
            <div
              key={id}
              className="flex items-center justify-center w-56 sm:w-64 max-w-5xl sm:max-w-2xl mx-auto my-[3.75rem]"
            >
              <div className="rounded-lg overflow-hidden shadow-md shadow-gray-400">
                {images![0] ? (
                  <div className="w-full h-full mx-auto bg-gray-400 rounded-tl-lg rounded-tr-lg md:inline overflow-hidden">
                    <img
                      className="w-full h-full rounded-tl-lg rounded-tr-lg fade-semifast object-cover"
                      src={images![0]}
                      alt=""
                    />
                  </div>
                ) : null}
                <div className="flex items-center justify-center text-center bg-white text-black p-5">
                  <div>
                    <h1 className="text-3xl font-[Poppins] font-extrabold">
                      {name}
                    </h1>
                    <p className="font-[Poppins] text-sm">
                      {(
                        (default_price?.unit_amount as number) / 100
                      ).toLocaleString(undefined, {
                        style: "currency",
                        currency: "eur",
                      })}
                      /
                      {default_price?.recurring?.interval === "day"
                        ? "pv"
                        : default_price?.recurring?.interval === "week"
                        ? "kk"
                        : default_price?.recurring?.interval === "month"
                        ? "kk"
                        : default_price?.recurring?.interval === "year"
                        ? "vuodessa"
                        : "kk"}
                    </p>
                    <p className="mt-2 text-sm text-slate-500 whitespace-pre-wrap font-[Poppins]">
                      {description}
                    </p>

                    <Link
                      className="flex items-center justify-center my-3"
                      href={`/tilaus/${id}`}
                    >
                      <button
                        className="flex items-center uppercase justify-center text-white bg-[#ec008c] hover:shadow-lg hover:shadow-gray-400 rounded-full font-[Poppins] font-bold px-12 py-[0.75rem] transition-all duration-500 ease-in-out hover:bg-[#ec008c]/70"
                        type="button"
                      >
                        Tutustu
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}

      <Footer themeColor="bg-white" />
    </div>
  )
}
export default Plus
