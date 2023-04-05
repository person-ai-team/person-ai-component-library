import Image from "next/image";

export default function EventCopilot() {
  return (
    <div className="h-[15.5rem] border border-gray-700 rounded-md bg-gray-50 flex flex-col">
      <div className="  border-b pb-2 border-gray-700 mt-3">
        <h1 className=" text-lg text-left ml-4  flex flex-row font-medium">
          <span>
            {/* <img
              className="block h-9 w-auto"
              src="https://person-taiyebabatope.s3.amazonaws.com/MARKEYYYY.svg"
              alt="Your Company"
            /> */}
            <Image
                src="https://person-taiyebabatope.s3.amazonaws.com/MARKEYYYY.svg"
                alt="PersonAI Logo"
                width={20}
                height={20}
                />
          </span>
          <span className="ml-2" >
          Copilot
          </span>
        </h1>
      </div>
      <div className="px-2">
      <div className="h-[4.5rem] mt-2 bg-gray-100 tracking-tight px-1 font-small text-sm text-justify items-center rounded-md border border-gray-700 ">
        <p>
        Just to confirm, you currently have an event scheduled with Dr. Foreman at 3pm. Would you like to reschedule that event to 4pm and schedule the new event at 3pm?
        <button
        className="ml-2 border border-gray-700 bg-blue-300 hover:bg-blue-400 rounded-md px-2 py-0.5 "
        >
            Yes and Send an Email
        </button>
        <button
        className="ml-2 border border-gray-700 bg-gray-500 hover:bg-gray-700 text-white rounded-md px-2 py-0.5"
        >
            Find a new time
        </button>
        </p>
        
        </div>
        <div className="h-[6.4rem] mt-2 px-1 justify-center rounded-md border border-gray-700 ">
            <h2 className=" mt-0.5 text-sm font-normal">Create event titles and descriptions faster with these templates!</h2>
            <div className="flex flex-col">
            <div className="p-1 flex flex-row mt-0.5 border-t rounded-xs border-x border-gray-700 bg-white">
            <button
        className=" h-6 border text-xs border-gray-700 bg-gray-400 hover:bg-gray-700 text-white rounded-md px-2 py-0.5 "
        >
            Meeting +
        </button>
        <button
        className="ml-1 h-6 border text-xs border-gray-700 bg-gray-400 hover:bg-gray-700 text-white rounded-md px-2 py-0.5 "
        >
            Webinar +
        </button>
        <button
        className="ml-1 h-6 border text-xs border-gray-700 bg-gray-400 hover:bg-gray-700 text-white rounded-md px-2 py-0.5 "
        >
            Interview +
        </button>
        <button
        className="ml-1 h-6 border text-xs border-gray-700 bg-gray-400 hover:bg-gray-700 text-white rounded-md px-2 py-0.5 "
        >
            Appointment +
        </button>
        <button
        className="ml-1 h-6 border text-xs border-gray-700 bg-gray-400 hover:bg-gray-700 text-white rounded-md px-2 py-0.5 "
        >
            Workshop +
        </button>
            </div>
            <div className="p-1 flex flex-row border-b border-x rounded-xs border-gray-700 bg-white">
            <button
        className=" h-6 border text-xs border-gray-700 bg-gray-400 hover:bg-gray-700 text-white rounded-md px-2 py-0.5 "
        >
            Conference +
        </button>
        <button
        className="ml-1 h-6 border text-xs border-gray-700 bg-gray-400 hover:bg-gray-700 text-white rounded-md px-2 py-0.5 "
        >
            Party +
        </button>
        <button
        className="ml-1 h-6 border text-xs border-gray-700 bg-gray-400 hover:bg-gray-700 text-white rounded-md px-2 py-0.5 "
        >
            Training +
        </button>
        
            </div>

            </div>
          
        </div>
      </div>
    </div>
  );
}
