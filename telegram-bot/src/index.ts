import * as dotenv from 'dotenv';
import { Telegraf, Markup } from 'telegraf';
import type { Context } from 'telegraf';

import { dailyScrumMeeting, productBacklogRefinement } from './notifications';
import {
    START_DSM_TIME,
    COLLECTING_AGENDA_TIME,
    START_PBR_TIME,
} from './constants';
import { connectToMongo } from './connect-to-mongo';
import { createPbrMessage } from './utils/create-pbr-message';

dotenv.config();
const telegramApiKey = process.env.TELEGRAM_API_KEY;
const mongoDbUri = process.env.MONGO_DB_URI;

const bot = new Telegraf(telegramApiKey);

// const todoTools = {
//     addTodo: '⚡ Add todo',
//     todoList: '📔 Todo List',
//     edit: '🖊️ Edit',
//     done: '✅ Done',
//     delete: '❌ Delete',
// };

// const mainButtons = () => {
//     return Markup.keyboard(
//         [
//             { text: todoTools.addTodo },
//             { text: todoTools.todoList },
//             { text: todoTools.edit },
//             { text: todoTools.done },
//             { text: todoTools.delete },
//         ],
//         { columns: 2 }
//     ).resize();
// };

bot.start((context: Context) => {
    // context.reply('Hello World', mainButtons());

    dailyScrumMeeting({ context, time: START_DSM_TIME });
    productBacklogRefinement({
        context,
        collectingAgenda: COLLECTING_AGENDA_TIME,
        startPBR: START_PBR_TIME,
    });
});

bot.command('secret', (context: Context) => {
    const heart = Math.round(Math.random()) === 0 ? '🖤' : '❤️';

    context.reply(`Наташа ${heart}`);

    connectToMongo(mongoDbUri);
});

bot.on('message', createPbrMessage);

bot.launch();
