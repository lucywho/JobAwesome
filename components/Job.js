import Link from "next/link"
import { useRouter } from "next/router"
import Slug from "./Slug"

const Job = ({ job, isDashboard, signedIn }) => {
    const router = useRouter()
    let poster = true

    if (router.pathname !== "/") {
        poster = false
    }

    return (
        <div className="pt-10 mx-5">
            <div className="border-l-2 border-green-700">
                <div className="text-xl text-green-900 font-bold pl-5 ">
                    {signedIn ? (
                        <Link href={`/job/${job.id}`}>
                            <span className="hover:underline">{job.title}</span>
                        </Link>
                    ) : (
                        <p className="hover:no-underline">{job.title}</p>
                    )}
                    {isDashboard && job.published && (
                        <span
                            className="bg-green-900 text-yellow-200 uppercase text-xs p-1 rounded-lg float-right"
                            onClick={async () => {
                                await fetch("/api/job", {
                                    body: JSON.stringify({
                                        id: job.id,
                                        task: "unpublish",
                                    }),
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    method: "PUT",
                                })
                                router.reload(window.location.pathname)
                            }}
                        >
                            ✅ Published: click to unpublish.
                        </span>
                    )}
                    {isDashboard && !job.published && (
                        <span
                            className="bg-green-900 text-yellow-200 uppercase text-xs p-1 rounded-lg float-right"
                            onClick={async () => {
                                await fetch("/api/job", {
                                    body: JSON.stringify({
                                        id: job.id,
                                        task: "publish",
                                    }),
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    method: "PUT",
                                })
                                router.reload(window.location.pathname)
                            }}
                        >
                            ❌ Unpublished: click to publish.
                        </span>
                    )}
                </div>
                <div className="text-l text-gray-900 pl-5">
                    <Slug contents={job.description} />
                </div>
                <div className="text-l text-gray-900 pl-5">
                    {job.salary && (
                        <>
                            <span className="font-bold">Salary:</span>{" "}
                            {job.salary}{" "}
                        </>
                    )}
                    {job.location && (
                        <>
                            {" "}
                            <span className="font-bold"> Location:</span>{" "}
                            {job.location}
                        </>
                    )}
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
