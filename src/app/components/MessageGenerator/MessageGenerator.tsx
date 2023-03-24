import { API } from 'aws-amplify';
import { useEffect, useState } from 'react';

export default function MessageGenerator(props: any) {
    const { userSub } = props
    // console.log('userSub', userSub)

    const [messages, setMessages] = useState('') as string | any;

    async function getMessages() {
        // const myInit = {
        //     headers: { 'Content-Type': 'application/json' },
        //     body: { userSub: userSub },
        //     response: true,
        // }
        // try {
        //     const response = await API.get('messageGen', '/messages', myInit);
        //     const data = response.data;
        //     setMessages(data)
        //     console.log('data', data)
        // } catch (error) {
        //     console.log('error', error)
        // }
        try {
            await API.post('messageGen', '/messages', {body: userSub}).then(response => {
                console.log('response', response)

                setMessages(response)
            })
        } catch (error) {
            console.log('error', error)
        }
    }

    useEffect(() => {
        {
            userSub !== null && getMessages()
        }
    }, [userSub])


    return (
        <div className="bg-white lg:min-w-0 lg:flex-1">
              <div className="h-full py-6 px-4 sm:px-6 lg:px-8">
                {/* Start main area*/}
                <div className="relative h-28">
                  <div className="absolute inset-0 bg-gray-200 rounded-lg shadow border-1 border-solid border-gray-500" >
                    <div className='p-4 whitespace-normal leading-loose text-wrap font-small text-justify lg:leading-normal text-sm'>
                    {messages}
                    </div>
                    </div>
                </div>
                {/* End main area */}
              </div>
            </div>
    )
}

// export async function getServerSideProps() {
//     const myInit = {
//         headers: { 'Content-Type': 'application/json' },
//         response: true,
//     }

//     try {
//         const response = await API.get('amplify-personaicomponentlib-dev-133815-functionmessageGenerator-GBH0N1U7U86R', 'arn:aws:lambda:us-east-1:522404115964:function:messageGenerator-dev', myInit);
//     const data = response.data;
//     console.log('data', data)
//     } catch (error) {
//         console.log('error', error)
//     }
  
//     // return {
//     //   props: { data }
//     // };
//   }