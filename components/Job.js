import Link from "next/link"
import { useRouter } from "next/router"

const Job = ({ job, isDashboard, real }) => {
    const router = useRouter()
    let poster = true

    if (router.pathname !== "/") {
        poster = false
    }

    return (
        <div className="pt-10 mx-5">
            <div className="border-l-2 border-green-700">
                <div className="text-xl text-green-900 font-bold pl-5 ">
                    {real ? (
                        <Link href={`/job/${job.id}`}>
                            <span className="hover:underline">{job.title}</span>
                        </Link>
                    ) : (
                        <p className="hover:no-underline">{job.title}</p>
                    )}
                    {isDashboard && job.published && (
                        <span className="bg-green-900 text-yellow-200 uppercase text-xs p-1 rounded-lg float-right">
                            ✅ Published
                        </span>
                    )}
                    {isDashboard && !job.published && (
                        <span className="bg-green-900 text-yellow-200 uppercase text-xs p-1 rounded-lg float-right">
                            ❌ Unpublished
                        </span>
                    )}
                </div>
                <div className="text-l text-gray-900 pl-5">
                    {job.description}
                </div>
                {poster && (
                    <div className="text-green-900 pl-5">
                        <span className="font-light">posted by </span>
                        <span className="font-bold">{job.author.name}</span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Job
