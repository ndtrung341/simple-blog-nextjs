import { Post } from '@/.contentlayer/generated';
import { format, parseISO } from 'date-fns';
import { slug } from 'github-slugger';
import Link from 'next/link';
import React from 'react';

interface PostDetailsProp {
  post: Post;
}

const PostDetails: React.FC<PostDetailsProp> = ({ post }) => {
  return (
    <div className='px-2  md:px-10 bg-accent dark:bg-accentDark text-light dark:text-dark py-2 flex items-center justify-around flex-wrap text-lg sm:text-xl font-medium mx-5  md:mx-10 rounded-lg'>
      <time className='m-3'>{format(parseISO(post.publishedAt), 'LLLL d, yyyy')}</time>
      <span className='m-3'>
        10 views
        {/* <ViewCounter slug={blogSlug} /> */}
      </span>
      <div className='m-3'>{post.readingTime.text}</div>
      <Link href={`/categories/${slug(post.tags![0])}`} className='m-3'>
        #{post.tags![0]}
      </Link>
    </div>
  );
};

export default PostDetails;
