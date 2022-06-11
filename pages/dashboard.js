import { getSession, useSession } from "next-auth/react"
import prisma from "lib/prisma"
import Link from "next/link"
import { getJobsPosted, getUser, getApplications } from "lib/data"
import Job from "components/Job"
import Slug from "components/Slug"

export default function Dashboard({ jobs, user, applications }) {
    const { data: session, status } = useSession()

    if (!session) {
        return (
            <>
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
                    <Link
                        href="/api/auth/signin"
                        className="font-bold hover:underline"
                    >
                        <button className="px-4 py-2 mt-2 font-bold rounded-full bg-green-900 text-yellow-100 hover:bg-green-500 hover:text-green-900">
                            Sign In
                        </button>
                    </Link>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="mx-10 border-0 border-b-2 border-b-green-800 pb-5">
                <p className="my-5 font-bold text-2xl">
                    Welcome to your dashboard
                    <span className="text-green-500"> {user.name}</span>
                </p>
                {user.company && (
                    <Link href={"/new"}>
                        <button className="px-4 py-2 mt-2 font-bold rounded-full bg-green-900 text-yellow-100 hover:bg-green-500 hover:text-green-900">
                            click here to post a new job
                        </button>
                    </Link>
                )}
            </div>

            {session && (
                <>
                    {user.company ? (
                        <>
                            <p className="mt-2 ml-10 text-2xl text-green-900">
                                You have posted the following jobs
                            </p>
                            <div>
                                {jobs.map((job, index) => (
                                    <>
                                        <Job
                                            key={index}
                                            job={job}
                                            isDashboard={true}
                                        />

                                        <div className="ml-20">
                                            {job.applications.length === 0 ? (
                                                <p className="my-2 font-normal text-green-900">
                                                    No applications yet
                                                </p>
                                            ) : (
                                                <p className="my-2 font-normal text-green-900">
                                                    There{" "}
                                                    {job.applications.length >
                                                    1 ? (
                                                        <span>are </span>
                                                    ) : (
                                                        <span>is </span>
                                                    )}
                                                    <span className="font-bold">
                                                        {
                                                            job.applications
                                                                .length
                                                        }
                                                    </span>{" "}
                                                    application
                                                    {job.applications.length >
                                                        1 && (
                                                        <span>s</span>
                                                    )}{" "}
                                                    for this position
                                                </p>
                                            )}
                                        </div>
                                        <div className="ml-20 mt-2">
                                            {job.applications?.map(
                                                (application, index) => (
                                                    <>
                                                        <p>
                                                            <span className="text-base font-bold mt-3 mr-3">
                                                                {
                                                                    application
                                                                        .author
                                                                        .name
                                                                }
                                                            </span>
                                                            <Link
                                                                href={`mailto:${application.author.email}`}
                                                            >
                                                                <span className="hover:underline">
                                                                    {
                                                                        application
                                                                            .author
                                                                            .email
                                                                    }
                                                                </span>
                                                            </Link>
                                                        </p>
                                                        <p>
                                                            <Slug
                                                                contents={
                                                                    application.coverletter
                                                                }
                                                            />
                                                        </p>
                                                    </>
                                                )
                                            )}
                                        </div>
                                    </>
                                ))}
                            </div>
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

    let jobs = []
    let applications = []

    if (!session) {
        return {
            props: {},
        }
    }
    let user = await getUser(session.user.id, prisma)
    user = JSON.parse(JSON.stringify(user))

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
