import prisma from "lib/prisma"
import Jobs from "components/Jobs"
import { getJobs } from "lib/data"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

export default function Home({ jobs }) {
    const router = useRouter()
    const { data: session, status } = useSession()

    if (session && !session.user.name) {
        router.push("/setup")
    }

    return (
        <>
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
    let jobs = await getJobs(prisma)
    jobs = JSON.parse(JSON.stringify(jobs))

    return {
        props: {
            jobs,
        },
    }
}
