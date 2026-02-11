import Job from "../models/Job.js";

export const createJob = async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      createdBy: req.user._id,
    });
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: "Failed to create job" });
  }
};

export const getJobs = async (req, res) => {
  const jobs = await Job.find().populate("createdBy", "name email");
  res.json(jobs);
};
