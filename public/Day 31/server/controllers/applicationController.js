import Application from "../models/Application.js";
import Job from "../models/Job.js";

// Jobseeker applies to a job
export const applyToJob = async (req, res) => {
  const { jobId } = req.params;

  const job = await Job.findById(jobId);
  if (!job) return res.status(404).json({ message: "Job not found" });

  const alreadyApplied = await Application.findOne({
    job: jobId,
    applicant: req.user._id,
  });
  if (alreadyApplied)
    return res.status(400).json({ message: "Already applied" });

  const application = await Application.create({
    job: jobId,
    applicant: req.user._id,
  });

  res.status(201).json(application);
};

// Employer views applicants for a job
export const getApplicantsForJob = async (req, res) => {
  const { jobId } = req.params;

  const applications = await Application.find({ job: jobId })
    .populate("applicant", "name email")
    .populate("job", "title company");

  res.json(applications);
};

// Jobseeker views own applications
export const getMyApplications = async (req, res) => {
  const applications = await Application.find({
    applicant: req.user._id,
  }).populate("job", "title company location");

  res.json(applications);
};

export const updateApplicationStatus = async (req, res) => {
  const { status } = req.body;
  const { applicationId } = req.params;

  const allowedStatuses = ["pending", "accepted", "rejected"];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const application = await Application.findById(applicationId);

  if (!application) {
    return res.status(404).json({ message: "Application not found" });
  }

  application.status = status;
  await application.save();

  res.json(application);
};
