import { Image } from './image.interface';

export interface AboutContent extends Image {
  title: string;
  subtitle: string;
  content: string;
}