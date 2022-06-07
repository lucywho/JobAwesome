import Link from "next/link"
import { useRouter } from "next/router"

const Job = ({ job }) => {
    const router = useRouter()
    let poster = true

    if (router.pathname !== "/") {
        poster = false
        console.log("poster: ", poster)
    }

    return (
        <div className="pt-10 mx-5">
            <div className="border-l-2 border-green-700">
                <div className="text-xl text-green-900 font-bold hover:underline pl-5 ">
                    <Link href={`/job/${job.id}`}>{job.title}</Link>
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
