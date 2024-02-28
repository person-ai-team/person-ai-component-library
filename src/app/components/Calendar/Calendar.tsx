import { addDays, addWeeks, subDays, subWeeks } from 'date-fns';
import React, { useContext } from 'react';

import { CalendarContext } from '../../../common/CalendarContext';
import EventsView from './EventView';

import CalendarMain from './CalendarMain';
import CalendarToolbar from './CalendarToolbar';

function Calendar(props: { handleCreateEvent: () => void, handleEventView: () => void, handleEventViewClose: () => void }) {
  const { stateCalendar, setStateCalendar } = useContext(CalendarContext);
  const { selectedDate, eventsDrawer } = stateCalendar;

  const { handleCreateEvent, handleEventView, handleEventViewClose } = props;

  const next = () => {
    let newDate;

    switch (stateCalendar.layout) {
      case 'week':
        newDate = addWeeks(stateCalendar.selectedDate, 1);
        break;

      case 'day':
        newDate = addDays(stateCalendar.selectedDate, 1);
        break;

      default:
        break;
    }

    setStateCalendar({ ...stateCalendar, selectedDate: newDate });
  };

  const previous = () => {
    let newDate;

    switch (stateCalendar.layout) {
      case 'week':
        newDate = subWeeks(stateCalendar.selectedDate, 1);
        break;

      case 'day':
        newDate = subDays(stateCalendar.selectedDate, 1);
        break;

      default:
        break;
    }

    setStateCalendar({ ...stateCalendar, selectedDate: newDate });
  };

  const goToToday = () => {
    const newDate = new Date();
    setStateCalendar({ ...stateCalendar, selectedDate: newDate });
  };

  const handleLayoutChange = (args: any) => {
    const { value } = args;
    console.log('value', value)
    console.log('args', args)
    setStateCalendar({ ...stateCalendar, layout: value });
  };

  return (
    <div className='flex w-full lg:h-[calc(100vh-75px)] xl:h-[calc(100vh-126px)] md:h-[calc(100vh-76px)] sm:h-[calc(100vh-76px)] xs:h-[calc(100vh-76px)] xxs:h-[calc(100vh-76px)] flex-col'>
      <header className='z-10'>
        <CalendarToolbar
          handleCreateEvent={handleCreateEvent}
          selectedDate={selectedDate}
          nextWeek={next}
          goToToday={goToToday}
          previousWeek={previous}
          handleLayoutChange={handleLayoutChange}
        />
      </header>
      <EventsView handleEventViewClose = {handleEventViewClose} />
      <main className={`flex-1 z-0 overflow-y-auto ${eventsDrawer && ' transition duration-75 mr-96'}`}>
        <CalendarMain handleEventView={handleEventView} />
      </main>
    </div>
  );
}

export default Calendar;
