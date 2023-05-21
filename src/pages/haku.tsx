import Head from "next/head"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { FormEvent, useState } from "reacr/useSearchResultsFetch"
import Link from "next/link"
import { DotPulse } from "@uiball/loaders"

const Haku = () => {
  const [search, setSearch] = useState<string>("")
  const [searchType, setSearchType] = useState<string>("podcast")
  const [searchResultType, setSearchResultType] = useState<
    "podcast" | "episode" | null
  >("podcast")
  const [text, setText] = useState<string>("")
  const [searchResults, setSearchResults] = useState<SearchResults[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  /* const searchPodcasts = (searchTerm: string, searchType: string) => {
    if (!searchTerm) return setSearchResults([])

    setText(searchTerm)
    setLoading(true)

    useSearchResultsFetch<SupliikkiSearchResultsResponseData>(
      searchTerm,
      searchType
    )
      .then(({ type, searchResults }) => {
        setLoading(false)
        setSearchResultType(type)
        setSearchResults(searchResults)
      })
      .catch((e) => {
        setLoading(false)
        setSearchResultType(null)
        setSearchResults([])
        console.log(e)
      })
  } */

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    // searchPodcasts(search, searchType)
  }

  return (
    <>
      <Head>
        <title>Haku - Supliikki</title>
      </Head>

      <Header sticky themeColor="bg-white" />

      <div className="flex flex-col items-center justify-center w-full px-16 py-20 max-w-2xl xl:max-w-4xl mx-auto">
        <h1 className="font-[Poppins] font-bold text-2xl text-center whitespace-pre-wrap">
          {searchResults.length > 0
            ? `Hakutulokset haulle\n\"${text}\"`
            : "Haku"}
        </h1>
        <p className="font-[Poppins] mt-2 text-sm text-center whitespace-pre-wrap">
          {searchResults.length > 0 && `${searchResults.length} kpl`}
        </p>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4 w-full">
          <input
            className="px-6 py-3 bg-gray-200 w-full flex-grow outline-none text-black placeholder:text-gray-500 rounded-full font-[Poppins]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Podcastin nimi tai jakson nimi"
          />
          <input
            className="px-6 py-3 bg-gray-200 w-full flex-grow outline-none text-black placeholder:text-gray-500 rounded-full font-[Poppins]"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            type="text"
            placeholder="Tyyppi"
          />
          <button
            disabled={loading}
            className="flex justify-center items-center w-full bg-[#ec008c] text-center p-3 text-white uppercase font-bold font-[Poppins] rounded-full hover:opacity-70 transition-opacity duration-200 ease-in-out disabled:bg-gray-500 select-none disabled:pointer-events-none"
            type="submit"
          >
            Hae
          </button>
        </form>

        {loading && (
          <div className="mt-8">
            <DotPulse color="#ec008c" size={64} speed={1.3} />
          </div>
        )}
        {searchResults.length === 0 && (
          <p className="font-[Poppins] text-sm w-full text-slate-700 whitespace-pre-wrap text-center italic mt-4">
            Ei hakutuloksia.
          </p>
        )}
        {searchResults.map((searchResult) => (
          <div
            key={searchResult.id}
            className="mt-4 grid grid-cols-1 gap-3 p-2 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3"
          >
            <div className="hover:scale-95 hover:shadow-xl hover:shadow-gray-400 transition-all duration-500 ease-in-out cursor-pointer overflow-hidden rounded-xl border shadow-md bg-[url('/images/supliikki_placeholder.png')]">
              {searchResultType === "podcast" ? (
                <Link
                  href={{
                    pathname: `/podcast/[slug]`,
                    query: {
                      slug: searchResult.alias,
                    },
                  }}
                >
                  {searchResult.thumbnail_url && (
                    <img
                      className="w-full object-contain fade-semifast transition-transform duration-200 ease-in-out"
                      src={searchResult.thumbnail_url}
                      alt=""
                    />
                  )}
                </Link>
              ) : (
                searchResultType === "episode" &&
                searchResult.podcast.alias && (
                  <Link
                    href={{
                      pathname: `/podcast/[slug]/episode/[id]`,
                      query: {
                        slug: searchResult.podcast.alias,
                        id: searchResult.alias,
                      },
                    }}
                  >
                    {searchResult.thumbnail_url && (
                      <img
                        className="w-full object-contain fade-semifast transition-transform duration-200 ease-in-out"
                        src={searchResult.thumbnail_url}
                        alt=""
                      />
                    )}
                  </Link>
                )
              )}
            </div>
          </div>
        ))}
      </div>

      <Footer themeColor="bg-white" />
    </>
  )
}

export default Haku
