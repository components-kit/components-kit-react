import { CONSTANT } from '../constant';
import { ContentTypeEnum } from '../enums/contentType';

export const fetcher = async (url: string, publicToken: string) => {
  try {
    const { domain } = CONSTANT;

    const response = await fetch(`${domain}${url}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${publicToken}`,
        ContentType: ContentTypeEnum.APPLICATION_JSON,
      },
    });

    const data = await response.json();

    return data;
  } catch (error: any) {
    return;
  }
};
