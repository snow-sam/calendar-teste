"use client"

import { ArrowLeft, ArrowRight } from 'lucide-react'
import { isSameDay, format } from "date-fns"
import { ptBR } from 'date-fns/locale'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import Link from 'next/link'

import { useWeekNav } from "@/hooks/useWeekNav"
import { capitalize } from '@/lib/utils'

export const Menu = () => {
    const { days, currentDay, today, ...weekNav } = useWeekNav({ locale: ptBR })
    const mesAtual = format(currentDay, 'MMMM, yyy')

    return (
        <section className="w-full max-w-xl flex flex-col gap-4 p-4 bg-white shadow-lg">
            <div className='flex justify-between py-1'>
                <span onClick={() => weekNav.setCurrentDay(today)} className='font-bold cursor-pointer select-none'>
                    {capitalize(mesAtual)}
                </span>
                <div className='flex gap-3 px-2 cursor-pointer'>
                    <ArrowLeft className='text-gray-400' onClick={weekNav.getPrevWeek} size={24} />
                    <ArrowRight className='text-gray-400' onClick={weekNav.getNextWeek} size={24} />
                </div>
            </div>
            <ul className='flex justify-evenly'>
                {days.map((day) => {
                    return (
                        <li key={format(day, 'c')}>
                            <Link href={`/?date=${format(day, 'yyyy-MM-dd')}`}>
                                <div className={`grid grid-rows-2 place-items-center size-18 p-4 rounded-b-full ${isSameDay(today, day) ? 'bg-black text-white' : ''}`}>
                                    <span className='text-sm select-none'>{capitalize(format(day, 'cccccc'))}</span>
                                    <span className='text-sm select-none'>{format(day, 'd')}</span>
                                </div>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </section>
    );
}
