import { ZOOM_LINK, NEW_LINE } from '../constants';

/**
 * getHeader (title: string, isZoom?: boolean)
 * @param title Заголовок строки
 * @param isZoom Вставлять или не вставлять ссылку на зум
 * @returns Возвращает строку типа: DSM: https://zoom.com
 */
export const getHeader = (title: string, isZoom?: boolean) =>
    isZoom ? `📢 ${title}: ${ZOOM_LINK}${NEW_LINE}` : `📢 ${title}${NEW_LINE}`;
