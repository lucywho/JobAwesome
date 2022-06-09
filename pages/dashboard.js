import { getSession, useSession } from "next-auth/react"
import prisma from "lib/prisma"
import Link from "next/link"
import { getJobsPosted, getUser, getApplications } from "lib/data"
import Jobs from "components/Jobs"

export default function Dashboard({ jobs, user, applications }) {
    const { data: session, status } = useSession()

    console.log("dashboard user: ", user)

    return (
        <>
            <div className="mx-10 border-0 border-b-2 border-b-green-800 pb-5">
                <p className="my-5 font-bold text-2xl">
                    Welcome to your dashboard
                    <span className="text-green-500"> {user.name}</span>
                </p>
            </div>

            {session && (
                <>
                    {user.company ? (
                        <>
                            <p className="mt-2 ml-10 text-2xl text-green-900">
                                You have posted the following jobs
                            </p>
                            <Jobs jobs={jobs} isDashboard={true} />
                        </>
                    ) : (
                        <>
                            <p className="my-5 ml-10 text-2xl text-green-900">
                                You have applied for the following jobs
                            </p>
                            {applications.map((application, index) => {
                                return (
                                    <div
                                        className="ml-10 my-2 border-l-2 border-l-green-700"
                                        key={index}
                                    >
                                        <div className="pl-5">
                                            <Link
                                                href={`/job/${application.job.id}`}
                                            >
                                                <span className="text-xl font-bold text-green-900 hover:underline">
                                                    {application.job.title}
                                                </span>
                                            </Link>

                                            <p className="text-base font-normal text-grey-800 mb-5">
                                                {application.coverletter}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}
                        </>
                    )}
                </>
            )}
        </>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)

    let user = await getUser(session.user.id, prisma)
    user = JSON.parse(JSON.stringify(user))

    let jobs = []
    let applications = []

    if (user.company) {
        jobs = await getJobsPosted(user.id, prisma)
        jobs = JSON.parse(JSON.stringify(jobs))
    } else {
        applications = await getApplications(user.id, prisma)
        applications = JSON.parse(JSON.stringify(applications))
    }

    return {
        props: {
            jobs,
            user,
            applications,
        },
    }
}
