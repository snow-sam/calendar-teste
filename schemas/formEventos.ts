import { z } from "zod"
import {isValid, isWeekend, isWednesday, parse} from "date-fns"

export const formEventos = z.object({
    descricao: z.string().min(2, "Descrição é obrigatoria").max(50, "Descrição grande demais"),
    data: z.date().refine((data) => {
        const validations = [
            isValid(data),
            !isWeekend(data),
            !isWednesday(data)
        ]
        return validations.every(item => item)
    },
        { message: "Data inválida" }),
    professorId: z.string().min(2, "Professor é obrigatório").max(50)
})