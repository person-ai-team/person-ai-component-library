import { format } from 'date-fns';
import { Listbox } from '@headlessui/react';
import { useState } from 'react';
import { ArrowLongLeftIcon } from '@heroicons/react/20/solid';

const interval = 30;

const timeOptions: any = [];
for (let i = 0; i < 24; i++) {
  for (let j = 0; j < 60; j += interval) {
    // const time = `${i < 10 ? "0" : ""}${i}:${j < 10 ? "0" : ""}${j}`
    // get time in 12 hour format
    const time = format(new Date(0, 0, 0, i, j), 'h:mm a');
    const time12 = format(new Date(0, 0, 0, i, j), 'h:mm a');
    timeOptions.push({ value: time, label: time12 });
  }
}

export default function TimeSelect(props: any) {
    const { time, setTime } = props;
    const [selected, setSelected] = useState(timeOptions[0]);

    const handleChange = (selected: any) => {
        setSelected(selected);
        setTime(selected);
    }

    return (
        <Listbox value={selected} onChange={handleChange}>
            <div className="relative mt-1">
                <Listbox.Button className="relative border border-gray-700 w-32 py-2   text-center bg-white rounded-lg shadow-md cursor-default sm:text-sm">
                    <span className="block truncate">{selected.label}</span>
                    
                </Listbox.Button>
                <Listbox.Options className="absolute w-full z-50 py-1 mt-1 overflow-y-auto max-h-60 text-base bg-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5  sm:text-sm">
                    {timeOptions.map((time: any) => (
                        <Listbox.Option
                            key={time.value}
                            className={({ active }) =>
                                `${active ? 'text-black bg-gray-200' : 'text-gray-900'}
                            cursor-default select-none relative py-2 pl-8 pr-4`
                            }
                            value={time}
                        >
                            {({ selected, active }) => (
                                <>
                                    <span
                                        className={`${selected ? 'font-medium' : 'font-normal'
                                            } block truncate`}
                                    >
                                        {time.label}
                                    </span>
                                    {selected ? (
                                        <span
                                            className={`${active ? 'text-black' : 'text-gray-600'
                                                }
                                        absolute inset-y-0 left-0 flex items-center pl-2`}
                                        >
                                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd"
                                                    d="M10.707 6.293a1 1 0 010 1.414L8.414 10l2.293
                                                    2.293a1 1 0 01-1.414 1.414l-3-3a1 1 0
                                                    010-1.414l3-3a1 1 0 011.414 0z"
                                                    clipRule="evenodd" />
                                            </svg>
                                        </span>
                                    ) : null}
                                </>
                            )}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </div>
        </Listbox>
    )
}
