import { type AppType } from "next/app"
import { type Session } from "next-auth"
import { SessionProvider } from "next-auth/react"

import { api } from "~/utils/api"

import "~/styles/globals.css"

import "../../public/css/viihdevision.styles.css"
import Head from "next/head"
import Header from "~/components/Header"

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <div className="flex flex-col flex-grow bg-[#111111] min-h-screen text-white">
        <Head>
          <title>Viihdevision</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  )
}

export default api.withTRPC(MyApp)
