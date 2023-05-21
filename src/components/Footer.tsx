import Link from "next/link"
import React from "react"

const Footer = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-[#111111] p-5 shadow-lg">
      <Link className="flex items-center space-x-1 mb-6" href="/">
        <img
          className="sticky top-0 mt-8 w-40 cursor-pointer object-contain sm:w-44"
          src="/viihdevision.svg"
          alt=""
        />
      </Link>
      <p className="font-[Poppins] text-lg font-normal">
        © {new Date().getFullYear()} ViihdeVision
      </p>
      <p className="mt-1 font-[Poppins] text-sm font-normal">
        a part of Jesun Maailma
      </p>
    </div>
  )
}

export default Footer
