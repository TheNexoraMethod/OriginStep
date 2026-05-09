'use client'

interface VideoPlayerProps {
  url: string
  title: string
}

function getEmbedUrl(url: string): { type: 'youtube' | 'vimeo' | 'direct'; src: string } {
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  if (ytMatch) {
    return { type: 'youtube', src: `https://www.youtube.com/embed/${ytMatch[1]}?rel=0` }
  }

  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) {
    return { type: 'vimeo', src: `https://player.vimeo.com/video/${vimeoMatch[1]}` }
  }

  return { type: 'direct', src: url }
}

export function VideoPlayer({ url, title }: VideoPlayerProps) {
  const { type, src } = getEmbedUrl(url)

  return (
    <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black">
      {type === 'direct' ? (
        <video
          src={src}
          title={title}
          controls
          className="w-full h-full"
          playsInline
        />
      ) : (
        <iframe
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          className="w-full h-full border-0"
        />
      )}
    </div>
  )
}
