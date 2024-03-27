import { db } from "@/lib/db"
import { parseDate } from "@/lib/utils"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  let weekStart = parseDate(searchParams.get('weekStart') || "")
  let weekEnd = parseDate(searchParams.get('weekEnd') || "")
  
  const todos = await db.eventos.findMany({
    where: {
      data: {
        lte: weekEnd,
        gte: weekStart,
      }
    }, include: { professor: true }
  })
  return Response.json({todos})
}