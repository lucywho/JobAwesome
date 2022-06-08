import { getCompanyJobs, getCompany } from "lib/data"
import prisma from "lib/prisma"
import Link from "next/link"
import Job from "components/Job"

export default function Company({ jobs, company }) {
    return (
        <div className="m-10">
            <h2 className="pb-5 mb-5 text-3xl font-bold border-0 border-b-2 border-b-green-900">
                Welcome to the{" "}
                <span className="text-green-500"> {company.name} </span>job page
            </h2>
            <div className="">
                <p className="text-center text-xl font-bold">
                    All jobs at {company.name}
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
