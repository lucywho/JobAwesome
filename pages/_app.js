import "../styles/globals.css"
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps }) {
    return (
        <div className="bg-gradient-to-r from-green-200 to-yellow-100 h-screen">
            <SessionProvider session={pageProps.session}>
                <Component {...pageProps} />
            </SessionProvider>
        </div>
    )
}

export default MyApp
