import VideoPlayer from '@/components/VideoPlayer';

type TrailerProps = {
  src?: string;
  width: number;
  height: number;
};
const Trailer: React.VFC<TrailerProps> = ({ src, width, height }) => {
  if (!src) return null;
  return <VideoPlayer src={src} width={width} height={height} videoProps={{ controls: true }} />;
};

export default Trailer;
