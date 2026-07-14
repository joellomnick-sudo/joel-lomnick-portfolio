export type ShortMedia = {
  id: string;
  title: string;
  poster: string;
  mp4?: string;
  webm?: string;
  fallbackAlt: string;
};

// Future approved clips can be added here. Empty data renders no media container.
export const shortMedia: ShortMedia[] = [];

export const youtubeMedia: Array<{ id: string; title: string; videoId: string }> = [];
