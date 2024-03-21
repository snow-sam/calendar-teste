"use server"

import { db } from "@/lib/db"
import { z } from "zod"
import { formEventos } from "@/schemas/formEventos"

export const createEvent = async (data: z.infer<typeof formEventos>) => {
    await db.eventos.create({
        data
    })
}