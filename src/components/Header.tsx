import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react"
import { Ring } from "@uiball/loaders"
import {
  ArrowRightOnRectangleIcon,
  CheckBadgeIcon as CheckBadgeSolidIcon,
  ChevronDownIcon,
  CreditCardIcon as CreditCardSolidIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid"
import {
  CogIcon,
  UserCircleIcon,
  CheckBadgeIcon as CheckBadgeOutlineIcon,
  CreditCardIcon,
  UserGroupIcon,
  HeartIcon,
} from "@heroicons/react/24/outline"
import { useRouter } from "next/router"
import { useState } from "react"
import { getInitials } from "../utils/getInitials"
import { useLocalStorage } from "../hooks/useLocalStorage"

const Header = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [menuShown, setMenuShown] = useState(false)
  const [enabledBetaFeature, setEnabledBetaFeature] = useLocalStorage(
    "betaFeature",
    false
  )

  return (
    <header className="sticky top-0 z-10 flex justify-between bg-[#111111] p-5">
      <div className="flex items-center space-x-5">
        <Link href="/">
          <img
            className="sticky top-0 w-40 cursor-pointer object-contain sm:w-44"
            src="/viihdevision.svg"
            alt=""
          />
        </Link>
      </div>

      <div className="flex items-center gap-1">
        {enabledBetaFeature ? (
          <Link
            href="/haku"
            className="cursor-pointer rounded-full p-2 transition-colors duration-150 ease-in-out hover:bg-gray-600"
          >
            <MagnifyingGlassIcon className="h-6 w-6 text-white" />
          </Link>
        ) : null}
        {session ? (
          <>
            <div
              onClick={() => setMenuShown((prev) => !prev)}
              className="flex cursor-pointer items-center justify-between space-x-3 p-2 font-[Poppins] transition-all duration-300 ease-in-out"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-500 p-2 text-white transition-all duration-300 ease-in-out hover:bg-white hover:text-black">
                <p className="font-[Poppins] text-sm font-semibold">
                  {getInitials(session.user?.name!!)}
                </p>
              </div>
            </div>
          </>
        ) : (
          <div
            onClick={() => setMenuShown((prev) => !prev)}
            className="flex cursor-pointer items-center p-2 font-[Poppins] transition-all duration-300 ease-in-out hover:rounded-full hover:bg-gray-700 hover:text-white"
          >
            {status === "loading" ? (
              <Ring speed={2.6} size={32} lineWeight={6} color="white" />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full p-1">
                <ChevronDownIcon className="h-8 w-8 text-xl text-white" />
              </div>
            )}
          </div>
        )}

        {menuShown && session ? (
          <div
            className={`mt-4 flex h-auto flex-col space-y-2 rounded-lg bg-gray-100 p-2 ${
              menuShown ? "animate-menu" : "animate-menu-reverse"
            }`}
          >
            <div className="menuItemNonClickable">
              <div>
                <p className="text-sm">{session?.user?.name?.split(" ")[0]}</p>
                <p className="hidden text-xs sm:hidden md:inline-flex">
                  {session.user.email}
                </p>
              </div>
              {session.user.image ? (
                <img
                  className="h-6 w-6 rounded-full"
                  src={session.user.image}
                />
              ) : (
                <UserCircleIcon className="h-6 w-6 font-bold" />
              )}
            </div>
            <div
              onClick={() => setEnabledBetaFeature((prev) => !prev)}
              className="menuItem"
            >
              <div>
                <p className="text-sm">Beta</p>
              </div>
              {enabledBetaFeature ? (
                <CheckBadgeSolidIcon className="h-6 w-6" />
              ) : (
                <CheckBadgeOutlineIcon className="h-6 w-6" />
              )}
            </div>
            {enabledBetaFeature ? (
              <>
                <div
                  onClick={() => {
                    setMenuShown(false)
                    router.push("/omat-suosikit")
                  }}
                  className="menuItem"
                >
                  <p>Suosikit</p>
                  <HeartIcon className="h-6 w-6 font-bold" />
                </div>
                <div
                  onClick={() => {
                    setMenuShown(false)
                    router.push("/hosts")
                  }}
                  className="menuItem menuItemHidden"
                >
                  <p>Juontajat</p>
                  <UserGroupIcon className="h-6 w-6 font-bold" />
                </div>
                <div
                  onClick={() => {
                    setMenuShown(false)
                    router.push("/plus")
                  }}
                  className="menuItem menuItemHiddenPlus"
                >
                  <p>Tilaa Supliikki+</p>
                  <CreditCardIcon className="h-6 w-6 font-bold" />
                </div>
                {session.user?.email?.startsWith("juiceneblueyt") ? (
                  <div
                    onClick={() => {
                      setMenuShown(false)
                      router.push("/admin")
                    }}
                    className="menuItem"
                  >
                    <p>Ylläpito</p>
                    <CogIcon className="h-6 w-6 font-bold" />
                  </div>
                ) : null}
              </>
            ) : null}
            <div
              onClick={() => {
                setMenuShown(false)
                signOut({
                  redirect: false,
                })
              }}
              className="menuItem"
            >
              <p>Kirjaudu ulos</p>
              <ArrowRightOnRectangleIcon className="h-6 w-6 font-bold" />
            </div>
          </div>
        ) : menuShown && !session ? (
          <div
            className={`mt-4 flex h-auto flex-col space-y-2 rounded-lg bg-gray-100 p-2 ${
              menuShown ? "animate-menu" : "animate-menu-reverse"
            }`}
          >
            <div
              onClick={() => setEnabledBetaFeature((prev) => !prev)}
              className="menuItem"
            >
              <div>
                <p className="text-sm">Beta</p>
              </div>
              {enabledBetaFeature ? (
                <CheckBadgeSolidIcon className="h-6 w-6" />
              ) : (
                <CheckBadgeOutlineIcon className="h-6 w-6" />
              )}
            </div>
            <div
              onClick={() => {
                setMenuShown(false)
                signIn("auth0", { redirect: false }, "prompt=login")
              }}
              className="menuItem"
            >
              <p>Kirjaudu sisään</p>
              <ArrowRightOnRectangleIcon className="h-6 w-6 font-bold" />
            </div>
            <div
              onClick={() => {
                setMenuShown(false)
                signIn("auth0", undefined, "prompt=login&screen_hint=signup")
              }}
              className="menuItem"
            >
              <p>Rekisteröidy</p>
              <UserCircleIcon className="h-6 w-6 font-bold" />
            </div>
          </div>
        ) : null}
      </div>
    </header>
  )
}

export default Header
