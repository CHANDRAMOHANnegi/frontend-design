import { Problem } from "../schema/schema.js";

 const getProblems = async (req, res) => {
  try {
    const { difficulty, category, search } = req.query;
    let query = {};

    if (difficulty && difficulty !== "all") {
      query.difficulty = difficulty;
    }
    if (category) {
      query.category = category;
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    const problems = await Problem.find(query)
      .populate("author", "name")
      .sort({ createdAt: -1 });

    res.json(problems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

 const getProblem = async (req, res) => {
  console.log(req.params);
  
  try {
    const problem = await Problem.findById(req.params.id).populate(
      "author",
      "name"
    );
    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }
    res.json(problem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

 const addProblem = async (req, res) => {
  try {
    const problem = new Problem({
      ...req.body,
      author: req.user.userId,
    });
    await problem.save();
    res.status(201).json(problem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export default {
  addProblem,
  getProblem,
  getProblems,
}