import { Telegraf, Markup } from 'telegraf';
import { scheduleJob } from 'node-schedule';

import { getSchedule } from '../utils';
import { getHeader, getNextDate } from '../helpers';
import { NEW_LINE } from '../constants/new-line';
import { getRuleMeeting } from '../utils/get-rule-meeting';
import type { DaysRange, NotificationParameters } from '../types';

/*
    DSM: https://us04web.zoom.us/j/75589659684?pwd=YWxqMGxWd3JGK2Z6K1VOMW1JbTdJdz09

    Django: 
    Рома -> Леша -> Тая -> Марат -> Миша К. -> Маша -> Ирина -> Саша М.

    UndeRfined и приглашённые звёзды: 
    Айнур -> Саша С. -> Григорий -> Боря -> Никита -> Андрей -> Илья -> Артём -> Миша Г. -> Эрлан -> Владимир

    Следующее время отправки:
    10 октября (Пн) в 10:59

    Расписания:
    Понедельник, вторник, среда, четверг, пятница в 10:59
*/

export const dailyScrumMeeting = ({
    context,
    time,
}: NotificationParameters) => {
    const daysRange: DaysRange = { start: 1, end: 5 };

    const rule = getRuleMeeting({ time, daysRange });

    scheduleJob(rule, () => {
        const nextDate = rule.nextInvocationDate(new Date());

        context.reply(
            `${getHeader('DSM', true)}${getNextDate(nextDate)}${NEW_LINE}${getSchedule(
                'DSM',
                nextDate
            )}`,
            { disable_web_page_preview: true }
        );
    });
};
