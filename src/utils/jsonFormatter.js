const removeTags = require("./htmlTagRemover")

module.exports = jsonFormatter = (json) => {
    let message = "";

    if (json.length !== 0) {
        const sorted = json;
        sorted.sort((a, b) => a.NAME_PAIR > b.NAME_PAIR ? 1 : -1);

        message += `<strong><u>${sorted[0].NAME_WDAY} • ${sorted[0].DATE_REG}</u></strong>\n\n`

        for (const messageElement of sorted) {
            message += `<strong>\u{1F4CC} ${messageElement.NAME_PAIR === '' ? "Інфи немає :(" : messageElement.NAME_PAIR}</strong>`
            message += `<strong> • \u{1F551} ${messageElement.TIME_PAIR === '' ? "Інфи немає :(" : messageElement.TIME_PAIR}</strong>\n`;
            message += `\u{1F9FE} ${messageElement.NAME_DISC === '' ? "Інфи немає :(" : messageElement.NAME_DISC}\n`;
            message += `\u{1F393} ${messageElement.NAME_STUD === '' ? "Інфи немає :(" : messageElement.NAME_STUD}\n`;
            message += `\u{1F3EB} ${messageElement.NAME_AUD === '' ? "online" : messageElement.NAME_AUD}\n`;
            message += `\u{1F468} ${messageElement.NAME_FIO === '' ? "Інфи немає :(" : messageElement.NAME_FIO}\n`;
            message += messageElement.INFO === '' ? "" : "\u{2139} " + removeTags(messageElement.INFO) + "\n";
            message += "\n";
        }
    } else {
        message += `\u{2757}Пар немає.`;
    }
    return message;
}