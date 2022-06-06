import prisma from "lib/prisma"
import Jobs from "components/Jobs"
import { getJobs } from "lib/data"

export default function Home({ jobs }) {
    return (
        <div className="p-10">
            <div className="text-center p-4 m-0">
                <h2 className=" text-4xl font-bold">Find a job!</h2>
            </div>
            <Jobs jobs={jobs} />
        </div>
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
