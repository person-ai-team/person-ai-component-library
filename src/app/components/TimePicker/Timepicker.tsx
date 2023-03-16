import { Listbox } from '@headlessui/react';
import { format } from 'date-fns';
import { useState } from 'react';

const interval = 30; // minutes

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

export default function Timepicker() {
    const [selected, setSelected] = useState({ label: '10:00 AM' });
    const [findElement, setFindElement] = useState(false);
    const [eventBeginTime, setEventBeginTime] = useState({ label: '10:00 AM' });

    const onChangeBeginTime = (e: any) => {
        setSelected(e);
        setEventBeginTime(e);
        setFindElement(false);
    };

    return (
        <Listbox
                                          value={selected}
                                          onChange={onChangeBeginTime}
                                        >
                                          <Listbox.Button
                                            onClick={() => {
                                              setFindElement(true);
                                            }}
                                            className='font-small relative w-20 cursor-default rounded-xl border bg-white py-2 text-center text-xs text-gray-700 shadow leading-tight font-mono focus:outline-none focus-within:border-gray-400 focus:shadow-outline'
                                          >
                                            <span className='block truncate'>
                                              {selected.label ||
                                                eventBeginTime.label}
                                            </span>
                                          </Listbox.Button>
                                          <Listbox.Options
                                            style={{ marginLeft: 1 }}
                                            className='w-30 font-small absolute z-30 mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base text-xs font-mono shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
                                          >
                                            {timeOptions.map(
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
    )
}