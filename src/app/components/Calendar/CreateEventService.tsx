/* eslint-disable react-hooks/exhaustive-deps */
/* This example requires Tailwind CSS v2.0+ */
import { Tab } from '@headlessui/react';
import { Listbox } from '@headlessui/react';
import { format, getTime, addHours, addMinutes } from 'date-fns';
import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
// import required modules
import { EffectFade, Navigation } from 'swiper';
import { PersonDialog } from '../Dialog/Dialog';



// import Todo from '@/components/Todo/Todo';

import { CalendarContext } from '../../../common/CalendarContext';
import * as Constants from '../../../common/constants';
import CreateEventEngine from './CreateEventEngine';

import DatePicker from './EngineComponents/DatePicker';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function CreateEvent() {
  
  const { stateCalendar, setStateCalendar } = useContext(CalendarContext);
  const { createEventsDrawer } = stateCalendar;

  const [open , setOpen] = useState(createEventsDrawer)

  useEffect(() => {
    setOpen(createEventsDrawer)
  }, [createEventsDrawer])

  const handleClose = () => {
    setOpen(false);
    setStateCalendar({ ...stateCalendar, createEventsDrawer: false });
};

  return (
    <PersonDialog size='large' handleClose={handleClose} openDialog={open}>
      <CreateEventEngine />
    </PersonDialog>
  )
  
}
