"use client"

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Plus } from 'lucide-react'
import { Professores } from "@prisma/client";

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { isValid, isWeekend, isWednesday, parse } from "date-fns"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"


const formSchema = z.object({
    descricao: z.string().min(2, "Descrição é obrigatoria").max(50, "Descrição grande demais"),
    data: z.string().refine((data) => {
        const formatedData = parse(data, 'yyyy-MM-dd', new Date())
        const validations = [
            isValid(formatedData),
            !isWeekend(formatedData),
            !isWednesday(formatedData)
        ]
        return validations.every(item => item)
    },
        { message: "Data inválida" }),
    professorId: z.string().min(2, "Professor é obrigatório").max(50)
})

type DrawerDemoProps = {
    professores: Professores[] | []
}

export const DrawerDemo = ({ professores = [] }: DrawerDemoProps) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            descricao: "",
            professorId: ""
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <Drawer>
            <DrawerTrigger className="self-center bg-black text-white p-2 rounded-full absolute bottom-8 right-8">
                <Plus size={36} />
            </DrawerTrigger>
            <DrawerContent className="p-4">
                <DrawerHeader>
                    <DrawerTitle>Deseja adicionar um evento?</DrawerTitle>
                    <DrawerDescription>Deixe o dia de alguém mais triste.</DrawerDescription>
                </DrawerHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
                        <FormField
                            control={form.control}
                            name="descricao"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Descrição</FormLabel>
                                    <FormControl>
                                        <Input type="text" className="text-base" placeholder="Qual a bomba dessa vez?" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex gap-4">
                            <FormField
                                control={form.control}
                                name="data"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col items-between gap-2">
                                        <FormLabel>Data</FormLabel>
                                        <FormControl>
                                            <Input type="date" className="text-base"{...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="professorId"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col items-between gap-2">
                                        <FormLabel>Professor</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Professor" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {professores.map(({ id, name }) => (
                                                    <SelectItem key={id} value={id}>{name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
                <DrawerClose className="border-2 px-4 py-2 h-10 text-sm border-gray-300 rounded mt-2">
                    Cancel
                </DrawerClose>
            </DrawerContent>
        </Drawer>
    )
}