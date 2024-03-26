import { ArrowLeft, ArrowRight } from 'lucide-react'
import { isSameDay, eachDayOfInterval, addWeeks, subWeeks } from "date-fns"
import { formatDate } from '@/lib/utils';

import Link from 'next/link'

import type { NormalizedInterval } from "date-fns";


import { capitalize } from '@/lib/utils'

export const Menu = ({ interval, currentDay }: { interval: NormalizedInterval, currentDay: Date }) => {
    const today = new Date()
    const mesAtual = formatDate(currentDay, 'MMMM, yyy')

    const navigate = (action: "previous" | "next") => {
        const method = action === "previous" ? subWeeks : addWeeks
        let weekDay = formatDate(method(interval.start, 1))
        return {weekDay, currentDay: weekDay}
    }

    return (
        <section className="w-full max-w-xl flex flex-col gap-4 p-4 bg-white shadow-lg">
            <div className='flex justify-between py-1'>
                <Link href={"/"}>
                    <span className='font-bold'>
                        {capitalize(mesAtual)}
                    </span>
                </Link>
                <div className='flex gap-3 px-2 cursor-pointer'>
                    <Link href={{ query: navigate("previous") }}>
                        <ArrowLeft className='text-gray-400' size={24} />
                    </Link>
                    <Link href={{ query: navigate("next") }}>
                        <ArrowRight className='text-gray-400' size={24} />
                    </Link>
                </div>
            </div>
            <ul className='flex justify-evenly'>
                {eachDayOfInterval(interval).map((day) => {
                    return (
                        <li key={formatDate(day, 'c')}>
                            <Link href={{ query: { currentDay: formatDate(day) } }}>
                                <div className={`grid grid-rows-2 place-items-center size-18 p-4 rounded-b-full ${isSameDay(currentDay, day) ? 'bg-black text-white' : ''}`}>
                                    <span className='text-sm select-none'>{capitalize(formatDate(day, 'cccccc'))}</span>
                                    <span className='text-sm select-none'>{formatDate(day, 'd')}</span>
                                </div>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </section>
    );
}
