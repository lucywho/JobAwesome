import { useSession, getSession } from "next-auth/react"
import { useRouter } from "next/router"
import Link from "next/link"
import prisma from "lib/prisma"
import Jobs from "components/Jobs"
import { getJobs } from "lib/data"
import { getUser } from "lib/data"

export default function Home({ jobs, user }) {
    const router = useRouter()
    const { data: session, status } = useSession()

    if (session && !session.user.name) {
        router.push("/setup")
    }

    return (
        <>
            {session && (
                <div className="mx-10 border-0 border-b-2 border-b-green-800 pb-5">
                    <p className="my-5 font-bold text-2xl">
                        Welcome, {user.name}
                        {user.company && (
                            <span className="bg-green-500 text-green-900 uppercase text-xs ml-2 p-2 rounded-lg">
                                Company
                            </span>
                        )}
                    </p>
                    {user.company ? (
                        <>
                            <Link href={"/new"}>
                                <button className="px-4 py-2 mt-2 font-bold rounded-full bg-green-900 text-yellow-100 hover:bg-green-500 hover:text-green-900">
                                    click here to post a new job
                                </button>
                            </Link>
                            <button className="px-4 py-2 mt-2 ml-5 font-bold rounded-full bg-green-900 text-yellow-100 hover:bg-green-500 hover:text-green-900">
                                see all the jobs you posted
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="px-4 py-2 mt-2 font-bold rounded-full bg-green-900 text-yellow-100 hover:bg-green-500 hover:text-green-900">
                                see all the jobs you&apos;ve applied for
                            </button>
                        </>
                    )}
                </div>
            )}

            <div className="p-10">
                <div className="text-center p-4 m-0">
                    <h2 className=" text-4xl font-bold">Find a job!</h2>
                </div>
                <Jobs jobs={jobs} />
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
    console.log("context :", context)
    console.log("session :", session)

    let jobs = await getJobs(prisma)
    jobs = JSON.parse(JSON.stringify(jobs))

    let user = await getUser(session.user.id, prisma)
    user = JSON.parse(JSON.stringify(user))

    return {
        props: {
            jobs,
            user,
        },
    }
}
