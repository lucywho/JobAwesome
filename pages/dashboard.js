import { getSession, useSession } from "next-auth/react"
import prisma from "lib/prisma"
import { getJobsPosted, getUser } from "lib/data"
import Jobs from "components/Jobs"

export default function Dashboard({ jobs, user }) {
    const { data: session, status } = useSession()

    console.log("dashboard user: ", user)

    return (
        <>
            <div className="mx-10 border-0 border-b-2 border-b-green-800 pb-5">
                <p className="my-5 font-bold text-2xl">
                    Welcome to the jobs dashboard for
                    <span className="text-green-500"> {user.name}</span>
                </p>
            </div>

            {session && (
                <>
                    {user.company && (
                        <p className="mt-2 ml-10 text-2xl text-green-900">
                            You have posted the following jobs
                        </p>
                    )}
                </>
            )}
            <Jobs jobs={jobs} isDashboard={true} />
        </>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)

    let user = await getUser(session.user.id, prisma)
    user = JSON.parse(JSON.stringify(user))

    let jobs = await getJobsPosted(user.id, prisma)
    jobs = JSON.parse(JSON.stringify(jobs))

    return {
        props: {
            jobs,
            user,
        },
    }
}
