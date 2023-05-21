import Head from "next/head"
import Header from "../components/Header"
import Footer from "../components/Footer"
import {
  ArrowLeftOnRectangleIcon,
  BellAlertIcon,
  ClockIcon,
} from "@heroicons/react/24/solid"
import Link from "next/link"
import { useFavoritesFetch } from "../hooks/regular-user/useFavoritesFetch"
import Loading from "../components/Loading"
import { signIn, useSession } from "next-auth/react"

const OmatSuosikit = () => {
  const { data: session, status } = useSession()

  const { res, loading } = session && status === "authenticated" ? useFavoritesFetch(session.user.email) : useFavoritesFetch()

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

  const formatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "short",
  })

  return (
    <>
      <Head>
        <title>Omat suosikit - Supliikki</title>
      </Head>

      <Header themeColor="bg-white" />

      <div className="flex flex-col px-8 my-8">
        {session ? (
          <div>
            <h1 className="max-w-xl font-[Poppins] flex flex-col gap-y-0.5 font-extrabold text-center sm:text-left text-lg lg:text-xl">
              Suosikit käyttäjälle{" "}
              {session && `${session?.user?.name.split(" ")[0]}`}
            </h1>
            {res?.favoritedPodcasts?.find(
              (podcast) => podcast.private === true
            ) && (
              <p className="font-[Poppins] text-sm w-full text-slate-700 text-center italic mt-2">
                Ei mitään nähtävää.
              </p>
            )}
            {res?.favoritedPodcasts?.length === 0 && (
              <p className="font-[Poppins] text-sm w-full text-slate-700 whitespace-pre-wrap italic mt-2">
                Ei suosikkeja. Voit lisätä podin suosikkeihin painamalla
                tykkäyspainiketta podin sivulla.
              </p>
            )}
            {res?.favoritedPodcasts
              .filter((podcast) => podcast.private === false)
              .map(
                ({
                  id,
                  alias,
                  thumbnail_url,
                }) => (
                  <div
                    key={id}
                    className="mt-4 grid grid-cols-1 gap-3 p-2 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3"
                  >
                    <div className="w-56 h-56 hover:scale-95 hover:shadow-xl hover:shadow-gray-400 transition-all duration-500 ease-in-out cursor-pointer overflow-hidden rounded-xl border shadow-md bg-[url('/images/supliikki_placeholder.png')]">
                      <Link
                        href={{
                          pathname: `/podcast/[slug]`,
                          query: {
                            slug: alias,
                          },
                        }}
                      >
                        {thumbnail_url && (
                          <img
                            className="w-56 h-56 object-contain fade-semifast transition-transform duration-200 ease-in-out"
                            src={thumbnail_url}
                            alt=""
                          />
                        )}
                      </Link>
                    </div>
                  </div>
                )
              )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-8  gap-y-4">
            <p className="font-[Poppins] font-bold text-lg text-center mt-2">
              Lisätäksesi podeja suosikkeihin, sinun tulee kirjautua sisään.
            </p>
            <div
              onClick={() =>
                signIn("auth0", { redirect: false }, "prompt=login")
              }
              className="py-2 px-3 w-auto gap-x-2 cursor-pointer flex items-center text-center bg-[#ec008c] rounded-full hover:bg-[#ec008c]/70 transition-colors duration-150 ease-in-out text-white font-[Poppins] text-sm"
            >
              <ArrowLeftOnRectangleIcon className="w-6 h-6 font-bold" />
              Kirjaudu sisään
            </div>
          </div>
        )}
      </div>

      <Footer themeColor="bg-white" />
    </>
  )
}
export default OmatSuosikit
