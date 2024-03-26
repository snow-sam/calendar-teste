import { db } from '@/lib/db';
import { startOfWeek, endOfWeek, interval, setDefaultOptions, eachDayOfInterval } from "date-fns"
import { ptBR } from "date-fns/locale"
import { parseDate, formatDate } from "@/lib/utils"
import { Menu } from "@/components/menu"
import { unstable_cache } from "next/cache"


const getTodos = unstable_cache(async (weekStart: Date, weekEnd: Date) => {
  const daysInterval = interval(weekStart, weekEnd)
  const todos = await db.eventos.findMany({
    where: {
      data: {
        lte: weekEnd,
        gte: weekStart,
      }
    }, include: { professor: true }
  })

  const mapaTodos: { [key: string]: typeof todos } = {}
  eachDayOfInterval(daysInterval).forEach(dia => {
    mapaTodos[formatDate(dia)] = []
  })

  todos.forEach(todo => {
    const currentDate = formatDate(todo.data)
    if (mapaTodos[currentDate]) mapaTodos[currentDate].push(todo)
  })

  return { daysInterval, mapaTodos }
}, [], {tags:['my-app-user'], revalidate: 5*3600})


type searchParamsProps = {
  [key: string]: any,
}

const getTodos2 = async (weekStart: Date, weekEnd: Date) => {
  const url = new URL(process.env.BASE_API + '/todos')
  url.searchParams.append("weekStart", formatDate(weekStart))
  url.searchParams.append("weekEnd", formatDate(weekEnd))
  const res = await fetch(url, {next: {tags: ["todos"], revalidate: 5*3600}})
  const data = await res.json()
  return JSON.parse(data)
}

export default async function Home({ searchParams }: { searchParams: searchParamsProps }) {
  setDefaultOptions({ locale: ptBR })
  const now = new Date()
  let { weekStart, currentDay } = searchParams
  weekStart = weekStart ? parseDate(weekStart) : startOfWeek(currentDay ? parseDate(currentDay) : now, { weekStartsOn: 1 })
  currentDay = currentDay ? parseDate(currentDay) : weekStart

  console.log(weekStart)
  console.log(currentDay)

  const weekEnd = endOfWeek(weekStart, { weekStartsOn: 6 })
  const {daysInterval, mapaTodos} = await getTodos2(weekStart, weekEnd)
  console.log(daysInterval)
  console.log(mapaTodos)
  return (
    <>
      <Menu interval={daysInterval} currentDay={currentDay} />
      <ul className='space-y-2 mt-2'>
        {mapaTodos[formatDate(currentDay)].map(({ descricao, professor }, i) => (
          <li className='bg-white p-4 font-semibold rounded shadow-lg flex justify-between items-center' key={i}>
            {descricao}
            {professor && <div className='text-gray-400 font-normal'>{professor.name}</div>}
          </li>
        ))}
      </ul>
    </>
  );
}
