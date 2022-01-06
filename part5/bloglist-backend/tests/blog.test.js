const app = require("../app");
const supertest = require("supertest");
const Blog = require("../models/blog");
const helper = require("./test_helper");
const mongoose = require("mongoose");
const api = supertest(app);

jest.setTimeout(30000);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Promise.all(
    helper.initialBlogs.map((blog) => {
      const newBlog = new Blog(blog);
      return newBlog.save();
    })
  );
});

afterAll(async () => {
  await mongoose.connection.close();
});

test("should get blog post in JSON fromat", async () => {
  const blogsResponse = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  expect(blogsResponse.body.length).toBe(helper.initialBlogs.length);
});

test("blog unique identifier key shoudl be id not _id", async () => {
  const blogsResponse = await api.get("/api/blogs");
  expect(blogsResponse.body[0].id).toBeDefined();
  expect(blogsResponse.body[0]._id).toBe(undefined);
});

test("should post blog correctly", async () => {
  const blog = {
    title: "Jest",
    author: "vinayak k",
    url: "https://jestjs.io/",
    likes: 12,
  };
  const response = await api
    .post("/api/blogs")
    .send(blog)
    .expect("Content-Type", /json/)
    .expect(200);

  const { body: blogsInDB } = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  expect(blogsInDB.length).toBe(helper.initialBlogs.length + 1);
});

test("if likes property missing then default value should be 0", async () => {
  const blog = {
    title: "Jest",
    author: "vinayak k",
    url: "https://jestjs.io/",
  };

  const response = await api
    .post("/api/blogs")
    .send(blog)
    .expect("Content-Type", /json/)
    .expect(200);

  expect(response.body.likes).toBe(0);
});

test("verify if title and url of blog missing then backend responds with 400 Bad Request", async () => {
  const blog = {
    author: "vinayak k",
  };
  await api.post("/api/blogs").send(blog).expect(400);
});
