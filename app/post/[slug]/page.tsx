import { allPosts } from '@/.contentlayer/generated';
import PostDetails from '@/components/features/post/PostDetails';
import MdxComponent from '@/components/shared/MdxComponent';
import Tag from '@/components/shared/Tag';
import { siteMetadata } from '@/utils/metadata';
import { slug } from 'github-slugger';
import { Metadata, NextPage } from 'next';
import Image from 'next/image';
import React from 'react';

export async function generateStaticParams() {
  const paths = allPosts.map((post) => ({ slug: post._raw.flattenedPath }));
  return paths;
}

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const post = allPosts.find((p) => p._raw.flattenedPath === params.slug);
  if (!post) return {};

  const publishedAt = new Date(post.publishedAt).toISOString();
  const modifiedAt = new Date(post.updatedAt || post.publishedAt).toISOString();
  const authors = post.author ?? siteMetadata.author;
  let imageList = [siteMetadata.socialBanner];
  if (post.image) imageList = [siteMetadata.siteUrl + post.image.filePath.replace('../public', '')];

  const ogImages = imageList.map((img) => {
    return { url: img.includes('http') ? img : siteMetadata.siteUrl + img };
  });

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: siteMetadata.siteUrl + post.url,
      locale: 'en-US',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      authors: authors,
      images: ogImages
    }
  };
}

const PostPage: NextPage<Pick<Props, 'params'>> = ({ params }) => {
  const post = allPosts.find((p) => p._raw.flattenedPath === params.slug);
  if (!post) return;
  return (
    <article>
      <div className='mb-8 text-center relative w-full h-[70vh] bg-dark'>
        <div className='w-full z-10 flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <Tag
            title={post.tags![0]}
            link={`/categories/${slug(post.tags![0])}`}
            className='px-6 text-sm py-2'
          />
          <h1 className='inline-block mt-6 font-semibold capitalize text-light text-2xl md:text-3xl lg:text-5xl !leading-normal relative w-5/6'>
            {post.title}
          </h1>
        </div>
        <div className='absolute top-0 left-0 right-0 bottom-0 h-full bg-dark/60 dark:bg-dark/40' />
        <Image
          src={post.image!.filePath.replace('../public', '')}
          placeholder='blur'
          blurDataURL={post.image!.blurhashDataUrl}
          alt={post.title}
          width={post.image!.width}
          height={post.image!.height}
          className='aspect-square w-full h-full object-cover object-center'
          priority
          sizes='100vw'
        />
      </div>
      <PostDetails post={post} />

      <div className='grid grid-cols-12 gap-y-8 lg:gap-8 sxl:gap-16 mt-8 px-5 md:px-10'>
        <div className='col-span-12  lg:col-span-4'>
          <details
            className='border-[1px] border-solid border-dark dark:border-light text-dark dark:text-light rounded-lg p-4 sticky top-6 max-h-[80vh] overflow-hidden overflow-y-auto'
            open
          >
            <summary className='text-lg font-semibold capitalize cursor-pointer'>
              Table Of Content
            </summary>
            <ul className='mt-4 font-in text-base'>
              {post.toc.map((heading: any) => {
                return (
                  <li key={`#${heading.slug}`} className='py-1'>
                    <a
                      href={`#${heading.slug}`}
                      data-level={heading.level}
                      className='data-[level=two]:pl-0  data-[level=two]:pt-2
                                       data-[level=two]:border-t border-solid border-dark/40
                                       data-[level=three]:pl-4
                                       sm:data-[level=three]:pl-6
                                       flex items-center justify-start
                                       '
                    >
                      {heading.level === 'three' ? (
                        <span className='flex w-1 h-1 rounded-full bg-dark mr-2'>&nbsp;</span>
                      ) : null}

                      <span className='hover:underline'>{heading.text}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </details>
        </div>
        <div
          className='col-span-12  lg:col-span-8 font-in prose sm:prose-base md:prose-lg max-w-max
            prose-blockquote:bg-accent/20 
            prose-blockquote:p-2
            prose-blockquote:px-6
            prose-blockquote:border-accent
            prose-blockquote:not-italic
            prose-blockquote:rounded-r-lg
            prose-li:marker:text-accent'
        >
          <MdxComponent code={post.body.code} />
        </div>
      </div>
    </article>
  );
};

export default PostPage;
