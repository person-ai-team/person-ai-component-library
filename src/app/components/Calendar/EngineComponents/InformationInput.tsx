import { Combobox, Listbox, Transition } from "@headlessui/react"
import { CheckIcon, ChevronUpDownIcon, PaperClipIcon, UserCircleIcon, VideoCameraIcon } from "@heroicons/react/20/solid"
import { useEffect, useRef, useState, Fragment } from "react"

const people = [
    { id: 1, name: 'Wade Cooper' },
    { id: 2, name: 'Arlene Mccoy' },
    { id: 3, name: 'Devon Webb' },
    { id: 4, name: 'Tom Cook' },
    { id: 5, name: 'Tanya Fox' },
    { id: 6, name: 'Hellen Schmidt' },
  ]

  const conferenceOptions = [
    { name: 'Zoom', value: 'zoom' },
    { name: 'Google Meet', value: 'googleMeet' },
    { name: 'Microsoft Teams', value: 'microsoftTeams' },
    { name: 'Phone Number', value: 'phoneNumber' },
];
  
export default function InformationInput(props: any) {
    const { type } = props
    const descRef = useRef<HTMLTextAreaElement>(null)
    const [selected, setSelected] = useState()
    const [query, setQuery] = useState('')
    const [conference, setConference] = useState(conferenceOptions[1].name)

    const filteredPeople =
    query === ''
      ? people
      : people.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )
  
  // add an event listener to the description textarea to auto-expand it
    useEffect(() => {
        const textarea = descRef.current
        if (!textarea) return
        const resize = () => {
            textarea.style.height = 'auto'
            textarea.style.height = textarea.scrollHeight + 'px'
        }
        textarea.addEventListener('input', resize)
        resize()
        return () => textarea.removeEventListener('input', resize)
    }, [])

    return (
        <div>
            <div className="overflow-hidden bg-gray-100 rounded-sm shadow-sm">
        <label htmlFor="title" className="sr-only">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          style={{ outline: 'none', boxShadow: 'none' }}
          className="block w-full border-0 bg-white pb-2.5 pl-2.5 pt-2.5 text-xl font-medium placeholder-gray-500 "
          placeholder={`${type} title`}
        />
        <label htmlFor="description" className="sr-only">
          Description
        </label>
        <textarea
          rows={1}
          name="description"
          id="description"
          ref={descRef}
          style={{ outline: 'none', boxShadow: 'none' }}
          className="block w-full h-auto resize-none bg-white border-0 pb-2 pl-2.5 py-0 placeholder-gray-500 focus:ring-0 sm:text-sm"
          placeholder="Add a description..."
          defaultValue={''}
        />

        {/* Spacer element to match the height of the toolbar */}
        {/* Davido's new album is fire */}
        
      </div>

      <div className=" inset-x-px bottom-0 border-b border-gray-700">
        <div className="flex items-center justify-between space-x-3 border-t border-gray-700 px-1 py-2 sm:px-3">
          <div className="flex">
            <button
              type="button"
              className="group -my-2 -ml-2 inline-flex items-center rounded-full px-3 py-2 text-left text-gray-400"
            >
              <PaperClipIcon className="-ml-1 mr-1 h-5 w-5 text-gray-700 group-hover:text-gray-800" aria-hidden="true" />
              <span className="text-sm  text-gray-600 group-hover:text-gray-800">Attach</span>
            </button>
            {/* <button
              type="button"
              className="group -my-2 -ml-2 inline-flex items-center rounded-full px-3 py-2 text-left text-gray-400"
            >
              <UserCircleIcon className="-ml-1 mr-2 h-5 w-5 group-hover:text-gray-500" aria-hidden="true" />
              <span className="text-sm italic text-gray-500 group-hover:text-gray-600">Add guests</span>
            </button> */}
            <div className='flex pr-3'>
            <UserCircleIcon className=" mt-2 mr-2 h-5 w-5 text-gray-700 group-hover:text-gray-500" aria-hidden="true" />
            <div className=" w-[12.45rem]">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative ">
          <div className="relative w-full border border-gray-700 cursor-default overflow-hidden rounded-lg bg-gray-100 text-left sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 placeholder-gray-600 "
              displayValue={(person) => person.name}
                placeholder={`Add ${type === 'Event' ? 'guests' : type === 'Task' ? 'assignees' : 'people'}`}
              onChange={(event) => setQuery(event.target.value)}
              style={{ outline: 'none', boxShadow: 'none' }}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-100 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredPeople.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredPeople.map((person) => (
                  <Combobox.Option
                    key={person.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {person.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
    
            </div>
            <div className='flex '>
            <VideoCameraIcon className=" mt-2 mr-2 h-5 w-5 text-gray-700 group-hover:text-gray-500" aria-hidden="true" />
            <div className="w-40">
            <Listbox value={conference} onChange={setConference}>
            <Listbox.Button className="relative w-32 border border-gray-700 py-2 text-center bg-white rounded-lg cursor-default sm:text-sm">
                <span className="block truncate">{conference}</span>
                </Listbox.Button>
                <Listbox.Options className="absolute -ml-3 w-36 z-50 py-1 mt-1 overflow-auto text-base bg-gray-100 rounded-md shadow-lg sm:text-sm">
                    {
                        conferenceOptions.map((option) => (
                            <Listbox.Option
                            key={option.value}
                            className={({ active }) =>
                                `${active ? 'text-white bg-gray-600' : 'text-gray-900'}
                                cursor-default select-none relative py-2 pl-3 pr-4`
                            }
                            value={option.name}
                            >
                                {({ selected, active }) => (
                                    <>
                                    <span
                                        className={`block truncate ${
                                        selected ? 'font-medium' : 'font-normal'
                                        }`}
                                    >
                                        {option.name}
                                    </span>
                                    {/* {selected ? (
                                        <span
                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                            active ? 'text-white' : 'text-teal-400'
                                        }`}
                                        >
                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                    ) : null} */}
                                    </>
                                )}
                            </Listbox.Option>
                        ))
                    }
                </Listbox.Options>
            </Listbox>
      
    </div>
    
            </div>
            
          </div>
        </div>
      </div>
        </div>
    )
}