import { ZOOM_LINK } from '../constants';

const LINK = 'https://google.com';

/**
 * getWebLink ()
 * @returns Возвращает строку типа: Список тем можно посмотреть тут: https://google.com
 */
export const getWebLink = () => `Список тем можно посмотреть тут: ${LINK}`;
