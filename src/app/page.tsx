import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import { Button } from './components/Button/Button'
import Layout from './layout'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Layout>
      <div>
      <div className=" w-full max-w-12xl flex-grow lg:flex ">
          {/* Left sidebar & main wrapper */}
          <div className="min-w-0 flex-1 bg-white xl:flex">
            

            <div className="bg-white lg:min-w-0 lg:flex-1">
              <div className="h-full py-6 px-4 sm:px-6 lg:px-8">
                {/* Start main area*/}
                <div className="relative h-36">
                  <div className="absolute inset-0 bg-gray-200 rounded-lg shadow border-1 border-solid border-gray-500" >
                    <p className='p-4 leading-loose font-small text-justify lg:leading-normal text-sm'>
                    Today was a productive day. I had a healthy breakfast of eggs and oatmeal before a standing meeting and completing a task. I had a meeting with United Way in the afternoon and went to the gym in the evening. Now, I'm relaxing at home, watching a movie or spending time with loved ones. The balance of work, exercise, and relaxation helped me stay focused and feel fulfilled. I'm ready for tomorrow!
                    </p>
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
    </Layout>
  )
}
