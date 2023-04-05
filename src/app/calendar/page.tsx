import type { NextPage } from 'next'
import Header from '../../app/components/Header/Header'
import Timeline from '../components/Calendar/Timeline'

const Calendar = () => {
    return (
        <div>
            <div>
                <Header />
            </div>
            

            <div>
            <Timeline />
            </div>
        </div>
    )
    }

export default Calendar