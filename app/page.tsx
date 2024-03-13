"use client"

import { ArrowLeft, ArrowRight } from 'lucide-react'
import { setDefaultOptions, isSameDay, eachDayOfInterval, format, addWeeks, subWeeks } from "date-fns"
import { ptBR } from 'date-fns/locale'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useState } from 'react'
import { createWeekInterval } from '@/lib/utils'

export default function Home() {
  setDefaultOptions({locale: ptBR})
  const today = new Date()
  const [currentDay, setCurrentDay] = useState(today)
  const days = eachDayOfInterval(createWeekInterval(currentDay))
  const mesAtual = format(currentDay, 'MMMM, yyy')

  const getNextWeek = () => {
    setCurrentDay(addWeeks(currentDay, 1))
  }

  const getPrevWeek = () => {
    setCurrentDay(subWeeks(currentDay, 1))
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-neutral-800">
      <section className="w-full max-w-3xl grid grid-rows-2 gap-2 p-4 bg-white rounded-md shadow-lg">
        <div className='flex justify-between'>
          <span className='font-bold'>{mesAtual[0].toUpperCase() + mesAtual.slice(1)}</span>
          <div className='flex gap-2 cursor-pointer'>
            <ArrowLeft onClick={getPrevWeek} size={18}/>
            <ArrowRight onClick={getNextWeek} size={18}/>
          </div>
        </div>

        <div>
          <ul className='flex gap-4 justify-evenly'>
            {days.map((day) => {
              let formatedData = format(day, 'cccccc')
              return (
                <li key={format(day, 'c')}>
                  <Popover>
                    <PopoverTrigger>
                      <div className={`grid grid-rows-2 place-items-center hover:bg-gray-100 ${isSameDay(today, day) ? 'bg-black' : ''}`}>
                        <span>{formatedData[0].toUpperCase() + formatedData.slice(1)}</span>
                        <span>{format(day, 'd')}</span>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="flex justify-between">
                      <span>NAC-1</span>
                      <span className='text-gray-500'>Walter</span>
                    </PopoverContent>
                  </Popover> 
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    </main>
  );
}
