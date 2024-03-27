"use server"

import { db } from "@/lib/db"
import { z } from "zod"
import { formEventos } from "@/schemas/formEventos"
import { revalidateTag } from "next/cache"

export const createEvent = async (data: z.infer<typeof formEventos>) => {
    //await db.eventos.create({
    //    data
    //})
    const url = new URL(process.env.BASE_API + '/todos')
    const res = await fetch(url, {
        method:"POST",
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        },
        next: {
            tags: ["todos"]
        }})
    revalidateTag("my-app-user")
}

export const deleteEvent = async (id: string) => {
    //await db.eventos.delete({
    //    where: {
    //        id
    //    }
    //})
    const url = new URL(process.env.BASE_API + '/todos')
    const res = await fetch(url, {method: "DELETE", body:JSON.stringify({id})})
    revalidateTag("my-app-user")
}