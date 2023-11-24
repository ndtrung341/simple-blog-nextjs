import React from 'react';
import Link from 'next/link';
import Logo from '../shared/Logo';
import SunIcon from '../icons/SunIcon';
import SocialShare from '../shared/SocialShare';

const Header = () => {
  return (
    <div className='w-full p-4 px-10 flex items-center justify-between'>
      <Logo />
      <nav className='w-max py-3 px-8 border border-solid border-dark rounded-full font-medium capitalize  items-center hidden sm:flex fixed top-6 right-1/2 translate-x-1/2 bg-light/80 backdrop-blur-sm z-50 space-x-4'>
        <Link href={'/'}>Home</Link>
        <Link href={'/about'}>About</Link>
        <Link href={'/contact'}>Contact</Link>
        <button>
          <SunIcon />
        </button>
      </nav>

      <SocialShare />
    </div>
  );
};

export default Header;
