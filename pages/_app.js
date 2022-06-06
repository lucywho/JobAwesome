import "../styles/globals.css"
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps }) {
    return (
        <div className="bg-gradient-to-l from-green-100 to-yellow-100 min-h-screen">
            <SessionProvider session={pageProps.session}>
                <Component {...pageProps} />
            </SessionProvider>
        </div>
    )
}

export default MyApp
