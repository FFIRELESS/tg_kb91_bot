import removeTags from "./htmlTagRemover.js";

export const jsonFormatter = (json, type) => {
    let message = "";

    switch (type) {
        case "schedule":
            if (json.length !== 0) {
                const sorted = json;
                sorted.sort((a, b) => a.NAME_PAIR > b.NAME_PAIR ? 1 : -1);

                message += `<strong><u>${sorted[0].NAME_WDAY} • ${sorted[0].DATE_REG}</u></strong>\n\n`

                for (const messageElement of sorted) {
                    message += `<strong>\u{1F4CC} ${messageElement.NAME_PAIR === '' ? "Інфи немає :(" : messageElement.NAME_PAIR}</strong>`
                    message += `<strong> • \u{1F551} ${messageElement.TIME_PAIR === '' ? "Інфи немає :(" : messageElement.TIME_PAIR}</strong>\n`;
                    message += `\u{1F9FE} ${messageElement.NAME_DISC === '' ? "Інфи немає :(" : messageElement.NAME_DISC}\n`;
                    message += `\u{1F393} ${messageElement.NAME_STUD === '' ? "Інфи немає :(" : messageElement.NAME_STUD}\n`;
                    message += `<i>\u{1F3EB} ${messageElement.NAME_AUD === '' ? "online" : messageElement.NAME_AUD}\n</i>`;
                    message += `\u{1F468} ${messageElement.NAME_FIO === '' ? "Інфи немає :(" : messageElement.NAME_FIO}\n`;
                    message += messageElement.INFO === '' ? "" : "\u{2139} " + removeTags(messageElement.INFO) + "\n";
                    message += "\n";
                }
            } else {
                message += `\u{2757}Пар немає.`;
            }
            break;

        case "homework":
            if (json.length !== 0) {
                for (const messageElement of json) {
                    message += `\u{1F4CC} <strong><u>${messageElement.discipline === '' ? "Інфи немає :(" : messageElement.discipline}</u></strong>\n`
                    message += `\u{1F551} до: <strong>${messageElement.deadline === '' ? "Інфи немає :(" : messageElement.deadline}</strong>\n`;
                    message += `\u{1F4D6} ${messageElement.homework === '' ? "Інфи немає :(" : messageElement.homework}\n`;
                    message += "\n";
                }
            } else {
                message += `\u{2757}ДЗ немає.`;
            }
            break;
        case "links":
            if (json.length !== 0) {
                for (const messageElement of json) {
                    message += `\u{1F4CC} <strong><u>${messageElement.discipline === '' ? "Інфи немає :(" : messageElement.discipline}:</u></strong>\n`
                    message += `\u{1F517} ${messageElement.link === '' ? "Інфи немає :(" : messageElement.link}\n`;
                    message += "\n";
                }
            } else {
                message += `\u{2757}Посилань немає.`;
            }
            break;
        case "feedback":
            if (json.length !== 0) {
                for (const messageElement of json) {
                    message += `\u{1F4C5} ${messageElement.timestamp.toLocaleString() === '' ? "Інфи немає :(" :
                        messageElement.timestamp.toLocaleString()}\n`
                    message += `\u{1F6B6} ${messageElement.username === '' ? "Інфи немає :(" : messageElement.username}\n`;
                    message += `\u{1F522} ${messageElement.userId === '' ? "Інфи немає :(" : messageElement.userId}\n`;
                    message += `\u{1F4D6} ${messageElement.message === '' ? "Інфи немає :(" : messageElement.message}\n`;
                    message += "\n";
                }
            } else {
                message += `\u{2757}Посилань немає.`;
            }
            break;
        default:
            message = "Невірний тип форматування";
    }
    return message;
}

export default jsonFormatter;