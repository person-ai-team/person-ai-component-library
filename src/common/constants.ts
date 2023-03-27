import { format } from "date-fns";


export const interval = 30;
// create time array options showing in 12 hour format
export const timeOptions: any = [];
for (let i = 0; i < 24; i++) {
  for (let j = 0; j < 60; j += interval) {
    // const time = `${i < 10 ? "0" : ""}${i}:${j < 10 ? "0" : ""}${j}`
    // get time in 12 hour format
    const time = format(new Date(0, 0, 0, i, j), 'h:mm a');
    const time12 = format(new Date(0, 0, 0, i, j), 'h:mm a');
    timeOptions.push({ value: time, label: time12 });
  }
}

export const habitFrequencyOptions = [
  { name: 'Does not repeat', value: 'None' },
  { name: 'Weekdays (Mon - Fri)', value: 'Weekday' },
  { name: 'Daily', value: 'Daily' },
  { name: 'Weekly', value: 'Weekly' },
  { name: 'Monthly', value: 'Monthly' },
  { name: 'Yearly', value: 'Yearly' },
];

export const runningBikingFrequencyOptions = [
  { name: 'Weekly on', value: 'Weekly' },
  { name: 'Everyday', value: 'Everyday' },
  { name: '2 days / week', value: 'For 2 days' },
  { name: '3 days / week', value: 'For 3 days' },
  { name: '4 days / week', value: 'For 5 days' },
];

export const runningDistanceOptions = [
  { name: '1 mile', value: 1 },
  { name: '3 miles', value: 3 },
  { name: '5 miles', value: 5 },
  { name: '8 miles', value: 8 },
  { name: '11 miles', value: 11 },
];

export const durationOptions = [
  { name: '30 minutes', value: 30 },
  { name: '1 hour', value: 60 },
  { name: '2 hours', value: 120 },
];

export const strengthTrainingPlans = [
  { name: 'Full Body Training', value: 'Full Body' },
  { name: 'Split Training', value: 'Split Training' },
  { name: 'Powerlifting', value: 'Powerlifting' },
  { name: 'Olympic Lifting', value: 'Olympic Lifting' },
];

export const meditationPlans = [
  { name: 'Mindfulness', value: 'Mindfulness' },
  { name: 'Gratitude', value: 'Gratitude' },
  { name: 'Yoga', value: 'Yoga' },
];

export const mindfulPlans = [
  { name: 'Mindful Wakeup', value: 'Mindful Wakeup' },
  { name: 'Mindful Pause', value: 'Mindful Pause' },
  { name: 'Mindful Walking', value: 'Mindful Walking' },
];

export const gratitudePlans = [
  { name: 'Grateful Mantra', value: 'Grateful Mantra' },
  { name: 'Gratitude Journal', value: 'Gratitude Journal' },
  { name: 'Positive Affirmations', value: 'Positive Affirmations' },
];

export const yogaPlans = [
  { name: 'Hatha Yoga', value: 'Hatha Yoga' },
  { name: 'Restorative Yoga', value: 'Restorative Yoga' },
  { name: 'Yin Yoga', value: 'Yin Yoga' },
  { name: 'Vinyasa Yoga', value: 'Vinyasa Yoga' },
];

export const meditationDurations = [
  { name: '5 minutes', value: 5 },
  { name: '10 minutes', value: 10 },
  { name: '15 minutes', value: 15 },
  { name: '30 minutes', value: 30 },
  { name: '1 hour', value: 60 },
];

export const eventDurationOptions = [
  {name: '15 minutes', value: 15},
  {name: '30 minutes', value: 30},
  {name: '45 minutes', value: 45},
  {name: '1 hour', value: 60},
  {name: '2 hours', value: 120},
  {name: '3 hours', value: 180},
  {name: '4 hours', value: 240},
  {name: '5 hours', value: 300}
];