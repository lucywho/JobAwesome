import { getCompanyJobs, getCompany } from "lib/data"
import prisma from "lib/prisma"
import Link from "next/link"
import Job from "components/Job"

export default function Company({ jobs, company }) {
    return (
        <div className="pt-10 px-10">
            <h2 className="mb-10 text-3xl font-bold">
                Profile of {company.name}
            </h2>
            <div className="pl-16 pr-16 -mt-6">
                <p className="text-center text-xl font-bold">
                    Jobs at {company.name}
                </p>
                {jobs.map((job, index) => (
                    <Job key={index} job={job} />
                ))}
            </div>
        </div>
    )
}

export async function getServerSideProps({ params }) {
    let company = await getCompany(params.id, prisma)
    let jobs = await getCompanyJobs(params.id, prisma)

    company = JSON.parse(JSON.stringify(company))
    jobs = JSON.parse(JSON.stringify(jobs))

    return {
        props: {
            jobs,
            company,
        },
    }
}
