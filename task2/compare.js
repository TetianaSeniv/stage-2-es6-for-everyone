function compareDates(date1, date2) {
    date1 = new Date(date1).getTime();
    date2 = new Date(date2).getTime();

    return date1 === date2;
}