import { useRouter } from "next/router"
import { useRef } from "react"
import Button from "./Button"
import { api } from "~/utils/api"

const VideoInputBox = () => {
  const nameRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  const videoIdRef = useRef<HTMLInputElement>(null)

  const router = useRouter()
  const createVideo = api.video.create.useMutation({
    onSuccess: () => {
      router.replace("/")
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    createVideo.mutate({
      name: nameRef.current!.value,
      videoId: videoIdRef.current!.value,
      description: descriptionRef.current!.value,
    })
  }

  return (
    <>
      <div className="scrollbar-none mx-auto my-16 flex max-w-7xl flex-col overflow-y-scroll rounded-3xl bg-white px-10 py-2 text-black shadow-xl shadow-gray-400">
        <form onSubmit={handleSubmit} className="px-5 py-4">
          <h1 className="text-md mt-6 font-[Poppins] font-bold">Videon nimi</h1>

          <input
            ref={nameRef}
            className="mr-6 mt-2 flex w-full flex-1 flex-col items-center justify-center rounded-md border-2 border-black bg-transparent px-6 py-[0.75rem] font-[Poppins] text-black outline-none"
            type="text"
          />
          <h1 className="text-md mt-6 font-[Poppins] font-bold">
            Videon kuvaus
          </h1>
          <textarea
            ref={descriptionRef}
            className="mr-6 mt-2 flex w-full flex-1 flex-col items-center justify-center rounded-md border-2 border-black bg-transparent px-6 py-[0.75rem] font-[Poppins] text-black outline-none"
          />
          <h1 className="text-md mt-6 font-[Poppins] font-bold">
            Videon tunnus
          </h1>
          <input
            ref={videoIdRef}
            className="mr-6 mt-2 flex w-full flex-1 flex-col items-center justify-center rounded-md border-2 border-black bg-transparent px-6 py-[0.75rem] font-[Poppins] text-black outline-none"
            type="text"
          />
          <div className="mt-8 flex items-center justify-center">
            <Button className="w-full">Tallenna</Button>
          </div>
        </form>
      </div>
    </>
  )
}
export default VideoInputBox
