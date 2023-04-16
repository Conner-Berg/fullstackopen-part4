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
		expect(result).toBe(null);
	});

	test("when list has only one blog equals that blog's author", () => {
		const result = listHelper.mostBlogs([blogs[0]]);
		expect(result).toEqual({
			author: "Michael Chan",
			blogs: 1,
		});
	});

	test("of a bigger list is calculated right", () => {
		const result = listHelper.mostBlogs(blogs);
		expect(result).toEqual({
			author: "Robert C. Martin",
			blogs: 3,
		});
	});
});
