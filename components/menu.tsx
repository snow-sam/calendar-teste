import { ArrowLeft, ArrowRight } from 'lucide-react'
import { isSameDay, setDefaultOptions, addWeeks, subWeeks, min } from "date-fns"
import { formatDate, parseDate } from '@/lib/utils';

import Link from 'next/link'


import { capitalize } from '@/lib/utils'

import { Prisma } from "@prisma/client"

type mapaTodosType = {
  [key: string]: Array<Prisma.EventosGetPayload<{include: {professor: true}}>>
}

export const Menu = ({ interval, currentDay }: { interval: mapaTodosType, currentDay: Date }) => {

    const today = new Date()
    const mesAtual = formatDate(currentDay, 'MMMM, yyy')
    const startDate = min(Object.keys(interval).map(key => parseDate(key)))
    const navigate = (action: "previous" | "next") => {
        const method = action === "previous" ? subWeeks : addWeeks
        let weekDay = formatDate(method(startDate, 1))
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
                {Object.entries(interval).map(([dayString, todos]) => {
                    const day = parseDate(dayString) 
                    return (
                        <li key={formatDate(day, 'c')}>
                            <Link href={{ query: { currentDay: formatDate(day) } }}>
                                <div className={`grid grid-rows-2 place-items-center size-18 p-4 rounded-b-full relative ${isSameDay(currentDay, day) ? 'bg-black text-white' : ''}`}>
                                    <span className='text-sm select-none'>{capitalize(formatDate(day, 'cccccc'))}</span>
                                    <span className='text-sm select-none'>{formatDate(day, 'd')}</span>
                                    {todos.length > 0 &&
                                    <div className='absolute w-2 h-2 rounded-full top-3 right-1 bg-orange-600 border-[1px]'></div>
                                    }
                                    </div>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </section>
    );
}
