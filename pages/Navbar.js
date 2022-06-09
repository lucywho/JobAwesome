import { useSession, getSession } from "next-auth/react"
import Link from "next/link"
import prisma from "lib/prisma"
import { getUser } from "lib/data"

export default function Navbar({ user }) {
    console.log("nav user: ", user) //returns undefined

    const { data: session, status } = useSession()

    return (
        <div className="w-full h-12 px-10 border-b-2 bg-green-900 text-yellow-100 font-bold border-b-green-900 flex flex-row justify-between items-center ">
            <div className="text-green-400 text-4xl">JobAwesome</div>
            <Link href="/">
                <p className="hover:underline">Home</p>
            </Link>
            <Link href="/dashboard">
                <p className="hover:underline">Your Dashboard</p>
            </Link>
            {/* {user.company ? (
                <Link href="/dashboard">
                    <p className="hover:underline">Your Dashboard</p>
                </Link>
            ) : (
                <Link href="/dashboard">
                    <p className="hover:underline">My Profile</p>
                </Link>
            )} */}
            {session && (
                <button
                    className="font-bold hover:underline"
                    onClick={() => signOut()}
                >
                    Sign Out
                </button>
            )}
            {!session && <Link href="/api/auth/signin">Sign In</Link>}
        </div>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)

    if (!session) return null

    let user = await getUser(session.user.id, prisma)
    user = JSON.parse(JSON.stringify(user))

    return {
        props: {
            user,
        },
    }
}
