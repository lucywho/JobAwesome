import { useSession, getSession } from "next-auth/react"
import Link from "next/link"

export default function Navbar({ user }) {
    const { data: session, status } = useSession()

    return (
        <div className="w-full min-h-14 px-10 border-b-2 bg-green-900 text-yellow-100 font-bold border-b-green-900 flex md:flex-row flex-col justify-between items-center ">
            <div className="text-green-400 text-4xl  my-2">JobAwesome</div>
            <div className="w-full flex flex-row justify-between md:mb-0 mb-2 md:px-20">
                <Link href="/">
                    <p className="hover:underline">Home</p>
                </Link>
                <Link href="/dashboard">
                    <p className="hover:underline">Dashboard</p>
                </Link>

                {session && (
                    <Link
                        href="/api/auth/signout"
                        className="font-bold hover:underline"
                    >
                        Sign Out
                    </Link>
                )}
                {!session && (
                    <Link
                        href="/api/auth/signin"
                        className="font-bold hover:underline"
                    >
                        Sign In
                    </Link>
                )}
            </div>
        </div>
    )
}
