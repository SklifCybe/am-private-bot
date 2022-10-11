import { RecurrenceRule, Range } from 'node-schedule';

import type { Time, DaysRange } from '../types';

type Parameters = {
    time: Time;
    daysRange?: DaysRange;
    days?: number[];
};

/**
 * getRuleMeeting ({ time: Time, daysRange?: DaysRange, days?:number })
 * @param time Объект { hours, minutes }, который конфигурирует время уведомление
 * @param daysRange Объект { start, end }. Где start это цифра начала. end - конец. 0 - Понедельник, 1 - Вторник и тд
 * @param days Массив дней, в которые будут приходить уведомление
 * @returns Возвращается набор правил уведомлений
 */
export const getRuleMeeting = ({ time, daysRange, days }: Parameters) => {
    const { hours, minutes } = time;

    const rule = new RecurrenceRule();

    if (daysRange) {
        const { start, end } = daysRange;

        rule.dayOfWeek = [new Range(start, end)];
    }

    if (days) {
        rule.dayOfWeek = days;
    }

    rule.hour = hours;
    rule.minute = minutes;

    return rule;
};
