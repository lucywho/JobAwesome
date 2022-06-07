import { getJob } from "lib/data"
import prisma from "lib/prisma"
import Link from "next/link"

export default function Job({ job }) {
    return (
        <div className="pt-10 mx-5">
            <div className="text-xl text-green-900 font-bold">{job.title}</div>
            <div className="text-l text-gray-900 pl-5">{job.description}</div>
            <div className="text-green-900 pl-5">
                <span className="font-light">posted by : </span>
                <span className="font-bold hover:underline">
                    <Link href={`/company/${job.author.id}`}>
                        <span> {job.author.name}</span>
                    </Link>
                </span>
            </div>
        </div>
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
