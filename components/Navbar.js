import Link from "next/link"
import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"

export default function Navbar() {
    const { data: session, status } = useSession()

    return (
        <div className="w-full h-12 px-10 border-b-2 bg-green-900 text-yellow-100 font-bold border-b-green-900 flex flex-row justify-between items-center">
            <div className="text-green-400 text-4xl">JobAwesome</div>
            <Link href="/"> Home </Link>
            <Link href="/"> My Profile* </Link>
            {session && (
                <button className="font-bold" onClick={() => signOut()}>
                    Sign Out
                </button>
            )}
            {!session && <Link href="/api/auth/signin">Sign In</Link>}
        </div>
    )
}
