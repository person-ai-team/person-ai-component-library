import { useState } from "react";
import { Tab } from "@headlessui/react";
import EventService from "./EventService";
import TaskService from "./TaskService";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function CreateEventEngine() {
    const [tabs] = useState({
        Event: [
          {
            id: 0,
          },
        ],
        Task: [
          {
            id: 1,
          },
        ],
        Habit: [
          {
            id: 2,
          },
        ],
      });

    const [habitFrequency] = useState({
        "One-Time": [
            {
                id: 0,
            },
        ],
        "Recurring": [
            {
                id: 1,
            },
        ],
    });


  const [selectedIndex, setSelectedIndex] = useState(0);
  const [habitFrequencyIndex, setHabitFrequencyIndex] = useState(0);

  return (
    <div className="w-full h-full">
      <div className="flex border-gray-600 border-b pb-1.5  flex-row">
        <div className="bg-gray-100 border-gray-700 border rounded-md mt-2 ml-2 p-1">
        <Tab.Group
                        selectedIndex={selectedIndex}
                        onChange={setSelectedIndex}
                      >
                        <Tab.List className='flex space-x-0 rounded-md  '>
                          {Object.keys(tabs).map((tab) => (
                            <Tab
                              key={tab}
                              style={{
                                outline: 'none',
                                boxShadow: 'none',
                                
                              }}
                              className={({ selected }) =>
                                classNames(
                                  'font-small rounded-md  bg-gray-100 px-3 py-2 text-sm leading-5 ',
                                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                  selected
                                    ? 'border-gray-500 bg-white border text-black shadow'
                                    : 'text-gray-800 hover:bg-white/[0.12] hover:text-black'
                                )
                              }
                            >
                              {tab}
                            </Tab>
                          ))}
                        </Tab.List>
                        </Tab.Group>
                        
        </div>
        <div className="bg-gray-100 border-gray-700 border rounded-md mt-2 mr-2 ml-auto p-1">
        <Tab.Group
                        selectedIndex={habitFrequencyIndex}
                        onChange={setHabitFrequencyIndex}
                      >
                        <Tab.List className='flex space-x-0 rounded-md  '>
                          {Object.keys(habitFrequency).map((tab) => (
                            <Tab
                              key={tab}
                              style={{
                                outline: 'none',
                                boxShadow: 'none',
                                
                              }}
                              className={({ selected }) =>
                                classNames(
                                  'font-small rounded-md  bg-gray-100 px-3 py-2 text-sm leading-5 ',
                                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                                  selected
                                    ? 'border-gray-500 bg-white border text-black shadow'
                                    : 'text-gray-800 hover:bg-white/[0.12] hover:text-black'
                                )
                              }
                            >
                              {tab}
                            </Tab>
                          ))}
                        </Tab.List>
                        </Tab.Group>
        </div>
      </div>
      
      <div>
        {
            selectedIndex === 0 ? (<div className=" bg-gray-200 text-gray-700"><EventService habitFrequencyIndex={habitFrequencyIndex} /></div>) : selectedIndex === 1 ? <TaskService habitFrequencyIndex={habitFrequencyIndex} /> : selectedIndex === 2 ? <p>Goals</p> : selectedIndex === 3 ? <p>Journal</p> : null
        }
      </div>
    </div>
  );
}
