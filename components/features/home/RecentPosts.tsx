import { Post } from '@/.contentlayer/generated';
import BlogLayoutTwo from '@/components/shared/PostLayoutTwo';
import { sortPost } from '@/utils';
import Link from 'next/link';
import React from 'react';

const RecentPosts: React.FC<{ posts: Post[] }> = ({ posts }) => {
  const sortedPosts = sortPost(posts);

  return (
    <section className='w-full  mt-16 sm:mt-24  md:mt-32 px-5 sm:px-10 md:px-24 sxl:px-32 flex flex-col items-center justify-center'>
      <div className='w-full flex  justify-between'>
        <h2 className='w-fit inline-block font-bold capitalize text-2xl md:text-4xl text-dark dark:text-light'>
          Recent Posts
        </h2>
        <Link
          href='/categories/all'
          className='inline-block font-medium text-accent dark:text-accentDark underline underline-offset-2      text-base md:text-lg'
        >
          view all
        </Link>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-16 mt-16'>
        {sortedPosts.slice(4, 10).map((post, index) => {
          return (
            <article key={index} className='col-span-1 row-span-1 relative'>
              <BlogLayoutTwo data={post} vertical />
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default RecentPosts;
