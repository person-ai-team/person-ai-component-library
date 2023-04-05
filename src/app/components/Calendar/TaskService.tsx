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
import { Listbox, Combobox, Transition } from '@headlessui/react'
// import {CiStopwatch} from 'react-icons/ci'
// import {GiStopwatch} from 'react-icons/gi'
import {BsStopwatch, BsClock, BsCalendarEvent, BsGlobeAmericas, BsCalendar3} from 'react-icons/bs'
import { CalendarIcon, PaperClipIcon, TagIcon, UserCircleIcon, CheckIcon, ChevronUpDownIcon, ClockIcon, CalendarDaysIcon, VideoCameraIcon, MapIcon, GlobeAltIcon, GlobeAmericasIcon } from '@heroicons/react/20/solid'
import InputDatePicker from '../DatePicker/InputDatePicker'
import TimeSelect from './EngineComponents/TimeSelect';
import FrequencyPicker from './EngineComponents/FrequencyPicker';
import InformationInput from './EngineComponents/InformationInput';
import TimeEngineDialog from './EngineComponents/TimeEngineDialog'
import ActionsDialog from './EngineComponents/ActionsDialog'
import EventCopilot from './EventCopilot';


const frequencyOptions = [
    { name: 'Daily/Everyday', value: 'daily' },
    { name: 'Weekly on...', value: 'weekly' },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function TaskService(props: any) {

    const { habitFrequencyIndex } = props

  return (
    <div className=''>
        <form action="#" className="relative">

          <div>
            <InformationInput type={'Task'} />
          </div>

          <div>
            <TimeEngineDialog />
          </div>
      
      
      {
        habitFrequencyIndex === 1 && (
          <FrequencyPicker />
          
        )
      }
      {/* <div className='p-3 border-b border-gray-700 rounded-sm'>
      <EventCopilot />
    </div> */}

    <div>
      <ActionsDialog />
    </div>

    


      

      
    </form>
    
    </div>
  )
}
