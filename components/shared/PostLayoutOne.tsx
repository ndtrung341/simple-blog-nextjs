import { Post } from '@/.contentlayer/generated';
import Image from 'next/image';
import React from 'react';
import Tag from './Tag';
import Link from 'next/link';
import { slug } from 'github-slugger';

interface PostLayoutOneProps {
  data: Post;
}

const PostLayoutOne: React.FC<PostLayoutOneProps> = ({ data }) => {
  return (
    <div className='group inline-block overflow-hidden rounded-xl'>
      <div className='absolute inset-0 bg-gradient-to-b from-transparent from-0% to-dark/90 rounded-xl z-10' />
      <Image
        src={data.image!.filePath.replace('../public', '')}
        placeholder='blur'
        blurDataURL={data.image!.blurhashDataUrl}
        alt={data.title}
        width={data.image!.width}
        height={data.image!.height}
        className='w-full h-full object-center object-cover rounded-xl group-hover:scale-105 transition-all ease duration-300'
        sizes='(max-width: 1180px) 100vw, 50vw'
      />

      <div className='w-full absolute bottom-0 p-4 xs:p-6 sm:p-10 z-20'>
        <Tag
          link={`/categories/${slug(data.tags![0])}`}
          title={data.tags![0]}
          className='px-6 text-xs sm:text-sm py-1 sm:py-2 !border'
        />
        <Link href={data.url} className='mt-6'>
          <h2 className='font-bold capitalize text-sm xs:text-base sm:text-xl md:text-2xl text-light mt-2 sm:mt-4'>
            <span className='bg-gradient-to-r from-accent to-accent bg-[length:0px_6px] dark:from-accentDark/50 dark:to-accentDark/50 group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 '>
              {data.title}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default PostLayoutOne;
