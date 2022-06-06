export default function Utils() {
    return (
        <div className="p-10 ml-20 flex flex-col">
            <h2 className="mb-10 text-xl font-bold">Utils</h2>
            <button
                className="border-2 border-red-900 px-8 py-2 mt-5 mx-auto font-bold rounded-full text-red-900 hover:bg-red-400 "
                onClick={async () => {
                    await fetch("/api/utils", {
                        body: JSON.stringify({
                            task: "clean_database",
                        }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                        method: "POST",
                    })
                }}
            >
                Clean database
            </button>
            <button
                className="border-2 border-blue-900 px-8 py-2 mt-5 mx-auto font-bold rounded-full text-blue-900 hover:bg-blue-400"
                onClick={async () => {
                    await fetch("/api/utils", {
                        body: JSON.stringify({
                            task: "generate_users_and_jobs",
                        }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                        method: "POST",
                    })
                }}
            >
                Generate 10 users and some jobs
            </button>
            <button
                className="border-2 border-green-900 px-8 py-2 mt-5 mx-auto font-bold rounded-full text-green-900 hover:bg-green-400"
                onClick={async () => {
                    await fetch("/api/utils", {
                        body: JSON.stringify({
                            task: "generate_one_job",
                        }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                        method: "POST",
                    })
                }}
            >
                Generate 1 new job
            </button>
        </div>
    )
}
