const listHelper = require("../utils/list_helper");

const listWithZeroBlogs = [];
const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
];
const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

test("dummy return one", () => {
  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test("when blogs count is 0 , is 0", () => {
    const result = listHelper.totalLikes(listWithZeroBlogs);
    expect(result).toBe(0);
  });
  test("when list size is one, equal to likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });
  test("when list size is greter than 1 is calculated corectly", () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(36);
  });
});

describe("faverite blog", () => {
  test("when blog size is zero is {}", () => {
    expect(listHelper.favoriteBlog(listWithZeroBlogs)).toStrictEqual({});
  });
  test("when blogs size is one, is that blog", () => {
    expect(listHelper.favoriteBlog(listWithOneBlog)).toBe(listWithOneBlog[0]);
  });
  test("when blogs size is big then giv correct blog", () => {
    expect(listHelper.favoriteBlog(listWithOneBlog)).toBe(listWithOneBlog[0]);
  });
});

describe("most blogs", () => {
  test("when blog size is zero", () => {
    expect(listHelper.mostBlogs(listWithZeroBlogs)).toStrictEqual({});
  });
  test("when blog size is one", () => {
    expect(listHelper.mostBlogs(listWithOneBlog)).toStrictEqual({
      author: listWithOneBlog[0].author,
      blogs: 1,
    });
  });
  test("when blog size is greter than one", () => {
    expect(listHelper.mostBlogs(blogs)).toStrictEqual({
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});

describe("most likes", () => {
  test("when blog size is zero", () => {
    expect(listHelper.mostLikes(listWithZeroBlogs)).toStrictEqual({});
  });
  test("when blog size is one", () => {
    expect(listHelper.mostLikes(listWithOneBlog)).toStrictEqual({
      author: listWithOneBlog[0].author,
      likes: listWithOneBlog[0].likes,
    });
  });
  test("when blog size is greter than one", () => {
    expect(listHelper.mostLikes(blogs)).toStrictEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});
