import { defineDocumentType, makeSource } from "contentlayer/source-files";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    date: { type: "date", required: true },
    readingTime: { type: "number", required: true },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (post) => post._raw.flattenedPath.replace("posts/", ""),
    },
  },
}));

export default makeSource({
  contentDirPath: "posts",
  documentTypes: [Post],
});
