import Job from "components/Job"

const Jobs = ({ jobs, isDashboard, user }) => {
    if (!jobs) return null

    return (
        <>
            {jobs.map((job, index) => (
                <Job
                    key={index}
                    job={job}
                    isDashboard={isDashboard}
                    user={user}
                />
            ))}
        </>
    )
}

export default Jobs
