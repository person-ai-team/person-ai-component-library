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
import { Fragment, useState, useRef, useEffect, useContext } from 'react'
import { CalendarContext } from '../../../common/CalendarContext';
import { Listbox, Combobox, Transition } from '@headlessui/react'
// import {CiStopwatch} from 'react-icons/ci'
// import {GiStopwatch} from 'react-icons/gi'
import {BsStopwatch, BsClock, BsCalendarEvent, BsGlobeAmericas, BsCalendar3} from 'react-icons/bs'
import { CalendarIcon, PaperClipIcon, TagIcon, UserCircleIcon, CheckIcon, ChevronUpDownIcon, ClockIcon, CalendarDaysIcon, VideoCameraIcon, MapIcon, GlobeAltIcon, GlobeAmericasIcon } from '@heroicons/react/20/solid'
import InputDatePicker from '../DatePicker/InputDatePicker'
import TimeSelect from './EngineComponents/TimeSelect';
import FrequencyPicker from './EngineComponents/FrequencyPicker';
import EventCopilot from './EventCopilot';


const people = [
    { id: 1, name: 'Wade Cooper' },
    { id: 2, name: 'Arlene Mccoy' },
    { id: 3, name: 'Devon Webb' },
    { id: 4, name: 'Tom Cook' },
    { id: 5, name: 'Tanya Fox' },
    { id: 6, name: 'Hellen Schmidt' },
  ]

const locationOptions = [
  { name: 'Home', value: 'home' },
  { name: 'Office', value: 'office' },
];

const durationOptions = [
    { name: '30 mins', value: 30 },
    { name: '1 hour', value: 60 },
    { name: '2 hours', value: 120 },
];

const conferenceOptions = [
    { name: 'Zoom', value: 'zoom' },
    { name: 'Google Meet', value: 'googleMeet' },
    { name: 'Microsoft Teams', value: 'microsoftTeams' },
    { name: 'Phone Number', value: 'phoneNumber' },
];

const frequencyOptions = [
    { name: 'Daily/Everyday', value: 'daily' },
    { name: 'Weekly on...', value: 'weekly' },
];


