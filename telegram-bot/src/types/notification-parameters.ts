import type { Context } from 'telegraf';

import type { Time } from '.';

export type NotificationParameters = {
    context: Context;
    time: Time;
};
