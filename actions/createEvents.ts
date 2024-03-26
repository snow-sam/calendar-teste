"use server"

import { db } from "@/lib/db"
import { z } from "zod"
import { formEventos } from "@/schemas/formEventos"
import { revalidateTag } from "next/cache"

export const createEvent = async (data: z.infer<typeof formEventos>) => {
    await db.eventos.create({
        data
    })
    revalidateTag("my-app-user")
}