function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function EventService(props: any) {

    const { habitFrequencyIndex } = props
    const [selected, setSelected] = useState()
    const [selectedLocation, setSelectedLocation] = useState(locationOptions[0].name)
    const [locationQuery, setLocationQuery] = useState('')

    const [query, setQuery] = useState('')
    const [duration, setDuration] = useState(durationOptions[0].name)
    const [conference, setConference] = useState(conferenceOptions[1].name)
    const [frequency, setFrequency] = useState(frequencyOptions[1].name)

    const { stateCalendar, setStateCalendar } = useContext(CalendarContext)
    const { selectedDate } = stateCalendar

    const [eventBeginDate, setEventBeginDate] = useState(selectedDate)

    const filteredPeople =
    query === ''
      ? people
      : people.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )

    const filteredLocations =
    locationQuery === ''
      ? locationOptions
      : locationOptions.filter((location) =>
          location.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(locationQuery.toLowerCase().replace(/\s+/g, ''))
        )

  const descRef = useRef<HTMLTextAreaElement>(null)
  
  // add an event listener to the description textarea to auto-expand it
    useEffect(() => {
        const textarea = descRef.current
        if (!textarea) return
        const resize = () => {
            textarea.style.height = 'auto'
            textarea.style.height = textarea.scrollHeight + 'px'
        }
        textarea.addEventListener('input', resize)
        resize()
        return () => textarea.removeEventListener('input', resize)
    }, [])

  return (
    <div className=''>
        <form action="#" className="relative">
      <div className="overflow-hidden bg-gray-100 rounded-sm shadow-sm">
        <label htmlFor="title" className="sr-only">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          style={{ outline: 'none', boxShadow: 'none' }}
          className="block w-full border-0 bg-white pb-2.5 pl-2.5 pt-2.5 text-xl font-medium placeholder-gray-500 "
          placeholder="Event Title"
        />
        <label htmlFor="description" className="sr-only">
          Description
        </label>
        <textarea
          rows={1}
          name="description"
          id="description"
          ref={descRef}
          style={{ outline: 'none', boxShadow: 'none' }}
          className="block w-full h-auto resize-none bg-white border-0 pb-2 pl-2.5 py-0 placeholder-gray-500 focus:ring-0 sm:text-sm"
          placeholder="Add a description..."
          defaultValue={''}
        />

        {/* Spacer element to match the height of the toolbar */}
        
      </div>

      <div className=" inset-x-px bottom-0 border-b border-gray-700">
        <div className="flex items-center justify-between space-x-3 border-t border-gray-700 px-1 py-2 sm:px-3">
          <div className="flex">
            <button
              type="button"
              className="group -my-2 -ml-2 inline-flex items-center rounded-full px-3 py-2 text-left text-gray-400"
            >
              <PaperClipIcon className="-ml-1 mr-1 h-5 w-5 text-gray-700 group-hover:text-gray-800" aria-hidden="true" />
              <span className="text-sm  text-gray-600 group-hover:text-gray-800">Attach</span>
            </button>
            {/* <button
              type="button"
              className="group -my-2 -ml-2 inline-flex items-center rounded-full px-3 py-2 text-left text-gray-400"
            >
              <UserCircleIcon className="-ml-1 mr-2 h-5 w-5 group-hover:text-gray-500" aria-hidden="true" />
              <span className="text-sm italic text-gray-500 group-hover:text-gray-600">Add guests</span>
            </button> */}
            <div className='flex pr-3'>
            <UserCircleIcon className=" mt-2 mr-2 h-5 w-5 text-gray-700 group-hover:text-gray-500" aria-hidden="true" />
            <div className=" w-[12.45rem]">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative ">
          <div className="relative w-full border border-gray-700 cursor-default overflow-hidden rounded-lg bg-gray-100 text-left sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 placeholder-gray-600 "
              displayValue={(person) => person.name}
                placeholder="Add guests"
              onChange={(event) => setQuery(event.target.value)}
              style={{ outline: 'none', boxShadow: 'none' }}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-100 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredPeople.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredPeople.map((person) => (
                  <Combobox.Option
                    key={person.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {person.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
    
            </div>
            <div className='flex '>
            <VideoCameraIcon className=" mt-2 mr-2 h-5 w-5 text-gray-700 group-hover:text-gray-500" aria-hidden="true" />
            <div className="w-40">
            <Listbox value={conference} onChange={setConference}>
            <Listbox.Button className="relative w-32 border border-gray-700 py-2 text-center bg-white rounded-lg cursor-default sm:text-sm">
                <span className="block truncate">{conference}</span>
                </Listbox.Button>
                <Listbox.Options className="absolute -ml-3 w-36 z-50 py-1 mt-1 overflow-auto text-base bg-gray-100 rounded-md shadow-lg sm:text-sm">
                    {
                        conferenceOptions.map((option) => (
                            <Listbox.Option
                            key={option.value}
                            className={({ active }) =>
                                `${active ? 'text-white bg-gray-600' : 'text-gray-900'}
                                cursor-default select-none relative py-2 pl-3 pr-4`
                            }
                            value={option.name}
                            >
                                {({ selected, active }) => (
                                    <>
                                    <span
                                        className={`block truncate ${
                                        selected ? 'font-medium' : 'font-normal'
                                        }`}
                                    >
                                        {option.name}
                                    </span>
                                    {/* {selected ? (
                                        <span
                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                            active ? 'text-white' : 'text-teal-400'
                                        }`}
                                        >
                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                    ) : null} */}
                                    </>
                                )}
                            </Listbox.Option>
                        ))
                    }
                </Listbox.Options>
            </Listbox>
      
    </div>
    
            </div>
            
          </div>
        </div>
      </div>
      <div className=" inset-x-px bottom-0  border-gray-700">
        <div className="flex items-center space-x-3 border-gray-700 px-1 py-2 sm:px-3">
          <div className="flex flex-row">
          <div className='inline-flex mt-2 mr-2'>
          <BsStopwatch className=" mr-1.5 h-5 w-5 text-black group-hover:text-gray-800" aria-hidden="true" />
          <span className="text-sm  text-gray-700 group-hover:text-gray-800">Duration</span>
          </div>
          <div>
          <Listbox value={duration} onChange={setDuration}>
            <Listbox.Button className="relative w-32 border border-gray-700 py-2 text-center bg-white rounded-lg cursor-default sm:text-sm">
                <span className="block truncate">{duration}</span>
                </Listbox.Button>
                <Listbox.Options className="absolute z-50 w-32 py-1 mt-1 overflow-auto text-base bg-gray-100 rounded-md shadow-lg sm:text-sm">
                    {
                        durationOptions.map((option) => (
                            <Listbox.Option
                            key={option.value}
                            className={({ active }) =>
                                `${active ? 'text-white bg-gray-600' : 'text-gray-900'}
                                cursor-default select-none relative py-2 pl-10 pr-4`
                            }
                            value={option.name}
                            >
                                {({ selected, active }) => (
                                    <>
                                    <span
                                        className={`block truncate ${
                                        selected ? 'font-medium' : 'font-normal'
                                        }`}
                                    >
                                        {option.name}
                                    </span>
                                    {selected ? (
                                        <span
                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                            active ? 'text-white' : 'text-teal-400'
                                        }`}
                                        >
                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                    ) : null}
                                    </>
                                )}
                            </Listbox.Option>
                        ))
                    }
                </Listbox.Options>
            </Listbox>
          </div>
          <div className='inline-flex ml-7 mt-2 mr-2'>
          <BsCalendarEvent className=" mr-1.5 h-5 w-5 text-gray-700 group-hover:text-gray-800" aria-hidden="true" />
          <span className="text-sm  text-gray-700 group-hover:text-gray-800">Start Date</span>
          </div>
          <div>
            <InputDatePicker eventBeginDate={eventBeginDate} />
          </div>
          
          </div>
        </div>
      </div>
      <div className=" inset-x-px bottom-0 border-b border-gray-700 pb-2 border-gray-700">
        <div className="flex items-center space-x-3 border-gray-700 px-1 sm:px-3">
          <div className="flex flex-row">
          <div className='inline-flex mt-2 mr-2'>
          <BsClock className=" mr-1.5 mt-1 h-5 w-5 text-gray-700 group-hover:text-gray-800" aria-hidden="true" />
          <span className="text-sm  mt-1 text-gray-700 group-hover:text-gray-800">Starts at</span>
          </div>
          <div>
          <TimeSelect />
          </div>
          <div className='inline-flex ml-7 mt-2 mr-2'>
          <BsGlobeAmericas className=" mr-1.5 mt-1 h-5 w-5 text-gray-700 group-hover:text-gray-800" aria-hidden="true" />
          <span className="text-sm mt-1  text-gray-700 group-hover:text-gray-800">Location</span>
          </div>
          <div className='mt-1'>
          <Combobox value={selectedLocation} onChange={setSelectedLocation}>
        <div className="relative ">
          <div className="relative w-[139px] border border-gray-700 cursor-default overflow-hidden rounded-lg bg-gray-100 text-center  sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 placeholder-gray-600"
              displayValue={(location) => location.name}
                placeholder="Add Location"
              onChange={(event) => setLocationQuery(event.target.value)}
              style={{ outline: 'none', boxShadow: 'none' }}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setLocationQuery('')}
          >
            <Combobox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-100 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredLocations.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredLocations.map((location) => (
                  <Combobox.Option
                    key={location.value}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={location}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {location.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
            
          </div>
          
          </div>
        </div>
      </div>
      {
        habitFrequencyIndex === 1 && (
          <FrequencyPicker />
          
        )
      }
      {/* <div className='p-3 border-b border-gray-700 rounded-sm'>
      <EventCopilot />
    </div> */}

    <div className='inset-x-px bottom-0'>
    <div className='flex  justify-end pt-1.5 mr-1.5'>
    <button
      type="submit"
      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
    >
      Save
    </button>
    <button
      type="button"
      onClick={() => {console.log('hi')}}
      className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
    >
      Cancel
    </button>
    </div>
    </div>


      

      
    </form>
    
    </div>
  )
}
