/* This example requires Tailwind CSS v2.0+ */

import { differenceInMinutes } from 'date-fns';
import format from 'date-fns/format';
import { Fragment, useEffect, useRef, useState } from 'react';
import NoSSR from 'react-no-ssr';

import { getFromLocalStorage } from '../../../lib/helper';

import EventMark from './EventMark';

type event = {
  id: string | number;
  title: string;
  description: string;
  summary: string;
  start: {
    dateTime: string;
  };
  end: {
    dateTime: string;
  };
};

// function classNames(...classes: string[]) {
//   return classes.filter(Boolean).join(' ');
// }

export default function WeekView(props: any) {
  const container = useRef<any>(null);
  const containerNav = useRef<any>(null);
  const containerOffset = useRef<any>(null);
  const markerRef = useRef<any>(null);

  const [currentTimePosition, setCurrentTimePosition] = useState<any>();

  const { selectedWeek, handleEventView } = props;

  const scrollToView = () => {
    if (markerRef && markerRef.current) {
      const marker = markerRef.current;
      marker.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const localStorageMarkers = getFromLocalStorage('markers');
  // console.log('localStorageMarkers', localStorageMarkers);

  const getEventData = (day: Date) => {
    // console.log('getting events');

    const monthEvents =
      (localStorageMarkers &&
        JSON.parse(localStorageMarkers).sort((a: event, b: event) => {
          return (
            new Date(a.start.dateTime).getTime() -
            new Date(b.start.dateTime).getTime()
          );
        })) ||
      [];
    // console.log('monthEvents', monthEvents);

    const dayEvents = monthEvents.filter(
      (event: any) =>
        format(new Date(event.start.dateTime), 'YYYYMMDD') ===
        format(day, 'YYYYMMDD')
    );

    console.log('dayEvents', dayEvents);

    const dayHoursEvents = dayEvents
      .map((event: event) => new Date(event.start.dateTime).getHours())
      .sort((a: number, b: number) => a - b);

    const eventsByHour = dayHoursEvents.reduce((acc: any[], hour: number) => {
      const len = dayHoursEvents.filter(
        (eventHour: number) => eventHour === hour
      ).length;
      !acc.some((accItem: any) => accItem.hour === hour) &&
        acc.push({ hour, len });
      return acc;
    }, []);

    const markers = eventsByHour.map((evHour: any) => {
      return dayEvents
        .filter(
          (event: any) =>
            new Date(event.start.dateTime).getHours() === evHour.hour
        )
        .map((event: any, index: number) => (
          <EventMark
            key={`event-${event.id}`}
            calendarEvent={event}
            sq={index}
            len={evHour.len}
          />
        ));
    });
    // console.log('markers', markers);
    return markers;
  };

  const CurrentTimeMark = (props: any) => {
    const { marginTop = -1000 } = props;
    return (
      <>
        {/* <div className='currentTimeDot'  style={{ marginTop: marginTop - 33 , width: 12, zIndex: 10, marginLeft: -6.5, height: 12, background: "rgb(226, 57, 43)", borderRadius: "50%", content: "''", position: "absolute", }} /> */}

        <div
          className='currentTimeLine'
          ref={markerRef}
          style={{
            marginTop:  marginTop ,
            zIndex: 10,
            position: 'relative',
            borderColor: 'rgb(226, 57, 43)',
            borderTop: '2px rgb(226, 57, 43) solid',
            left: 0,
            right: -1,
          }}
        >
          <div style={{ marginTop: -9, marginLeft: -17 }}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke-width='1.5'
              stroke='currentColor'
              className='h-4 w-4'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
          </div>
        </div>
      </>
    );
  };

  useEffect(() => {
    setInterval(() => {
      const now = new Date();
      const initTime = new Date(format(now, 'YYYY/MM/DD 0:0:0'));
      const position = differenceInMinutes(now, initTime);
      setCurrentTimePosition(position);
    }, 1000);
  }, []);

  console.log('timePosition', currentTimePosition);
  // const currentMinute = new Date().getHours() * 60;
  // console.log(currentMinute)

  useEffect(() => {
    scrollToView();
  }, [currentTimePosition]);

  const selectedWeekArray = Array.from(selectedWeek);
  const selectedWeekFormatted = selectedWeekArray.map((day: any) => {
    return {
      day: format(day, 'D'),
      dayName: format(day, 'dddd'),
      month: format(day, 'MMMM'),
      year: format(day, 'YYYY'),
      date: day,
      isToday: format(day, 'YYYY-MM-DD') === format(new Date(), 'YYYY-MM-DD'),
    };
  });

  // loop through selected week and make _day each day of the week
  console.log('selectedWeekFormatted', selectedWeekFormatted)

  // const _day = selectedWeekFormatted[0].date;
  // console.log('_day', _day)
  // const eventsOfDay = getEventData(_day);

  // console.log('eventsOfDay', eventsOfDay);

  // useEffect(() => {
  //   // Set the container scroll position based on the current time.
  //   const currentMinute = new Date().getHours() * 60;
  //   container.current.scrollTop =
  //     ((container.current.scrollHeight -
  //       containerNav.current.offsetHeight -
  //       containerOffset.current.offsetHeight) *
  //       currentMinute) /
  //     1440;
  // }, []);

  return (
    <NoSSR>
      <div className='flex h-screen flex-col'>
      <div ref={container} className='flex flex-auto flex-col  bg-white'>
        <div
          style={{ width: '165%' }}
          className='flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full'
        >
          <div
            ref={containerNav}
            className='sticky top-0   z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8'
          >
            <div className='grid grid-cols-7 text-sm leading-6 text-gray-500 sm:hidden'>
              {/* <button
                type='button'
                className='flex flex-col items-center pt-2 pb-3'
              >
                M{' '}
                <span className='mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900'>
                  10
                </span>
              </button>
              <button
                type='button'
                className='flex flex-col items-center pt-2 pb-3'
              >
                T{' '}
                <span className='mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900'>
                  11
                </span>
              </button>
              <button
                type='button'
                className='flex flex-col items-center pt-2 pb-3'
              >
                W{' '}
                <span className='mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white'>
                  12
                </span>
              </button>
              <button
                type='button'
                className='flex flex-col items-center pt-2 pb-3'
              >
                T{' '}
                <span className='mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900'>
                  13
                </span>
              </button>
              <button
                type='button'
                className='flex flex-col items-center pt-2 pb-3'
              >
                F{' '}
                <span className='mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900'>
                  14
                </span>
              </button>
              <button
                type='button'
                className='flex flex-col items-center pt-2 pb-3'
              >
                S{' '}
                <span className='mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900'>
                  15
                </span>
              </button>
              <button
                type='button'
                className='flex flex-col items-center pt-2 pb-3'
              >
                S{' '}
                <span className='mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900'>
                  16
                </span>
              </button> */}

              {selectedWeekFormatted.map((day: any, index: any) => {
                return (
                  <button
                    type='button'
                    className='flex flex-col items-center pt-2 pb-3'
                    key={index}
                  >
                    {day.dayName[0]}{' '}
                    <span
                      className={
                        day.isToday
                          ? 'mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-300 font-semibold text-white'
                          : 'mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900'
                      }
                    >
                      {day.day}
                    </span>
                  </button>
                );
              })}
            </div>

            <header>
              <div className='-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid'>
                <div className='col-end-1 w-14' />
                {selectedWeekFormatted.map((day: any, index: any) => {
                  return (
                    <div
                      className='flex items-center justify-center py-2.5'
                      key={index}
                    >
                      <span>{day.dayName}</span>
                      <span
                        className={
                          day.isToday
                            ? 'ml-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-gray-600 font-semibold text-white'
                            : 'ml-1.5 items-center justify-center font-semibold text-gray-900'
                        }
                      >
                        {day.day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </header>
          </div>
          <div className='flex flex-auto mt-6' style={{borderTop: '1px solid #f3f4f6'}}>
            <div className='sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100' />
            <div className='grid flex-auto grid-cols-1 grid-rows-1'>
              {/* Horizontal lines */}
              <div
                className='col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100'
                style={{ gridTemplateRows: 'repeat(24, minmax(3.75rem, 1fr))' }}
              >
                {/* <div ref={containerOffset} className='row-end-1 h-7'></div> */}
                {/* <div className='row-end-2 h-7'></div> */}
                <div>
                  <div className='sticky left-0 z-20 -mt-5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400'>
                    12AM
                  </div>
                </div>

                <div>
                  <div className='sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400'>
                    1AM
                  </div>
                </div>

                <div>
                  <div className='sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400'>
                    2AM
                  </div>
                </div>

                <div>
                  <div className='sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400'>
                    3AM
                  </div>
                </div>

                <div>
                  <div className='sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400'>
                    4AM
                  </div>
                </div>

                <div>
                  <div className='sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400'>
                    5AM
                  </div>
                </div>

                <div>
                  <div className='sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400'>
                    6AM
                  </div>
                </div>

                <div>
                  <div className='sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400'>
                    7AM
                  </div>
                </div>

                <div>
                  <div className='sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400'>
                    8AM
                  </div>
                </div>

                <div>
                  <div className='sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400'>
                    9AM
                  </div>
                </div>

                <div>
                  <div className='sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400'>
                    10AM
                  </div>
                </div>

                <div>
                  <div className='sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400'>
                    11AM
                  </div>
                </div>

                <div>
                  <div className='sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400'>
                    12PM
                  </div>
                </div>

                <div>
                  <div className='sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400'>
                    1PM
                  </div>
                </div>

                <div>
                  <div className='sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400'>
                    2PM
                  </div>
                </div>

                <div>
                  <div className='sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400'>
                    3PM
                  </div>
                </div>

                <div>
                  <div className='sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400'>
                    4PM
                  </div>
                </div>

                <div>
                  <div className='sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400'>
                    5PM
                  </div>
                </div>

                <div>
                  <div className='sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400'>
                    6PM
                  </div>
                </div>

                <div>
                  <div className='sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400'>
                    7PM
                  </div>
                </div>

                <div>
                  <div className='sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400'>
                    8PM
                  </div>
                </div>

                <div>
                  <div className='sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400'>
                    9PM
                  </div>
                </div>

                <div>
                  <div className='sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400'>
                    10PM
                  </div>
                </div>

                <div>
                  <div className='sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs leading-5 text-gray-400'>
                    11PM
                  </div>
                </div>
              </div>

              {/* Vertical lines */}
              {/* <div className='col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-100 sm:grid sm:grid-cols-7'>
                  <div className='col-start-1 row-span-full' />
                  <div className='col-start-2 row-span-full' />
                  <div className='col-start-3 row-span-full' />
                  <div className='col-start-4 row-span-full' />
                  <div className='col-start-5 row-span-full' />
                  <div className='col-start-6 row-span-full' />
                  <div className='col-start-7 row-span-full' />
                  <div className='col-start-8 row-span-full w-8' />
                </div> */}

              {/* use the seletcted week array map to create vertical lines    */}
              <div className='col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-100 sm:grid sm:grid-cols-7'>
                {selectedWeek.map((date: any, index: number) => {
                  const isToday =
                    format(date, 'DDMMYYYY') === format(new Date(), 'DDMMYYYY');

                  const eventsOfDay = getEventData(date)

                  return (
                    <div
                      className={`col-start-${index + 1} row-span-full `}
                      key={index + 1}
                      data-date={date}
                    >

                      <div>
                      {
                        eventsOfDay && eventsOfDay.length > 0 && (
                          <div className='relative h-full w-full ' data-date={date}>
                            {eventsOfDay}
                            </div>
                        )
                      }
                      </div>
                      
                      <div>
                      {isToday && (
                        <CurrentTimeMark marginTop={currentTimePosition} />
                      )}
                      </div>

                      

                      
                      {/* {format(date, 'DDMMYYYY') === format(_day, 'DDMMYYYY') && (
                        eventsOfDay && eventsOfDay.length > 0) && (
                          <div className='relative ' data-date={_day}>
                              {eventsOfDay}
                          </div>
                      )} */}

                      
                      
                      
                    </div>
                  );
                })}
                <div className='col-start-8 row-span-full w-8' />
              </div>

              {/* <CurrentTimeMark marginTop={currentTimePosition} /> */}

              {/* Events */}
              {/* <ol
                className='col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8'
                style={{
                  gridTemplateRows: '1.75rem repeat(288, minmax(0, 1fr)) auto',
                }}
              >
                <li
                  className='relative mt-px flex sm:col-start-3'
                  style={{ gridRow: '62 / span 12' }}
                >
                  <a
                    href='#'
                    className='group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-5 hover:bg-blue-100'
                  >
                    <p className='order-1 font-semibold text-blue-700'>
                      Breakfast
                    </p>
                    <p className='text-blue-500 group-hover:text-blue-700'>
                      <time dateTime='2023-02-02T05:00'>5:00 AM</time>
                    </p>
                  </a>
                </li>
                <li
                  className='relative mt-px flex sm:col-start-3'
                  style={{ gridRow: '92 / span 30' }}
                >
                  <a
                    href='#'
                    className='group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-pink-50 p-2 text-xs leading-5 hover:bg-pink-100'
                  >
                    <p className='order-1 font-semibold text-pink-700'>
                      Flight to Paris
                    </p>
                    <p className='text-pink-500 group-hover:text-pink-700'>
                      <time dateTime='2022-01-12T07:30'>7:30 AM</time>
                    </p>
                  </a>
                </li>
                <li
                  className='relative mt-px hidden sm:col-start-6 sm:flex'
                  style={{ gridRow: '122 / span 24' }}
                >
                  <a
                    href='#'
                    className='group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-gray-100 p-2 text-xs leading-5 hover:bg-gray-200'
                  >
                    <p className='order-1 font-semibold text-gray-700'>
                      Meeting with design team at Disney
                    </p>
                    <p className='text-gray-500 group-hover:text-gray-700'>
                      <time dateTime='2022-01-15T10:00'>10:00 AM</time>
                    </p>
                  </a>
                </li>
              </ol> */}
            </div>
          </div>
        </div>
      </div>
    </div>
    </NoSSR>
  );
}
