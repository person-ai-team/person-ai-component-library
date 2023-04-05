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
  { name: "Sunday", value: "sunday" },
  { name: "Monday", value: "monday" },
  { name: "Tuesday", value: "tuesday" },
  { name: "Wednesday", value: "wednesday" },
  { name: "Thursday", value: "thursday" },
  { name: "Friday", value: "friday" },
  { name: "Saturday", value: "saturday" },
];

export default function FrequencyPicker() {
  const [frequency, setFrequency] = useState(frequencyOptions[0].name);

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
              <Listbox.Button className="relative w-32 border mt-2 border-gray-700 py-2 text-center bg-white rounded-lg cursor-default sm:text-sm">
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
            <div className=" flex flex-row ">
                <div className="inline-flex mt-2 -ml-3 mr-2">
            <BsCalendarDay
              className=" mr-1.5 mt-3  h-5 w-5 text-gray-700 group-hover:text-gray-800"
              aria-hidden="true"
            />
            <span className="text-sm mt-3  text-gray-700 group-hover:text-gray-800">
              Days in Week
            </span>
          </div>
              <div className="bg-gray-400 p-1 mt-3 text-md space-x-1 items-center rounded-md">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-normal px-2 py-1 items-center rounded-xl">
                  Sun
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-normal px-2 py-1 items-center rounded-xl">
                  Mon
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-normal px-2 py-1 items-center rounded-xl">
                  Tue
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-normal px-2 py-1 items-center rounded-xl">
                  Wed
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-normal px-2 py-1 items-center rounded-xl">
                  Thu
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-normal px-2 py-1 items-center rounded-xl">
                  Fri
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-normal px-2 py-1 items-center rounded-xl">
                  Sat
                </button>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
