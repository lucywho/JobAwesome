import Job from "components/Job"

const Jobs = ({ jobs, isDashboard, signedIn }) => {
    if (!jobs) return null

    return (
        <>
            {jobs.map((job, index) => (
                <Job
                    key={index}
                    job={job}
                    isDashboard={isDashboard}
                    signedIn={signedIn}
                />
            ))}
        </>
    )
}

export default Jobs
