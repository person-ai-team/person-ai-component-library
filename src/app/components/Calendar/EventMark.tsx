import React, { useContext, useEffect, useState } from 'react';
import { CalendarContext } from '../../../common/CalendarContext';
import { format, differenceInMinutes } from 'date-fns';

// create an event mark in the form of a box with a time label in tailwindcss
function getStyles(
  left: number,
  top: number,
  isDragging: boolean,
  partOfStyle: React.CSSProperties
): React.CSSProperties {
  const transform = `translate3d(${left}px, ${top}px, 0)`;

  return {
    position: 'absolute',
    transform: isDragging ? transform : 'initial',
    WebkitTransform: isDragging ? transform : 'initial',
    // IE fallback: hide the real node using CSS when dragging
    // because IE will ignore our custom "empty image" drag preview.
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : '',
    ...partOfStyle,
  };
}

const EventMark = (props: any) => {
  const { stateCalendar, setStateCalendar } = useContext(CalendarContext);
  const { defaultEventDuration, eventsDrawer } = stateCalendar;
  const { calendarEvent, len, sq } = props;

  console.log('calendarEvent', calendarEvent)

  const startDate = new Date(calendarEvent.start.dateTime);
  const endDate = new Date(calendarEvent.end.dateTime);

  let startTimeFormatted = '';
  let endTimeFormatted = '';

  const getStartTime = () => {
    const start = new Date(calendarEvent.start.dateTime);
    const hours = start.getHours();
    const minutes = start.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const hours12 = hours % 12;
    const hours12String = hours12 ? hours12 : 12;
    const minutesString = minutes < 10 ? '0' + minutes : minutes;
    const startTime = hours12String + ':' + minutesString + ' ' + ampm;
    startTimeFormatted = startTime;
    return startTime;
  };

  const getEndTime = () => {
    const end = new Date(calendarEvent.end.dateTime);
    const hours = end.getHours();
    const minutes = end.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const hours12 = hours % 12;
    const hours12String = hours12 ? hours12 : 12;
    const minutesString = minutes < 10 ? '0' + minutes : minutes;
    const endTime = hours12String + ':' + minutesString + ' ' + ampm;
    endTimeFormatted = endTime;
    return endTime;
  };

  getStartTime();
  getEndTime();

  const currentDay = startDate;
  const initTime = new Date(format(currentDay, 'YYYY/MM/DD 0:0:0'));
  const position = differenceInMinutes(currentDay, initTime) + 2;
  

  const duration = differenceInMinutes(endDate, startDate) - 3;

  const viewEvent = (props: any) => {
    const { calendarEvent } = props

    // const eeBeginDate = new Date(calendarEvent.begin)
    // const eeEndDate = new Date(calendarEvent.end)

    // const eeBeginTime = format(eeBeginDate, "H:mm")
    // const eeEndTime = format(eeEndDate, "H:mm")
    // const eeDuration = differenceInMinutes(eeEndDate, eeBeginDate)

    // handleRightDrawerOpen(true)

    setStateCalendar({
        ...stateCalendar,
        // openViewDialog: true,
        // rightDrawerOpen: true,
        eventsDrawer: true,
        calendarEvent,
    })
}

  const left = (100 / len) * sq + 1

    const partOfStyle: React.CSSProperties = {
        marginTop: position,
        height: duration,
        width: `calc((100% / ${len}) + 0px)`,
        marginLeft: `calc(100% / ${len} * ${sq})`,
    }


  return (
    <div
      className='absolute text-xs inset-1 leading-5 rounded-lg overflow-hidden top-0 left-0 right-0 bg-blue-50 hover:bg-blue-100'
      id={calendarEvent.id}
      style={{
        ...getStyles(left, position / 57 - 2, false, partOfStyle),
      }}
      onClick = {() => viewEvent({calendarEvent})}
    >
      <div className=' ml-1 mt-1 order-1 font-semibold text-blue-700'>
      <p className='text-blue-500 group-hover:text-blue-700 text-xs'>
        {startTimeFormatted}
        </p>
        {calendarEvent.title || calendarEvent.summary}
        
        
      </div>
    </div>
  );
};

export default EventMark;
