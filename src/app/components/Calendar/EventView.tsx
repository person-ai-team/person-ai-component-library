/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useState, useEffect, useContext } from 'react';
import { format } from 'date-fns';
import { CalendarContext } from '@/common/CalendarContext';
import { Dialog, Transition } from '@headlessui/react';
// import { XMarkIcon } from '@heroicons/react/24/outline'
import {
  LinkIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/20/solid';
import { getFromLocalStorage, setInLocalStorage } from '@/lib/helper';

const team = [
  {
    name: 'Tom Cook',
    email: 'tom.cook@example.com',
    href: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Whitney Francis',
    email: 'whitney.francis@example.com',
    href: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Leonard Krasner',
    email: 'leonard.krasner@example.com',
    href: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Floyd Miles',
    email: 'floyd.miles@example.com',
    href: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Emily Selman',
    email: 'emily.selman@example.com',
    href: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];


function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
  }


export default function EventsView(props: any) {
  const { stateCalendar, setStateCalendar } = useContext(CalendarContext);
  const { eventsDrawer, calendarEvent } = stateCalendar;
  const [open, setOpen] = useState(eventsDrawer);
  const { handleEventViewClose } = props;

  const localStorageMarkers = getFromLocalStorage('markers');

  let startTimeFormatted = '';
  let endTimeFormatted = '';
    let startDateFormatted = '';

    function comp(a: any, b: any) {
        return (
          new Date(a.standardBegin).getTime() - new Date(b.standardBegin).getTime()
        );
      }

      const deleteEvent = (eventId: any) => {
        const markers = localStorageMarkers && JSON.parse(localStorageMarkers);
        const newMarkers = markers.filter((marker: any) => marker.id !== eventId);

        setInLocalStorage('markers', JSON.stringify(newMarkers));
        setStateCalendar({
            ...stateCalendar,
            eventsDrawer: false,
        });
    };

    const checkIfEventIsPlaying = () => {
        if (calendarEvent) {
            const start = new Date(calendarEvent.start.dateTime);
            const end = new Date(calendarEvent.end.dateTime);
            const now = new Date();
            if (now > start && now < end) {
                return true;
            } else {
                return false;
            }
        }
        };
    
        const playEvent = () => {
            if (calendarEvent) {
                const start = new Date(calendarEvent.start.dateTime);
            const end = new Date(calendarEvent.end.dateTime);
            const now = new Date();
            const duration = end.getTime() - start.getTime();
            const newEnd = new Date(now.getTime() + duration);
            const newEvent = {
                ...calendarEvent,
                start: {
                    ...calendarEvent.start,
                    dateTime: now,
                },
                end: {
                    ...calendarEvent.end,
                    dateTime: newEnd,
                },
            };
        }}

        useEffect(() => {
            if (calendarEvent) {
                checkIfEventIsPlaying();
                console.log('cehckww', checkIfEventIsPlaying())
            }
        }, [calendarEvent]);


  if (calendarEvent) {
    const startDate = new Date(calendarEvent.start.dateTime);
  const endDate = new Date(calendarEvent.end.dateTime);

  const calculateDuration = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const duration = end.getTime() - start.getTime();
    const durationInMinutes = duration / 60000;
    const durationInHours = durationInMinutes / 60;
    // if duration is less than 1 hour, return duration in minutes
    if (durationInHours < 1) {
      return durationInMinutes + " min";
    } else {
      // if duration is more than 1 hour, return duration in hours
      return durationInHours + " hr";
    }
  };

  

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

  const getStartDate = () => {
    const start = new Date(calendarEvent.start.dateTime);
    // format date to be like "June 1, 2021"
    const formattedDate = format(start, 'MMMM D, YYYY');
    startDateFormatted = formattedDate;
    return formattedDate;
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
  getStartDate();

  const duration = calculateDuration();
        
    
}

  return (
    <Transition.Root show={eventsDrawer} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={handleEventViewClose}>
        <div className='fixed' />

        <div className='fixed overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16'>
              <Transition.Child
                as={Fragment}
                enter='transform transition ease-in-out duration-75 sm:duration-50'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-0 sm:duration-0'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'
              >
                <Dialog.Panel className='pointer-events-auto w-screen max-w-sm'>
                  <form className='flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl'>
                    <div className='h-0 flex-1 overflow-y-auto'>
                      <div
                        className='bg-indigo-700 py-4 px-4 sm:px-6'
                        style={{ marginTop: '7.65rem' }}
                      >
                        <div className='flex items-center justify-center'>
                          {/* <Dialog.Title className='text-lg font-medium text-white'>
                            
                          </Dialog.Title> */}
                          <div className=' flex h-7 items-center'>
                            {
                                checkIfEventIsPlaying() ? ( <button 
                                    type='button'
                                    style={{outline: 'none', border: 'none', boxShadow: 'none'}}
                                    className='rounded-md bg-indigo-700 text-indigo-200 hover: text-white'
                                    onClick={() => {}}
                                    >
                                        <span
                                            className={classNames(
                                              ' flex-none text-xs py-1 px-1 font-semibold text-white uppercase tracking-wider',
                                              
                                            )}
                                            style={{ border: '1px solid white', borderRadius: '5px'}}
                                          >
                                            <kbd className="font-sans"> ◻</kbd>
                                            <kbd className="font-sans ml-1">Stop</kbd>
                                          </span>
        
                                    </button> )
                                : (
                                    <button 
                            type='button'
                            style={{outline: 'none', border: 'none', boxShadow: 'none'}}
                            className='rounded-md bg-indigo-700 text-indigo-200 hover: text-white'
                            onClick={() => {}}
                            >
                                <span
                                    className={classNames(
                                      ' flex-none text-xs py-1 px-1 font-semibold text-white uppercase tracking-wider',
                                      
                                    )}
                                    style={{ border: '1px solid white', borderRadius: '5px'}}
                                  >
                                    <kbd className="font-sans"> ▶️</kbd>
                                    <kbd className="font-sans ml-1">Start</kbd>
                                  </span>

                            </button>
                                )
                            }
                            <button
                              type='button'
                              style={{ outline: 'none', border: 'none', boxShadow: 'none' }}
                              className='rounded-md bg-indigo-700 text-indigo-200 hover:text-white'
                              onClick={() => handleEventViewClose()}
                            >
                              {/* <span className='sr-only'>Close panel</span> */}

                              {/* <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className=' ml-36 h-6 w-6'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='M6 18L18 6M6 6l12 12'
                                />
                              </svg> */}
                              <span
                                    className={classNames(
                                      'ml-3 flex-none text-xs py-1 px-1 font-semibold text-white uppercase tracking-wider',
                                      
                                    )}
                                    style={{ border: '1px solid white', borderRadius: '5px'}}
                                  >
                                    <kbd className="font-sans">📄</kbd>
                                    <kbd className="font-sans"> Edit</kbd>
                                  </span>
                            </button>
                            <button
                              type='button'
                              style={{ outline: 'none', border: 'none', boxShadow: 'none' }}
                              className='rounded-md bg-indigo-700 text-indigo-200 hover:text-white'
                              onClick={() => deleteEvent(calendarEvent.id)}
                            >
                              {/* <span className='sr-only'>Close panel</span> */}

                              {/* <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className=' ml-36 h-6 w-6'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='M6 18L18 6M6 6l12 12'
                                />
                              </svg> */}
                              <span
                                    className={classNames(
                                      'ml-3 flex-none text-xs py-1 px-1 font-semibold text-white uppercase tracking-wider',
                                      
                                    )}
                                    style={{ border: '1px solid white', borderRadius: '5px'}}
                                  >
                                    <kbd className="font-sans">🗑️ </kbd>
                                    <kbd className="font-sans">Delete</kbd>
                                  </span>
                            </button>
                            <button
                              type='button'
                              style={{ outline: 'none', border: 'none', boxShadow: 'none' }}
                              className='rounded-md bg-indigo-700 text-indigo-200 hover:text-white'
                              onClick={() => handleEventViewClose()}
                            >
                              {/* <span className='sr-only'>Close panel</span> */}

                              {/* <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className=' ml-36 h-6 w-6'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='M6 18L18 6M6 6l12 12'
                                />
                              </svg> */}
                              <span
                                    className={classNames(
                                      'ml-3 flex-none text-xs py-1 px-1 font-semibold text-white uppercase tracking-wider',
                                      
                                    )}
                                    style={{ border: '1px solid white', borderRadius: '5px'}}
                                  >
                                    <kbd className="font-sans">⌘ </kbd>
                                    <kbd className="font-sans">ESC</kbd>
                                  </span>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className='flex flex-1 flex-col justify-between'>
                        <div className='divide-y divide-gray-200 px-4 sm:px-6'>
                          <div className='space-y-6 pt-6 pb-5'>
                          <div>
                            <div className=' text-lg font-medium'>{calendarEvent && calendarEvent.title || 'Event'}</div>
                          <div className='mt-6'>
                          <label htmlFor="project-name" className="block mt-2 text-sm font-medium text-gray-500">
                                Event Description
                              </label>
                              <dl className="mt-1 divide-y divide-gray-200 border-t border-b-0 border-gray-200"></dl>
                        <h5 className=" mt-2 font-medium text-sm break-words text-gray-900">{ calendarEvent && (calendarEvent.description)  || 'Description' }</h5>
                        <dl className="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200">
                          <div className="flex justify-between py-3 text-sm font-medium">
                            <dt className="text-gray-500">Scheduled Time</dt>
                            <dd className="text-gray-900">{startTimeFormatted} - {endTimeFormatted}</dd>
                          </div>
                          <div className="flex justify-between py-3 text-sm font-medium">
                            <dt className="text-gray-500">Scheduled Date</dt>
                            <dd className="text-gray-900">{startDateFormatted}</dd>
                          </div>
                        </dl>
                          </div>
                      </div>
                            {/* <div>
                              <label
                                htmlFor='description'
                                className='block text-sm font-medium text-gray-900'
                              >
                                Description
                              </label>
                              <div className='mt-1'>
                                <textarea
                                  id='description'
                                  name='description'
                                  rows={4}
                                  className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                                  defaultValue={''}
                                />
                              </div>
                            </div> */}
                            <div>
                              <h3 className='text-sm font-medium text-gray-900'>
                                Team Members
                              </h3>
                              <div className='mt-2'>
                                <div className='flex space-x-2'>
                                  {team.map((person) => (
                                    <a
                                      key={person.email}
                                      href={person.href}
                                      className='rounded-full hover:opacity-75'
                                    >
                                      <img
                                        className='inline-block h-8 w-8 rounded-full'
                                        src={person.imageUrl}
                                        alt={person.name}
                                      />
                                    </a>
                                  ))}
                                  <button
                                    type='button'
                                    className='inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-dashed border-gray-200 bg-white text-gray-400 hover:border-gray-300 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                                  >
                                    <span className='sr-only'>
                                      Add team member
                                    </span>
                                    <PlusIcon
                                      className='h-5 w-5'
                                      aria-hidden='true'
                                    />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className='flex flex-shrink-0 justify-end px-4 py-4'>
                      <button
                        type='button'
                        className='rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                        onClick={() => setOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type='submit'
                        className='ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                      >
                        Save
                      </button>
                    </div> */}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
