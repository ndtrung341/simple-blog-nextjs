import { allPosts } from '@/.contentlayer/generated';
import Categories from '@/components/features/category/Categories';
import BlogLayoutTwo from '@/components/shared/PostLayoutTwo';
import GithubSlugger, { slug } from 'github-slugger';
import { NextPage } from 'next';
import React from 'react';

const slugger = new GithubSlugger();

export async function generateStaticParams() {
  const categories: string[] = [];
  const paths = [{ slug: 'all' }];

  allPosts.map((p) => {
    p.tags?.map((t) => {
      const slugify = slugger.slug(t);
      if (!categories.includes(slugify)) {
        categories.push(slugify);
        paths.push({ slug: slugify });
      }
    });
  });

  console.log(paths);
  return paths;
}

interface CategoryPageProps {
  params: { slug: string };
}

const CategoryPage: NextPage<CategoryPageProps> = ({ params }) => {
  const allCategories = ['all'];
  const posts = allPosts.filter((post) => {
    return post.tags!.some((tag) => {
      const slugified = slug(tag);
      if (!allCategories.includes(slugified)) {
        allCategories.push(slugified);
      }
      if (params.slug === 'all') {
        return true;
      }
      return slugified === params.slug;
    });
  });

  return (
    <article className='mt-12 flex flex-col text-dark dark:text-light'>
      <div className=' px-5 sm:px-10  md:px-24  sxl:px-32 flex flex-col'>
        <h1 className='mt-6 font-semibold text-2xl md:text-4xl lg:text-5xl'>#{params.slug}</h1>
        <span className='mt-2 inline-block'>
          Discover more categories and expand your knowledge!
        </span>
      </div>
      <Categories categories={allCategories} currentSlug={params.slug} />

      <div className='grid  grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 grid-rows-2 gap-16 mt-5 sm:mt-10 md:mt-24 sxl:mt-32 px-5 sm:px-10 md:px-24 sxl:px-32'>
        {posts.map((post, index) => (
          <article key={index} className='col-span-1 row-span-1 relative'>
            <BlogLayoutTwo vertical data={post} />
          </article>
        ))}
      </div>
    </article>
  );
};

export default CategoryPage;
