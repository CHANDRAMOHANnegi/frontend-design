import { BlogPost, BlogTopic } from "../schema/schema.js";

const blogTopics = async (req, res) => {
  try {
    const topics = await BlogTopic.find().sort({ name: 1 });
    res.json(topics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBlogPosts = async (req, res) => {
  try {
    const { topicId, search } = req.query;
    let query = { published: true };

    if (topicId) {
      query.topicId = topicId;
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    const posts = await BlogPost.find(query)
      .populate("author", "name")
      .populate("topicId", "name color")
      .sort({ publishedAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id)
      .populate("author", "name")
      .populate("topicId", "name color");

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Increment views
    post.views += 1;
    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addBlogPost = async (req, res) => {
  try {
    const post = new BlogPost({
      ...req.body,
      author: req.user.userId,
      publishedAt: req.body.published ? new Date() : undefined,
    });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  addBlogPost,
  addBlogPost,
  blogTopics,
  getBlogPost,
  getBlogPosts,
};
