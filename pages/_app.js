import "../styles/globals.css"
import { SessionProvider } from "next-auth/react"
import Navbar from "pages/Navbar"

function MyApp({ Component, pageProps }) {
    return (
        <div className="bg-gradient-to-l from-green-100 to-yellow-100 min-h-screen">
            <SessionProvider session={pageProps.session}>
                <Navbar />
                <Component {...pageProps} />
            </SessionProvider>
        </div>
    )
}

export default MyApp
