import { useState } from "react"
import { eachDayOfInterval, addWeeks, subWeeks, setDefaultOptions } from "date-fns"
import { createWeekInterval } from "@/lib/utils"


export const useWeekNav = (options: any) => {
    setDefaultOptions(options)
    const today = new Date()
    const [currentDay, setCurrentDay] = useState(today)
    const interval = createWeekInterval(currentDay)
    const days = eachDayOfInterval(interval)

    const getNextWeek = () => {
        setCurrentDay(addWeeks(currentDay, 1))
    }

    const getPrevWeek = () => {
        setCurrentDay(subWeeks(currentDay, 1))
    }

    return {
        today, currentDay, setCurrentDay, days, interval, getNextWeek, getPrevWeek,
    }
}