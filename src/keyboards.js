import { Markup } from "telegraf";
import {getWeekDay} from "./utils/getDate.js";

export function getMainMenu() {
    return Markup.keyboard([
        ['Розклад на сьогодні', 'Розклад на завтра'],
        ['\u{1F4C5} Розклад на 10 днів'], ["\u{1F4D6} Домашка"],
        ["\u{1F517} Посилання на пари"], ['\u{26C5} Погода'],
    ], {columns: 3}).resize()
}

//TODO: виправити захардкодений масив кнопок в меню нижче
export function weekMenu(datesWeek) {
    return Markup.inlineKeyboard([
        Markup.button.callback(getWeekDay(datesWeek.at(0)), datesWeek.at(0)),
        Markup.button.callback(getWeekDay(datesWeek.at(1)), datesWeek.at(1)),
        Markup.button.callback(getWeekDay(datesWeek.at(2)), datesWeek.at(2)),
        Markup.button.callback(getWeekDay(datesWeek.at(3)), datesWeek.at(3)),
        Markup.button.callback(getWeekDay(datesWeek.at(4)), datesWeek.at(4)),
        Markup.button.callback(getWeekDay(datesWeek.at(5)), datesWeek.at(5)),
        Markup.button.callback(getWeekDay(datesWeek.at(6)), datesWeek.at(6)),
        Markup.button.callback(getWeekDay(datesWeek.at(7)), datesWeek.at(7)),
        Markup.button.callback(getWeekDay(datesWeek.at(8)), datesWeek.at(8)),
        Markup.button.callback(getWeekDay(datesWeek.at(9)), datesWeek.at(9))
    ], {columns: 2})
}
