import { Schema, model } from 'mongoose';

import type { MessageDto } from './message.dto';

const messageSchema = new Schema<MessageDto>({
    userName: { type: String, required: true },
    firstName: { type: String, required: true },
    date: { type: String, required: true },
    dateTimestamp: { type: Number, required: true },
    text: { type: String, required: true },
});

export const Message = model<MessageDto>('Message', messageSchema);
