import { useState } from "react"
import { interval, addWeeks, subWeeks, setDefaultOptions } from "date-fns"


export const useWeekNav = (startDate: Date, endDate: Date, options: any) => {
    setDefaultOptions(options)
    const today = new Date()
    const [currentDay, setCurrentDay] = useState(today)
    const daysInterval = interval(startDate, endDate)

    const getNextWeek = () => {
        setCurrentDay(addWeeks(currentDay, 1))
    }

    const getPrevWeek = () => {
        setCurrentDay(subWeeks(currentDay, 1))
    }

    return {
        today, currentDay, setCurrentDay, daysInterval, getNextWeek, getPrevWeek,
    }
}