import { format } from 'date-fns';

import { getFilteredDays } from '../utils';
import { IN_HOURS_AND_MINUTES_FORMAT } from '../constants';
import type { MeetingType } from '../types';

/**
 * getSchedule (type: MeetingType, date: Date)
 * @param type DSM или PBR
 * @param date Дата
 * @returns Возвращает строку типа: Расписания: Понедельник, вторник, среда, четверг, пятница в 10:59
 */
export const getSchedule = (type: MeetingType, date: Date) =>
    `Расписание:\n${getFilteredDays(type)} ${format(
        date,
        IN_HOURS_AND_MINUTES_FORMAT
    )}`;
