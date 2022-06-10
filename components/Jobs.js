import Job from "components/Job"

const Jobs = ({ jobs, signedIn }) => {
    if (!jobs) return null

    return (
        <>
            {jobs.map((job, index) => (
                <Job key={index} job={job} signedIn={signedIn} />
            ))}
        </>
    )
}

export default Jobs
