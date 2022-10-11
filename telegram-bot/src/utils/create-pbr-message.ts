import { format } from 'date-fns';
import { deunionize } from 'telegraf';
import type { Context } from 'telegraf';

import { Message } from '../models/message';

export const createPbrMessage = async (context: Context) => {
    const { first_name: firstName, username: userName } = context.message.from;
    const dateTimestamp = context.message.date * 1000;
    const textWithSuffix = deunionize(context.message)?.text;

    const messageSuffixUpperCase = 'PBR:';
    const messageSuffixLowerCase = 'pbr:';
    let pbrSuffixLength: number;

    if (messageSuffixUpperCase.length === messageSuffixLowerCase.length) {
        pbrSuffixLength = messageSuffixUpperCase.length;
    }

    let text: string;
    if (
        textWithSuffix.startsWith(messageSuffixUpperCase) ||
        textWithSuffix.startsWith(messageSuffixLowerCase)
    ) {
        text = textWithSuffix.slice(pbrSuffixLength, textWithSuffix.length).trim();
    } else {
        return;
    }

    const date = format(dateTimestamp, 'yyyy-MM-dd');

    const message = new Message({
        date,
        dateTimestamp,
        firstName,
        text,
        userName,
    });

    try {
        await message.save();
    } catch(error) {
        if (error instanceof Error) {
            console.error(error);
        }
    }
};
