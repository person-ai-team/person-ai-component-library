import React, { useContext } from 'react';

import { CalendarContext } from '../../../common/CalendarContext';
import getSelectedWeekIndex from '../../../common/getSelectedWeekIndex'
import getWeekDays from '../../../common/getWeekDays'

import DayView from './DayView';
import WeekView from './WeekView';

function CalendarMain(props: any) {
    const { stateCalendar } = useContext(CalendarContext)
    const { selectedDate, locale, layout } = stateCalendar

    const {handleEventView } = props

    const weeks = getWeekDays(selectedDate, 7)
    const selectedWeekIndex = getSelectedWeekIndex(selectedDate, weeks, 0)
    const selectedWeek = weeks[selectedWeekIndex]

    console.log(selectedWeekIndex, selectedWeek)

    return (
        <div>
            {layout === 'week' && <WeekView handleEventView={handleEventView} selectedWeek={selectedWeek} selectedWeekIndex={selectedWeekIndex} />
            }
            {
                layout === 'day' && <DayView selectedWeek={selectedWeek} selectedDate={selectedDate} />
            }
        </div>
    )
}

export default CalendarMain