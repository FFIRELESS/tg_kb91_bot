module.exports = {
    getDateNow: () => {
        const date = new Date();

        let dd = date.getDate();
        let yy = date.getFullYear();
        let mm = date.getMonth() + 1;

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        return (dd + '.' + mm + '.' + yy).toString();
    },

    getDateTomorrow: () => {
        const date = new Date();

        let dd = date.getDate() + 1;
        let yy = date.getFullYear();
        let mm = date.getMonth() + 1;

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        return (dd + '.' + mm + '.' + yy).toString();
    },
}