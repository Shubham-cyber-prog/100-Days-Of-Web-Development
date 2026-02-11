import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import Container from "../components/Container";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applyingId, setApplyingId] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    API.get("/jobs")
      .then((res) => setJobs(res.data))
      .finally(() => setLoading(false));

    if (user?.role === "jobseeker") {
      API.get("/applications/me").then((res) => {
        setAppliedJobs(res.data.map((a) => a.job._id));
      });
    }
  }, [user]);

  const applyToJob = async (jobId) => {
    try {
      setApplyingId(jobId);
      await API.post(`/applications/${jobId}`);
      setAppliedJobs((prev) => [...prev, jobId]);
    } finally {
      setApplyingId(null);
    }
  };

  return (
    <Container>
  <h2 className="text-3xl font-bold mb-8">Available Jobs</h2>

  {loading && (
    <p className="text-gray-500">Loading jobs...</p>
  )}

  {!loading && jobs.length === 0 && (
    <p className="text-gray-500">No jobs available right now.</p>
  )}

  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
    {jobs.map((job) => (
      <div
        key={job._id}
        className="bg-white rounded-xl border p-6 shadow-sm hover:shadow-md transition"
      >
        <h3 className="text-xl font-semibold mb-1">
          {job.title}
        </h3>

        <p className="text-gray-600 font-medium">
          {job.company}
        </p>

        <div className="text-sm text-gray-500 mt-2 space-y-1">
          <p>📍 {job.location}</p>
          <p>💼 {job.type}</p>
          <p>💰 {job.salary}</p>
        </div>

        <p className="text-gray-600 mt-4 text-sm line-clamp-3">
          {job.description}
        </p>

        {user?.role === "jobseeker" && (
          appliedJobs.includes(job._id) ? (
            <button
              disabled
              className="mt-6 w-full bg-gray-300 py-2 rounded-lg text-gray-700"
            >
              Applied
            </button>
          ) : (
            <button
              onClick={() => applyToJob(job._id)}
              disabled={applyingId === job._id}
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {applyingId === job._id ? "Applying..." : "Apply Now"}
            </button>
          )
        )}
      </div>
    ))}
  </div>
</Container>

  );
}

export default Jobs;
