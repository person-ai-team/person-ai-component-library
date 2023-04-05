'use client';

import React, {useEffect, useState} from 'react';

import {CalendarContext} from '../../../common/CalendarContext';

import Calendar from './Calendar';
import CreateEvent from './CreateEvent';

const layout = 'week';

const selectedDate = new Date();
const defaultEventDuration = 60; // in minutes

function Timeline() {
  const [stateCalendar, setStateCalendar] = useState({
    selectedDate,
    defaultEventDuration,
    layout,
    createEventsDrawer: false,
    eventsDrawer: false,
    eventBeginDate: null,
    eventBeginTime: { value: null, label: null },
    eventEndDate: null,
    eventEndTime: { value: null, label: null },
    title: '',
    description: '',
    eventType: 'calendarEvent' || 'habitEvent' || 'goalEvent',
    draggingEventId: -1,
    eventId : 0,
    localEvents: [],
    dailyTodos: [],
    inputReference: null,

  });


  const handleCreateEvent = () => {
    setStateCalendar({ ...stateCalendar, createEventsDrawer: true });
  };

  const handleCreateEventClose = () => {
    setStateCalendar({ ...stateCalendar, createEventsDrawer: false });
  };

  const handleEventView = () => {
    setStateCalendar({ ...stateCalendar, eventsDrawer: true });
  };

  const handleEventViewClose = () => {
    setStateCalendar({ ...stateCalendar, eventsDrawer: false });
  };
  

  // const localEvents = JSON.parse(localStorage.getItem("markers") || "[]");
  // console.log('localEvents', localEvents)

  // call useffect to get localstorage events called markers and set them to local events state
  useEffect(() => {
    const localEvents = JSON.parse(localStorage.getItem("markers") || "[]");
    setStateCalendar({ ...stateCalendar, localEvents });
  }, []);

  return (

      <CalendarContext.Provider value={{ stateCalendar, setStateCalendar }}>
        {/* <div className='h-screen'> */}
        <div className='flex flex-row'>
          <div className='w-80 border-gray border-r'/>
        <Calendar handleEventView={handleEventView} handleCreateEvent={handleCreateEvent} handleEventViewClose={handleEventViewClose} />
        </div>
        <CreateEvent />
        {/* </div> */}
      
    </CalendarContext.Provider>
      
  
  );
}

export default Timeline;