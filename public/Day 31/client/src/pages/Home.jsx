import React from "react";
import Container from "../components/Container";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Container>
      <div className="py-16 text-center">
        <h1 className="text-5xl font-extrabold text-blue-600 mb-6">
          Find Your Next Job 🚀
        </h1>

        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Browse jobs, apply instantly, and track your applications — all in one place.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/jobs"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Browse Jobs
          </Link>

          <Link
            to="/register"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50"
          >
            Get Started
          </Link>
        </div>
      </div>
    </Container>
  );
}

export default Home;
