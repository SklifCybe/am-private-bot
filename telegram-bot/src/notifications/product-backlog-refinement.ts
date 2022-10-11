import { scheduleJob } from 'node-schedule';
import type { Context } from 'telegraf';
import type { RecurrenceRule } from 'node-schedule';

import { getSchedule, getRuleMeeting } from '../utils';
import { getHeader, getNextDate, getAgenda, getWebLink } from '../helpers';
import { NEW_LINE } from '../constants';
import type { Time } from '../types';

type Parameters = {
    context: Context;
    collectingAgenda: Time;
    startPBR: Time;
};

const scheduleAgenda = (context: Context, rule: RecurrenceRule) => {
    scheduleJob(rule, () => {
        context.reply(`${getHeader('PBR Agenda', false)}${getAgenda()}`);
    });
};

const scheduleStartPBR = (context: Context, rule: RecurrenceRule) => {
    scheduleJob(rule, () => {
        const nextDate = rule.nextInvocationDate(new Date());

        context.reply(
            `${getHeader('PBR', true)}${getNextDate(
                nextDate
            )}${NEW_LINE}${getSchedule(
                'PBR',
                nextDate
            )}${NEW_LINE}${getWebLink()}`,
            { disable_web_page_preview: true }
        );
    });
};

export const productBacklogRefinement = ({
    context,
    collectingAgenda,
    startPBR,
}: Parameters) => {
    const days = [2, 4];

    const collectingAgendaRule = getRuleMeeting({
        time: collectingAgenda,
        days,
    });
    const startPBbRule = getRuleMeeting({ time: startPBR, days });

    scheduleAgenda(context, collectingAgendaRule);
    scheduleStartPBR(context, startPBbRule);
};
