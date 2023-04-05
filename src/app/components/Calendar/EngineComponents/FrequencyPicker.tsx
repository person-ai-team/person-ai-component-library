import {
  BsStopwatch,
  BsClock,
  BsCalendarEvent,
  BsGlobeAmericas,
  BsCalendar3,
  BsCalendarDay
} from "react-icons/bs";
import { Listbox, RadioGroup } from "@headlessui/react";
import { Fragment, useState } from "react";

const frequencyOptions = [
  { name: "Daily/Everyday", value: "daily" },
  { name: "Weekly on...", value: "weekly" },
];

const dayOptions = [
  { name: "Sun", value: "sunday" },
  { name: "Mon", value: "monday" },
  { name: "Tue", value: "tuesday" },
  { name: "Wed", value: "wednesday" },
  { name: "Thu", value: "thursday" },
  { name: "Fri", value: "friday" },
  { name: "Sat", value: "saturday" },
];

export default function FrequencyPicker() {
  const [frequency, setFrequency] = useState(frequencyOptions[0].name);
  const [day, setDay] = useState(dayOptions[0].name);

  // create a function that checks which day is 

  return (
    <div className=" inset-x-px bottom-0 border-b border-gray-700 pb-2 border-gray-700">
      <div className="flex flex-col space-x-3 border-gray-700 px-1 sm:px-3">
        <div className="flex flex-row items-center">
          <div className="inline-flex mt-2 mr-2">
            <BsCalendar3
              className=" mr-1.5  h-5 w-5 text-gray-700 group-hover:text-gray-800"
              aria-hidden="true"
            />
            <span className="text-sm  text-gray-700 group-hover:text-gray-800">
              Frequency
            </span>
          </div>
          <div>
            <Listbox value={frequency} onChange={setFrequency}>
              <Listbox.Button className="relative w-[7.2rem] border mt-2 border-gray-700 py-2 text-center bg-white rounded-lg cursor-default sm:text-sm">
                <span className="block truncate">{frequency}</span>
              </Listbox.Button>
              <Listbox.Options className="absolute z-50 w-32 py-1 mt-1 overflow-auto text-base bg-gray-100 rounded-md shadow-lg sm:text-sm">
                {frequencyOptions.map((option) => (
                  <Listbox.Option
                    key={option.value}
                    className={({ active }) =>
                      `${active ? "text-white bg-gray-600" : "text-gray-900"}
                                cursor-default select-none relative py-2 text-center`
                    }
                    value={option.name}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {option.name}
                        </span>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          </div>
          
        </div>
        {frequency === "Weekly on..." && (
            <div className=" flex flex-col ">
                <div className="inline-flex mt-3 -ml-3 mr-2">
            <BsCalendarDay
              className=" mr-1.5 h-5 w-5 text-gray-700 group-hover:text-gray-800"
              aria-hidden="true"
            />
            <span className="text-sm text-gray-700 group-hover:text-gray-800">
              Days in Week
            </span>
          </div>
              <div className=" mt-2 p-2 bg-gray-50 border border-gray-700 -ml-2.5 text-md flex justify-center space-x-2 rounded-md">
                {dayOptions.map((option) => (
                  <button onClick={() => setDay(option.name)}  key={option.value} className="bg-gray-200 border border-gray-700 hover:bg-gray-300 text-gray-700 font-semibold py-1 px-3.5 rounded-md">
                    {option.name}
                  </button>
                ))}
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
