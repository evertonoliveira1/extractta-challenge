export interface Review {
  author: string;
  text: string;
  date: string;
}

export interface Comment {
  author: string;
  text: string;
  date: string;
}

export interface Media {
  id: number;
  title: string;
  imageUrl: string;
  rating?: number;
  synopsis?: string;
  tags?: string[];
  type: 'vehicle' | 'series' | 'live';
  reviews?: { author: string; text: string; date: string }[];
  comments?: { author: string; text: string; date: string }[];
  isFavorite?: boolean;
  isInPlaylist?: boolean;
  videoUrl?: string;
}
