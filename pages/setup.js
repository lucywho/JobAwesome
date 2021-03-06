import { useState } from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

export default function Setup() {
    const router = useRouter()
    const { data: session, status } = useSession()
    const loading = status === "loading"
    const [name, setName] = useState("")
    const [company, setCompany] = useState(false)

    if (loading) {
        return <p className="pt-10 pl-10 text-green-900">. . . loading</p>
    }

    if (!session || !session.user) {
        router.push("/")
        return null
    }

    return (
        <>
            <h1 className="text-green-900 text-4xl text-center pt-5">
                Welcome to <span className="text-green-500">JobAwesome!</span>
            </h1>

            <form
                className="mt-5 mx-20"
                onSubmit={async (e) => {
                    e.preventDefault()
                    await fetch("/api/setup", {
                        body: JSON.stringify({
                            name,
                            company,
                        }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                        method: "POST",
                    })
                    session.user.name = name
                    session.user.company = company
                    router.push("/")
                }}
            >
                <h2 className="text-green-900 text-2xl pt-5">
                    find your place
                </h2>
                <div className="font-bold">Please enter your name</div>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-1 border-green-900 rounded-md"
                />
                <h2 className="text-green-900 text-2xl  pt-5">
                    find your people
                </h2>
                <div className="font-bold flex flex-row">
                    <input
                        type="checkbox"
                        name="company"
                        checked={company}
                        onChange={(e) => setCompany(!company)}
                        className="border p-1 border-green-900 rounded-md "
                    />

                    <div className="pl-2">
                        check this box if you are an employer and want to post
                        jobs
                    </div>
                </div>
                <button className="mt-5 border border-green-900 rounded-full py-2 px-4 font-bold bg-green-900 text-yellow-100 hover:bg-green-300 hover:text-green-900">
                    Save
                </button>
            </form>
        </>
    )
}
