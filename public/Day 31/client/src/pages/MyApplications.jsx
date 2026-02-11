import React, { useEffect, useState } from "react";
import API from "../services/api";
import Container from "../components/Container";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/applications/me")
      .then((res) => setApplications(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container>
      <h2 className="text-3xl font-bold mb-8">My Applications</h2>

      {loading && (
        <p className="text-gray-500">Loading your applications...</p>
      )}

      {!loading && applications.length === 0 && (
        <p className="text-gray-500">
          You haven’t applied to any jobs yet.
        </p>
      )}

      <div className="space-y-6">
        {applications.map((app) => (
          <div
            key={app._id}
            className="bg-white border rounded-xl p-6 shadow-sm"
          >
            {/* Job Info */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">
                  {app.job.title}
                </h3>
                <p className="text-gray-600">
                  {app.job.company}
                </p>
                <p className="text-sm text-gray-500">
                  📍 {app.job.location} • 💼 {app.job.type}
                </p>
              </div>

              {/* Status Badge */}
              <span
                className={`px-4 py-1 rounded-full text-sm font-medium ${
                  app.status === "accepted"
                    ? "bg-green-100 text-green-700"
                    : app.status === "rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {app.status}
              </span>
            </div>

            {/* Extra Info */}
            <div className="text-sm text-gray-600">
              <p>
                💰 <span className="font-medium">Salary:</span>{" "}
                {app.job.salary}
              </p>
              <p className="mt-1">
                🗓️ <span className="font-medium">Applied on:</span>{" "}
                {new Date(app.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default MyApplications;
