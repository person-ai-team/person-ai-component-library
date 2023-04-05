/* eslint-disable react-hooks/exhaustive-deps */
/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from '@headlessui/react';
import { Tab } from '@headlessui/react';
import { Listbox } from '@headlessui/react';
import { format, getTime, addHours, addMinutes } from 'date-fns';
import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
// import required modules
import { EffectFade, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import Todo from '@/components/Todo/Todo';

import { CalendarContext } from '../../../common/CalendarContext';
import * as Constants from '../../../common/constants';

import DatePicker from './EngineComponents/DatePicker';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function CreateEvent() {
  const { stateCalendar, setStateCalendar } = useContext(CalendarContext);
  const {
    createEventsDrawer,
    selectedDate,
    eventBeginTime,
    eventEndTime,
    title,
    description,
    eventID,
  } = stateCalendar;
  const [openModal, setOpenModal] = useState(createEventsDrawer);
  const eventType = 'calendarEvent' || 'habitEvent' || 'goalEvent';

  const originalValue = eventBeginTime.value
    ? Constants.timeOptions.findIndex(
        (item: any) => item.value === eventBeginTime.value
      )
    : 0;
  const originalValueTime = Constants.timeOptions[originalValue];

  const endValue = eventEndTime.value
    ? Constants.timeOptions.findIndex(
        (item: any) => item.value === eventEndTime.value
      )
    : 0;
  const endValueTime = Constants.timeOptions[endValue];

  const [selected, setSelected] = useState(originalValueTime || 0);
  const [endSelected, setEndSelected] = useState(Constants.eventDurationOptions[3].name);

  const [calendarEventType, setCalendarEventType] = useState('Work');

  console.log('calendarEventType', calendarEventType);


  const [findElement, setFindElement] = useState(false);
  const [habitName, setHabitName] = useState('');
  const [habitFrequency, setHabitFrequency] = useState(
    Constants.habitFrequencyOptions[0].name
  );
  const [habitDuration, setHabitDuration] = useState(
    Constants.durationOptions[1].name
  );

  const [habitNext, setHabitNext] = useState(false);
  const [habitPrev, setHabitPrev] = useState(false);

  const [activeHabitIndex, setActiveHabitIndex] = useState<string | null>();
  const [activeExercisePlan, setActiveExercisePlan] = useState<string | null>(
    ''
  );
  const [runningOption, setRunningOption] = useState(
    Constants.runningDistanceOptions[0].name
  );
  const [runningBikingOption, setRunningBikingOption] = useState(
    Constants.runningBikingFrequencyOptions[0].name
  );
  const [strengthTrainingPlan, setStrengthTrainingPlan] = useState(
    Constants.strengthTrainingPlans[0].name
  );
  const [meditationPlan, setMeditationPlan] = useState(
    Constants.meditationPlans[0].name
  );
  const [mindfulPlan, setMindfulPlan] = useState(
    Constants.mindfulPlans[0].name
  );
  const [gratitudePlan, setGratitudePlan] = useState(
    Constants.gratitudePlans[0].name
  );
  const [yogaPlan, setYogaPlan] = useState(Constants.yogaPlans[0].name);
  const [meditationDuration, setMeditationDuration] = useState(
    Constants.meditationDurations[0].name
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedGoalIndex, setSelectedGoalIndex] = useState(0);
  const [studyName, setStudyName] = useState('');
  const [studyLocation, setStudyLocation] = useState('');

  const [swiper, setSwiper] = useState<any | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const [titleTF, setTitleTF] = useState(title);
  const [eventBeginDate, setEventBeginDate] = useState(selectedDate);
  const [descriptionTF, setDescriptionTF] = useState(description);

  useEffect(() => {
    setTitleTF(title);
    // after title is set, set it back to an empty string
    // if dialog is closed, title will be set to an empty string
    // if dialog is opened, title will be set to the previous title
  }, [title]);

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, [selectedIndex]);

  // if habit name is journaling, slide to the next swiper slide
  useEffect(() => {
    if (
      habitName === 'Journaling' ||
      habitName === 'Meal Prep' ||
      habitName === 'Self Care' ||
      habitName === 'Budgeting'
    ) {
      setHabitNext(true);
      setHabitPrev(false)
    } else {
      setHabitNext(false);
    }
  }, [habitName]);

  useEffect(() => {
    if (habitName === 'Exercise' || habitName === 'Studying' || habitName === 'Meditation' || habitName === 'Decluttering') {
      setHabitPrev(true);
      setHabitNext(false);
    } else 
    {
      setHabitPrev(false);
    }
  }, [habitName]);

  console.log('habitNext', habitNext);
  console.log('habitPrev', habitPrev);

  const slideTo = (index: any) => {
    if (swiper) swiper.slideTo(index);
  };

  

  useEffect(() => {
    if (swiper && habitPrev === true) {
      swiper.slideTo(0, 1000, false);
    }
  }, [habitPrev]);

  useEffect(() => {
    if (swiper && habitNext === true) {
      swiper.slideTo(1, 1000, false);
    }
  }, [habitNext]);

  useEffect(() => {
    setActiveHabitIndex('');
  }, [selectedIndex]);

  useEffect(() => {
    setDescriptionTF(description);
  }, [description]);

  useEffect(() => {
    setStudyName('');
    setStudyLocation('');
    setActiveExercisePlan('');
  }, [activeHabitIndex]);

  const onExit = () => {
    setTitleTF('');
    setDescriptionTF('');
    setStateCalendar({
      ...stateCalendar,
      createEventsDrawer: false,
    });
  };

  useEffect(() => {
    if (originalValueTime) {
      setSelected(originalValueTime);
    }
  }, [originalValueTime]);

  // useEffect(() => {
  //   if (endValueTime) {
  //     setEndSelected(endValueTime);
  //   }
  // }, [endValueTime, originalValueTime]);

  const [tabs] = useState({
    Event: [
      {
        id: 0,
      },
    ],
    Habit: [
      {
        id: 1,
      },
    ],
    Goals: [
      {
        id: 2,
      },
    ],
    Journal: [
      {
        id: 3,
      },
    ],
  });

  const [goalTabs] = useState({
    'Daily Goals': [
      {
        id: 0,
      },
    ],
    'Weekly Goals': [
      {
        id: 1,
      },
    ],
    'Monthly Goals': [
      {
        id: 2,
      },
    ],
  });

  useEffect(() => {
    const now = new Date();
    // const currentTime = format(now, "hh:mm a")
    // get rounded Current Time
    const currentTime = format(
      new Date(
        Math.ceil(now.getTime() / (Constants.interval * 60 * 1000)) *
          (Constants.interval * 60 * 1000)
      ),
      'h:mm a'
    );
    // console.log('currentTime', current Time);
    const currentTimeLabel = format(
      new Date(
        Math.ceil(now.getTime() / (Constants.interval * 60 * 1000)) *
          (Constants.interval * 60 * 1000)
      ),
      'h:mm a'
    );
    // const oneHourLater = format(new Date(now.getTime() + 1  * 60 * 60 * 1000), "hh:mm a")
    const oneHourLater = format(
      new Date(
        Math.ceil(
          (now.getTime() + 1 * 60 * 60 * 1000) /
            (Constants.interval * 60 * 1000)
        ) *
          (Constants.interval * 60 * 1000)
      ),
      'h:mm a'
    );
    const oneHourLaterLabel = format(
      new Date(
        Math.ceil(
          (now.getTime() + 1 * 60 * 60 * 1000) /
            (Constants.interval * 60 * 1000)
        ) *
          (Constants.interval * 60 * 1000)
      ),
      'h:mm a'
    );

    setStateCalendar({
      ...stateCalendar,
      eventBeginTime: { value: currentTime, label: currentTimeLabel },
      eventEndTime: { value: oneHourLater, label: oneHourLaterLabel },
    });
  }, [createEventsDrawer]);

  const onChangeBeginTime = (newValue: any) => {
    // seperate the hour and minutes from the label and add an hour to it for the end time label
    const hour = parseInt(newValue.label.split(':')[0]);
    console.log('newValue', newValue)
    // split the 2 digits after the : and parse it to an integer
    const minutes = parseInt(newValue.label.split(':')[1]);
    // get the last two elements of the label
    const minutesLabel = newValue.label.split(':').slice(-1)[0];
    const newHour = hour + 1;
    const newMinutes = minutes;
    const newLabel = newHour + ':' + minutesLabel;
    if (newValue.value === '11:00 am') {
      const newHour = 12;
      const newLabel = newHour + ':' + '00' + ' ' + 'pm';
      console.log('newLabel it works', newLabel);
      setStateCalendar({
        ...stateCalendar,
        eventEndTime: { label: newLabel, value: newLabel },
      });
    }
    console.log('newLabel', newLabel)

    setStateCalendar({
      ...stateCalendar,
      eventBeginTime: newValue,
      // eventEndTime: { label: newLabel, value: newLabel },
    });
  };

  console.log('eventBeginTime', eventBeginTime);
  console.log('eventEndTime', eventEndTime);

  const onChangeEndTime = (newValue: any) => {
    // setStateCalendar({ ...stateCalendar, eventEndTime: newValue  });
    // using the new value of constants.eventDurationoptions, calculate the end time
    setEndSelected(newValue);


    console.log('onChangeEndTime: newValue', eventEndTime);
    console.log('onChangeEndTime: newValue', newValue);
    const hour = parseInt(eventEndTime.label.split(':')[0]);
    console.log('hour', hour);
    // split the 2 digits after the : and parse it to an integer
    // const minutes = parseInt(eventEndTime.label.split(':')[1]);
    // get the two digits after the :
    const minutes = eventEndTime.label.split(':')[1].split(' ')[0];
    console.log('minutes', minutes);
    // get the last two elements of the label
    const minutesLabel = eventEndTime.label.slice(-2)
    console.log('minutesLabel', minutesLabel);
    // if new value is 15 minutes, add 15 minutes to the current time
    if (newValue === '15 minutes') {
      const newMinutes = parseInt(minutes) + 15;
      const newLabel = (hour - 1) + ':' + newMinutes + ' ' + minutesLabel;
      console.log('newLabel', newLabel);
      setStateCalendar({
        ...stateCalendar,
        eventEndTime: { label: newLabel, value: newLabel },
      });
    }
    // if new value is 30 minutes, add 30 minutes to the current time
    if (newValue === '30 minutes') {
      const newMinutes = parseInt(minutes) + 30;
      const newLabel = (hour - 1) + ':' + newMinutes + ' ' + minutesLabel;
      console.log('newLabel', newLabel);
      setStateCalendar({
        ...stateCalendar,
        eventEndTime: { label: newLabel, value: newLabel },
      });
    }
    if (newValue === '45 minutes') {
      const newMinutes = parseInt(minutes) + 45;
      const newLabel = (hour - 1) + ':' + newMinutes + ' ' + minutesLabel;
      console.log('newLabel', newLabel);
      setStateCalendar({
        ...stateCalendar,
        eventEndTime: { label: newLabel, value: newLabel },
      });
    }
    // if new value is 1 hour, add 1 hour to the current time
    if (newValue === '1 hour') {
      const newHour = hour ;
      // if new hour is over 12, 
      const newMinutes = minutes;
      const newLabel = newHour + ':' + newMinutes + ' ' + minutesLabel;
      if (eventBeginTime.value === '11:00 am') {
        const newHour = 12;
        const newLabel = newHour + ':' + newMinutes + ' ' + 'pm';
        console.log('newLabel it works', newLabel);
        setStateCalendar({
          ...stateCalendar,
          eventEndTime: { label: newLabel, value: newLabel },
        });
      }
      if (eventBeginTime.value === '11:00 pm') {
        const newHour = 12;
        const newLabel = newHour + ':' + newMinutes + ' ' + 'am';
        console.log('newLabel it works', newLabel);
        setStateCalendar({
          ...stateCalendar,
          eventEndTime: { label: newLabel, value: newLabel },
        });
      }
    }
    // if new value is 2 hours, add 2 hours to the current time
    if (newValue === '2 hours') {
      const newHour = hour + 1;
      const newMinutes = minutes;
      const newLabel = newHour + ':' + newMinutes + ' ' + minutesLabel;
      console.log('newLabel', newLabel);
      setStateCalendar({
        ...stateCalendar,
        eventEndTime: { label: newLabel, value: newLabel },
      });
    }
    // if new value is 3 hours, add 3 hours to the current time
    if (newValue === '3 hours') {
      const newHour = hour + 2;
      const newMinutes = minutes;
      const newLabel = newHour + ':' + newMinutes + ' ' + minutesLabel;
      console.log('newLabel', newLabel);
      setStateCalendar({
        ...stateCalendar,
        eventEndTime: { label: newLabel, value: newLabel },
      });
    }
    // if new value is 4 hours, add 4 hours to the current time
    if (newValue === '4 hours') {
      const newHour = hour + 3;
      const newMinutes = minutes;
      const newLabel = newHour + ':' + newMinutes + ' ' + minutesLabel;
      console.log('newLabel', newLabel);
      setStateCalendar({
        ...stateCalendar,
        eventEndTime: { label: newLabel, value: newLabel },
      });
    }
    // if new value is 5 hours, add 5 hours to the current time
    if (newValue === '5 hours') {
      const newHour = hour + 4;
      const newMinutes = minutes;
      const newLabel = newHour + ':' + newMinutes + ' ' + minutesLabel;
      console.log('newLabel', newLabel);
      setStateCalendar({
        ...stateCalendar,
        eventEndTime: { label: newLabel, value: newLabel },
      });
    }
    
  };

  // use useEffect to set marker to the state
  useEffect(() => {
    const localStorageMarkers = window.localStorage.getItem('markers');
    const markers = localStorageMarkers ? JSON.parse(localStorageMarkers) : [];
  }, [createEventsDrawer]);

  const formatDateTime = (newDate: Date, newTime: string) => {
    // console.log("formatDateTime: newDate", newDate)
    // console.log("formatDateTime: newTime", newTime)
    const dateTxt = format(newDate, 'YYYY/MM/DD');
    return new Date(dateTxt + ' ' + newTime);
  };

  const formatToDay = (newDate: Date) => {
    const dateText = format(newDate, 'dddd');
    return dateText;
  };

  const handleCreateEvent = () => {
    const localStorageMarkers = window.localStorage.getItem('markers');
    const markers = localStorageMarkers ? JSON.parse(localStorageMarkers) : [];

    if (selectedIndex === 0) {
      const marker = {
        id: eventID > 0 ? eventID : getTime(new Date()),
        title: titleTF,
        description: descriptionTF,
        start: {
          dateTime: format(
            formatDateTime(eventBeginDate, eventBeginTime.value),
            'YYYY-MM-DD hh:mm:ss a'
          ),
        },
        end: {
          dateTime: format(
            formatDateTime(eventBeginDate, eventEndTime.value),
            'YYYY-MM-DD hh:mm:ss a'
          ),
        },
        standardBegin: eventBeginDate,
        type: 'calendarEvent',
        recurrence: 'none',
        repeat: habitFrequency,
      };

      const newMarkers = [];

      const newBeginDate = formatDateTime(eventBeginDate, eventBeginTime.value);
      const newEndDate = formatDateTime(eventBeginDate, eventEndTime.value);

      if (marker.repeat === 'Does not repeat') {
        newMarkers.push(marker);
      }

      if (marker.repeat === 'Daily') {
        for (let i = 0; i < 365; i++) {
          const newMarker = {
            id: getTime(new Date()) + i,
            title: marker.title,
            start: { dateTime: format(newBeginDate, 'YYYY-MM-DD hh:mm:ss a') },
            end: { dateTime: format(newEndDate, 'YYYY-MM-DD hh:mm:ss a') },
            description: marker.description,
            repeat: marker.repeat,
            type: 'calendarEvent',
            recurrence: 'Daily',
            recurrenceId: marker.id,
          };

          newMarkers.push(newMarker);
          newBeginDate.setDate(newBeginDate.getDate() + 1);
          newEndDate.setDate(newEndDate.getDate() + 1);
        }
      }

      if (marker.repeat === 'Weekly') {
        for (let i = 0; i < 52; i++) {
          const newMarker = {
            id: getTime(new Date()) + i,
            title: marker.title,
            start: { dateTime: format(newBeginDate, 'YYYY-MM-DD hh:mm:ss a') },
            end: { dateTime: format(newEndDate, 'YYYY-MM-DD hh:mm:ss a') },
            description: marker.description,
            repeat: marker.repeat,
            type: 'calendarEvent',
            recurrence: 'Weekly',
            recurrenceId: marker.id,
          };

          newMarkers.push(newMarker);
          newBeginDate.setDate(newBeginDate.getDate() + 7);
          newEndDate.setDate(newEndDate.getDate() + 7);
        }
      }

      if (marker.repeat === 'Monthly') {
        for (let i = 0; i < 12; i++) {
          const newMarker = {
            id: getTime(new Date()) + i,
            title: marker.title,
            start: { dateTime: format(newBeginDate, 'YYYY-MM-DD hh:mm:ss a') },
            end: { dateTime: format(newEndDate, 'YYYY-MM-DD hh:mm:ss a') },
            description: marker.description,
            repeat: marker.repeat,
            type: 'calendarEvent',
            recurrence: 'Monthly',
            recurrenceId: marker.id,
          };

          newMarkers.push(newMarker);
          newBeginDate.setMonth(newBeginDate.getMonth() + 1);
          newEndDate.setMonth(newEndDate.getMonth() + 1);
        }
      }

      window.localStorage.setItem(
        'markers',
        JSON.stringify([
          ...markers.filter((markEvent: any) => markEvent.id !== eventID),
          ...newMarkers,
        ])
      );
    }

    if (selectedIndex === 1) {
      const marker = {
        id: eventID > 0 ? eventID : getTime(new Date()),
        title: titleTF,
        description: descriptionTF,
        start: {
          dateTime: format(
            formatDateTime(eventBeginDate, eventBeginTime.value),
            'YYYY-MM-DD hh:mm:ss a'
          ),
        },
        end: {
          dateTime: format(
            formatDateTime(eventBeginDate, eventEndTime.value),
            'YYYY-MM-DD hh:mm:ss a'
          ),
        },
        repeat: habitFrequency,
        type: 'habitEvent',
      };

      const newMarkers = [];

      const newBeginDate = formatDateTime(eventBeginDate, eventBeginTime.value);
      const newEndDate = formatDateTime(eventBeginDate, eventEndTime.value);

      if (marker.repeat === 'Does not repeat') {
        newMarkers.push(marker);
      }

      if (marker.repeat === 'Daily') {
        for (let i = 0; i < 365; i++) {
          const newMarker = {
            id: getTime(new Date()) + i,
            title: marker.title,
            start: { dateTime: format(newBeginDate, 'YYYY-MM-DD hh:mm:ss a') },
            end: { dateTime: format(newEndDate, 'YYYY-MM-DD hh:mm:ss a') },
            description: marker.description,
            repeat: marker.repeat,
            type: 'habitEvent',
            recurrence: 'Daily',
            recurrenceId: marker.id,
          };

          newMarkers.push(newMarker);

          newBeginDate.setDate(newBeginDate.getDate() + 1);
          newEndDate.setDate(newEndDate.getDate() + 1);
        }
      }

      if (marker.repeat === 'Weekly') {
        for (let i = 0; i < 52; i++) {
          const newMarker = {
            id: getTime(new Date()) + i,
            title: marker.title,
            start: { dateTime: format(newBeginDate, 'YYYY-MM-DD hh:mm:ss a') },
            end: { dateTime: format(newEndDate, 'YYYY-MM-DD hh:mm:ss a') },
            description: marker.description,
            repeat: marker.repeat,
            type: 'habitEvent',
            recurrence: 'Weekly',
            recurrenceId: marker.id,
          };

          newMarkers.push(newMarker);
          newBeginDate.setDate(newBeginDate.getDate() + 7);
          newEndDate.setDate(newEndDate.getDate() + 7);
        }
      }

      if (marker.repeat === 'Monthly') {
        for (let i = 0; i < 12; i++) {
          const newMarker = {
            id: getTime(new Date()) + i,
            title: marker.title,
            start: { dateTime: format(newBeginDate, 'YYYY-MM-DD hh:mm:ss a') },
            end: { dateTime: format(newEndDate, 'YYYY-MM-DD hh:mm:ss a') },
            description: marker.description,
            repeat: marker.repeat,
            type: 'habitEvent',
            recurrence: 'Monthly',
            recurrenceId: marker.id,
          };

          newMarkers.push(newMarker);
          newBeginDate.setMonth(newBeginDate.getMonth() + 1);
          newEndDate.setMonth(newEndDate.getMonth() + 1);
        }
      }

      window.localStorage.setItem(
        'markers',
        JSON.stringify([
          ...markers.filter((markEvent: any) => markEvent.id !== eventID),
          ...newMarkers,
        ])
      );
    }

    onExit();
  };

  const cancelButtonRef = useRef(null);

  return (
    <Draggable handle='#draggable-dialog-title'>
      <Transition.Root show={createEventsDrawer} as={Fragment}>
        <Dialog
          as='div'
          initialFocus={inputRef}
          className='fixed inset-0 z-50'
          static
          aria-labelledby='draggable-dialog-title'
          onClose={setOpenModal}
        >
          <div className='flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='bg-opacity-1 fixed inset-0 transition-opacity' />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className='hidden sm:inline-block sm:h-screen sm:align-middle'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              {/* <Draggable> */}
              <div 
                className='inline-block transform rounded-lg bg-gradient-to-b from-sky-500 to-sky-100 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle'
                // style={{ backgroundColor: 'lightsteelblue' }}
              >
                <div
                  className=' items-center justify-between px-4 py-3 sm:px-6'
                  style={{ height: '630px' }}
                >
                  <div className=' flex h-7 items-center cursor-pointer' id='draggable-dialog-title'>
                    <div style={{ marginTop: '-6px' }}>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke-width='1.5'
                        stroke='currentColor'
                        className='h-6 w-6'
                      >
                        <path
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          d='M3.75 9h16.5m-16.5 6.75h16.5'
                        />
                      </svg>
                    </div>

                    <button
                      type='button'
                      style={{ marginLeft: 'auto', marginTop: '-10px' }}
                      onClick={() => {
                        onExit();
                      }}
                    >
                      <span className='sr-only'>Close</span>
                      <svg
                        className='h-6 w-6'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        aria-hidden='true'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={1.5}
                          d='M6 18L18 6M6 6l12 12'
                        />
                      </svg>
                    </button>
                  </div>
                  <dl className="mt-1 divide-dashed divide-y divide-black border-t border-b-0  border-black"></dl>
                  <div style={{ marginTop: '15px' }}>
                    <label htmlFor='text' className='sr-only'>
                      Title
                    </label>
                    <div className='mt-1'>
                      {selectedIndex === 0 && (
                        // <div>
                        // <input
                        //   type='text'
                        //   name='title'
                        //   ref={inputRef}
                        //   value={titleTF}
                        //   onChange={(
                        //     event: React.ChangeEvent<HTMLInputElement>
                        //   ) => {
                        //     setTitleTF(event.target.value);
                        //   }}
                        //   id='title'
                        //   style={{
                        //     outline: 'none',
                        //     boxShadow: 'none',
                        //     border: '1px solid black',
                        //   }}
                        //   className='block w-full rounded-full  px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                        //   placeholder='Add Event'
                        // />
                        // </div>
                        <div>
  <div className="relative mt-1 rounded-full shadow-sm">
    <input type="text" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setTitleTF(event.target.value)}} style={{outline: 'none', boxShadow: 'none', border: '1px solid black'}} name="title" value={titleTF} ref={inputRef} id="title" className="block w-full rounded-full border-gray-300 pl-7 py-2 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Add Title" />
    <div className="absolute inset-y-0 right-0 flex items-center">
      <select onChange={(e) => setCalendarEventType(e.target.value) } style={{outline: 'none', boxShadow: 'none', border: 'none'}} id="calendarEventType" name="calendarEventType" className="h-full text-right rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 text-black sm:text-sm">
        <option>Work</option>
        <option>Personal</option>
        <option>Medical</option>
      </select>
    </div>
  </div>
</div>
                        
                      )}
                      {selectedIndex === 1 && (
                        <input
                          type='text'
                          name='title'
                          // ref={inputRef}
                          value={`${
                            activeHabitIndex === 'Studying'
                              ? activeHabitIndex +
                                ' : ' +
                                studyName +
                                ' at ' +
                                studyLocation
                              : activeHabitIndex === 'Exercise' &&
                                (activeExercisePlan === 'Running' ||
                                  activeExercisePlan === 'Biking') &&
                                runningBikingOption === 'Weekly on'
                              ? activeHabitIndex +
                                ' : ' +
                                activeExercisePlan +
                                ' ' +
                                runningOption +
                                ' ' +
                                runningBikingOption.toLowerCase() +
                                ' ' +
                                formatToDay(eventBeginDate) +
                                's'
                              : activeHabitIndex === 'Exercise' &&
                                (activeExercisePlan === 'Running' ||
                                  activeExercisePlan === 'Biking') &&
                                runningBikingOption !== 'Weekly on'
                              ? activeHabitIndex +
                                ' : ' +
                                activeExercisePlan +
                                ' ' +
                                runningOption +
                                ' ' +
                                runningBikingOption.toLowerCase()
                              : activeHabitIndex === 'Exercise' &&
                                activeExercisePlan === 'Stretching' &&
                                runningBikingOption === 'Weekly on'
                              ? activeHabitIndex +
                                ' : ' +
                                activeExercisePlan +
                                ' ' +
                                'for ' +
                                habitDuration +
                                ' ' +
                                runningBikingOption.toLowerCase() +
                                ' ' +
                                formatToDay(eventBeginDate) +
                                's'
                              : activeHabitIndex === 'Exercise' &&
                                activeExercisePlan === 'Stretching' &&
                                runningBikingOption !== 'Weekly on'
                              ? activeHabitIndex +
                                ' : ' +
                                activeExercisePlan +
                                ' ' +
                                'for ' +
                                habitDuration +
                                ' ' +
                                runningBikingOption.toLowerCase()
                              : activeHabitIndex === 'Exercise' &&
                                activeExercisePlan === 'Strength Training' &&
                                runningBikingOption === 'Weekly on'
                              ? activeHabitIndex +
                                ' : ' +
                                strengthTrainingPlan +
                                ' ' +
                                'for ' +
                                habitDuration +
                                ' ' +
                                runningBikingOption.toLowerCase() +
                                ' ' +
                                formatToDay(eventBeginDate) +
                                's'
                              : activeHabitIndex === 'Exercise' &&
                                activeExercisePlan === 'Strength Training' &&
                                runningBikingOption !== 'Weekly on'
                              ? activeHabitIndex +
                                ' : ' +
                                strengthTrainingPlan +
                                ' ' +
                                'for ' +
                                habitDuration +
                                ' ' +
                                runningBikingOption.toLowerCase()
                              : activeHabitIndex === 'Exercise'
                              ? activeHabitIndex +
                                ' : ' +
                                activeExercisePlan +
                                ' '
                              : titleTF
                          }`}
                          // onChange={(
                          //   event: React.ChangeEvent<HTMLInputElement>
                          // ) => {
                          //   setTitleTF(event.target.value);
                          //   setActiveHabitIndex(null);
                          //   setRunningOption('');
                          // }}
                          id='title'
                          style={{
                            outline: 'none',
                            boxShadow: 'none',
                            border: '1px solid black',
                          }}
                          className='block w-full rounded-full bg-gray-200 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                          placeholder={`${
                            activeHabitIndex ? activeHabitIndex : ''
                          }`}
                        />
                      )}
                    </div>
                  </div>
                  <div style={{ marginTop: '15px' }}>
                    <div className='mx-auto  items-center justify-center'>
                      <Tab.Group
                        selectedIndex={selectedIndex}
                        onChange={setSelectedIndex}
                      >
                        <Tab.List className='flex space-x-1 rounded-xl  p-1'>
                          {Object.keys(tabs).map((tab) => (
                            <Tab
                              key={tab}
                              style={{
                                outline: 'none',
                                boxShadow: 'none',
                                border: 'none',
                                borderBottom: '1px solid black',
                              }}
                              className={({ selected }) =>
                                classNames(
                                  'font-small w-24 rounded-full  bg-white py-2.5 text-sm leading-5 ',
                                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                  selected
                                    ? 'bg-gradient-to-r from-rose-100 to-teal-100 text-black shadow'
                                    : 'text-rose-800 hover:bg-white/[0.12] hover:text-black'
                                )
                              }
                            >
                              {tab}
                            </Tab>
                          ))}
                        </Tab.List>
                        <Tab.Panels className='mt-2'>
                          {Object.values(tabs).map((posts, idx) => (
                            <Tab.Panel
                              key={idx}
                              style={{
                                backgroundColor: 'aliceblue',
                                boxShadow: 'none',
                              }}
                              className={classNames(
                                'rounded-xl  p-3',
                                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                              )}
                            >
                              {selectedIndex === 0 && (
                                <div
                                  style={{
                                    display: 'flex',
                                  }}
                                >
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke-width='1.5'
                                    stroke='currentColor'
                                    className='h-6 w-6'
                                    style={{
                                      marginTop: '10px',
                                      marginRight: '9px',
                                    }}
                                  >
                                    <path
                                      stroke-linecap='round'
                                      stroke-linejoin='round'
                                      d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z'
                                    />
                                  </svg>

                                  <div style={{ marginTop: 10 }}>
                                    <DatePicker
                                      eventBeginDate={eventBeginDate}
                                      setEventBeginDate={setEventBeginDate}
                                      selectedIndex={selectedIndex}
                                    />
                                  </div>

                                  {/* <div
                                  className='relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600'
                                  style={{
                                    marginTop: '10px',
                                    marginRight: '9px',
                                  }}
                                >
                                  <label
                                    htmlFor='name'
                                    className='absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900'
                                    style={{ fontSize: '10px' }}
                                  >
                                    Event Date
                                  </label>
                                  <input
                                    type='date'
                                    name='Date'
                                    id='Date'
                                    // value='2023-02-03'
                                    min='2023-01-01'
                                    max='2023-12-31'
                                    placeholder='Date'
                                    className='block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm'
                                    style={{ fontSize: '11px' }}
                                  />
                                  
                                </div> */}

                                  <div
                                    style={{
                                      display: 'flex',
                                      marginTop: '10px',
                                      marginLeft: '70px',
                                    }}
                                  >
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      fill='none'
                                      viewBox='0 0 24 24'
                                      stroke-width='1.5'
                                      stroke='currentColor'
                                      className='h-6 w-6'
                                    >
                                      <path
                                        stroke-linecap='round'
                                        stroke-linejoin='round'
                                        d='M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z'
                                      />
                                    </svg>

                                    <div
                                      style={{
                                        marginTop: '1',
                                        marginLeft: '0px',
                                        display: 'inline-block',
                                      }}
                                    >
                                      <div>
                                        <label
                                          htmlFor='startTime'
                                          className='font-small block text-black'
                                          style={{
                                            marginLeft: 10,
                                            fontSize: 11,
                                            fontWeight: 350,
                                          }}
                                        >
                                          Start Time
                                        </label>
                                      </div>
                                      <div
                                        style={{ marginTop: 7, marginLeft: -5 }}
                                      >
                                        <Listbox
                                          value={selected}
                                          onChange={onChangeBeginTime}
                                        >
                                          <Listbox.Button
                                            onClick={() => {
                                              setFindElement(true);
                                            }}
                                            className='font-small relative w-20 cursor-default rounded-full border border-gray-300 bg-white py-2 text-center text-xs text-black shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                                            style={{
                                              outline: 'none',
                                              boxShadow: 'none',
                                              border: '1px solid',
                                            }}
                                          >
                                            <span className='block truncate'>
                                              {selected.label ||
                                                eventBeginTime.label}
                                            </span>
                                          </Listbox.Button>
                                          <Listbox.Options
                                            style={{ marginLeft: 1 }}
                                            className='w-30 font-small absolute z-30 mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base text-xs shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
                                          >
                                            {Constants.timeOptions.map(
                                              (time: any, idx: any) => (
                                                <Listbox.Option
                                                  key={idx}
                                                  className={({
                                                    active,
                                                    selected,
                                                  }) =>
                                                    `${
                                                      active
                                                        ? 'bg-sky-700 text-left text-stone-50'
                                                        : 'text-left text-gray-900'
                                                    }
                                                                ${
                                                                  selected
                                                                    ? 'bg-sky-600 text-left text-stone-50'
                                                                    : 'text-left text-gray-900'
                                                                }
                                                                font-small relative cursor-default select-none py-2 pl-2 pr-4 text-left text-xs`
                                                  }
                                                  value={time}
                                                >
                                                  {({ selected, active }) => (
                                                    <>
                                                      <span
                                                        className={`${
                                                          selected
                                                            ? 'font-small'
                                                            : 'font-normal'
                                                        } block truncate`}
                                                      >
                                                        {time.label}
                                                      </span>
                                                    </>
                                                  )}
                                                </Listbox.Option>
                                              )
                                            )}
                                          </Listbox.Options>
                                        </Listbox>
                                      </div>

                                      <div>
                                        {idx === 0 ? (
                                          <label
                                            htmlFor='endTime'
                                            className='font-small block text-black'
                                            style={{
                                              marginLeft: 96,
                                              fontSize: 11,
                                              marginTop: -65,
                                              fontWeight: 350,
                                            }}
                                          >
                                            Duration
                                          </label>
                                        ) : null}
                                      </div>
                                      <div>
                                        {idx === 0 ? (
                                          <Listbox
                                            value={endSelected}
                                            onChange={onChangeEndTime}
                                          >
                                            <Listbox.Button
                                              onClick={() => {
                                                setFindElement(true);
                                              }}
                                              className='font-small relative w-20 cursor-default rounded-full border border-gray-300 bg-white py-2 text-center text-center text-center text-xs text-black shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                                              style={{
                                                outline: 'none',
                                                boxShadow: 'none',
                                                border: '1px solid',
                                                marginLeft: 89,
                                                marginTop: 6,
                                              }}
                                            >
                                              <span className='block truncate'>
                                                {endSelected 
                                                  }
                                              </span>
                                            </Listbox.Button>
                                            <Listbox.Options
                                              className='w-30 absolute z-30 mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
                                              style={{ marginLeft: 85 }}
                                            >
                                              {Constants.eventDurationOptions.map(
                                                (time: any, idx: any) => (
                                                  <Listbox.Option
                                                    key={idx}
                                                    className={({
                                                      active,
                                                      selected,
                                                    }) =>
                                                      `${
                                                        active
                                                          ? 'bg-sky-700 text-center text-stone-50'
                                                          : 'text-center text-gray-900'
                                                      }
                                                                ${
                                                                  selected
                                                                    ? 'bg-sky-600 text-center text-stone-50'
                                                                    : 'text-center text-gray-900'
                                                                }
                                                                font-small relative cursor-default select-none py-2 pl-2 pr-4 text-center text-xs`
                                                    }
                                                    value={time.name}
                                                  >
                                                    {({ selected, active }) => (
                                                      <>
                                                        <span
                                                          className={`${
                                                            selected
                                                              ? 'font-small'
                                                              : 'font-normal'
                                                          } block truncate`}
                                                        >
                                                          {time.name}
                                                        </span>
                                                      </>
                                                    )}
                                                  </Listbox.Option>
                                                )
                                              )}
                                            </Listbox.Options>
                                          </Listbox>
                                        ) : null}
                                      </div>
                                    </div>
                                  </div>

                                  {/* <input type="date" id="start" name="trip-start"
                                    value="2018-07-22"
                                    min="2018-01-01" max="2018-12-31" style={{ borderRadius: '30px'}} /> */}
                                </div>
                              )}
                              {selectedIndex === 1 && (
                                <div
                                  style={{
                                    display: 'flex',
                                  }}
                                >
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke-width='1.5'
                                    stroke='currentColor'
                                    className='h-6 w-6'
                                    style={{
                                      marginTop: '10px',
                                      marginRight: '9px',
                                      position: 'absolute',
                                    }}
                                  >
                                    <path
                                      stroke-linecap='round'
                                      stroke-linejoin='round'
                                      d='M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z'
                                    />
                                  </svg>
                                  <div
                                    style={{
                                      display: 'flex',
                                      marginTop: '5px',
                                      marginLeft: '45px',
                                    }}
                                  >
                                    <div mt-1>
                                      <label
                                        htmlFor='datepicker'
                                        className='font-small block text-black'
                                        style={{
                                          marginLeft: -5,
                                          fontSize: 11,
                                          marginTop: 5,
                                          fontWeight: 350,
                                        }}
                                      >
                                        Habit
                                      </label>
                                      <div
                                        className='mt-3'
                                        style={{ marginLeft: -9 }}
                                      >
                                        <div className='flex'>
                                          <div className='flex h-5 items-center'>
                                            <input
                                              type='text'
                                              name='name'
                                              id='habit'
                                              value={`${habitName}`}
                                              onChange={(event: any) => {
                                                setHabitName(
                                                  event.target.value
                                                );
                                                setActiveHabitIndex(
                                                  event.target.value
                                                );
                                              }}
                                              style={{
                                                border: '1px solid',
                                                boxShadow: 'none',
                                              }}
                                              className='block w-80 rounded-full border-gray-300 px-4 text-xs text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                                              placeholder='Add Habit'
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div
                                        className='mt-3'
                                        style={{ marginLeft: -9 }}
                                      >
                                        <Swiper
                                          width={400}
                                          speed={100}
                                          // loop={true}
                                          effect='fade'
                                          onSwiper={setSwiper}
                                          navigation={{
                                            nextEl: '.swiper-button-next',
                                            prevEl: '.swiper-button-prev',
                                          }}
                                          modules={[Navigation, EffectFade]}
                                          fadeEffect={{
                                            crossFade: true,
                                          }}
                                          className='mySwiper'
                                        >
                                          <SwiperSlide id='first-buttons'>
                                            <div className='flex'>
                                              <div className='space-x flex h-9 items-center'>
                                                <button
                                                  type='button'
                                                  style={{
                                                    border: '1px solid',
                                                    outline: 'none',
                                                    boxShadow: 'none',
                                                  }}
                                                  onClick={() => {
                                                    setActiveHabitIndex(
                                                      'Studying'
                                                    );
                                                    setHabitName('Studying');
                                                  }}
                                                  className={`font-small inline-flex items-center rounded-full border border-transparent px-1 py-2 text-sm text-xs leading-4 text-black shadow-sm hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                                                    activeHabitIndex ===
                                                    'Studying'
                                                      ? 'bg-blue-400'
                                                      : 'bg-white'
                                                  } `}
                                                >
                                                  Studying
                                                  {activeHabitIndex ===
                                                  'Studying' ? (
                                                    <svg
                                                      xmlns='http://www.w3.org/2000/svg'
                                                      fill='none'
                                                      viewBox='0 0 24 24'
                                                      stroke-width='1.5'
                                                      stroke='currentColor'
                                                      className='ml-1 -mr-0.5 h-4 w-4'
                                                    >
                                                      <path
                                                        stroke-linecap='round'
                                                        stroke-linejoin='round'
                                                        d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                                                      />
                                                    </svg>
                                                  ) : (
                                                    <svg
                                                      xmlns='http://www.w3.org/2000/svg'
                                                      fill='none'
                                                      viewBox='0 0 24 24'
                                                      stroke-width='1.5'
                                                      stroke='currentColor'
                                                      className='ml-1 -mr-0.5 h-4 w-4'
                                                    >
                                                      <path
                                                        stroke-linecap='round'
                                                        stroke-linejoin='round'
                                                        d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                                                      />
                                                    </svg>
                                                  )}
                                                </button>
                                                <button
                                                  type='button'
                                                  style={{
                                                    border: '1px solid',
                                                    outline: 'none',
                                                    boxShadow: 'none',
                                                  }}
                                                  onClick={() => {
                                                    setActiveHabitIndex(
                                                      'Exercise'
                                                    );
                                                    setHabitName('Exercise');
                                                  }}
                                                  className={`font-small ml-1 inline-flex items-center rounded-full border border-transparent px-1 py-2 text-sm text-xs leading-4 text-black shadow-sm hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                                                    activeHabitIndex ===
                                                    'Exercise'
                                                      ? 'bg-blue-400'
                                                      : 'bg-white'
                                                  } `}
                                                >
                                                  Exercise
                                                  {activeHabitIndex ===
                                                  'Exercise' ? (
                                                    <svg
                                                      xmlns='http://www.w3.org/2000/svg'
                                                      fill='none'
                                                      viewBox='0 0 24 24'
                                                      stroke-width='1.5'
                                                      stroke='currentColor'
                                                      className='ml-1 -mr-0.5 h-4 w-4'
                                                    >
                                                      <path
                                                        stroke-linecap='round'
                                                        stroke-linejoin='round'
                                                        d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                                                      />
                                                    </svg>
                                                  ) : (
                                                    <svg
                                                      xmlns='http://www.w3.org/2000/svg'
                                                      fill='none'
                                                      viewBox='0 0 24 24'
                                                      stroke-width='1.5'
                                                      stroke='currentColor'
                                                      className='ml-1 -mr-0.5 h-4 w-4'
                                                    >
                                                      <path
                                                        stroke-linecap='round'
                                                        stroke-linejoin='round'
                                                        d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                                                      />
                                                    </svg>
                                                  )}
                                                </button>
                                                <button
                                                  type='button'
                                                  style={{
                                                    border: '1px solid',
                                                    outline: 'none',
                                                    boxShadow: 'none',
                                                  }}
                                                  onClick={() => {
                                                    setActiveHabitIndex(
                                                      'Meditation'
                                                    );
                                                    setHabitName('Meditation');
                                                  }}
                                                  className={`font-small ml-1 inline-flex items-center rounded-full border border-transparent px-1 py-2 text-sm text-xs leading-4 text-black shadow-sm hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                                                    activeHabitIndex ===
                                                    'Meditation'
                                                      ? 'bg-blue-400'
                                                      : 'bg-white'
                                                  } `}
                                                >
                                                  Meditation
                                                  {activeHabitIndex ===
                                                  'Meditation' ? (
                                                    <svg
                                                      xmlns='http://www.w3.org/2000/svg'
                                                      fill='none'
                                                      viewBox='0 0 24 24'
                                                      stroke-width='1.5'
                                                      stroke='currentColor'
                                                      className='ml-1 -mr-0.5 h-4 w-4'
                                                    >
                                                      <path
                                                        stroke-linecap='round'
                                                        stroke-linejoin='round'
                                                        d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                                                      />
                                                    </svg>
                                                  ) : (
                                                    <svg
                                                      xmlns='http://www.w3.org/2000/svg'
                                                      fill='none'
                                                      viewBox='0 0 24 24'
                                                      stroke-width='1.5'
                                                      stroke='currentColor'
                                                      className='ml-1 -mr-0.5 h-4 w-4'
                                                    >
                                                      <path
                                                        stroke-linecap='round'
                                                        stroke-linejoin='round'
                                                        d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                                                      />
                                                    </svg>
                                                  )}
                                                </button>
                                                <button
                                                  type='button'
                                                  style={{
                                                    border: '1px solid',
                                                    outline: 'none',
                                                    boxShadow: 'none',
                                                  }}
                                                  onClick={() => {
                                                    setActiveHabitIndex(
                                                      'Decluttering'
                                                    );
                                                    setHabitName(
                                                      'Decluttering'
                                                    );
                                                  }}
                                                  className={`font-small ml-1 inline-flex items-center rounded-full border border-transparent px-1 py-2 text-sm text-xs leading-4 text-black shadow-sm hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                                                    activeHabitIndex ===
                                                    'Decluttering'
                                                      ? 'bg-blue-400'
                                                      : 'bg-white'
                                                  } `}
                                                >
                                                  Decluttering
                                                  {activeHabitIndex ===
                                                  'Decluttering' ? (
                                                    <svg
                                                      xmlns='http://www.w3.org/2000/svg'
                                                      fill='none'
                                                      viewBox='0 0 24 24'
                                                      stroke-width='1.5'
                                                      stroke='currentColor'
                                                      className='ml-1 -mr-0.5 h-4 w-4'
                                                    >
                                                      <path
                                                        stroke-linecap='round'
                                                        stroke-linejoin='round'
                                                        d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                                                      />
                                                    </svg>
                                                  ) : (
                                                    <svg
                                                      xmlns='http://www.w3.org/2000/svg'
                                                      fill='none'
                                                      viewBox='0 0 24 24'
                                                      stroke-width='1.5'
                                                      stroke='currentColor'
                                                      className='ml-1 -mr-0.5 h-4 w-4'
                                                    >
                                                      <path
                                                        stroke-linecap='round'
                                                        stroke-linejoin='round'
                                                        d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                                                      />
                                                    </svg>
                                                  )}
                                                </button>
                                              </div>
                                            </div>
                                          </SwiperSlide>
                                          <SwiperSlide id='second-buttons'>
                                            <div className='flex'>
                                              <div className='space-x flex h-9 items-center'>
                                                <button
                                                  type='button'
                                                  style={{
                                                    border: '1px solid',
                                                    outline: 'none',
                                                    boxShadow: 'none',
                                                  }}
                                                  onClick={() => {
                                                    setActiveHabitIndex(
                                                      'Journaling'
                                                    );
                                                    setHabitName('Journaling');
                                                  }}
                                                  className={`font-small inline-flex items-center rounded-full border border-transparent px-1 py-2 text-sm text-xs leading-4 text-black shadow-sm hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                                                    activeHabitIndex ===
                                                    'Journaling'
                                                      ? 'bg-blue-400'
                                                      : 'bg-white'
                                                  } `}
                                                >
                                                  Journaling
                                                  {activeHabitIndex ===
                                                  'Journaling' ? (
                                                    <svg
                                                      xmlns='http://www.w3.org/2000/svg'
                                                      fill='none'
                                                      viewBox='0 0 24 24'
                                                      stroke-width='1.5'
                                                      stroke='currentColor'
                                                      className='ml-1 -mr-0.5 h-4 w-4'
                                                    >
                                                      <path
                                                        stroke-linecap='round'
                                                        stroke-linejoin='round'
                                                        d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                                                      />
                                                    </svg>
                                                  ) : (
                                                    <svg
                                                      xmlns='http://www.w3.org/2000/svg'
                                                      fill='none'
                                                      viewBox='0 0 24 24'
                                                      stroke-width='1.5'
                                                      stroke='currentColor'
                                                      className='ml-1 -mr-0.5 h-4 w-4'
                                                    >
                                                      <path
                                                        stroke-linecap='round'
                                                        stroke-linejoin='round'
                                                        d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                                                      />
                                                    </svg>
                                                  )}
                                                </button>
                                                <button
                                                  type='button'
                                                  style={{
                                                    border: '1px solid',
                                                    outline: 'none',
                                                    boxShadow: 'none',
                                                  }}
                                                  onClick={() => {
                                                    setActiveHabitIndex(
                                                      'Meal Prep'
                                                    );
                                                    setHabitName('Meal Prep');
                                                  }}
                                                  className={`font-small ml-1 inline-flex items-center rounded-full border border-transparent px-1 py-2 text-sm text-xs leading-4 text-black shadow-sm hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                                                    activeHabitIndex ===
                                                    'Meal Prep'
                                                      ? 'bg-blue-400'
                                                      : 'bg-white'
                                                  } `}
                                                >
                                                  Meal Prep
                                                  {activeHabitIndex ===
                                                  'Meal Prep' ? (
                                                    <svg
                                                      xmlns='http://www.w3.org/2000/svg'
                                                      fill='none'
                                                      viewBox='0 0 24 24'
                                                      stroke-width='1.5'
                                                      stroke='currentColor'
                                                      className='ml-1 -mr-0.5 h-4 w-4'
                                                    >
                                                      <path
                                                        stroke-linecap='round'
                                                        stroke-linejoin='round'
                                                        d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                                                      />
                                                    </svg>
                                                  ) : (
                                                    <svg
                                                      xmlns='http://www.w3.org/2000/svg'
                                                      fill='none'
                                                      viewBox='0 0 24 24'
                                                      stroke-width='1.5'
                                                      stroke='currentColor'
                                                      className='ml-1 -mr-0.5 h-4 w-4'
                                                    >
                                                      <path
                                                        stroke-linecap='round'
                                                        stroke-linejoin='round'
                                                        d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                                                      />
                                                    </svg>
                                                  )}
                                                </button>
                                                <button
                                                  type='button'
                                                  style={{
                                                    border: '1px solid',
                                                    outline: 'none',
                                                    boxShadow: 'none',
                                                  }}
                                                  onClick={() => {
                                                    setActiveHabitIndex(
                                                      'Self Care'
                                                    );
                                                    setHabitName('Self Care');
                                                  }}
                                                  className={`font-small ml-1 inline-flex items-center rounded-full border border-transparent px-1 py-2 text-sm text-xs leading-4 text-black shadow-sm hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                                                    activeHabitIndex ===
                                                    'Self Care'
                                                      ? 'bg-blue-400'
                                                      : 'bg-white'
                                                  } `}
                                                >
                                                  Self Care
                                                  {activeHabitIndex ===
                                                  'Self Care' ? (
                                                    <svg
                                                      xmlns='http://www.w3.org/2000/svg'
                                                      fill='none'
                                                      viewBox='0 0 24 24'
                                                      stroke-width='1.5'
                                                      stroke='currentColor'
                                                      className='ml-1 -mr-0.5 h-4 w-4'
                                                    >
                                                      <path
                                                        stroke-linecap='round'
                                                        stroke-linejoin='round'
                                                        d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                                                      />
                                                    </svg>
                                                  ) : (
                                                    <svg
                                                      xmlns='http://www.w3.org/2000/svg'
                                                      fill='none'
                                                      viewBox='0 0 24 24'
                                                      stroke-width='1.5'
                                                      stroke='currentColor'
                                                      className='ml-1 -mr-0.5 h-4 w-4'
                                                    >
                                                      <path
                                                        stroke-linecap='round'
                                                        stroke-linejoin='round'
                                                        d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                                                      />
                                                    </svg>
                                                  )}
                                                </button>
                                                <button
                                                  type='button'
                                                  style={{
                                                    border: '1px solid',
                                                    outline: 'none',
                                                    boxShadow: 'none',
                                                  }}
                                                  onClick={() => {
                                                    setActiveHabitIndex(
                                                      'Budgeting'
                                                    );
                                                    setHabitName('Budgeting');
                                                  }}
                                                  className={`font-small ml-1 inline-flex items-center rounded-full border border-transparent px-1 py-2 text-sm text-xs leading-4 text-black shadow-sm hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                                                    activeHabitIndex ===
                                                    'Budgeting'
                                                      ? 'bg-blue-400'
                                                      : 'bg-white'
                                                  } `}
                                                >
                                                  Budgeting
                                                  {activeHabitIndex ===
                                                  'Budgeting' ? (
                                                    <svg
                                                      xmlns='http://www.w3.org/2000/svg'
                                                      fill='none'
                                                      viewBox='0 0 24 24'
                                                      stroke-width='1.5'
                                                      stroke='currentColor'
                                                      className='ml-1 -mr-0.5 h-4 w-4'
                                                    >
                                                      <path
                                                        stroke-linecap='round'
                                                        stroke-linejoin='round'
                                                        d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                                                      />
                                                    </svg>
                                                  ) : (
                                                    <svg
                                                      xmlns='http://www.w3.org/2000/svg'
                                                      fill='none'
                                                      viewBox='0 0 24 24'
                                                      stroke-width='1.5'
                                                      stroke='currentColor'
                                                      className='ml-1 -mr-0.5 h-4 w-4'
                                                    >
                                                      <path
                                                        stroke-linecap='round'
                                                        stroke-linejoin='round'
                                                        d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                                                      />
                                                    </svg>
                                                  )}
                                                </button>
                                              </div>
                                            </div>
                                          </SwiperSlide>
                                        </Swiper>
                                        <div
                                          style={{
                                            '--swiper-navigation-size': '15px',
                                            '--swiper-navigation-color':
                                              'black',
                                            top: 273,
                                            left: 48,
                                          }}
                                          className='swiper-button-prev'
                                        ></div>
                                        <div
                                          style={{
                                            '--swiper-navigation-size': '15px',
                                            '--swiper-navigation-color':
                                              'black',
                                            right: 60,
                                            top: 273,
                                          }}
                                          className='swiper-button-next'
                                        ></div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                              {selectedIndex === 0 && (
                                <div
                                  style={{
                                    display: 'flex',
                                    marginTop: '10px',
                                  }}
                                >
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke-width='1.5'
                                    stroke='currentColor'
                                    className='h-6 w-6'
                                    style={{
                                      marginTop: '10px',
                                      marginRight: '9px',
                                    }}
                                  >
                                    <path
                                      stroke-linecap='round'
                                      stroke-linejoin='round'
                                      d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99'
                                    />
                                  </svg>

                                  <div className='relative'>
                                    {/* <input type="hidden" name="date" /> */}
                                    <label
                                      htmlFor='datepicker'
                                      className='font-small block text-black'
                                      style={{
                                        marginLeft: 5,
                                        fontSize: 11,
                                        marginTop: 10,
                                        fontWeight: 350,
                                      }}
                                    >
                                      Repeat Frequency
                                    </label>

                                    <Listbox
                                      value={habitFrequency}
                                      onChange={setHabitFrequency}
                                    >
                                      <Listbox.Button
                                        onClick={() => {
                                          setFindElement(true);
                                        }}
                                        className='font-small relative cursor-default rounded-full border bg-white py-2 text-center text-center text-center text-xs text-black shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                                        style={{
                                          outline: 'none',
                                          boxShadow: 'none',
                                          border: '1px solid black',

                                          marginTop: 7,
                                          marginLeft: 5,
                                          width: '150%',
                                        }}
                                      >
                                        <span className='block truncate'>
                                          {habitFrequency}
                                        </span>
                                      </Listbox.Button>
                                      <Listbox.Options className='w-30 max-h-35 absolute z-30 mt-1 rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                                        {Constants.habitFrequencyOptions.map(
                                          (habitFrequency: any, idx: any) => (
                                            <Listbox.Option
                                              key={idx}
                                              className={({
                                                active,
                                                selected,
                                              }) =>
                                                `${
                                                  active
                                                    ? 'bg-sky-700 text-left text-stone-50'
                                                    : 'text-left text-gray-900'
                                                }
                          ${
                            selected
                              ? 'bg-sky-600 text-left text-stone-50'
                              : 'text-left text-gray-900'
                          }
                          font-small relative cursor-default select-none py-3 pl-2 pr-4 text-left text-xs`
                                              }
                                              value={habitFrequency.name}
                                            >
                                              {({ selected, active }) => (
                                                <>
                                                  <span
                                                    className={`${
                                                      selected
                                                        ? 'font-small'
                                                        : 'font-normal'
                                                    } block truncate`}
                                                  >
                                                    {habitFrequency.name}
                                                  </span>
                                                </>
                                              )}
                                            </Listbox.Option>
                                          )
                                        )}
                                      </Listbox.Options>
                                    </Listbox>
                                  </div>

                                  {idx === 1 ? (
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      fill='none'
                                      viewBox='0 0 24 24'
                                      stroke-width='1.5'
                                      stroke='currentColor'
                                      className=' mt-2 h-6 w-6'
                                      style={{ marginLeft: 70 }}
                                    >
                                      <path
                                        stroke-linecap='round'
                                        stroke-linejoin='round'
                                        d='M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z'
                                      />
                                    </svg>
                                  ) : null}

                                  <div className='inline'>
                                    {idx === 1 ? (
                                      <label
                                        htmlFor='endTime'
                                        className='font-small block text-black'
                                        style={{
                                          marginLeft: 10,
                                          fontSize: 11,
                                          marginTop: 10,
                                        }}
                                      >
                                        Start Time
                                      </label>
                                    ) : null}
                                  </div>
                                  <div>
                                    {idx === 1 ? (
                                      <div className='inline'>
                                        <label
                                          htmlFor='endTime'
                                          className='font-small block text-black'
                                          style={{
                                            marginLeft: 30,
                                            fontSize: 11,
                                            marginTop: 10,
                                          }}
                                        >
                                          Habit Duration
                                        </label>
                                        <Listbox
                                          value={selected}
                                          onChange={onChangeBeginTime}
                                        >
                                          <Listbox.Button
                                            onClick={() => {
                                              setFindElement(true);
                                            }}
                                            className='font-small relative w-20 cursor-default rounded-full border border-gray-300 bg-white py-2 text-center text-center text-center text-xs text-black shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                                            style={{
                                              outline: 'none',
                                              boxShadow: 'none',
                                              border: '1px solid',
                                              marginLeft: -65,
                                              marginTop: 0,
                                            }}
                                          >
                                            <span className='block truncate'>
                                              {selected.label ||
                                                eventBeginTime.label}
                                            </span>
                                          </Listbox.Button>
                                          <Listbox.Options
                                            className='w-30 absolute z-30 mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
                                            style={{ marginLeft: -61 }}
                                          >
                                            {Constants.timeOptions.map(
                                              (time: any, idx: any) => (
                                                <Listbox.Option
                                                  key={idx}
                                                  className={({
                                                    active,
                                                    selected,
                                                  }) =>
                                                    `${
                                                      active
                                                        ? 'bg-sky-700 text-center text-stone-50'
                                                        : 'text-center text-gray-900'
                                                    }
                                                                ${
                                                                  selected
                                                                    ? 'bg-sky-600 text-center text-stone-50'
                                                                    : 'text-center text-gray-900'
                                                                }
                                                                font-small relative cursor-default select-none py-2 pl-2 pr-4 text-center text-xs`
                                                  }
                                                  value={time}
                                                >
                                                  {({ selected, active }) => (
                                                    <>
                                                      <span
                                                        className={`${
                                                          selected
                                                            ? 'font-small'
                                                            : 'font-normal'
                                                        } block truncate`}
                                                      >
                                                        {time.label}
                                                      </span>
                                                    </>
                                                  )}
                                                </Listbox.Option>
                                              )
                                            )}
                                          </Listbox.Options>
                                        </Listbox>
                                        <Listbox
                                          value={habitDuration}
                                          onChange={setHabitDuration}
                                        >
                                          <Listbox.Button
                                            onClick={() => {
                                              setFindElement(true);
                                            }}
                                            className='font-small relative w-20 cursor-default rounded-full border border-gray-300 bg-white py-2 text-center text-center text-center text-xs text-black shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                                            style={{
                                              outline: 'none',
                                              boxShadow: 'none',
                                              border: '1px solid',
                                              marginLeft: 15,
                                              marginTop: 9,
                                            }}
                                          >
                                            <span className='block truncate'>
                                              {habitDuration}
                                            </span>
                                          </Listbox.Button>
                                          <Listbox.Options
                                            className='w-30 absolute z-30 mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
                                            style={{ marginLeft: 40 }}
                                          >
                                            {Constants.durationOptions.map(
                                              (duration: any, idx: any) => (
                                                <Listbox.Option
                                                  key={idx}
                                                  className={({
                                                    active,
                                                    selected,
                                                  }) =>
                                                    `${
                                                      active
                                                        ? 'bg-sky-700 text-center text-stone-50'
                                                        : 'text-center text-gray-900'
                                                    }
                          ${
                            selected
                              ? 'bg-sky-600 text-center text-stone-50'
                              : 'text-center text-gray-900'
                          }
                          font-small relative cursor-default select-none py-3 pl-2 pr-4 text-center text-xs`
                                                  }
                                                  value={duration.name}
                                                >
                                                  {({ selected, active }) => (
                                                    <>
                                                      <span
                                                        className={`${
                                                          selected
                                                            ? 'font-small'
                                                            : 'font-normal'
                                                        } block truncate`}
                                                      >
                                                        {duration.name}
                                                      </span>
                                                    </>
                                                  )}
                                                </Listbox.Option>
                                              )
                                            )}
                                          </Listbox.Options>
                                        </Listbox>
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                              )}
                              {selectedIndex === 0 && (
                                <div
                                  style={{
                                    display: 'flex',
                                    marginTop: '10px',
                                  }}
                                >
                                  {selectedIndex === 0 && (
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      fill='none'
                                      viewBox='0 0 24 24'
                                      stroke-width='1.5'
                                      stroke='currentColor'
                                      className='h-6 w-6'
                                      style={{
                                        marginTop: '10px',
                                        marginRight: '9px',
                                      }}
                                    >
                                      <path
                                        stroke-linecap='round'
                                        stroke-linejoin='round'
                                        d='M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z'
                                      />
                                    </svg>
                                  )}
                                  <div className='relative'>
                                    {/* <input type="hidden" name="date" /> */}
                                    <label
                                      htmlFor='datepicker'
                                      className='font-small block text-black'
                                      style={{
                                        marginLeft: 5,
                                        fontSize: 11,
                                        marginTop: 10,
                                        fontWeight: 350,
                                      }}
                                    >
                                      {selectedIndex === 0 &&
                                        'Event Description'}
                                    </label>

                                    {selectedIndex === 0 && (
                                      <textarea
                                        rows={3}
                                        name='description'
                                        id='description'
                                        onChange={(event: any) => {
                                          setDescriptionTF(event.target.value);
                                        }}
                                        value={descriptionTF}
                                        style={{
                                          marginTop: 13,
                                          width: '230%',
                                          border: '1px solid',
                                          boxShadow: 'none',
                                        }}
                                        className='font-small block w-full rounded-md border-gray-300 text-xs text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                                        defaultValue=''
                                      />
                                    )}
                                  </div>
                                </div>
                              )}

                              {selectedIndex === 1 && activeHabitIndex && (
                                <div
                                  style={{
                                    display: 'flex',
                                    marginTop: '10px',
                                  }}
                                >
                                  {selectedIndex === 1 &&
                                    activeHabitIndex === 'Studying' && (
                                      <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke-width='1.5'
                                        stroke='currentColor'
                                        className='h-6 w-6'
                                        style={{
                                          marginTop: '10px',
                                          marginRight: '9px',
                                        }}
                                      >
                                        <path
                                          stroke-linecap='round'
                                          stroke-linejoin='round'
                                          d='M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25'
                                        />
                                      </svg>
                                    )}

                                  {selectedIndex === 1 &&
                                    activeHabitIndex === 'Exercise' && (
                                      <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke-width='1.5'
                                        stroke='currentColor'
                                        className='h-6 w-6'
                                        style={{
                                          marginTop: '10px',
                                          marginRight: '9px',
                                        }}
                                      >
                                        <path
                                          stroke-linecap='round'
                                          stroke-linejoin='round'
                                          d='M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495'
                                        />
                                      </svg>
                                    )}

                                  {selectedIndex === 1 &&
                                    activeHabitIndex === 'Meditation' && (
                                      <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke-width='1.5'
                                        stroke='currentColor'
                                        className='h-6 w-6'
                                        style={{
                                          marginTop: '10px',
                                          marginRight: '9px',
                                        }}
                                      >
                                        <path
                                          stroke-linecap='round'
                                          stroke-linejoin='round'
                                          d='M8.25 7.5l.415-.207a.75.75 0 011.085.67V10.5m0 0h6m-6 0h-1.5m1.5 0v5.438c0 .354.161.697.473.865a3.751 3.751 0 005.452-2.553c.083-.409-.263-.75-.68-.75h-.745M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                                        />
                                      </svg>
                                    )}

                                  <div className='relative'>
                                    {/* <input type="hidden" name="date" /> */}
                                    <label
                                      htmlFor='datepicker'
                                      className='font-small block text-black'
                                      style={{
                                        marginLeft: 5,
                                        fontSize: 11,
                                        marginTop: 10,
                                        fontWeight: 350,
                                      }}
                                    >
                                      {selectedIndex === 1 &&
                                        activeHabitIndex === 'Studying' &&
                                        'What are you studying?'}
                                      {selectedIndex === 1 &&
                                        activeHabitIndex === 'Exercise' &&
                                        'Workout Plan'}
                                      {selectedIndex === 1 &&
                                        activeHabitIndex === 'Meditation' &&
                                        'Choose a Meditation Plan'}
                                    </label>
                                    {selectedIndex === 1 &&
                                      activeHabitIndex === 'Studying' && (
                                        <div className='mt-1'>
                                          <input
                                            type='text'
                                            name='name'
                                            id='studyName'
                                            onChange={(event: any) => {
                                              setStudyName(event.target.value);
                                            }}
                                            style={{
                                              border: '1px solid',
                                              boxShadow: 'none',
                                              width: '180%',
                                            }}
                                            className='block w-full rounded-full border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                                            placeholder=''
                                          />
                                        </div>
                                      )}

                                    {selectedIndex === 1 &&
                                      activeHabitIndex === 'Exercise' && (
                                        <div
                                          className='mt-1'
                                          style={{ marginLeft: 0 }}
                                        >
                                          <div>
                                            <div className=''>
                                              <input
                                                type='text'
                                                name='name'
                                                id='exercisePlan'
                                                value={`${activeExercisePlan}`}
                                                onChange={(event: any) => {
                                                  setActiveExercisePlan(
                                                    event.target.value
                                                  );
                                                }}
                                                style={{
                                                  border: '1px solid',
                                                  boxShadow: 'none',
                                                  width: '100%',
                                                }}
                                                className='block w-full rounded-full border-gray-300 px-4 text-xs text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                                                placeholder='Add Exercise Plan'
                                              />
                                            </div>
                                            <div className='mt-3 flex'>
                                              <div className='flex h-5 items-center'>
                                                <button
                                                  type='button'
                                                  style={{
                                                    border: '1px solid',
                                                    outline: 'none',
                                                    boxShadow: 'none',
                                                  }}
                                                  onClick={() =>
                                                    setActiveExercisePlan(
                                                      'Running'
                                                    )
                                                  }
                                                  className={`font-small inline-flex items-center rounded-full border border-transparent px-1 py-2 text-sm text-xs leading-4 text-black shadow-sm hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                                                    activeExercisePlan ===
                                                    'Running'
                                                      ? 'bg-blue-400'
                                                      : 'bg-white'
                                                  } `}
                                                >
                                                  Running
                                                  {activeExercisePlan ===
                                                  'Running' ? (
                                                    <svg
                                                      xmlns='http://www.w3.org/2000/svg'
                                                      fill='none'
                                                      viewBox='0 0 24 24'
                                                      stroke-width='1.5'
                                                      stroke='currentColor'
                                                      className='ml-1 -mr-0.5 h-4 w-4'
                                                    >
                                                      <path
                                                        stroke-linecap='round'
                                                        stroke-linejoin='round'
                                                        d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                                                      />
                                                    </svg>
                                                  ) : (
                                                    <svg
                                                      xmlns='http://www.w3.org/2000/svg'
                                                      fill='none'
                                                      viewBox='0 0 24 24'
                                                      stroke-width='1.5'
                                                      stroke='currentColor'
                                                      className='ml-1 -mr-0.5 h-4 w-4'
                                                    >
                                                      <path
                                                        stroke-linecap='round'
                                                        stroke-linejoin='round'
                                                        d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                                                      />
                                                    </svg>
                                                  )}
                                                </button>
                                                <button
                                                  type='button'
                                                  style={{
                                                    border: '1px solid',
                                                    outline: 'none',
                                                    boxShadow: 'none',
                                                  }}
                                                  onClick={() =>
                                                    setActiveExercisePlan(
                                                      'Biking'
                                                    )
                                                  }
                                                  className={`font-small ml-1 inline-flex items-center rounded-full border border-transparent px-1 py-2 text-sm text-xs leading-4 text-black shadow-sm hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                                                    activeExercisePlan ===
                                                    'Biking'
                                                      ? 'bg-blue-400'
                                                      : 'bg-white'
                                                  } `}
                                                >
                                                  Biking
                                                  {activeExercisePlan ===
                                                  'Biking' ? (
                                                    <svg
                                                      xmlns='http://www.w3.org/2000/svg'
                                                      fill='none'
                                                      viewBox='0 0 24 24'
                                                      stroke-width='1.5'
                                                      stroke='currentColor'
                                                      className='ml-1 -mr-0.5 h-4 w-4'
                                                    >
                                                      <path
                                                        stroke-linecap='round'
                                                        stroke-linejoin='round'
                                                        d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                                                      />
                                                    </svg>
                                                  ) : (
                                                    <svg
                                                      xmlns='http://www.w3.org/2000/svg'
                                                      fill='none'
                                                      viewBox='0 0 24 24'
                                                      stroke-width='1.5'
                                                      stroke='currentColor'
                                                      className='ml-1 -mr-0.5 h-4 w-4'
                                                    >
                                                      <path
                                                        stroke-linecap='round'
                                                        stroke-linejoin='round'
                                                        d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                                                      />
                                                    </svg>
                                                  )}
                                                </button>
                                                <button
                                                  type='button'
                                                  style={{
                                                    border: '1px solid',
                                                    outline: 'none',
                                                    boxShadow: 'none',
                                                  }}
                                                  onClick={() =>
                                                    setActiveExercisePlan(
                                                      'Stretching'
                                                    )
                                                  }
                                                  className={`font-small ml-1 inline-flex items-center rounded-full border border-transparent px-1 py-2 text-sm text-xs leading-4 text-black shadow-sm hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                                                    activeExercisePlan ===
                                                    'Stretching'
                                                      ? 'bg-blue-400'
                                                      : 'bg-white'
                                                  } `}
                                                >
                                                  Stretching
                                                  {activeExercisePlan ===
                                                  'Stretching' ? (
                                                    <svg
                                                      xmlns='http://www.w3.org/2000/svg'
                                                      fill='none'
                                                      viewBox='0 0 24 24'
                                                      stroke-width='1.5'
                                                      stroke='currentColor'
                                                      className='ml-1 -mr-0.5 h-4 w-4'
                                                    >
                                                      <path
                                                        stroke-linecap='round'
                                                        stroke-linejoin='round'
                                                        d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                                                      />
                                                    </svg>
                                                  ) : (
                                                    <svg
                                                      xmlns='http://www.w3.org/2000/svg'
                                                      fill='none'
                                                      viewBox='0 0 24 24'
                                                      stroke-width='1.5'
                                                      stroke='currentColor'
                                                      className='ml-1 -mr-0.5 h-4 w-4'
                                                    >
                                                      <path
                                                        stroke-linecap='round'
                                                        stroke-linejoin='round'
                                                        d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                                                      />
                                                    </svg>
                                                  )}
                                                </button>
                                                <button
                                                  type='button'
                                                  style={{
                                                    border: '1px solid',
                                                    outline: 'none',
                                                    boxShadow: 'none',
                                                  }}
                                                  onClick={() =>
                                                    setActiveExercisePlan(
                                                      'Strength Training'
                                                    )
                                                  }
                                                  className={`font-small ml-1 inline-flex items-center rounded-full border border-transparent px-1 py-2 text-sm text-xs leading-4 text-black shadow-sm hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                                                    activeExercisePlan ===
                                                    'Strength Training'
                                                      ? 'bg-blue-400'
                                                      : 'bg-white'
                                                  } `}
                                                >
                                                  Strength Training
                                                  {activeExercisePlan ===
                                                  'Strength Training' ? (
                                                    <svg
                                                      xmlns='http://www.w3.org/2000/svg'
                                                      fill='none'
                                                      viewBox='0 0 24 24'
                                                      stroke-width='1.5'
                                                      stroke='currentColor'
                                                      className='ml-1 -mr-0.5 h-4 w-4'
                                                    >
                                                      <path
                                                        stroke-linecap='round'
                                                        stroke-linejoin='round'
                                                        d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                                                      />
                                                    </svg>
                                                  ) : (
                                                    <svg
                                                      xmlns='http://www.w3.org/2000/svg'
                                                      fill='none'
                                                      viewBox='0 0 24 24'
                                                      stroke-width='1.5'
                                                      stroke='currentColor'
                                                      className='ml-1 -mr-0.5 h-4 w-4'
                                                    >
                                                      <path
                                                        stroke-linecap='round'
                                                        stroke-linejoin='round'
                                                        d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                                                      />
                                                    </svg>
                                                  )}
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      )}

                                    {selectedIndex === 1 &&
                                      activeHabitIndex === 'Meditation' && (
                                        <Listbox
                                          value={meditationPlan}
                                          onChange={setMeditationPlan}
                                        >
                                          <Listbox.Button
                                            className='font-small relative mt-1 w-36 cursor-default rounded-full border border-gray-300 bg-white py-1.5 text-center text-center text-center text-xs text-black shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                                            style={{
                                              outline: 'none',
                                              boxShadow: 'none',
                                              border: '1px solid',
                                              marginLeft: 5,
                                            }}
                                          >
                                            <span className='block truncate'>
                                              {meditationPlan}
                                            </span>
                                          </Listbox.Button>
                                          <Listbox.Options
                                            className='absolute z-30 mt-1 max-h-60 w-40 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
                                            style={{ marginLeft: 30 }}
                                          >
                                            {Constants.meditationPlans.map(
                                              (plan: any, idx: any) => (
                                                <Listbox.Option
                                                  key={idx}
                                                  className={({
                                                    active,
                                                    selected,
                                                  }) =>
                                                    `${
                                                      active
                                                        ? 'bg-sky-700 text-center text-stone-50'
                                                        : 'text-center text-gray-900'
                                                    }
                          ${
                            selected
                              ? 'bg-sky-600 text-center text-stone-50'
                              : 'text-center text-gray-900'
                          }
                          font-small relative cursor-default select-none py-3 pl-2 pr-4 text-center text-xs`
                                                  }
                                                  value={plan.name}
                                                >
                                                  {({ selected, active }) => (
                                                    <>
                                                      <span
                                                        className={`${
                                                          selected
                                                            ? 'font-small'
                                                            : 'font-normal'
                                                        } block truncate`}
                                                      >
                                                        {plan.name}
                                                      </span>
                                                    </>
                                                  )}
                                                </Listbox.Option>
                                              )
                                            )}
                                          </Listbox.Options>
                                        </Listbox>
                                      )}
                                  </div>
                                  {selectedIndex === 1 &&
                                    activeHabitIndex === 'Meditation' && (
                                      <label
                                        htmlFor='endTime'
                                        className='font-small block text-black'
                                        style={{
                                          marginLeft: 40,
                                          fontSize: 11,
                                          marginTop: 10,
                                        }}
                                      >
                                        {meditationPlan === 'Mindfulness'
                                          ? 'Mindfulness Pratices'
                                          : null}
                                        {meditationPlan === 'Gratitude'
                                          ? 'Gratitude Pratices'
                                          : null}
                                        {meditationPlan === 'Yoga'
                                          ? 'Yoga Pratices'
                                          : null}
                                      </label>
                                    )}
                                  {selectedIndex === 1 &&
                                    activeHabitIndex === 'Meditation' &&
                                    meditationPlan === 'Mindfulness' && (
                                      <Listbox
                                        value={mindfulPlan}
                                        onChange={setMindfulPlan}
                                      >
                                        <Listbox.Button
                                          className='font-small relative w-36 cursor-default rounded-full border border-gray-300 bg-white py-1.5 text-center text-center text-center text-xs text-black shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                                          style={{
                                            outline: 'none',
                                            boxShadow: 'none',
                                            border: '1px solid',
                                            marginLeft: -115,
                                            marginTop: 35,
                                          }}
                                        >
                                          <span className='block truncate'>
                                            {mindfulPlan}
                                          </span>
                                        </Listbox.Button>
                                        <Listbox.Options
                                          className='w-30 absolute z-30 mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
                                          style={{
                                            marginLeft: 230,
                                            marginTop: 70,
                                          }}
                                        >
                                          {Constants.mindfulPlans.map(
                                            (plan: any, idx: any) => (
                                              <Listbox.Option
                                                key={idx}
                                                className={({
                                                  active,
                                                  selected,
                                                }) =>
                                                  `${
                                                    active
                                                      ? 'bg-sky-700 text-center text-stone-50'
                                                      : 'text-center text-gray-900'
                                                  }
                          ${
                            selected
                              ? 'bg-sky-600 text-center text-stone-50'
                              : 'text-center text-gray-900'
                          }
                          font-small relative cursor-default select-none py-3 pl-2 pr-4 text-center text-xs`
                                                }
                                                value={plan.name}
                                              >
                                                {({ selected, active }) => (
                                                  <>
                                                    <span
                                                      className={`${
                                                        selected
                                                          ? 'font-small'
                                                          : 'font-normal'
                                                      } block truncate`}
                                                    >
                                                      {plan.name}
                                                    </span>
                                                  </>
                                                )}
                                              </Listbox.Option>
                                            )
                                          )}
                                        </Listbox.Options>
                                      </Listbox>
                                    )}
                                  {selectedIndex === 1 &&
                                    activeHabitIndex === 'Meditation' &&
                                    meditationPlan === 'Gratitude' && (
                                      <Listbox
                                        value={gratitudePlan}
                                        onChange={setGratitudePlan}
                                      >
                                        <Listbox.Button
                                          className='font-small relative w-36 cursor-default rounded-full border border-gray-300 bg-white py-1.5 text-center text-center text-center text-xs text-black shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                                          style={{
                                            outline: 'none',
                                            boxShadow: 'none',
                                            border: '1px solid',
                                            marginLeft: -105,
                                            marginTop: 35,
                                          }}
                                        >
                                          <span className='block truncate'>
                                            {gratitudePlan}
                                          </span>
                                        </Listbox.Button>
                                        <Listbox.Options
                                          className='w-30 absolute z-30 mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
                                          style={{
                                            marginLeft: 230,
                                            marginTop: 70,
                                          }}
                                        >
                                          {Constants.gratitudePlans.map(
                                            (plan: any, idx: any) => (
                                              <Listbox.Option
                                                key={idx}
                                                className={({
                                                  active,
                                                  selected,
                                                }) =>
                                                  `${
                                                    active
                                                      ? 'bg-sky-700 text-center text-stone-50'
                                                      : 'text-center text-gray-900'
                                                  }
                          ${
                            selected
                              ? 'bg-sky-600 text-center text-stone-50'
                              : 'text-center text-gray-900'
                          }
                          font-small relative cursor-default select-none py-3 pl-2 pr-4 text-center text-xs`
                                                }
                                                value={plan.name}
                                              >
                                                {({ selected, active }) => (
                                                  <>
                                                    <span
                                                      className={`${
                                                        selected
                                                          ? 'font-small'
                                                          : 'font-normal'
                                                      } block truncate`}
                                                    >
                                                      {plan.name}
                                                    </span>
                                                  </>
                                                )}
                                              </Listbox.Option>
                                            )
                                          )}
                                        </Listbox.Options>
                                      </Listbox>
                                    )}
                                  {selectedIndex === 1 &&
                                    activeHabitIndex === 'Meditation' &&
                                    meditationPlan === 'Yoga' && (
                                      <Listbox
                                        value={yogaPlan}
                                        onChange={setYogaPlan}
                                      >
                                        <Listbox.Button
                                          className='font-small relative w-36 cursor-default rounded-full border border-gray-300 bg-white py-1.5 text-center text-center text-center text-xs text-black shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                                          style={{
                                            outline: 'none',
                                            boxShadow: 'none',
                                            border: '1px solid',
                                            marginLeft: -80,
                                            marginTop: 35,
                                          }}
                                        >
                                          <span className='block truncate'>
                                            {yogaPlan}
                                          </span>
                                        </Listbox.Button>
                                        <Listbox.Options
                                          className='w-30 absolute z-30 mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
                                          style={{
                                            marginLeft: 230,
                                            marginTop: 70,
                                          }}
                                        >
                                          {Constants.yogaPlans.map(
                                            (plan: any, idx: any) => (
                                              <Listbox.Option
                                                key={idx}
                                                className={({
                                                  active,
                                                  selected,
                                                }) =>
                                                  `${
                                                    active
                                                      ? 'bg-sky-700 text-center text-stone-50'
                                                      : 'text-center text-gray-900'
                                                  }
                          ${
                            selected
                              ? 'bg-sky-600 text-center text-stone-50'
                              : 'text-center text-gray-900'
                          }
                          font-small relative cursor-default select-none py-3 pl-2 pr-4 text-center text-xs`
                                                }
                                                value={plan.name}
                                              >
                                                {({ selected, active }) => (
                                                  <>
                                                    <span
                                                      className={`${
                                                        selected
                                                          ? 'font-small'
                                                          : 'font-normal'
                                                      } block truncate`}
                                                    >
                                                      {plan.name}
                                                    </span>
                                                  </>
                                                )}
                                              </Listbox.Option>
                                            )
                                          )}
                                        </Listbox.Options>
                                      </Listbox>
                                    )}
                                </div>
                              )}

                              {selectedIndex === 1 && activeHabitIndex && (
                                <div
                                  style={{
                                    display: 'flex',
                                    marginTop: '10px',
                                  }}
                                >
                                  <div>
                                    {selectedIndex === 1 &&
                                      activeHabitIndex === 'Studying' && (
                                        <svg
                                          xmlns='http://www.w3.org/2000/svg'
                                          fill='none'
                                          viewBox='0 0 24 24'
                                          stroke-width='1.5'
                                          stroke='currentColor'
                                          style={{
                                            marginRight: '9px',
                                          }}
                                          className='mt-0.5 h-6 w-6'
                                        >
                                          <path
                                            stroke-linecap='round'
                                            stroke-linejoin='round'
                                            d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z'
                                          />
                                          <path
                                            stroke-linecap='round'
                                            stroke-linejoin='round'
                                            d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
                                          />
                                        </svg>
                                      )}

                                    {selectedIndex === 1 &&
                                      activeHabitIndex === 'Exercise' &&
                                      (activeExercisePlan === 'Running' ||
                                        activeExercisePlan === 'Biking' ||
                                        activeExercisePlan === 'Stretching' ||
                                        activeExercisePlan ===
                                          'Strength Training') && (
                                        <svg
                                          xmlns='http://www.w3.org/2000/svg'
                                          fill='none'
                                          viewBox='0 0 24 24'
                                          stroke-width='1.5'
                                          stroke='currentColor'
                                          className={`h-6 w-6 ${
                                            activeExercisePlan === 'Running' ||
                                            activeExercisePlan === 'Biking' ||
                                            activeExercisePlan ===
                                              'Stretching' ||
                                            activeExercisePlan ===
                                              'Strength Training'
                                              ? 'mt-4'
                                              : ''
                                          }`}
                                          style={{
                                            marginRight: '9px',
                                          }}
                                        >
                                          <path
                                            stroke-linecap='round'
                                            stroke-linejoin='round'
                                            d='M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122'
                                          />
                                        </svg>
                                      )}

                                    {selectedIndex === 1 &&
                                      activeHabitIndex === 'Meditation' &&
                                      meditationPlan === 'Mindfulness' && (
                                        <svg
                                          xmlns='http://www.w3.org/2000/svg'
                                          fill='none'
                                          viewBox='0 0 24 24'
                                          stroke-width='1.5'
                                          stroke='currentColor'
                                          className='h-6 w-6'
                                          style={{
                                            marginRight: '9px',
                                          }}
                                        >
                                          <path
                                            stroke-linecap='round'
                                            stroke-linejoin='round'
                                            d='M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z'
                                          />
                                        </svg>
                                      )}
                                  </div>

                                  <div className='relative'>
                                    {/* <input type="hidden" name="date" /> */}
                                    <label
                                      htmlFor='datepicker'
                                      className={`font-small block text-black ${
                                        activeExercisePlan === 'Running' ||
                                        activeExercisePlan === 'Biking' ||
                                        activeExercisePlan === 'Stretching' ||
                                        activeExercisePlan ===
                                          'Strength Training'
                                          ? 'mt-4'
                                          : 'mt-0.5'
                                      } `}
                                      style={{
                                        marginLeft: 5,
                                        fontSize: 11,
                                        fontWeight: 350,
                                      }}
                                    >
                                      {selectedIndex === 1 &&
                                        activeHabitIndex === 'Studying' &&
                                        'Where are you studying?'}
                                      {selectedIndex === 1 &&
                                        activeHabitIndex === 'Exercise' &&
                                        activeExercisePlan === 'Running' &&
                                        'Running Distance'}
                                      {selectedIndex === 1 &&
                                        activeHabitIndex === 'Exercise' &&
                                        activeExercisePlan === 'Biking' &&
                                        'Biking Distance'}
                                      {selectedIndex === 1 &&
                                        activeHabitIndex === 'Exercise' &&
                                        activeExercisePlan === 'Stretching' &&
                                        'Stretching Duration'}
                                      {selectedIndex === 1 &&
                                        activeHabitIndex === 'Exercise' &&
                                        activeExercisePlan ===
                                          'Strength Training' &&
                                        'Strength Training Plan'}
                                      {selectedIndex === 1 &&
                                        activeHabitIndex === 'Meditation' &&
                                        meditationPlan === 'Mindfulness' &&
                                        'Mindfulness Duration'}
                                    </label>
                                    {selectedIndex === 1 &&
                                      activeHabitIndex === 'Studying' && (
                                        <div className='mt-1'>
                                          <input
                                            type='text'
                                            name='name'
                                            id='studyLocation'
                                            onChange={(event: any) => {
                                              setStudyLocation(
                                                event.target.value
                                              );
                                            }}
                                            style={{
                                              border: '1px solid',
                                              boxShadow: 'none',
                                              width: '180%',
                                            }}
                                            className='block w-full rounded-full border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                                            placeholder=''
                                          />
                                        </div>
                                      )}
                                    {selectedIndex === 1 &&
                                      activeHabitIndex === 'Exercise' &&
                                      (activeExercisePlan === 'Running' ||
                                        activeExercisePlan === 'Biking') && (
                                        <div className='mt-1 flex'>
                                          <div style={{ marginTop: -1 }}>
                                            <Listbox
                                              value={runningOption}
                                              onChange={setRunningOption}
                                            >
                                              <Listbox.Button
                                                className='font-small relative w-20 cursor-default rounded-full border border-gray-300 bg-white py-1.5 text-center text-center text-center text-xs text-black shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                                                style={{
                                                  outline: 'none',
                                                  boxShadow: 'none',
                                                  border: '1px solid',
                                                  marginLeft: 5,
                                                }}
                                              >
                                                <span className='block truncate'>
                                                  {runningOption}
                                                </span>
                                              </Listbox.Button>
                                              <Listbox.Options
                                                className='w-30 absolute z-30 mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
                                                style={{ marginLeft: 30 }}
                                              >
                                                {Constants.runningDistanceOptions.map(
                                                  (distance: any, idx: any) => (
                                                    <Listbox.Option
                                                      key={idx}
                                                      className={({
                                                        active,
                                                        selected,
                                                      }) =>
                                                        `${
                                                          active
                                                            ? 'bg-sky-700 text-center text-stone-50'
                                                            : 'text-center text-gray-900'
                                                        }
                          ${
                            selected
                              ? 'bg-sky-600 text-center text-stone-50'
                              : 'text-center text-gray-900'
                          }
                          font-small relative cursor-default select-none py-3 pl-2 pr-4 text-center text-xs`
                                                      }
                                                      value={distance.name}
                                                    >
                                                      {({
                                                        selected,
                                                        active,
                                                      }) => (
                                                        <>
                                                          <span
                                                            className={`${
                                                              selected
                                                                ? 'font-small'
                                                                : 'font-normal'
                                                            } block truncate`}
                                                          >
                                                            {distance.name}
                                                          </span>
                                                        </>
                                                      )}
                                                    </Listbox.Option>
                                                  )
                                                )}
                                              </Listbox.Options>
                                            </Listbox>
                                          </div>
                                          {idx === 1 ? (
                                            <svg
                                              xmlns='http://www.w3.org/2000/svg'
                                              fill='none'
                                              viewBox='0 0 24 24'
                                              stroke-width='1.5'
                                              stroke='currentColor'
                                              className=' h-6 w-6'
                                              style={{
                                                marginLeft: 56,
                                                marginTop: -28,
                                              }}
                                            >
                                              <path
                                                stroke-linecap='round'
                                                stroke-linejoin='round'
                                                d='M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z'
                                              />
                                            </svg>
                                          ) : null}

                                          <div className='inline'>
                                            {idx === 1 ? (
                                              <label
                                                htmlFor='endTime'
                                                className='font-small block text-black'
                                                style={{
                                                  marginLeft: 10,
                                                  fontSize: 11,
                                                  marginTop: -28,
                                                }}
                                              >
                                                Start Time
                                              </label>
                                            ) : null}
                                          </div>
                                          <div>
                                            {idx === 1 ? (
                                              <div className='inline'>
                                                {activeHabitIndex !=
                                                  'Exercise' && (
                                                  <label
                                                    htmlFor='endTime'
                                                    className='font-small block text-black'
                                                    style={{
                                                      marginLeft: 30,
                                                      fontSize: 11,
                                                      marginTop: -28,
                                                    }}
                                                  >
                                                    Habit Duration
                                                  </label>
                                                )}
                                                <Listbox
                                                  value={selected}
                                                  onChange={onChangeBeginTime}
                                                >
                                                  <Listbox.Button
                                                    onClick={() => {
                                                      setFindElement(true);
                                                    }}
                                                    className='font-small relative w-20 cursor-default rounded-full border border-gray-300 bg-white py-1.5 text-center text-center text-center text-xs text-black shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                                                    style={{
                                                      outline: 'none',
                                                      boxShadow: 'none',
                                                      border: '1px solid',
                                                      marginLeft: -65,
                                                      marginTop: -33,
                                                    }}
                                                  >
                                                    <span className='block truncate'>
                                                      {selected.label ||
                                                        eventBeginTime.label}
                                                    </span>
                                                  </Listbox.Button>
                                                  <Listbox.Options
                                                    className='w-30 absolute z-30 mt-1 max-h-40 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
                                                    style={{ marginLeft: -61 }}
                                                  >
                                                    {Constants.timeOptions.map(
                                                      (time: any, idx: any) => (
                                                        <Listbox.Option
                                                          key={idx}
                                                          className={({
                                                            active,
                                                            selected,
                                                          }) =>
                                                            `${
                                                              active
                                                                ? 'bg-sky-700 text-center text-stone-50'
                                                                : 'text-center text-gray-900'
                                                            }
                                                                ${
                                                                  selected
                                                                    ? 'bg-sky-600 text-center text-stone-50'
                                                                    : 'text-center text-gray-900'
                                                                }
                                                                font-small relative cursor-default select-none py-2 pl-2 pr-4 text-center text-xs`
                                                          }
                                                          value={time}
                                                        >
                                                          {({
                                                            selected,
                                                            active,
                                                          }) => (
                                                            <>
                                                              <span
                                                                className={`${
                                                                  selected
                                                                    ? 'font-small'
                                                                    : 'font-normal'
                                                                } block truncate`}
                                                              >
                                                                {time.label}
                                                              </span>
                                                            </>
                                                          )}
                                                        </Listbox.Option>
                                                      )
                                                    )}
                                                  </Listbox.Options>
                                                </Listbox>
                                                {activeHabitIndex !=
                                                  'Exercise' && (
                                                  <Listbox
                                                    value={habitDuration}
                                                    onChange={setHabitDuration}
                                                  >
                                                    <Listbox.Button
                                                      onClick={() => {
                                                        setFindElement(true);
                                                      }}
                                                      className='font-small relative w-20 cursor-default rounded-full border border-gray-300 bg-white py-1.5 text-center text-center text-center text-xs text-black shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                                                      style={{
                                                        outline: 'none',
                                                        boxShadow: 'none',
                                                        border: '1px solid',
                                                        marginLeft: 15,
                                                        marginTop: 6,
                                                      }}
                                                    >
                                                      <span className='block truncate'>
                                                        {habitDuration}
                                                      </span>
                                                    </Listbox.Button>
                                                    <Listbox.Options
                                                      className='w-30 absolute z-30 mt-1 max-h-36 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
                                                      style={{ marginLeft: 40 }}
                                                    >
                                                      {Constants.durationOptions.map(
                                                        (
                                                          duration: any,
                                                          idx: any
                                                        ) => (
                                                          <Listbox.Option
                                                            key={idx}
                                                            className={({
                                                              active,
                                                              selected,
                                                            }) =>
                                                              `${
                                                                active
                                                                  ? 'bg-sky-700 text-center text-stone-50'
                                                                  : 'text-center text-gray-900'
                                                              }
                          ${
                            selected
                              ? 'bg-sky-600 text-center text-stone-50'
                              : 'text-center text-gray-900'
                          }
                          font-small relative cursor-default select-none py-3 pl-2 pr-4 text-center text-xs`
                                                            }
                                                            value={
                                                              duration.name
                                                            }
                                                          >
                                                            {({
                                                              selected,
                                                              active,
                                                            }) => (
                                                              <>
                                                                <span
                                                                  className={`${
                                                                    selected
                                                                      ? 'font-small'
                                                                      : 'font-normal'
                                                                  } block truncate`}
                                                                >
                                                                  {
                                                                    duration.name
                                                                  }
                                                                </span>
                                                              </>
                                                            )}
                                                          </Listbox.Option>
                                                        )
                                                      )}
                                                    </Listbox.Options>
                                                  </Listbox>
                                                )}
                                              </div>
                                            ) : null}
                                          </div>
                                        </div>
                                      )}

                                    {selectedIndex === 1 &&
                                      activeHabitIndex === 'Meditation' &&
                                      meditationPlan === 'Mindfulness' && (
                                        <Listbox
                                          value={meditationDuration}
                                          onChange={setMeditationDuration}
                                        >
                                          <Listbox.Button
                                            onClick={() => {
                                              setFindElement(true);
                                            }}
                                            className='font-small relative w-20 cursor-default rounded-full border border-gray-300 bg-white py-1.5 text-center text-center text-center text-xs text-black shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                                            style={{
                                              outline: 'none',
                                              boxShadow: 'none',
                                              border: '1px solid',
                                              marginLeft: 15,
                                              marginTop: 6,
                                            }}
                                          >
                                            <span className='block truncate'>
                                              {meditationDuration}
                                            </span>
                                          </Listbox.Button>
                                          <Listbox.Options
                                            className='w-30 absolute z-30 mt-1 max-h-36 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
                                            style={{ marginLeft: 40 }}
                                          >
                                            {Constants.meditationDurations.map(
                                              (duration: any, idx: any) => (
                                                <Listbox.Option
                                                  key={idx}
                                                  className={({
                                                    active,
                                                    selected,
                                                  }) =>
                                                    `${
                                                      active
                                                        ? 'bg-sky-700 text-center text-stone-50'
                                                        : 'text-center text-gray-900'
                                                    }
                          ${
                            selected
                              ? 'bg-sky-600 text-center text-stone-50'
                              : 'text-center text-gray-900'
                          }
                          font-small relative cursor-default select-none py-3 pl-2 pr-4 text-center text-xs`
                                                  }
                                                  value={duration.name}
                                                >
                                                  {({ selected, active }) => (
                                                    <>
                                                      <span
                                                        className={`${
                                                          selected
                                                            ? 'font-small'
                                                            : 'font-normal'
                                                        } block truncate`}
                                                      >
                                                        {duration.name}
                                                      </span>
                                                    </>
                                                  )}
                                                </Listbox.Option>
                                              )
                                            )}
                                          </Listbox.Options>
                                        </Listbox>
                                      )}

                                    {selectedIndex === 1 &&
                                      activeHabitIndex === 'Exercise' &&
                                      activeExercisePlan === 'Stretching' && (
                                        <div className='mt-1 flex'>
                                          <div>
                                            <Listbox
                                              value={habitDuration}
                                              onChange={setHabitDuration}
                                            >
                                              <Listbox.Button
                                                onClick={() => {
                                                  setFindElement(true);
                                                }}
                                                className='font-small relative w-20 cursor-default rounded-full border border-gray-300 bg-white py-1.5 text-center text-center text-center text-xs text-black shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                                                style={{
                                                  outline: 'none',
                                                  boxShadow: 'none',
                                                  border: '1px solid',
                                                  marginLeft: 5,
                                                  // marginTop: 6,
                                                }}
                                              >
                                                <span className='block truncate'>
                                                  {habitDuration}
                                                </span>
                                              </Listbox.Button>
                                              <Listbox.Options
                                                className='w-30 absolute z-30 mt-1 max-h-36 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
                                                style={{ marginLeft: 40 }}
                                              >
                                                {Constants.durationOptions.map(
                                                  (duration: any, idx: any) => (
                                                    <Listbox.Option
                                                      key={idx}
                                                      className={({
                                                        active,
                                                        selected,
                                                      }) =>
                                                        `${
                                                          active
                                                            ? 'bg-sky-700 text-center text-stone-50'
                                                            : 'text-center text-gray-900'
                                                        }
                          ${
                            selected
                              ? 'bg-sky-600 text-center text-stone-50'
                              : 'text-center text-gray-900'
                          }
                          font-small relative cursor-default select-none py-3 pl-2 pr-4 text-center text-xs`
                                                      }
                                                      value={duration.name}
                                                    >
                                                      {({
                                                        selected,
                                                        active,
                                                      }) => (
                                                        <>
                                                          <span
                                                            className={`${
                                                              selected
                                                                ? 'font-small'
                                                                : 'font-normal'
                                                            } block truncate`}
                                                          >
                                                            {duration.name}
                                                          </span>
                                                        </>
                                                      )}
                                                    </Listbox.Option>
                                                  )
                                                )}
                                              </Listbox.Options>
                                            </Listbox>
                                            <svg
                                              xmlns='http://www.w3.org/2000/svg'
                                              fill='none'
                                              viewBox='0 0 24 24'
                                              stroke-width='1.5'
                                              stroke='currentColor'
                                              className=' h-6 w-6'
                                              style={{
                                                marginLeft: 140,
                                                marginTop: -58,
                                              }}
                                            >
                                              <path
                                                stroke-linecap='round'
                                                stroke-linejoin='round'
                                                d='M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z'
                                              />
                                            </svg>
                                            <label
                                              htmlFor='endTime'
                                              className='font-small block text-black'
                                              style={{
                                                marginLeft: 175,
                                                fontSize: 11,
                                                marginTop: -24,
                                              }}
                                            >
                                              Start Time
                                            </label>
                                            <Listbox
                                              value={selected}
                                              onChange={onChangeBeginTime}
                                            >
                                              <Listbox.Button
                                                onClick={() => {
                                                  setFindElement(true);
                                                }}
                                                className='font-small relative w-20 cursor-default rounded-full border border-gray-300 bg-white py-1.5 text-center text-center text-center text-xs text-black shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                                                style={{
                                                  outline: 'none',
                                                  boxShadow: 'none',
                                                  border: '1px solid',
                                                  marginLeft: 165,
                                                  marginTop: 4,
                                                }}
                                              >
                                                <span className='block truncate'>
                                                  {selected.label ||
                                                    eventBeginTime.label}
                                                </span>
                                              </Listbox.Button>
                                              <Listbox.Options
                                                className='w-30 absolute z-30 mt-1 max-h-40 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
                                                style={{ marginLeft: 160 }}
                                              >
                                                {Constants.timeOptions.map(
                                                  (time: any, idx: any) => (
                                                    <Listbox.Option
                                                      key={idx}
                                                      className={({
                                                        active,
                                                        selected,
                                                      }) =>
                                                        `${
                                                          active
                                                            ? 'bg-sky-700 text-center text-stone-50'
                                                            : 'text-center text-gray-900'
                                                        }
                                                                ${
                                                                  selected
                                                                    ? 'bg-sky-600 text-center text-stone-50'
                                                                    : 'text-center text-gray-900'
                                                                }
                                                                font-small relative cursor-default select-none py-2 pl-2 pr-4 text-center text-xs`
                                                      }
                                                      value={time}
                                                    >
                                                      {({
                                                        selected,
                                                        active,
                                                      }) => (
                                                        <>
                                                          <span
                                                            className={`${
                                                              selected
                                                                ? 'font-small'
                                                                : 'font-normal'
                                                            } block truncate`}
                                                          >
                                                            {time.label}
                                                          </span>
                                                        </>
                                                      )}
                                                    </Listbox.Option>
                                                  )
                                                )}
                                              </Listbox.Options>
                                            </Listbox>
                                          </div>
                                        </div>
                                      )}
                                    {selectedIndex === 1 &&
                                      activeHabitIndex === 'Exercise' &&
                                      activeExercisePlan ===
                                        'Strength Training' && (
                                        <div className='mt-1 flex'>
                                          <Listbox
                                            value={strengthTrainingPlan}
                                            onChange={setStrengthTrainingPlan}
                                          >
                                            <Listbox.Button
                                              className='font-small relative w-36 cursor-default rounded-full border border-gray-300 bg-white py-1.5 text-center text-center text-center text-xs text-black shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                                              style={{
                                                outline: 'none',
                                                boxShadow: 'none',
                                                border: '1px solid',
                                                marginLeft: 5,
                                                marginTop: 0,
                                              }}
                                            >
                                              <span className='block truncate'>
                                                {strengthTrainingPlan}
                                              </span>
                                            </Listbox.Button>
                                            <Listbox.Options
                                              className='w-46 absolute z-30 mt-1 max-h-40 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
                                              style={{ marginLeft: -61 }}
                                            >
                                              {Constants.strengthTrainingPlans.map(
                                                (plan: any, idx: any) => (
                                                  <Listbox.Option
                                                    key={idx}
                                                    className={({
                                                      active,
                                                      selected,
                                                    }) =>
                                                      `${
                                                        active
                                                          ? 'bg-sky-700 text-center text-stone-50'
                                                          : 'text-center text-gray-900'
                                                      }
                                                                ${
                                                                  selected
                                                                    ? 'bg-sky-600 text-center text-stone-50'
                                                                    : 'text-center text-gray-900'
                                                                }
                                                                font-small relative cursor-default select-none py-2 pl-2 pr-4 text-center text-xs`
                                                    }
                                                    value={plan.name}
                                                  >
                                                    {({ selected, active }) => (
                                                      <>
                                                        <span
                                                          className={`${
                                                            selected
                                                              ? 'font-small'
                                                              : 'font-normal'
                                                          } block truncate`}
                                                        >
                                                          {plan.name}
                                                        </span>
                                                      </>
                                                    )}
                                                  </Listbox.Option>
                                                )
                                              )}
                                            </Listbox.Options>
                                          </Listbox>
                                          <div>
                                            {/* 
                                            Clock icon
                                             */}
                                            <svg
                                              xmlns='http://www.w3.org/2000/svg'
                                              fill='none'
                                              viewBox='0 0 24 24'
                                              stroke-width='1.5'
                                              stroke='currentColor'
                                              className='-mt-7 ml-2 h-6 w-6'
                                            >
                                              <path
                                                stroke-linecap='round'
                                                stroke-linejoin='round'
                                                d='M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z'
                                              />
                                            </svg>
                                            <label
                                              htmlFor='startTime'
                                              className='font-small block text-black'
                                              style={{
                                                marginLeft: 40,
                                                marginTop: -24,
                                                fontSize: 11,
                                                fontWeight: 350,
                                              }}
                                            >
                                              Start Time
                                            </label>

                                            <Listbox
                                              value={selected}
                                              onChange={onChangeBeginTime}
                                            >
                                              <Listbox.Button
                                                onClick={() => {
                                                  setFindElement(true);
                                                }}
                                                className='font-small relative w-20 cursor-default rounded-full border border-gray-300 bg-white py-2 text-center text-xs text-black shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                                                style={{
                                                  outline: 'none',
                                                  boxShadow: 'none',
                                                  border: '1px solid',
                                                  marginLeft: 32,
                                                }}
                                              >
                                                <span className='block truncate'>
                                                  {selected.label ||
                                                    eventBeginTime.label}
                                                </span>
                                              </Listbox.Button>
                                              <Listbox.Options
                                                style={{ marginLeft: 32 }}
                                                className='w-30 font-small absolute z-30 mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base text-xs shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
                                              >
                                                {Constants.timeOptions.map(
                                                  (time: any, idx: any) => (
                                                    <Listbox.Option
                                                      key={idx}
                                                      className={({
                                                        active,
                                                        selected,
                                                      }) =>
                                                        `${
                                                          active
                                                            ? 'bg-sky-700 text-left text-stone-50'
                                                            : 'text-left text-gray-900'
                                                        }
                                                                ${
                                                                  selected
                                                                    ? 'bg-sky-600 text-left text-stone-50'
                                                                    : 'text-left text-gray-900'
                                                                }
                                                                font-small relative cursor-default select-none py-2 pl-2 pr-4 text-left text-xs`
                                                      }
                                                      value={time}
                                                    >
                                                      {({
                                                        selected,
                                                        active,
                                                      }) => (
                                                        <>
                                                          <span
                                                            className={`${
                                                              selected
                                                                ? 'font-small'
                                                                : 'font-normal'
                                                            } block truncate`}
                                                          >
                                                            {time.label}
                                                          </span>
                                                        </>
                                                      )}
                                                    </Listbox.Option>
                                                  )
                                                )}
                                              </Listbox.Options>
                                            </Listbox>

                                            <label
                                              htmlFor='startTime'
                                              className='font-small block text-black'
                                              style={{
                                                marginLeft: 130,
                                                marginTop: -58,
                                                fontSize: 11,
                                                fontWeight: 350,
                                              }}
                                            >
                                              Habit Duration
                                            </label>

                                            <Listbox
                                              value={habitDuration}
                                              onChange={setHabitDuration}
                                            >
                                              <Listbox.Button
                                                onClick={() => {
                                                  setFindElement(true);
                                                }}
                                                className='font-small relative w-20 cursor-default rounded-full border border-gray-300 bg-white py-2 text-center text-center text-center text-xs text-black shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                                                style={{
                                                  outline: 'none',
                                                  boxShadow: 'none',
                                                  border: '1px solid',
                                                  marginLeft: 130,
                                                  marginTop: 0,
                                                }}
                                              >
                                                <span className='block truncate'>
                                                  {habitDuration}
                                                </span>
                                              </Listbox.Button>
                                              <Listbox.Options
                                                className='w-30 absolute z-30 mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
                                                style={{ marginLeft: 130 }}
                                              >
                                                {Constants.durationOptions.map(
                                                  (duration: any, idx: any) => (
                                                    <Listbox.Option
                                                      key={idx}
                                                      className={({
                                                        active,
                                                        selected,
                                                      }) =>
                                                        `${
                                                          active
                                                            ? 'bg-sky-700 text-center text-stone-50'
                                                            : 'text-center text-gray-900'
                                                        }
                          ${
                            selected
                              ? 'bg-sky-600 text-center text-stone-50'
                              : 'text-center text-gray-900'
                          }
                          font-small relative cursor-default select-none py-3 pl-2 pr-4 text-center text-xs`
                                                      }
                                                      value={duration.name}
                                                    >
                                                      {({
                                                        selected,
                                                        active,
                                                      }) => (
                                                        <>
                                                          <span
                                                            className={`${
                                                              selected
                                                                ? 'font-small'
                                                                : 'font-normal'
                                                            } block truncate`}
                                                          >
                                                            {duration.name}
                                                          </span>
                                                        </>
                                                      )}
                                                    </Listbox.Option>
                                                  )
                                                )}
                                              </Listbox.Options>
                                            </Listbox>
                                          </div>
                                        </div>
                                      )}
                                    {selectedIndex === 1 &&
                                      activeHabitIndex === 'Meditation' &&
                                      meditationPlan === 'Mindfulness' && (
                                        <div>
                                          <label
                                            htmlFor='startTime'
                                            className='font-small block text-black'
                                            style={{
                                              marginLeft: 185,
                                              marginTop: -60,
                                              fontSize: 11,
                                              fontWeight: 350,
                                            }}
                                          >
                                            Start Time
                                          </label>
                                          <Listbox
                                            value={selected}
                                            onChange={onChangeBeginTime}
                                          >
                                            <Listbox.Button
                                              onClick={() => {
                                                setFindElement(true);
                                              }}
                                              className='font-small relative w-20 cursor-default rounded-full border border-gray-300 bg-white py-1.5 text-center text-xs text-black shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                                              style={{
                                                outline: 'none',
                                                boxShadow: 'none',
                                                border: '1px solid',
                                                marginLeft: 185,
                                                marginTop: 5,
                                              }}
                                            >
                                              <span className='block truncate'>
                                                {selected.label ||
                                                  eventBeginTime.label}
                                              </span>
                                            </Listbox.Button>
                                            <Listbox.Options
                                              style={{ marginLeft: 1 }}
                                              className='w-30 font-small absolute z-30 mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base text-xs shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
                                            >
                                              {Constants.timeOptions.map(
                                                (time: any, idx: any) => (
                                                  <Listbox.Option
                                                    key={idx}
                                                    className={({
                                                      active,
                                                      selected,
                                                    }) =>
                                                      `${
                                                        active
                                                          ? 'bg-sky-700 text-left text-stone-50'
                                                          : 'text-left text-gray-900'
                                                      }
                                                                ${
                                                                  selected
                                                                    ? 'bg-sky-600 text-left text-stone-50'
                                                                    : 'text-left text-gray-900'
                                                                }
                                                                font-small relative cursor-default select-none py-2 pl-2 pr-4 text-left text-xs`
                                                    }
                                                    value={time}
                                                  >
                                                    {({ selected, active }) => (
                                                      <>
                                                        <span
                                                          className={`${
                                                            selected
                                                              ? 'font-small'
                                                              : 'font-normal'
                                                          } block truncate`}
                                                        >
                                                          {time.label}
                                                        </span>
                                                      </>
                                                    )}
                                                  </Listbox.Option>
                                                )
                                              )}
                                            </Listbox.Options>
                                          </Listbox>
                                        </div>
                                      )}
                                  </div>
                                </div>
                              )}
                              {selectedIndex === 1 && (
                                <div
                                  style={{
                                    display: 'flex',
                                    // marginTop: '10px',
                                  }}
                                  className={`${
                                    activeExercisePlan ? 'mt-3' : 'mt-3'
                                  }`}
                                >
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke-width='1.5'
                                    stroke='currentColor'
                                    className='h-6 w-6'
                                    style={{
                                      // marginTop: '10px',
                                      marginRight: '9px',
                                    }}
                                  >
                                    <path
                                      stroke-linecap='round'
                                      stroke-linejoin='round'
                                      d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99'
                                    />
                                  </svg>

                                  <div className='relative'>
                                    {/* <input type="hidden" name="date" /> */}
                                    <label
                                      htmlFor='datepicker'
                                      className='font-small block text-black '
                                      style={{
                                        marginLeft: 5,
                                        fontSize: 11,
                                        // marginTop: 10,
                                        fontWeight: 350,
                                      }}
                                    >
                                      Habit Frequency
                                    </label>

                                    <Listbox
                                      value={runningBikingOption}
                                      onChange={setRunningBikingOption}
                                    >
                                      <Listbox.Button
                                        onClick={() => {
                                          setFindElement(true);
                                        }}
                                        className='font-small relative cursor-default rounded-full border bg-white py-2 text-center text-center text-center text-xs text-black shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
                                        style={{
                                          outline: 'none',
                                          boxShadow: 'none',
                                          border: '1px solid black',

                                          marginTop: 5,
                                          width: '150%',
                                        }}
                                      >
                                        <span className='block truncate'>
                                          {runningBikingOption}
                                        </span>
                                      </Listbox.Button>
                                      <Listbox.Options className='w-30 absolute z-30 mt-1 max-h-32 overflow-y-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                                        {Constants.runningBikingFrequencyOptions.map(
                                          (runningBiking: any, idx: any) => (
                                            <Listbox.Option
                                              key={idx}
                                              className={({
                                                active,
                                                selected,
                                              }) =>
                                                `${
                                                  active
                                                    ? 'bg-sky-700 text-left text-stone-50'
                                                    : 'text-left text-gray-900'
                                                }
                          ${
                            selected
                              ? 'bg-sky-600 text-left text-stone-50'
                              : 'text-left text-gray-900'
                          }
                          font-small relative cursor-default select-none py-3 pl-2 pr-4 text-left text-xs`
                                              }
                                              value={runningBiking.name}
                                            >
                                              {({ selected, active }) => (
                                                <>
                                                  <span
                                                    className={`${
                                                      selected
                                                        ? 'font-small'
                                                        : 'font-normal'
                                                    } block truncate`}
                                                  >
                                                    {runningBiking.name}
                                                  </span>
                                                </>
                                              )}
                                            </Listbox.Option>
                                          )
                                        )}
                                      </Listbox.Options>
                                    </Listbox>
                                  </div>

                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke-width='1.5'
                                    stroke='currentColor'
                                    className='h-6 w-6'
                                    style={{
                                      marginLeft: '50px',
                                    }}
                                  >
                                    <path
                                      stroke-linecap='round'
                                      stroke-linejoin='round'
                                      d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z'
                                    />
                                  </svg>

                                  <div style={{ marginTop: -1 }}>
                                    <DatePicker
                                      eventBeginDate={eventBeginDate}
                                      setEventBeginDate={setEventBeginDate}
                                      selectedIndex={selectedIndex}
                                    />
                                  </div>
                                </div>
                              )}

                              {selectedIndex === 2 && (
                                <Tab.Group
                                  selectedIndex={selectedGoalIndex}
                                  onChange={setSelectedGoalIndex}
                                >
                                  <Tab.List className='flex ml-4 space-x-2 rounded-xl  p-1'>
                                    {Object.keys(goalTabs).map((tab) => (
                                      <Tab
                                        key={tab}
                                        style={{
                                          outline: 'none',
                                          boxShadow: 'none',
                                          border: '1px solid black',
                                        }}
                                        className={({ selected }) =>
                                          classNames(
                                            'font-small w-28   py-2.5 text-sm leading-5 text-blue-700',
                                            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                            selected
                                              ? 'bg-white rounded-full shadow'
                                              : 'text-black rounded-full hover:bg-white/[0.12] hover:text-black'
                                          )
                                        }
                                      >
                                        {tab}
                                      </Tab>
                                    ))}
                                  </Tab.List>
                                  <Tab.Panels className=''>
                                    {Object.values(goalTabs).map(
                                      (posts, idx) => (
                                        <Tab.Panel
                                          key={idx}
                                          style={{ boxShadow: 'none' }}
                                          className={classNames(
                                            'rounded-xl  p-3',
                                            'ring-white  ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                                          )}
                                        >
                                          {/* {idx === 0 && (
                                            <div className='bg-white'>
                                              <Todo />
                                            </div>
                                          )} */}
                                        </Tab.Panel>
                                      )
                                    )}
                                  </Tab.Panels>
                                </Tab.Group>
                              )}
                            </Tab.Panel>
                          ))}
                          <div style={{ marginLeft: 396, marginTop: 10 }}>
                            {/* <button
                              type='button'
                              className='rounded-md border border-transparent bg-gradient-to-r from-orange-300 to-rose-300 py-2 px-4 text-xs font-small text-black shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                              onClick={() => {
                                handleCreateEvent();
                              }}
                            >
                              Save
                            </button> */}
                            <a
                              onClick={() => {
                                handleCreateEvent();
                              }}
                              className='group relative inline-block px-4 py-2 text-sm font-medium'
                            >
                              <span className='absolute inset-0 h-full w-full translate-x-1 translate-y-1 transform rounded-full bg-black transition duration-200 ease-out group-hover:-translate-x-0 group-hover:-translate-y-0'></span>
                              <span className='absolute inset-0 h-full w-full rounded-full border-2 border-black bg-white group-hover:bg-black'></span>
                              <span className='relative text-black group-hover:text-white'>
                                Save
                              </span>
                            </a>
                            {/**
                               * 
                               * <a href="#_" class="relative inline-block px-4 py-2 font-medium group">
<span class="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
<span class="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
<span class="relative text-black group-hover:text-white">Button Text</span>
</a>
                               */}
                          </div>
                        </Tab.Panels>
                      </Tab.Group>
                    </div>
                  </div>
                </div>
              </div>
              {/* </Draggable> */}
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </Draggable>
  );
}
