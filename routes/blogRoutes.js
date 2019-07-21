const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const Blog = mongoose.model("Blog");

module.exports = app => {
  app.get("/api/blogs/:id", requireLogin, async (req, res) => {
    const blog = await Blog.findOne({
      _user: req.user.id,
      _id: req.params.id
    });

    res.send(blog);
  });

  app.get("/api/blogs", requireLogin, async (req, res) => {
    // Check if redis has cahced data
    // const cahcedBlogs = await client.get(req.user.id);

    // if (cahcedBlogs) {
    //   console.log("serving from cahce");
    //   res.send(JSON.parse(cahcedBlogs));
    //   return;
    // }

    const blogs = await Blog.find({ _user: req.user.id });

    // console.log("serving from DB");
    // client.set(req.user.id, JSON.stringify(blogs));

    res.send(blogs);
  });

  app.post("/api/blogs", requireLogin, async (req, res) => {
    const { title, content } = req.body;

    const blog = new Blog({
      title,
      content,
      _user: req.user.id
    });

    try {
      await blog.save();
      res.send(blog);
    } catch (err) {
      res.send(400, err);
    }
  });
};
