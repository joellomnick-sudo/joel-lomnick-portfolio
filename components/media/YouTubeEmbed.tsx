type Props = { videoId: string; title: string; caption?: string };

export function YouTubeEmbed({ videoId, title, caption }: Props) {
  if (!videoId) return null;
  return <figure><div className="aspect-video overflow-hidden rounded-md"><iframe className="h-full w-full" src={`https://www.youtube-nocookie.com/embed/${videoId}`} title={title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div>{caption ? <figcaption className="image-caption">{caption}</figcaption> : null}</figure>;
}
