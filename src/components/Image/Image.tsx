import { default as NextImage, ImageProps } from 'next/image';

type Props = ImageProps;

const Image: React.VFC<Props> = (props) => {
  return <NextImage {...props} />;
};

export default Image;
