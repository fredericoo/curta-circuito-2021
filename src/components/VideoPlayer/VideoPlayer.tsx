import { Box } from '@chakra-ui/layout';
import { forwardRef, VideoHTMLAttributes } from 'react';

const sx = {
  '&>*': {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    objectFit: 'cover',
  },
};

type HTMLVideoPlayerProps = {
  src?: never;
  html: string;
  height: number;
  width: number;
  videoProps?: never;
};
type SrcVideoPlayerProps = {
  html?: never;
  src: string;
  videoProps?: VideoHTMLAttributes<HTMLVideoElement>;
  height: number;
  width: number;
};

type VideoPlayerProps = HTMLVideoPlayerProps | SrcVideoPlayerProps;

const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(({ html, src, videoProps, height, width }, ref) => {
  if (html) {
    return (
      <Box
        height="0"
        pb={`calc(100% / ${width / height})`}
        position="relative"
        sx={sx}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }
  if (src) {
    const [, videoExtension] = src.match(/\.([^.]+)$/) || [, 'mp4'];

    return (
      <Box height="0" pb={`calc(100% / ${width / height})`} position="relative" sx={sx}>
        <video ref={ref} {...videoProps}>
          <source src={src} type={`video/${videoExtension}`} />
        </video>
      </Box>
    );
  }
  return null;
});

export default VideoPlayer;
