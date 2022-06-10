import { useState } from "react"

const Slug = ({ contents }) => {
    const [seeMore, setSeeMore] = useState(false)
    let slug = contents.slice(0, 249)

    return (
        <>
            {contents.length <= 250 && <>{contents}</>}
            {contents.length > 250 && (
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
                            {contents}
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
