import { useState } from "react"
import { useRouter } from "next/router"
import { useSession, getSession } from "next-auth/react"
import Link from "next/link"

import { getJob } from "lib/data"
import prisma from "lib/prisma"

export default function Apply({ job }) {
    const [coverletter, setCoverletter] = useState("")
    const { data: session } = useSession()
    const router = useRouter()

    if (!session) return null

    return (
        <>
            <form
                className="mt-5 mx-10"
                onSubmit={async (e) => {
                    e.preventDefault()

                    await fetch("/api/application", {
                        body: JSON.stringify({
                            coverletter,
                            job: job.id,
                        }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                        method: "POST",
                    })
                    router.push("/dashboard")
                }}
            >
                <span className="border float-right px-8 py-2 mt-0  font-bold rounded-full bg-green-900 hover:bg-green-500 text-yellow-100 hover:text-green-900">
                    <Link href={`/job/${job.id}`}>Return to job page</Link>
                </span>

                <h2 className="mt-10 text-2xl font-bold">
                    Apply for{" "}
                    <span className="text-green-500">{job.title}</span>
                </h2>
                <h2 className="text-2xl font-bold">
                    With
                    <Link href={`/company/${job.author.id}`}>
                        <span className="text-green-900 font-bold hover:underline">
                            {" "}
                            {job.author.name}
                        </span>
                    </Link>
                </h2>

                <p className="my-5">{job.description}</p>

                <textarea
                    className="border-2 border-green-900 rounded-md font-medium p-2 mt-2 text-lg w-full"
                    rows={8}
                    cols={50}
                    placeholder="Cover letter"
                    required
                    onChange={(e) => setCoverletter(e.target.value)}
                />
                <button className="border float-right px-8 py-2 mt-2 font-bold rounded-full bg-green-900 hover:bg-green-500 text-yellow-100 hover:text-green-900">
                    Send application
                </button>
            </form>
        </>
    )
}

export async function getServerSideProps(context) {
    let job = await getJob(context.params.id, prisma)
    job = JSON.parse(JSON.stringify(job))

    return {
        props: {
            job,
        },
    }
}
