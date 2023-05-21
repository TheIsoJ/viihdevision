import { BellAlertIcon, ClockIcon } from "@heroicons/react/24/solid"
import Head from "next/head"
import { useRouter } from "next/router"
import Footer from "../components/Footer"
import Buttons from "../components/Buttons"
import { api } from "~/utils/api"
import AdminLoading from "~/components/AdminLoading"

const Admin = () => {
  const videos = api.video.getAll.useQuery()
  const router = useRouter()

  const formatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "short",
  })

  return (
    <div className="min-h-screen items-center justify-center">
      <Head>
        <title>Ylläpito - Supliikki</title>
      </Head>

      {videos.isLoading ? (
        <>
          <div className="flex flex-col items-center justify-between space-y-3">
            <h1 className="mb-6 mt-12 max-w-xl font-[Poppins] text-3xl font-extrabold">
              Ylläpito
            </h1>
            <Buttons />
          </div>
          <div className="my-16 flex flex-col px-8">
            <AdminLoading />
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center justify-between space-y-3">
            <h1 className="mb-6 mt-12 max-w-xl font-[Poppins] text-3xl font-extrabold">
              Ylläpito
            </h1>
            <Buttons />
          </div>
          {videos.isError && (
            <>
              <div className="mx-16 my-8 flex flex-col items-center justify-center space-y-3 text-center font-[Poppins]">
                <BellAlertIcon className="h-24 w-24 object-cover" />
                <h1 className="text-2xl font-bold sm:text-lg">
                  Ei ole rickrolleja, eikä tuotteita.
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
          <h1 className="max-w-xl px-8 mt-8 text-center font-[Poppins] text-xl font-extrabold sm:text-left lg:text-3xl">
            Videot
          </h1>
          {videos.data?.videos.length === 0 && (
            <div className="fade-semifast flex items-center space-x-2">
              <p className="mx-16 my-2 w-full text-center font-[Poppins] text-sm italic text-white">
                Ei mitään nähtävää.
              </p>
            </div>
          )}
          {videos.data?.videos.map(
            ({
              id,
              name,
              description,
              videoId,
              views,
              publishDate,
            }) => (
              <>
                <div
                  key={id}
                  className="mx-auto flex items-center justify-center p-6"
                >
                  <div className="fade overflow-hidden rounded-xl border bg-gray-400 shadow-md">
                    <div>
                      <div className="fade-semifast flex items-center justify-center space-x-2 bg-white p-5 text-center text-black">
                        <div>
                          <h1 className="font-[Poppins] text-xl font-bold">
                            {name}
                          </h1>
                          <p className="fade-semifast mt-2 whitespace-pre-wrap font-[Poppins] text-sm">
                            {description}
                          </p>
                        </div>
                      </div>
                      <div className="fade-semifast flex flex-col items-center justify-center space-y-4 bg-white p-5 text-black lg:flex-row lg:justify-center lg:space-x-2 lg:space-y-0">
                        <button
                          onClick={() =>
                            router.push(`/admin/video/${videoId}/edit`)
                          }
                          className="flex items-center justify-center rounded-full bg-[#ec008c] px-12 py-3 font-[Poppins] font-bold uppercase text-white transition-all duration-500 ease-in-out hover:bg-[#ec008c]/80 hover:shadow-lg hover:shadow-gray-500"
                          type="button"
                        >
                          Päivitä
                        </button>
                        <button
                          onClick={() =>
                            router.push(`/admin/video/${videoId}/delete`)
                          }
                          className="flex items-center justify-center rounded-full bg-white px-12 py-3 font-[Poppins] font-bold uppercase text-black shadow-sm shadow-gray-500 transition-all duration-500 ease-in-out hover:bg-red-600 hover:text-white hover:shadow-none"
                          type="button"
                        >
                          Poista
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )
          )}
          {/* <h1 className="max-w-xl px-8 text-center font-[Poppins] text-xl font-extrabold sm:text-left lg:text-3xl">
            Mainokset
          </h1>
          {resPromoItems?.promoItems?.map(
            ({ id, name, description, thumbnail_url }) => (
              <>
                <div
                  key={id}
                  className="mx-auto flex items-center justify-center p-6"
                >
                  <div className="fade overflow-hidden rounded-xl border bg-gray-400 shadow-md">
                    {thumbnail_url ? (
                      <img
                        className="fade-semifast h-full w-full object-contain"
                        src={thumbnail_url}
                        alt=""
                      />
                    ) : null}
                    <div>
                      <div className="fade-semifast flex items-center justify-center space-x-2 bg-white p-5 text-center text-black">
                        <div>
                          <h1 className="font-[Poppins] text-xl font-bold">
                            {name}
                          </h1>
                          <p className="fade-semifast mt-2 whitespace-pre-wrap font-[Poppins] text-sm">
                            {description}
                          </p>
                        </div>
                      </div>
                      <div className="fade-semifast flex flex-col items-center justify-center space-y-4 bg-white p-5 text-black lg:flex-row lg:justify-center lg:space-x-2 lg:space-y-0">
                        <button
                          onClick={() =>
                            router.push(`/admin/promo-item/${id}/edit`)
                          }
                          className="flex items-center justify-center rounded-full bg-[#ec008c] px-12 py-3 font-[Poppins] font-bold uppercase text-white transition-all duration-500 ease-in-out hover:bg-[#ec008c]/80 hover:shadow-lg hover:shadow-gray-500"
                          type="button"
                        >
                          Päivitä
                        </button>
                        <button
                          onClick={() =>
                            router.push(`/admin/promo-item/${id}/delete`)
                          }
                          className="flex items-center justify-center rounded-full bg-white px-12 py-3 font-[Poppins] font-bold uppercase text-black shadow-sm shadow-gray-500 transition-all duration-500 ease-in-out hover:bg-red-600 hover:text-white hover:shadow-none"
                          type="button"
                        >
                          Poista
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )
          )} */}
          {/* <h1 className="max-w-xl px-8 text-center font-[Poppins] text-xl font-extrabold sm:text-left lg:text-3xl">
            Juontajat
          </h1>
          {resHosts?.hosts?.map(({ id, name, description, host_image }) => (
            <>
              <div
                key={id}
                className="mx-auto flex items-center justify-center p-6"
              >
                <div className="fade overflow-hidden rounded-xl border bg-gray-400 shadow-md">
                  {host_image ? (
                    <img
                      className="fade-semifast h-full w-full object-contain"
                      src={host_image}
                      alt=""
                    />
                  ) : null}
                  <div>
                    <div className="fade-semifast flex items-center justify-center space-x-2 bg-white p-5 text-center text-black">
                      <div>
                        <h1 className="font-[Poppins] text-xl font-bold">
                          {name}
                        </h1>
                        <p className="fade-semifast mt-2 whitespace-pre-wrap font-[Poppins] text-sm">
                          {description}
                        </p>
                      </div>
                    </div>
                    <div className="fade-semifast flex flex-col items-center justify-center space-y-4 bg-white p-5 text-black lg:flex-row lg:justify-center lg:space-x-2 lg:space-y-0">
                      <button
                        onClick={() => router.push(`/admin/host/${id}/edit`)}
                        className="flex items-center justify-center rounded-full bg-[#ec008c] px-12 py-3 font-[Poppins] font-bold uppercase text-white transition-all duration-500 ease-in-out hover:bg-[#ec008c]/80 hover:shadow-lg hover:shadow-gray-500"
                        type="button"
                      >
                        Päivitä
                      </button>
                      <button
                        onClick={() => router.push(`/admin/host/${id}/delete`)}
                        className="flex items-center justify-center rounded-full bg-white px-12 py-3 font-[Poppins] font-bold uppercase text-black shadow-sm shadow-gray-500 transition-all duration-500 ease-in-out hover:bg-red-600 hover:text-white hover:shadow-none"
                        type="button"
                      >
                        Poista
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
          <h1 className="max-w-xl px-8 text-center font-[Poppins] text-xl font-extrabold sm:text-left lg:text-3xl">
            Tilaukset
          </h1>
          {resProducts?.products?.data?.length === 0 && (
            <div className="mx-16 my-8 flex h-96 flex-col items-center justify-center space-y-3 text-center font-[Poppins]">
              <BellAlertIcon className="h-24 w-24 object-cover" />
              <h1 className="text-2xl font-bold sm:text-lg">
                Tilauksia ei ole.
              </h1>
              <p className="text-xs">
                Näyttää siltä, että tilauksia ei ole saatavilla.
              </p>
              <p className="text-xs">
                Tilanne paranee, kun tilauksia lisätään.
              </p>
              <p className="text-xs">Yritä myöhemmin uudelleen.</p>
            </div>
          )}
          {resProducts?.products?.data?.map(
            ({ id, name, description, default_price, images }) => (
              <div
                key={id}
                className="mx-auto flex items-center justify-center p-6"
              >
                <div className="fade overflow-hidden rounded-xl border bg-gray-400 shadow-md">
                  {images![0] ? (
                    <img
                      className="fade-semifast h-full w-full bg-gray-400 object-contain"
                      src={images![0]}
                      alt=""
                    />
                  ) : null}
                  <div>
                    <div className="flex items-center justify-center bg-white p-5 text-center text-black">
                      <div>
                        <h1 className="font-[Poppins] text-xl font-bold">
                          {name}
                        </h1>
                        <p className="font-[Poppins] text-lg text-slate-400">
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
                        <p className="fade-semifast mt-2 whitespace-pre-wrap font-[Poppins] text-sm">
                          {description}
                        </p>
                      </div>
                    </div>
                    <div className="fade-semifast flex flex-col items-center justify-center space-y-4 bg-white p-5 text-black">
                      <button
                        onClick={() =>
                          router.push(`/admin/subscription/${id}/edit`)
                        }
                        className="flex items-center justify-center rounded-full bg-[#ec008c] px-12 py-3 font-[Poppins] font-bold uppercase text-white transition-all duration-500 ease-in-out hover:bg-[#ec008c]/80 hover:shadow-lg hover:shadow-gray-500"
                        type="button"
                      >
                        Päivitä
                      </button>
                      <button
                        onClick={() =>
                          router.push(`/admin/subscription/${id}/delete`)
                        }
                        className="flex items-center justify-center rounded-full bg-white px-12 py-3 font-[Poppins] font-bold uppercase text-black shadow-sm shadow-gray-500 transition-all duration-500 ease-in-out hover:bg-red-600 hover:text-white hover:shadow-none"
                        type="button"
                      >
                        Poista
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          )} */}
        </>
      )}

      <Footer />
    </div>
  )
}
export default Admin
