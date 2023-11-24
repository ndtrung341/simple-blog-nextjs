import { cx } from '@/utils';
import { slug } from 'github-slugger';
import Link from 'next/link';
import React from 'react';

const Categories: React.FC<{ categories: string[]; currentSlug: string }> = ({
  categories,
  currentSlug
}) => {
  return (
    <div className=' px-0 md:px-10 sxl:px-20 mt-10 border-t-2 text-dark dark:text-light border-b-2 border-solid border-dark dark:border-light py-4 flex items-start flex-wrap font-medium mx-5 md:mx-10'>
      {categories.map((cat) => (
        <Link
          key={cat}
          href={`/categories/${cat}`}
          className={cx(
            'inline-block py-1.5  md:py-2 px-6  md:px-10   rounded-full border-2 border-solid border-dark dark:border-light hover:scale-105 transition-all ease duration-200 m-2',
            currentSlug === slug(cat)
              ? 'bg-dark text-light dark:bg-light dark:text-dark'
              : 'bg-light text-dark dark:bg-dark dark:text-light'
          )}
        >
          #{cat}
        </Link>
      ))}
    </div>
  );
};

export default Categories;
