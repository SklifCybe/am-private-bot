import { DAYS } from '../constants';
import type { MeetingType } from '../types';

/**
 * getFilteredDays (type: MeetingType)
 * @param type DSM или PBR
 * @returns Возвращает строку типа Понедельник, вторник, среда, четверг, пятница
 */
export const getFilteredDays = (type: MeetingType) => {
    let filteredDays: string[];

    if (type === 'DSM') {
        filteredDays = DAYS.map((day, index) => {
            if (index < 5) {
                return day;
            }
        })
    }

    if (type === 'PBR') {
        filteredDays = DAYS.map((day, index) => {
            if (index === 1 || index === 3) {
                return day;
            }
        })
    }

    return filteredDays.filter(Boolean).join(', ');
};