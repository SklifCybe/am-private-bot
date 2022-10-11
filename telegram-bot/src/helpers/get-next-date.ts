import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import { NEXT_DATE_SENDING_FORMAT } from '../constants';

/**
 * getNextDate (date: Date)
 * @param date Дата
 * @returns Возвращает строку типа: Следующее время отправки: 10 октября (Пн) в 10:59
 */
export const getNextDate = (date: Date) =>
    `Следующее время отправки:\n${format(date, NEXT_DATE_SENDING_FORMAT, {
        locale: ru,
    })}`;
