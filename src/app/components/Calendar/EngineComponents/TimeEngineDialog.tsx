import { Listbox, Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { BsStopwatch, BsCalendarEvent, BsClock, BsGlobeAmericas } from "react-icons/bs";
import InputDatePicker from "../../DatePicker/InputDatePicker";
import TimeSelect from "./TimeSelect";
import { useState, useContext } from "react";
import { CalendarContext } from '../../../../common/CalendarContext';

const locationOptions = [
    { name: 'Home', value: 'home' },
    { name: 'Office', value: 'office' },
  ];
  
  const durationOptions = [
      { name: '30 mins', value: 30 },
      { name: '1 hour', value: 60 },
      { name: '2 hours', value: 120 },
  ];

export default function TimeEngineDialog() {
    const [selectedLocation, setSelectedLocation] = useState(locationOptions[0].name)
    const [locationQuery, setLocationQuery] = useState('')
    const [query, setQuery] = useState('')
    const { stateCalendar, setStateCalendar } = useContext(CalendarContext)
    const { selectedDate } = stateCalendar

    const [eventBeginDate, setEventBeginDate] = useState(selectedDate)

    
    const [duration, setDuration] = useState(durationOptions[0].name)


    const filteredLocations =
    locationQuery === ''
      ? locationOptions
      : locationOptions.filter((location) =>
          location.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(locationQuery.toLowerCase().replace(/\s+/g, ''))
        )

  

    return (
        <div>
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
              displayValue={(location: any) => location.name}
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
        </div>
    )
}