import { startOfWeek, endOfWeek, setDefaultOptions, eachDayOfInterval, interval } from "date-fns"
import { ptBR } from "date-fns/locale"
import { parseDate, formatDate } from "@/lib/utils"
import { Menu } from "@/components/menu"
import { Prisma } from "@prisma/client"
import { MenuOptions } from "@/components/menuOptions"


type mapaTodosType = {
  [key: string]: Array<Prisma.EventosGetPayload<{include: {professor: true}}>>
}

type searchParamsProps = {
  [key: string]: any,
}

const getTodos = async (weekStart: Date, weekEnd: Date) => {
  const url = new URL(process.env.BASE_API + '/todos')

  url.searchParams.append("weekStart", formatDate(weekStart))
  url.searchParams.append("weekEnd", formatDate(weekEnd))
  const res = await fetch(url, {cache: "no-store", next: {tags: ["todos"]}})
  const {todos} = await res.json()

  const daysInterval = interval(weekStart, weekEnd)
  const mapaTodos: { [key: string]: any} = {}

  eachDayOfInterval(daysInterval).forEach(dia => {
    mapaTodos[formatDate(dia)] = []
  })

  if(!todos) return mapaTodos

  todos.forEach((todo: any) => {
    const currentDate = formatDate(todo.data)
    if (mapaTodos[currentDate]) mapaTodos[currentDate].push(todo)
  })

  return mapaTodos
}

export default async function Home({ searchParams }: { searchParams: searchParamsProps }) {
  setDefaultOptions({ locale: ptBR })
  const now = new Date()
  let { weekStart, currentDay } = searchParams
  weekStart = weekStart ? parseDate(weekStart) : startOfWeek(currentDay ? parseDate(currentDay) : now, { weekStartsOn: 1 })
  currentDay = currentDay ? parseDate(currentDay) : weekStart

  const weekEnd = endOfWeek(weekStart, { weekStartsOn: 6 })
  const mapaTodos: mapaTodosType = await getTodos(weekStart, weekEnd)
  return (
    <>
      <Menu interval={mapaTodos} currentDay={currentDay} />
      <ul className='space-y-2 mt-2'>
        {mapaTodos[formatDate(currentDay)].map(({ descricao, professor, id }, i) => (
          <li className='bg-white p-4 pr-2 font-semibold rounded shadow-lg flex justify-between items-center' key={i}>
            {descricao}
            <div className="flex gap-2">
              {professor && <div className='text-gray-400 font-normal'>{professor.name}</div>}
              <MenuOptions id={id}/>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
