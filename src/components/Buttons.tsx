import { useRouter } from "next/router"

const Buttons = () => {
  const router = useRouter()
  return (
    <>
      <button
        onClick={() => router.push("/admin/video/new")}
        className="flex items-center uppercase justify-center bg-white text-black hover:shadow-lg hover:shadow-gray-500 rounded-full font-[Poppins] font-bold px-12 py-3 transition-all duration-500 ease-in-out hover:bg-white/80"
        type="button"
      >
        Lisää uusi video
      </button>
      <button
        onClick={() => router.push("/admin/promo-item/new")}
        className="flex items-center uppercase justify-center bg-white text-black hover:shadow-lg hover:shadow-gray-500 rounded-full font-[Poppins] font-bold px-12 py-3 transition-all duration-500 ease-in-out hover:bg-white/80"
        type="button"
      >
        Lisää uusi mainos
      </button>
      <button
        onClick={() => router.push("/admin/subscription/new")}
        className="flex items-center uppercase justify-center bg-white text-black hover:shadow-lg hover:shadow-gray-500 rounded-full font-[Poppins] font-bold px-12 py-3 transition-all duration-500 ease-in-out hover:bg-white/80"
        type="button"
      >
        Lisää uusi tilaus
      </button>
      <button
        onClick={() => router.replace("/")}
        className="flex items-center uppercase justify-center bg-white text-black hover:shadow-lg hover:shadow-gray-500 rounded-full font-[Poppins] font-bold px-12 py-3 transition-all duration-500 ease-in-out hover:bg-white/80"
        type="button"
      >
        Takaisin
      </button>
      <button
        onClick={() => router.push("/plus")}
        className="flex items-center uppercase justify-center bg-white text-black hover:shadow-lg hover:shadow-gray-500 rounded-full font-[Poppins] font-bold px-12 py-3 transition-all duration-500 ease-in-out hover:bg-white/80"
        type="button"
      >
        Plus
      </button>
    </>
  )
}
export default Buttons
