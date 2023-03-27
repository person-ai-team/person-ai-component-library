import { getDate, getMonth, getTime,getYear } from "date-fns"

function getSelectedWeekIndex(selectedDate: Date, weeks: [] , startTime: number) {
    const _year = getYear(selectedDate)
    const _month = getMonth(selectedDate)
    const _day = getDate(selectedDate)

    return weeks.reduce(
        (position: number, week: [], index: number) =>
            week.find((day: Date) => getTime(day) === getTime(new Date(_year, _month, _day, startTime, 0, 0)))
                ? (position = index)
                : position,
        0,
    )
}
export default getSelectedWeekIndex