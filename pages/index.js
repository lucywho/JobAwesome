import { useSession, getSession } from "next-auth/react"
import { useRouter } from "next/router"
import Link from "next/link"
import prisma from "lib/prisma"
import Jobs from "components/Jobs"
import { getJobs } from "lib/data"
import { getUser } from "lib/data"

export default function Home({ jobs, user, signedIn }) {
    const router = useRouter()
    const { data: session, status } = useSession()

    if (session && !session.user.name) {
        router.push("/setup")
    }

    return (
        <>
            {!session && (
                <div className="mx-10 border-0 border-b-2 border-b-green-800 pb-5 my-5 font-bold text-2xl text-green-900 text-center">
                    <div>
                        Welcome to{" "}
                        <p className="text-green-600 ">
                            JobAwesome: Find your place, find your people.
                        </p>
                    </div>
                    <div className="mt-2 text-xl">
                        Please sign in to find{" "}
                        <span className="text-green-600">your </span>
                        place and people
                    </div>
                </div>
            )}
            {session && (
                <div className="mx-10 border-0 border-b-2 border-b-green-800 pb-5 text-green-900">
                    <p className="my-5 font-bold text-2xl">
                        Welcome,{" "}
                        <span className="text-green-600">{user.name}</span>
                        {user.company && (
                            <span className="bg-green-500 text-green-900 uppercase text-xs ml-2 p-2 rounded-lg">
                                Company
                            </span>
                        )}
                    </p>

                    {user.company ? (
                        <>
                            <p>
                                Go to your{" "}
                                <Link href={"/dashboard"}>
                                    <span className="font-bold text-green-700 hover:underline">
                                        dashboard
                                    </span>
                                </Link>{" "}
                                to post new jobs and for information on all your
                                open and closed jobs
                            </p>
                        </>
                    ) : (
                        <>
                            <Link href={"/dashboard"}>
                                <button className="px-4 py-2 mt-2 font-bold rounded-full bg-green-900 text-yellow-100 hover:bg-green-500 hover:text-green-900">
                                    see all the jobs you&apos;ve applied for
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            )}

            <div>
                <div className="text-center p-4">
                    <h2 className="text-4xl font-bold">Find a place!</h2>
                </div>
                <Jobs jobs={jobs} signedIn={signedIn} />
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
    let user
    let signedIn

    if (!session) {
        user = false
        signedIn = false
    } else {
        user = await getUser(session.user.id, prisma)
        user = JSON.parse(JSON.stringify(user))
        signedIn = true
    }

    let jobs = await getJobs(prisma)
    jobs = JSON.parse(JSON.stringify(jobs))

    return {
        props: {
            jobs,
            user,
            signedIn,
        },
    }
}
