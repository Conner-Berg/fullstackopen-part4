const _ = require("lodash");
const listHelper = require("../utils/list_helper");
const blogs = require("../utils/list_helper").sampleBlogs;

test("dummy returns one", () => {
	const result = listHelper.dummy(blogs);
	expect(result).toBe(1);
});

describe("total likes", () => {
	test("of empty list is zero", () => {
		const result = listHelper.totalLikes([]);
		expect(result).toBe(0);
	});

	test("when list has only one blog equals the likes of that", () => {
		const result = listHelper.totalLikes([blogs[0]]);
		expect(result).toBe(7);
	});

	test("of a bigger list is calculated right", () => {
		const result = listHelper.totalLikes(blogs);
		expect(result).toBe(36);
	});
});

describe("favorite blog", () => {
	test("of empty list is null", () => {
		const result = listHelper.favoriteBlog([]);
		expect(result).toBe(null);
	});

	test("when list has only one blog equals that blog", () => {
		const result = listHelper.favoriteBlog([blogs[0]]);
		expect(result).toEqual(blogs[0]);
	});

	test("of a bigger list is calculated right", () => {
		const result = listHelper.favoriteBlog(blogs);
		expect(result).toEqual(blogs[2]);
	});
});

describe("most blogs", () => {
	test("of empty list is null", () => {
		const result = listHelper.mostBlogs([]);
		console.log(result);
		expect(result).toBe(null);
	});

	test("when list has only one blog equals that blog's author", () => {
		const result = listHelper.mostBlogs([blogs[0]]);
		console.log(result);

		const authorBlogCounts = _.countBy([blogs[0]], "author");
		const authorWithMost = _.maxBy(
			Object.keys(authorBlogCounts),
			(author) => authorBlogCounts[author]
		);
		const numOfBlogs = authorBlogCounts[authorWithMost];

		expect(result).toEqual({
			author: authorWithMost,
			blogs: numOfBlogs,
		});
	});

	test("of a bigger list is calculated right", () => {
		const result = listHelper.mostBlogs(blogs);
		console.log(result);

		const authorBlogCounts = _.countBy(blogs, "author");
		const authorWithMost = _.maxBy(
			Object.keys(authorBlogCounts),
			(author) => authorBlogCounts[author]
		);
		const numOfBlogs = authorBlogCounts[authorWithMost];

		expect(result).toEqual({
			author: authorWithMost,
			blogs: numOfBlogs,
		});
	});
});

describe("most likes", () => {
	test("of empty list is null", () => {
		const result = listHelper.mostLikes([]);
		console.log(result);
		expect(result).toBe(null);
	});

	test("when list has only one blog equals that blog's author", () => {
		const result = listHelper.mostLikes([blogs[0]]);
		console.log(result);

		const authorWithMostLikes = _.first([blogs[0]]).author;
		const totalLikes = _.sumBy([blogs[0]], "likes");

		expect(result).toEqual({
			author: authorWithMostLikes,
			likes: totalLikes,
		});
	});

	test("of a bigger list is calculated right", () => {
		const result = listHelper.mostLikes(blogs);
		console.log(result);

		const authorTotalLikes = _(blogs)
			.groupBy("author")
			.map((authorBlogs, author) => ({
				author,
				likes: _.sumBy(authorBlogs, "likes"),
			}))
			.value();

		const authorWithMostLikes = _.maxBy(authorTotalLikes, "likes");

		expect(result).toEqual(authorWithMostLikes);
	});
});
