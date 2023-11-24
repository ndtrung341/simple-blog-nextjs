import { Post } from '@/.contentlayer/generated';
import PostLayout from '@/components/shared/PostLayoutOne';
import Tag from '@/components/shared/Tag';
import { sortPost } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const CoverSection: React.FC<{ posts: Post[] }> = ({ posts }) => {
  const post = sortPost(posts)[0];

  return (
    <div className='w-full inline-block'>
      <article className='flex flex-col items-start justify-end mx-5 sm:mx-10 relative h-[60vh] sm:h-[85vh]'>
        <div className='absolute inset-0 bg-gradient-to-b from-transparent from-0% to-dark/90 rounded-3xl z-0'></div>
        <Image
          src={post.image?.filePath.replace('../public', '') as string}
          alt={post.title}
          fill
          placeholder='blur'
          blurDataURL={post.image?.blurhashDataUrl}
          className='w-full h-full object-center object-cover rounded-3xl -z-10'
        />
        <div className='w-full lg:w-3/4 p-6 sm:p-8 md:p-12  lg:p-16 flex flex-col items-start justify-center z-0 text-light'>
          <Tag title={post.tags![0]} link={`/categories/${post.tags![0]}`} />
          <Link className='mt-6' href={`/blogs/${post.title}`}>
            <h1 className='font-bold capitalize text-lg sm:text-xl md:text-3xl lg:text-4xl'>
              <span className='bg-gradient-to-r from-accent to-accent dark:from-accentDark/50  dark:to-accentDark/50 bg-[length:0px_6px] hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 '>
                {post.title}
              </span>
            </h1>
          </Link>
          <p className='hidden  sm:inline-block mt-4 md:text-lg lg:text-xl font-in'>
            {post.description}
          </p>
        </div>
      </article>
    </div>
  );
};

export default CoverSection;
