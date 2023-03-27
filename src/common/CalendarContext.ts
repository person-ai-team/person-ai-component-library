/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-types */

import { createContext } from "react"

type TypeCalendarContext = {
    stateCalendar: any
    setStateCalendar: Function
    // selectedDate: Date
}

export const CalendarContext = createContext<TypeCalendarContext>({
    stateCalendar: {},
    setStateCalendar: () => {},
    // selectedDate: new Date(),
})