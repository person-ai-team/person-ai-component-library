'use client';

import type { NextPage } from 'next'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import { Button } from './components/Button/Button'
import Header from './components/Header/Header'
import { withAuthenticator, } from "@aws-amplify/ui-react";
import { Amplify, Auth } from "aws-amplify";
import awsmobile from "../aws-exports";
import { useState, useEffect } from 'react';

Amplify.configure(awsmobile);


// Auth.currentAuthenticatedUser()
//   .then(user => {
//     console.log('Current user:', user);
//   })
//   .catch(error => {
//     console.log('Error getting current user:', error);
//   });

const inter = Inter({ subsets: ['latin'] })

const Home = ( ) => {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState(null as string | null);
  const [userEmail, setUserEmail] = useState(null as string | null);
  
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => {
        console.log('Current user:', user);
        setUser(user);
        setUserName(user.attributes.given_name + ' ' + user.attributes.family_name);
        setUserEmail(user.attributes.email);
      })
      .catch(error => {
        console.log('Error getting current user:', error);
      });
  }, []);

  console.log('userName', userName);

  return (
      <div>
              <Header userName={userName} userEmail={userEmail} />
      <div className=" w-full max-w-12xl flex-grow lg:flex ">
          {/* Left sidebar & main wrapper */}
          <div className="min-w-0 flex-1 bg-white xl:flex">
            

            <div className="bg-white lg:min-w-0 lg:flex-1">
              <div className="h-full py-6 px-4 sm:px-6 lg:px-8">
                {/* Start main area*/}
                <div className="relative h-28">
                  <div className="absolute inset-0 bg-gray-200 rounded-lg shadow border-1 border-solid border-gray-500" >
                    <div className='p-4 whitespace-normal leading-loose text-wrap font-small text-justify lg:leading-normal text-sm'>
                    Today was a productive day. I had a healthy breakfast of eggs and oatmeal before a standing meeting and completing a task. 
                    </div>
                    </div>
                </div>
                {/* End main area */}
              </div>
            </div>
          </div>

          <div className="bg-white pr-4 sm:pr-6 lg:flex-shrink-0 lg:border-l lg:border-gray-00 lg:pr-8 xl:pl-2 xl:pr-8">
            <div className="h-full py-6 pl-6 lg:w-96" style={{ minWidth: '42.5rem'}}>
              {/* Start right column area */}
              <div className="relative h-36" >
                <div className="absolute inset-0 bg-gray-200 rounded-lg shadow border-1 border-solid border-gray-500" />
              </div>
              {/* End right column area */}
            </div>
          </div>

        </div>
        <div className=" w-full max-w-12xl flex-grow lg:flex ">
          {/* Left sidebar & main wrapper */}
          <div className="min-w-0 flex-1 bg-white xl:flex">
            

            <div className="bg-white lg:min-w-0 lg:flex-1">
              <div className="h-full py-6 px-4 sm:px-6 lg:px-8">
                {/* Start main area*/}
                <div className="relative h-full" style={{minHeight: '30rem'}}>
                  <div className="absolute inset-0 bg-gray-200 rounded-lg shadow border-1 border-solid border-gray-500" />
                </div>
                {/* End main area */}
              </div>
            </div>
          </div>

          <div className="bg-white pr-4 sm:pr-6 lg:flex-shrink-0 lg:border-l lg:border-gray-00 lg:pr-8 xl:pl-2 xl:pr-8">
            <div className="h-full py-6 pl-6 lg:w-80">
              {/* Start right column area */}
              <div className="relative h-full" style={{minHeight: '30rem'}} >
                <div className="absolute inset-0 bg-gray-200 rounded-lg shadow border-1 border-solid border-gray-500" />
              </div>
              {/* End right column area */}
            </div>
          </div>

          <div className="bg-white pr-4 sm:pr-6 lg:flex-shrink-0 lg:border-gray-200 lg:pr-8 xl:pl-2 xl:pr-8">
            <div className="h-full py-6 pl-6 lg:w-80">
              {/* Start right column area */}
              <div className="relative h-full" style={{minHeight: '30rem'}} >
                <div className="absolute inset-0 bg-gray-200 rounded-lg border-1 shadow border-solid border-gray-500" />
                </div>
              {/* End right column area */}
              </div>
              </div>
        </div>
      </div>
  )
}

export default withAuthenticator(Home)
// export default Home
