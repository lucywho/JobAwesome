import { useState } from "react"

const Slug = ({ coverletter }) => {
    const [seeMore, setSeeMore] = useState(false)
    let slug = coverletter.slice(0, 29)

    console.log("seeMore :", seeMore)

    return (
        <>
            {coverletter.length <= 30 && <>{coverletter}</>}
            {coverletter.length > 30 && (
                <>
                    {!seeMore && (
                        <>
                            {slug}{" "}
                            <span className="hover:underline italic text-yellow-900 hover:text-green-800">
                                <button onClick={() => setSeeMore(true)}>
                                    {" "}
                                    ...see more
                                </button>
                            </span>
                        </>
                    )}
                    {seeMore && (
                        <>
                            {coverletter}
                            <span className="hover:underline italic text-yellow-900  pl-1 hover:text-green-800">
                                <button onClick={() => setSeeMore(false)}>
                                    {" "}
                                    ...see less
                                </button>
                            </span>
                        </>
                    )}
                </>
            )}
        </>
    )
}

export default Slug
