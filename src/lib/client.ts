import Prismic from '@prismicio/client';
import { ApiOptions } from '@prismicio/client/types/Api';

const apiEndpoint = 'https://curtacircuito.cdn.prismic.io/api/v2';
const accessToken = undefined;

export const prismicRepoName = apiEndpoint.match(/https?:\/\/([^.]+)?\.(cdn\.)?.+/)?.[1];

type PrismicClient = (req?: ApiOptions['req']) => ReturnType<typeof Prismic.client>;

export const Client: PrismicClient = (req) => Prismic.client(apiEndpoint, { req, accessToken });
