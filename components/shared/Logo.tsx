import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import profileImg from '@/public/profile-img.png';
const Logo = () => {
  return (
    <Link href='/' className='flex items-center text-dark'>
      <div className='w-14 rounded-full border border-solid border-dark mr-3'>
        <Image src={profileImg} alt='CodeBucks' className='w-full h-full rounded-full' />
      </div>
      <span className='font-bold text-xl'>CodeBukcs</span>
    </Link>
  );
};

export default Logo;
