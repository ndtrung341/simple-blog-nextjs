import { makeSource, defineDocumentType } from "@contentlayer/source-files";
import readingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import GithubSlugger from "github-slugger"


const Post = defineDocumentType(() => ({
   name: 'Post',
   filePathPattern: '**/*.mdx',
   contentType: 'mdx',
   fields: {
      title: {
         type: 'string',
         required: true
      },
      publishedAt: {
         type: 'date',
         required: true
      },
      updatedAt: {
         type: 'date',
         required: true
      },
      description: {
         type: 'string',
         required: true
      },
      image: {
         type: 'image',
      },
      author: {
         type: 'string',
         required: true,
      },
      isPublished: {
         type: 'boolean',
         default: true
      },
      tags: {
         type: 'list',
         of: { type: 'string' }
      }
   },
   computedFields: {
      url: {
         type: 'string',
         resolve: (doc) => `/post/${doc._raw.flattenedPath}`,
      },
      readingTime: {
         type: 'json',
         resolve: (doc) => readingTime(doc.body.raw)
      },
      toc: {
         type: 'json',
         resolve: (doc) => {
            const regex = /\n(?<flag>#{1,6})\s+(?<content>.+)/g
            const slugger = new GithubSlugger();
            const headings = Array.from(doc.body.raw.matchAll(regex)).map(({ groups }) => {
               const content = groups?.content;
               const flag = groups?.flag;
               return {
                  level: flag?.length == 1 ? "one" : flag?.length == 2 ? "two" : "three",
                  text: content,
                  slug: content ? slugger.slug(content) : undefined
               }
            })
            return headings;
         }
      }
   },
}))

const codeOptions = {
   theme: 'github-dark',
   grid: false,
}

export default makeSource({
   /* options */
   contentDirPath: 'blog',
   documentTypes: [Post],
   mdx: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "append" }], [rehypePrettyCode, codeOptions]] }
})