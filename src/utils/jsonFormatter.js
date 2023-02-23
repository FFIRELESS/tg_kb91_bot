module.exports = (json) => {
    const sorted = json;
    let message = "";

    sorted.sort((a, b) => a.NAME_PAIR > b.NAME_PAIR ? 1 : -1);

    for (const messageElement of sorted) {
        message += `${messageElement.NAME_PAIR === '' ? "Інфи немає :(" : messageElement.NAME_PAIR} * ${messageElement.TIME_PAIR === '' ? "Інфи немає :(" : messageElement.TIME_PAIR}\n`;
        message += messageElement.NAME_DISC === '' ? "Інфи немає :(" : messageElement.NAME_DISC + "\n";
        message += messageElement.NAME_STUD === '' ? "Інфи немає :(" : messageElement.NAME_STUD + "\n";
        message += messageElement.NAME_AUD === '' ? "" : messageElement.NAME_AUD + "\n";
        message += messageElement.NAME_FIO === '' ? "Інфи немає :(" : messageElement.NAME_FIO + "\n";
        message += messageElement.INFO === '' ? "" : messageElement.INFO + "\n";
        message += "\n";
    }
    return message;
}