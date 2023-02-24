export const getDateNow = () => {
    const date = new Date();

    let dd = date.getDate();
    let yy = date.getFullYear();
    let mm = date.getMonth() + 1;

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return (dd + '.' + mm + '.' + yy).toString();
}

export const getDateTomorrow = () => {
    const date = new Date();

    date.setDate(date.getDate() + 1);
    let dd = date.getDate();
    let yy = date.getFullYear();
    let mm = date.getMonth() + 1;

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return (dd + '.' + mm + '.' + yy).toString();
}

export const getDatesWeek = () => {
    const datesWeek = [];

    for (let i = 0; i < 10; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);

        let dd = date.getDate();
        let yy = date.getFullYear();
        let mm = date.getMonth() + 1;

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        datesWeek[i] = (dd + '.' + mm + '.' + yy).toString();
    }
    return datesWeek;
}

export const getWeekDay = (date) => {
    const isoDate = new Date(parseDate(date))
    let days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
    return days[isoDate.getDay()] + ', ' + date;
}

export const parseDate = (date) => {
    const dateSplit = date.split('.');
    return dateSplit[1] + ' ' + dateSplit[0] + ' ' + dateSplit[2];
}