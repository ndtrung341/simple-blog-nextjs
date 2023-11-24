'use client';
import React from 'react';
import { useMDXComponent } from 'next-contentlayer/hooks';
import Image from 'next/image';

const components = {
  Image
};

const MdxComponent: React.FC<{ code?: string }> = ({ code = '' }) => {
  const MDXContent = useMDXComponent(code);
  return <MDXContent components={components}></MDXContent>;
};

export default MdxComponent;
