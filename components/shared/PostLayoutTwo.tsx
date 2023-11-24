import { Post } from '@/.contentlayer/generated';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Tag from './Tag';
import { slug } from 'github-slugger';
import { cx } from '@/utils';

interface PostLayoutTwoProps {
  data: Post;
  vertical?: boolean;
}

const BlogLayoutTwo: React.FC<PostLayoutTwoProps> = ({ data, vertical = false }) => {
  return (
    <div className='group grid grid-cols-12 gap-4 items-center text-dark dark:text-light'>
      <Link
        href={data.url}
        className={cx(
          'col-span-12 h-full rounded-xl overflow-hidden',
          vertical ? '' : 'lg:col-span-4'
        )}
      >
        <Image
          src={data.image!.filePath.replace('../public', '')}
          placeholder='blur'
          blurDataURL={data.image!.blurhashDataUrl}
          alt={data.title}
          width={data.image!.width}
          height={data.image!.height}
          className={cx(
            'w-full h-full object-cover object-center group-hover:scale-105 transition-all ease duration-300',
            vertical ? 'aspect-[4/3]' : 'aspect-square'
          )}
          sizes='(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw'
        />
      </Link>

      <div className={cx('col-span-12 w-full', vertical ? '' : 'lg:col-span-8')}>
        <Tag
          link={`/categories/${slug(data.tags![0])}`}
          title={data.tags![0]}
          className='!p-0 !bg-transparent !border-0 inline-block w-full !uppercase text-accent dark:text-accentDark font-semibold text-xs sm:text-sm'
        />
        <Link href={data.url} className='inline-block my-1'>
          <h2 className='font-semibold capitalize text-base sm:text-lg'>
            <span className='bg-gradient-to-r from-accent/50 dark:from-accentDark/50 to-accent/50 dark:to-accentDark/50 bg-[length:0px_6px] group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 '>
              {data.title}
            </span>
          </h2>
        </Link>

        <span className='inline-block w-full capitalize text-gray dark:text-light/50 font-semibold text-xs sm:text-base'>
          {format(new Date(data.publishedAt), 'MMMM dd, yyyy')}
        </span>
      </div>
    </div>
  );
};

export default BlogLayoutTwo;
