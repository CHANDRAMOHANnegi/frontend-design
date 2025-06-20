import { Submission } from "../schema/schema.js";

const submit = async(req, res) => {
  try {
    const { problemId, code, testResults, status, executionTime } = req.body;

    const submission = new Submission({
      userId: req.user.userId,
      problemId,
      code,
      testResults,
      status,
      executionTime,
    });

    await submission.save();

    // Update problem stats
    await Problem.findByIdAndUpdate(problemId, { $inc: { submissions: 1 } });

    // Update user progress
    await Progress.findOneAndUpdate(
      { userId: req.user.userId, problemId },
      {
        $set: {
          status: status === "passed" ? "completed" : "in-progress",
          lastAttempt: new Date(),
          bestSubmission: status === "passed" ? submission._id : undefined,
        },
        $inc: { attempts: 1 },
      },
      { upsert: true }
    );

    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getUserSubmission = async (req, res) => {
  try {
    if (req.params.userId !== req.user.userId) {
      return res.status(403).json({ error: "Access denied" });
    }

    const submissions = await Submission.find({ userId: req.params.userId })
      .populate("problemId", "title difficulty")
      .sort({ submittedAt: -1 })
      .limit(50);

    res.json(submissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


export default {
  getUserSubmission,
  submit
}