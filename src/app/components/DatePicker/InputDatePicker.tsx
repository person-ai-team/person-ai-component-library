import {
  addMonths,
  addYears,
  format,
  getDay,
  getDaysInMonth,
  isEqual,
  subMonths,
  subYears} from "date-fns";
import { useEffect, useState } from "react";

type DatepickerType = "date" | "month" | "year";

export default function InputDatePicker(props: any) {
  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [dayCount, setDayCount] = useState<Array<number>>([]);
  const [blankDays, setBlankDays] = useState<Array<number>>([]);
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [datepickerHeaderDate, setDatepickerHeaderDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [type, setType] = useState<DatepickerType>("date");

  const { eventBeginDate, setEventBeginDate, selectedIndex } = props;
  
  // if something else is clicked outside of the element with datePicker id, close the datepicker
  useEffect(() => {
    const datePicker = document.getElementById("datePicker");
    const handleClickOutside = (event: any) => {
      if (datePicker && !datePicker.contains(event.target)) {
        setShowDatepicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [datepickerHeaderDate]);

  const decrement = () => {
    switch (type) {
      case "date":
        setDatepickerHeaderDate((prev) => subMonths(prev, 1));
        // setSelectedDate((prev) => subMonths(prev, 1));
        setSelectedDay((prev) => subMonths(prev, 1));
        break;
      case "month":
        setDatepickerHeaderDate((prev) => subYears(prev, 1));
        break;
      case "year":
        setDatepickerHeaderDate((prev) => subMonths(prev, 1));
        break;
    }
  };

  const increment = () => {
    switch (type) {
      case "date":
        setDatepickerHeaderDate((prev) => addMonths(prev, 1));
        // setSelectedDate((prev) => addMonths(prev, 1));
        setSelectedDay((prev) => addMonths(prev, 1));
        break;
      case "month":
        setDatepickerHeaderDate((prev) => addYears(prev, 1));
        break;
      case "year":
        setDatepickerHeaderDate((prev) => subMonths(prev, 1));
        break;
    }
  };

  // compare formats of date.now and selectedDate
  const currentDate = format(Date.now(), "MM/D/YYYY") as any
  const selectedDateFormatted = format(selectedDate, "MM/D/YYYY")

  console.log('currentDateFormat', selectedDateFormatted)
  console.log('currentDate', selectedDay)

  const isToday = (date: number) =>
    isEqual(
      new Date(selectedDay.getFullYear(), selectedDay.getMonth(), date),
        selectedDate
    );

    const isTodayCurrent = (date: number) =>
    isEqual(
        new Date(selectedDay.getFullYear(), selectedDay.getMonth(), date),
        currentDate
    );

    console.log('isToday', isTodayCurrent(29))



    function isCurrentMonthandYear (){
        // get the current month and year
        const currentMonth = format(Date.now(), "mm")
        const currentYear = format(Date.now(), "yyyy")
        const selectedMonth = format(selectedDate, "mm")
        const selectedYear = format(selectedDate, "yyyy")
        if (currentMonth === selectedMonth && currentYear === selectedYear){
            return true
        } else {
            return false
        }
    }

    console.log('selected', selectedDate)




  const setDateValue = (date: number) => () => {
    setSelectedDate(
      new Date(
        datepickerHeaderDate.getFullYear(),
        datepickerHeaderDate.getMonth(),
        date
      )
    );
    setEventBeginDate(
        new Date(
            datepickerHeaderDate.getFullYear(),
            datepickerHeaderDate.getMonth(),
            date
        )
    );
    setShowDatepicker(false);
  };

  console.log('datepickerHeaderDate', datepickerHeaderDate)

  const getDayCount = (date: Date) => {
    const daysInMonth = getDaysInMonth(date);

    // find where to start calendar day of week
    const dayOfWeek = getDay(new Date(date.getFullYear(), date.getMonth(), 1));
    const blankdaysArray = [];
    for (let i = 1; i <= dayOfWeek; i++) {
      blankdaysArray.push(i);
    }

    const daysArray = [];
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    setBlankDays(blankdaysArray);
    setDayCount(daysArray);
  };

  console.log('blankDays', blankDays)

  const isSelectedMonth = (month: number) =>
    isEqual(
      new Date(selectedDate.getFullYear(), month, selectedDate.getDate()),
      selectedDate
    );

console.log('selectedDate', format(selectedDate, "yyyy-mm-dd"))
// get the date in the format Day, Month Date, Year
console.log('selectedDateWEL', format(selectedDate, "dd, MMMM, yyyy"))
// get the date in the format Day
console.log('selectedDateWEL', selectedDate.toLocaleString("default", { weekday: "long", month: "long", day: "numeric" }))

  const setMonthValue = (month: number) => () => {
    setDatepickerHeaderDate(
      new Date(
        datepickerHeaderDate.getFullYear(),
        month,
        datepickerHeaderDate.getDate()
      )
    );
    setType("date");
  };

  const toggleDatepicker = () => setShowDatepicker((prev) => !prev);

  const showMonthPicker = () => setType("month");

  const showYearPicker = () => setType("date");

  useEffect(() => {
    getDayCount(datepickerHeaderDate);
  }, [datepickerHeaderDate]);

  return (
    <div className=" " id='datePicker'>
      <div className="antialiased sans-serif">
        <div>
          <div className="">
            <div className="">
              {/* <label
                htmlFor="datepicker"
                className="font-bold mb-1 text-gray-700 block"
              >
                Select Date
              </label> */}
              <div className="relative">
                {/* <input type="hidden" name="date" /> */}
                <label
                htmlFor="datepicker"
                className={`font-small text-black block ${selectedIndex === 0 && 'ml-1'} ${selectedIndex === 1 && 'ml-4 !important'}`}
                style={{  fontSize: 11}}
              >
                {
                    selectedIndex === 0 && 'Event Date'
                }
                {
                    selectedIndex === 1 && 'When do you want to start?'
                }
              </label>
                <input
                  type="text"
                  readOnly
                  style={{outline: 'none'}}
                  className="cursor-pointer shadow w-32 lg:w-32 border border-gray-700 text-center py-2  rounded-md text-gray-700 font-medium text-sm"
                  placeholder="Select date"
                  // value={format(selectedDate, "D MMMM, YYYY")}
                  // if the selected date is today, show the date in the format Day, Month Date, Year
                  value={isTodayCurrent(selectedDate.getDate()) ? 'Today' : format(selectedDate, "D MMM, YYYY")}
                  onClick={toggleDatepicker}
                />
                <div
                  className="cursor-pointer absolute top-0 right-7 px-3 py-2"
                  onClick={toggleDatepicker}
                >

                </div>
                {showDatepicker && (
                  <div
                    className={`bg-gray-100 mt-11 -ml-28 rounded-lg shadow p-4 absolute top-0 left-0 z-50 ${selectedIndex === 1 && '-mt-24 ml-52 !important'}`} 
                    style={{ width: "15rem", }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <button
                          type="button"
                          className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full"
                          onClick={decrement}
                        >
                          <svg
                            className="h-6 w-6 text-gray-500 inline-flex"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 19l-7-7 7-7"
                            />
                          </svg>
                        </button>
                      </div>
                      {type === "date" && (
                        <div
                          
                          className="flex-grow p-1 text-lg font-bold text-gray-800 cursor-pointer  rounded-lg"
                        >
                          <div className="text-center">
                            {format(datepickerHeaderDate, "MMMM")}
                          </div>
                        </div>
                      )}
                      <div
                        
                        className="flex-grow p-1 text-lg font-bold text-gray-800 cursor-pointer rounded-lg"
                      >
                        <div className="text-center">
                          {format(datepickerHeaderDate, "YYYY")}
                        </div>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full"
                          onClick={increment}
                        >
                          <svg
                            className="h-6 w-6 text-gray-500 inline-flex"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    {type === "date" && (
                      <>
                        <div className="flex flex-wrap mb-3 -mx-1">
                          {DAYS.map((day, i) => (
                            <div
                              key={i}
                              style={{ width: "14.26%" }}
                              className="px-1"
                            >
                              <div className="text-gray-800 font-medium text-center text-xs">
                                {day}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-wrap -mx-1">
                          {blankDays.map((_, i) => (
                            <div
                              key={i}
                              style={{ width: "14.26%" }}
                              className="text-center border p-1 border-transparent text-sm"
                            ></div>
                          ))}
                          {dayCount.map((d, i) => (
                            <div
                              key={i}
                              style={{ width: "14.26%" }}
                              className="px-1 py-1 mb-1"
                            >
                              <div
                                onClick={setDateValue(d)}
                                className={`cursor-pointer text-center text-sm leading-tight rounded-full transition ease-in-out duration-100 ${
                                  isToday(d)
                                    ? "bg-gray-900 text-white"
                                    : "text-gray-700 hover:bg-gray-400"
                                } ${isTodayCurrent(d)   ? "bg-gray-400 text-white" : ""}`}
                              >
                                {d}
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                    {type === "month" && (
                      <div className="flex flex-wrap -mx-1">
                        {Array(12)
                          .fill(null)
                          .map((_, i) => (
                            <div
                              key={i}
                              onClick={setMonthValue(i)}
                              style={{ width: "25%" }}
                            >
                              <div
                                className={`cursor-pointer p-5 font-semibold text-center text-sm rounded-lg hover:bg-gray-200 ${
                                  isSelectedMonth(i)
                                    ? "bg-blue-500 text-white"
                                    : "text-gray-700 hover:bg-blue-200"
                                }`}
                              >
                                {format(
                                  new Date(
                                    datepickerHeaderDate.getFullYear(),
                                    i,
                                    datepickerHeaderDate.getDate()
                                  ),
                                  "MMM"
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                    )}{" "}
                    {/* {type === "year" && (
                      <Datepicker
                        datepickerHeaderDate={datepickerHeaderDate}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        closeDatepicker={() => setShowDatepicker(false)}
                      />
                    )} */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
