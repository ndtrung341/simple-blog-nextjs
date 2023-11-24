import { Post } from '@/.contentlayer/generated';
import { compareDesc, parseISO } from 'date-fns'
export const cx = (...classNames: string[]): string => classNames.filter(Boolean).join(' ');


export const sortPost = <T extends { publishedAt: string }>(blogs: T[]): T[] => {
   return blogs.slice().sort((a, b) => compareDesc(parseISO(a.publishedAt), parseISO(b.publishedAt)))
}