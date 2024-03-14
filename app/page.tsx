
import { db } from '@/lib/db';
import { parse } from "date-fns"

const getTodos = async (data: Date) => {
  return await db.eventos.findMany({
    where: {data}, include: {professor: true}
  })
}

export default async function Home({searchParams}: {searchParams: { [key: string]: string | string[] | undefined }}) {
  const { date } = searchParams
  const formatedDate = typeof(date) == "string" ? parse(date, 'yyyy-MM-dd', new Date()) : new Date()
  const todos = await getTodos(formatedDate)
  return (
      <ul className='space-y-2 mt-2'>
        {todos.map(({ descricao, professor }, i) => (
          <li className='bg-white p-4 font-semibold rounded shadow-lg flex justify-between items-center' key={i}>
            {descricao}
            {professor && <div className='text-gray-400 font-normal'>{professor.name}</div>}
          </li>
        ))}
      </ul>
  );
}
