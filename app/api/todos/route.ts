import { db } from "@/lib/db"
import { startOfWeek, endOfWeek, interval, setDefaultOptions, eachDayOfInterval, isValid } from "date-fns"
import { parseDate, formatDate } from "@/lib/utils"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  let weekStart = parseDate(searchParams.get('weekStart') || "")
  let weekEnd = parseDate(searchParams.get('weekEnd') || "")
  console.log(weekStart, weekEnd)
  const daysInterval = interval(weekStart, weekEnd)
  if (!isValid(weekStart) || !isValid(weekEnd)) return Response.json({mapaTodos: [], daysInterval: daysInterval})
  
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
  console.log("foi")
  return Response.json({mapaTodos, daysInterval})
}