import { Ring } from "@uiball/loaders"
import Header from "./Header"

const Loading = () => {
  return (
  	<>
    	<div className="bg-[#111111] flex flex-col items-center justify-center min-h-screen">
      	<Ring speed={2.3} size={64} color="white" />
    	</div>
    </>
  )
}

export default Loading
