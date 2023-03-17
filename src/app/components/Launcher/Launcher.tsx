import { Fragment, useState, useEffect } from "react";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import {
  ExclamationTriangleIcon,
  FolderIcon,
  LifebuoyIcon,
} from "@heroicons/react/24/outline";
import { TiLightbulb } from "react-icons/ti";
import { HiArrowNarrowRight } from "react-icons/hi";
import {
  FcIdea,
  FcLeave,
  FcPlanner,
  FcSportsMode,
  FcTodoList,
  FcCalendar,
} from "react-icons/fc";
import {IoReturnUpBack} from 'react-icons/io5'
import DatePicker from "../DatePicker/DatePicker";
import InputDatePicker from "../DatePicker/InputDatePicker";
import Timepicker from "../TimePicker/Timepicker";
import Image from "next/image";



const calendar = [
  { id: 1, name: "Calendar" },
  { id: 2, name: "Event" },
  { id: 3, name: "Task" },
  // More events...
];

const quickCalendarActions = [
  { id: 1, name: "Add a new event", icon: FcPlanner, shortcut: "E", url: "#" },
  { id: 2, name: "Add a new task", icon: FcTodoList, shortcut: "T", url: "#" },
  {
    id: 3,
    name: "Add a new habit",
    icon: FcSportsMode,
    shortcut: "H",
    url: "#",
  },
  // More actions...
];

