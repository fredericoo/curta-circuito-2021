import VinylImg from '../../../public/img/vinyl.png';
import { AspectRatio } from '@chakra-ui/layout';
import Image from 'next/image';

const Vinyl: React.VFC = () => (
  <AspectRatio ratio={1} borderRadius="50%" position="relative" w="100%">
    <Image src={VinylImg} placeholder="blur" alt="Disco de Vinil" layout="fill" />
  </AspectRatio>
);

export default Vinyl;
