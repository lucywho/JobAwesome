import { getJob, alreadyApplied } from "lib/data"
import prisma from "lib/prisma"
import Link from "next/link"
import { getSession } from "next-auth/react"
import { getUser } from "lib/data"

export default function Job({ job, user, applied }) {
    return (
        <div className="pt-10 mx-10">
            <div className="text-xl text-green-900 font-bold">{job.title}</div>
            <div className="text-l text-gray-900 mb-3">{job.description}</div>
            <div className="text-green-900">
                <span className="font-light">posted by : </span>
                <span className="font-bold hover:underline">
                    <Link href={`/company/${job.author.id}`}>
                        <span> {job.author.name}</span>
                    </Link>
                </span>
                {!user.company && (
                    <>
                        {applied ? (
                            <span className="bg-green-900 text-yellow-100 hover:bg-green-500 hover:text-green-900 text-sm font-bold uppercase py-2 px-3 rounded-full ml-2">
                                <Link href={`/dashboard`}>
                                    see your application
                                </Link>
                            </span>
                        ) : (
                            <span className="bg-green-900 text-yellow-100 hover:bg-green-500 hover:text-green-900 text-sm font-bold uppercase py-2 px-3 rounded-full ml-2">
                                <Link href={`/job/${job.id}/apply`}>
                                    apply now!
                                </Link>
                            </span>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)

    let job = await getJob(context.params.id, prisma)
    job = JSON.parse(JSON.stringify(job))

    let user = await getUser(session.user.id, prisma)
    user = JSON.parse(JSON.stringify(user))

    let applied = await alreadyApplied(
        session.user.id,
        context.params.id,
        prisma
    )

    return {
        props: {
            job,
            user,
            applied,
        },
    }
}
