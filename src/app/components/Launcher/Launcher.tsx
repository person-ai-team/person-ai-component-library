/*
  This example requires Tailwind CSS v3.0+
  
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
import { Fragment, useState } from 'react'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { ExclamationTriangleIcon, FolderIcon, LifebuoyIcon } from '@heroicons/react/24/outline'
import { TiLightbulb } from 'react-icons/ti'
import { HiArrowNarrowRight } from 'react-icons/hi'
import { FcIdea, FcLeave, FcPlanner, FcSportsMode, FcTodoList, FcCalendar } from 'react-icons/fc'
import DatePicker from '../DatePicker/DatePicker'
import Image from 'next/image'

const projects = [
  { id: 1, name: 'Workflow Inc. / Website Redesign', category: 'Projects', url: '#' },
  // More projects...
]

const users = [
  {
    id: 1,
    name: 'Leslie Alexander',
    url: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  // More users...
]

const calendar = [
  { id: 1, name: 'Calendar' },
    { id: 2, name: 'Event' },
    { id: 3, name: 'Task' },
  // More events...
]

const quickCalendarActions = [
  { id: 1, name: 'Add a new event', icon: FcPlanner, shortcut: 'E', url: '#' },
  { id: 2, name: 'Add a new task', icon: FcTodoList, shortcut: 'T', url: '#' },
  {id: 3, name: 'Add a new habit', icon: FcSportsMode, shortcut: 'H', url: '#'},
  // More actions...
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function Launcher() {
  const [open, setOpen] = useState(true)
  const [rawQuery, setRawQuery] = useState('')

  const query = rawQuery.toLowerCase().replace(/^[#>]/, '')

  const filteredProjects =
    rawQuery === '#'
      ? projects
      : query === '' || rawQuery.startsWith('>') || rawQuery.startsWith('c')
      ? []
      : projects.filter((project) => project.name.toLowerCase().includes(query))


  const filteredUsers =
    rawQuery === '>'
      ? users
      : query === '' || rawQuery.startsWith('#') || rawQuery.startsWith('c')
      ? []
      : users.filter((user) => user.name.toLowerCase().includes(query))

    const filteredCalendar =
    rawQuery === 'c' 
      ? calendar
      : query === '' || rawQuery.startsWith('#') || rawQuery.startsWith('>')
      ? []
      : quickCalendarActions.filter((calendar) => calendar.name.toLowerCase().includes(query))

      // check if raw query has the word 'calendar' using fuzzy search or regex

  return (
    <Transition.Root show={open} as={Fragment} afterLeave={() => setRawQuery('')} appear>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
              <Combobox onChange={(item: any) => (window.location = item.url)}>
                <div className="relative">
                  <MagnifyingGlassIcon
                    className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <Combobox.Input
                    className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
                    placeholder="Explore Person.ai"
                    onChange={(event) => setRawQuery(event.target.value)}
                  />
                </div>

                {
                    rawQuery.length > 0 && (
                        <div className='p-1'>
                        <div className='flex cursor-pointer select-none rounded-lg hover:bg-gray-200 p-3'>
                            <div
                              className={classNames(
                                'flex w-10 flex-none items-center justify-center rounded-lg',
                              )}
                            >
                              {/* <item.icon className="h-6 w-6 text-white" aria-hidden="true" /> */}
                              {/* <TiLightbulb className="h-6 w-6 ml-2.5 text-black" aria-hidden="true" /> */}
                                <FcIdea className="h-6 w-6 ml-2.5 -mt-1 text-black" aria-hidden="true" />
                              {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2.5 text-black">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
</svg> */}

                            </div>
                            <div className="ml-2 flex-auto">
                              <p
                                className={classNames(
                                  'text-sm text-gray-700 font-small',
                                )}
                              >
                                Search with AI
                              </p>
                              {/* <p className={classNames('text-sm', active ? 'text-gray-700' : 'text-gray-500')}>
                                {item.description}
                              </p> */}
                            </div>
                        </div>
                        </div>
                    )
                }

                {filteredCalendar.length > 0 && (
                      <li className="p-4 list-none">
                        <h2 className="sr-only">Calendar Quick actions</h2>
                        <h2 className="text-sm font-semibold text-gray-900">Calendar Quick actions</h2>
                        <ul className="text-sm mt-2 text-gray-700">
                          {quickCalendarActions.map((action) => (
                            <Combobox.Option
                              key={action.shortcut}
                              value={action}
                              className={({ active }) =>
                                classNames(
                                  'flex cursor-default select-none items-center rounded-md px-3 py-2',
                                  active && 'bg-gray-200 text-black'
                                )
                              }
                            >
                              {({ active }) => (
                                <>
                                  <action.icon
                                    className={classNames('h-6 w-6 flex-none', active ? 'text-white' : 'text-gray-400')}
                                    aria-hidden="true"
                                  />
                                  <span className="ml-3 flex-auto truncate">{action.name}</span>
                                  <span
                                    className={classNames(
                                      'ml-3 flex-none text-xs font-semibold',
                                      active ? 'text-indigo-100' : 'text-gray-400'
                                    )}
                                  >
                                    <kbd className="font-sans">⌘</kbd>
                                    <kbd className="font-sans">{action.shortcut}</kbd>
                                  </span>
                                </>
                              )}
                            </Combobox.Option>
                          ))}
                        </ul>
                      </li>
                    )}

                {
                    filteredCalendar.length > 0 && (
                        <div>
                            <div className='p-1'>
                        <div className='flex cursor-pointer select-none rounded-lg hover:bg-gray-100 p-3'>
                            <div
                              className={classNames(
                                'flex w-10 flex-none items-center justify-center rounded-lg',
                              )}
                            >
                              {/* <item.icon className="h-6 w-6 text-white" aria-hidden="true" /> */}
                              {/* <TiLightbulb className="h-6 w-6 ml-2.5 text-black" aria-hidden="true" /> */}
                                <FcCalendar className="h-6 w-6 ml-2.5 -mt-0.5 text-black" aria-hidden="true" />
                              {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2.5 text-black">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
</svg> */}

                            </div>
                            <div className="ml-2 flex-auto">
                              <p
                                className={classNames(
                                  'text-sm text-black font-semibold',
                                )}
                              >
                                Calendar
                              </p>
                              {/* <p className={classNames('text-sm', active ? 'text-gray-700' : 'text-gray-500')}>
                                {item.description}
                              </p> */}
                            </div>
                            <div className='flex-none'>
                                <HiArrowNarrowRight className="h-5 w-5 -mt-0.5 text-gray-500" aria-hidden="true" />

                            </div>
                        </div>
                        </div>
                        <div className='px-4 pb-4'>
                            <DatePicker />
                        </div>
                        </div>
                    )
                }

                

                {(filteredProjects.length > 0 || filteredUsers.length > 0) && (
                  <Combobox.Options
                    static
                    className="max-h-80 scroll-py-10 scroll-py-10 scroll-pb-2 scroll-pb-2 space-y-4 overflow-y-auto p-4 pb-2"
                  >
                    {filteredProjects.length > 0 && (
                      <li>
                        <h2 className="text-xs font-semibold text-gray-900">Projects</h2>
                        <ul className="-mx-4 mt-2 text-sm text-gray-700">
                          {filteredProjects.map((project) => (
                            <Combobox.Option
                              key={project.id}
                              value={project}
                              className={({ active }) =>
                                classNames(
                                  'flex cursor-default select-none items-center px-4 py-2',
                                  active && 'bg-indigo-600 text-white'
                                )
                              }
                            >
                              {({ active }) => (
                                <>
                                  <FolderIcon
                                    className={classNames('h-6 w-6 flex-none', active ? 'text-white' : 'text-gray-400')}
                                    aria-hidden="true"
                                  />
                                  <span className="ml-3 flex-auto truncate">{project.name}</span>
                                </>
                              )}
                            </Combobox.Option>
                          ))}
                        </ul>
                      </li>
                    )}
                    {filteredUsers.length > 0 && (
                      <li>
                        <h2 className="text-xs font-semibold text-gray-900">Users</h2>
                        <ul className="-mx-4 mt-2 text-sm text-gray-700">
                          {filteredUsers.map((user) => (
                            <Combobox.Option
                              key={user.id}
                              value={user}
                              className={({ active }) =>
                                classNames(
                                  'flex cursor-default select-none items-center px-4 py-2',
                                  active && 'bg-indigo-600 text-white'
                                )
                              }
                            >
                              <Image width={6} height={6} src={user.imageUrl} alt="" className="h-6 w-6 flex-none rounded-full" />
                              <span className="ml-3 flex-auto truncate">{user.name}</span>
                            </Combobox.Option>
                          ))}
                        </ul>
                      </li>
                    )}
                  </Combobox.Options>
                )}

                {rawQuery === '?' && (
                  <div className="py-14 px-6 text-center text-sm sm:px-14">
                    <LifebuoyIcon className="mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
                    <p className="mt-4 font-semibold text-gray-900">Help with searching</p>
                    <p className="mt-2 text-gray-500">
                      Use this tool to quickly search for users and projects across our entire platform. You can also
                      use the search modifiers found in the footer below to limit the results to just users or projects.
                    </p>
                  </div>
                )}

                {/* {query !== '' && rawQuery !== '?' && filteredProjects.length === 0 && filteredUsers.length === 0 && filteredCalendar.length === 0 && (
                  <div className="py-14 px-6 text-center text-sm sm:px-14">
                    <ExclamationTriangleIcon className="mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
                    <p className="mt-4 font-semibold text-gray-900">No results found</p>
                    <p className="mt-2 text-gray-500">We couldn’t find anything with that term. Please try again.</p>
                  </div>
                )} */}

                <div className="flex flex-wrap items-center bg-gray-50 py-2.5 px-4 text-xs text-gray-700">
                  Type{' '}
                  <kbd
                    className={classNames(
                      'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2',
                      rawQuery.startsWith('#') ? 'border-indigo-600 text-indigo-600' : 'border-gray-400 text-gray-900'
                    )}
                  >
                    c
                  </kbd>{' '}
                  <span className="sm:hidden">for calendar,</span>
                  <span className="hidden sm:inline">to access calendar,</span>
                  <kbd
                    className={classNames(
                      'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2',
                      rawQuery.startsWith('>') ? 'border-indigo-600 text-indigo-600' : 'border-gray-400 text-gray-900'
                    )}
                  >
                    &gt;
                  </kbd>{' '}
                  for users, and{' '}
                  <kbd
                    className={classNames(
                      'mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2',
                      rawQuery === '?' ? 'border-indigo-600 text-indigo-600' : 'border-gray-400 text-gray-900'
                    )}
                  >
                    ?
                  </kbd>{' '}
                  for help.
                </div>
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
