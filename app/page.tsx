import { allPosts } from '@/.contentlayer/generated/';
import CoverSection from '@/components/features/home/CoverSection';
import FeaturePosts from '@/components/features/home/FeaturePosts';
import RecentPosts from '@/components/features/home/RecentPosts';

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-center'>
      <CoverSection posts={allPosts} />
      <FeaturePosts posts={allPosts} />
      <RecentPosts posts={allPosts} />
    </main>
  );
}