const generalCommands = [
  { id: 1, name: "Create Event", icon: FcPlanner, shortcut: "E", url: "#" },
  { id: 2, name: "Create Task", icon: FcTodoList, shortcut: "T", url: "#" },
  {
    id: 3,
    name: "Create Habit",
    icon: FcSportsMode,
    shortcut: "H",
    url: "#",
  },
  { id: 4, name: "Change Breakfast", icon: FcLeave, shortcut: "B", url: "#" },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Launcher() {
  const [open, setOpen] = useState(true);
  const [rawQuery, setRawQuery] = useState("");
  const [commandSelected, setCommandSelected] = useState("");

  console.log('commandSelected', commandSelected)

  const query = rawQuery.toLowerCase().replace(/^[#>]/, "");

  useEffect(() => {
    if (rawQuery !== commandSelected) {
      setCommandSelected("");
    }
  }, [rawQuery]);

  useEffect(() => {
    if (commandSelected) {
      setRawQuery(commandSelected);
    }
  } , [commandSelected]);
  



  const filteredCommands =
     rawQuery === "#" 
     ? generalCommands
      : query === "" || rawQuery.startsWith(">") || rawQuery.startsWith("c")
      ? []
      : generalCommands.filter((command) =>
          command.name.toLowerCase().includes(query)
        );

  const filteredCalendar =
    rawQuery === "c"
      ? calendar
      : query === "" || rawQuery.startsWith("#") || rawQuery.startsWith(">")
      ? []
      : quickCalendarActions.filter((calendar) =>
          calendar.name.toLowerCase().includes(query)
        );

  // check if raw query has the word 'calendar' using fuzzy search or regex

  return (
              <Combobox value={rawQuery}  onChange={(item: any) => (window.location = item.url)}>
                <div className="relative">
                  <MagnifyingGlassIcon
                    className="pointer-events-none absolute top-2.5 left-4 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <Combobox.Input
                    className="h-10 md:w-full sm:w-full lg:max-w-md xl:max-w-xl focus:outline-none border border-1 border-gray-500 rounded-xl bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 sm:text-sm"
                    placeholder="Explore Person.ai"
                    onChange={(event) => setRawQuery(event.target.value)}
                  />
                </div>

                <div className="bg-white z-50 relative md:w-full lg:max-w-md xl:max-w-xl">
                {rawQuery.length > 0 && rawQuery != '#' && !commandSelected && (
                  <div className="bg-white mt-2 p-1 lg:w-full xl:max-w-xl">
                    <div className="flex cursor-pointer select-none rounded-lg hover:bg-gray-200 p-3">
                      <div
                        className={classNames(
                          "flex w-10 flex-none items-center justify-center rounded-lg"
                        )}
                      >
                        {/* <item.icon className="h-6 w-6 text-white" aria-hidden="true" /> */}
                        {/* <TiLightbulb className="h-6 w-6 ml-2.5 text-black" aria-hidden="true" /> */}
                        <FcIdea
                          className="h-6 w-6 ml-2.5 -mt-1 text-black"
                          aria-hidden="true"
                        />
                        {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2.5 text-black">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
</svg> */}
                      </div>
                      <div className="ml-2 flex-auto">
                        <div
                          className={classNames(
                            "text-sm text-gray-700 font-small"
                          )}
                        >
                          Search with AI
                        </div>
                
                      </div>
                    </div>
                  </div>
                )}

                {
                  filteredCommands.length > 0 && !commandSelected && (
                    <div className="p-1 bg-white lg:w-full xl:max-w-xl">
                      <div>
                        <div className="text-sm text-gray-500 p-2 font-small">Commands</div>
                      </div>
                      {
                        filteredCommands.map((item) => (
                          <Combobox.Option
                            key={item.name}
                            value={item}
                            onClick={() => {setCommandSelected(item.name)}}
                            className={({ active }) =>
                              classNames(
                                "flex cursor-pointer select-none rounded-lg hover:bg-gray-200 p-3",
                                active && "bg-gray-200 text-black"
                              )
                            }
                          >
                            {({ active }) => (
                              <>
                                <div
                                  className={classNames(
                                    "flex w-10 flex-none items-center justify-center rounded-lg"
                                  )}
                                >
                                  <item.icon
                                    className="h-6 w-6 text-white"
                                    aria-hidden="true"
                                  />
                                </div>
                                <div className="ml-2 flex-auto">
                                  <div
                                    className={classNames(
                                      "text-sm text-gray-700 font-small"
                                    )}
                                  >
                                    {item.name}
                                  </div>
                                  
                                </div>
                              </>
                            )}
                          </Combobox.Option>
                        ))
                      }
                    </div>
                  )
                }

                {
                  rawQuery.length > 0 && commandSelected === 'Create Event' && rawQuery === 'Create Event' && (
                    // add a form to create an event
                    <div style={{ borderWidth: 1, borderColor: 'lightslategray'}} className=" -mt-11 -ml-1 fixed z-50 grid grid-cols-1 rounded-xl bg-white lg:w-2/4 xl:max-w-2xl">
                      <div className="p-2 flex">
                      <button onClick={() => {setRawQuery('')}}>
                      <IoReturnUpBack className="h-6 w-6 ml-2.5 mt-1 text-black" aria-hidden="true" />
                      </button>
                      <div>
                        <div className="text-sm text-black mt-1.5 font-mono lg:ml-10 font-small">Create Event</div>
                        </div>

                      </div>
                      <div style={{borderBottomWidth: 1, borderColor: 'lightslategray'}}/>
                      <div className="px-16 py-4">
                        <form>
                          <div className="flex flex-col">
                          <div className="mb-4 mt-1 flex">
                            <label className="block text-gray-600 text-xs font-mono mt-3" htmlFor="title">
                              Event Title
                            </label>
                            <input className="shadow text-sm ml-4 font-medium appearance-none border border-black rounded-xl lg:w-80 w-72 py-2 px-3 placeholder:text-gray-500 placeholder:text-xs text-gray-700 leading-tight font-mono focus:outline-none focus-within:border-gray-400 focus:shadow-outline" id="title" type="text" placeholder="New Event" />
                          </div>
                          <div className="mb-4 mt-1 flex">
                            <label className="block text-gray-600 text-xs font-mono mt-3" htmlFor="title">
                              Event Date
                            </label>
                            <div className="ml-4">
                            <InputDatePicker />
                            </div>
                          </div>
                          </div>
                          <div className="mt-1 flex">
                          <div className="mb-4 mt-1">
                            <label className="block text-gray-600 text-xs font-mono mb-2" htmlFor="title">
                              Event Time
                            </label>
                            <Timepicker />
                            
                            </div> 
                            <div className="mb-4 mt-1 ml-7">
                            <label className="block text-gray-600 text-xs font-mono mb-2" htmlFor="title">
                              Event Duration
                            </label>
                            <div className="ml-3.5">
                            <Timepicker />
                            </div>
                            
                            </div>
                          </div>
   
                          </form>
                      </div>
                    </div>
                  )
                }

                {/* {filteredCalendar.length > 0 && (
                  <li className="p-4 list-none">
                    <h2 className="sr-only">Calendar Quick actions</h2>
                    <h2 className="text-sm font-semibold text-gray-900">
                      Calendar Quick actions
                    </h2>
                    <ul className="text-sm mt-2 text-gray-700">
                      {quickCalendarActions.map((action) => (
                        <Combobox.Option
                          key={action.shortcut}
                          value={action}
                          className={({ active }) =>
                            classNames(
                              "flex cursor-default select-none items-center rounded-md px-3 py-2",
                              active && "bg-gray-200 text-black"
                            )
                          }
                        >
                          {({ active }) => (
                            <>
                              <action.icon
                                className={classNames(
                                  "h-6 w-6 flex-none",
                                  active ? "text-white" : "text-gray-400"
                                )}
                                aria-hidden="true"
                              />
                              <span className="ml-3 flex-auto truncate">
                                {action.name}
                              </span>
                              <span
                                className={classNames(
                                  "ml-3 flex-none text-xs font-semibold",
                                  active ? "text-indigo-100" : "text-gray-400"
                                )}
                              >
                                <kbd className="font-sans">⌘</kbd>
                                <kbd className="font-sans">
                                  {action.shortcut}
                                </kbd>
                              </span>
                            </>
                          )}
                        </Combobox.Option>
                      ))}
                    </ul>
                  </li>
                )} */}

              

                {rawQuery === "?" && (
                  <div className="py-14 px-6 lg:max-w-md xl:max-w-xl bg-white text-center text-sm sm:px-14">
                    <LifebuoyIcon
                      className="mx-auto h-6 w-6 text-gray-400"
                      aria-hidden="true"
                    />
                    <div className="mt-4 font-semibold text-gray-900">
                      Help with searching
                    </div>
                    <div className="mt-2 text-gray-500">
                      Use this tool to quickly search for users and projects
                      across our entire platform. You can also use the search
                      modifiers found in the footer below to limit the results
                      to just users or projects.
                    </div>
                  </div>
                )}

            

                {(query !== '' || (rawQuery === '#' || rawQuery === '>' ))  && (
                  <div className="flex flex-wrap lg:max-w-md xl:max-w-xl items-center bg-gray-50 py-2.5 px-4 text-xs text-gray-700">
                    Type{" "}
                    <kbd
                      className={classNames(
                        "mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2",
                        rawQuery.startsWith("#")
                          ? "border-indigo-600 text-indigo-600"
                          : "border-gray-400 text-gray-900"
                      )}
                    >
                      #
                    </kbd>{" "}
                    <span className="sm:hidden">for calendar,</span>
                    <span className="hidden sm:inline">
                      to access commands,
                    </span>
                    <kbd
                      className={classNames(
                        "mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2",
                        rawQuery.startsWith(">")
                          ? "border-indigo-600 text-indigo-600"
                          : "border-gray-400 text-gray-900"
                      )}
                    >
                      &gt;
                    </kbd>{" "}
                    for users, and{" "}
                    <kbd
                      className={classNames(
                        "mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2",
                        rawQuery === "?"
                          ? "border-indigo-600 text-indigo-600"
                          : "border-gray-400 text-gray-900"
                      )}
                    >
                      ?
                    </kbd>{" "}
                    for help.
                  </div>
                )}
                </div>
              </Combobox>
  );
}
