import React from 'react';
import { DribbleIcon, GithubIcon, LinkedinIcon, TwitterIcon } from '../icons/SocialIcon';
import { cx } from '@/utils';

const SocialShare = ({ type = 'light' }: { type?: 'light' | 'dark' }) => {
  return (
    <div className='flex items-center space-x-4'>
      <a href='#' className='inline-block w-6 h-6'>
        <LinkedinIcon className='hover:scale-125 transitiona-all ease-in duration-100' />
      </a>
      <a href='#' className='inline-block w-6 h-6'>
        <GithubIcon
          className={cx(
            type === 'dark' ? 'fill-light' : 'fill-dark',
            'hover:scale-125 transitiona-all ease-in duration-100'
          )}
        />
      </a>
      <a href='#' className='inline-block w-6 h-6'>
        <TwitterIcon className='hover:scale-125 transitiona-all ease-in duration-100' />
      </a>
      <a href='#' className='inline-block w-6 h-6'>
        <DribbleIcon className='hover:scale-125 transitiona-all ease-in duration-100' />
      </a>
    </div>
  );
};

export default SocialShare;
