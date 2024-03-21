"use client"

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

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

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { formEventos } from "@/schemas/formEventos"

import { Calendar } from "@/components/ui/calendar"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { createEvent } from "@/actions/createEvents"
import { cn } from "@/lib/utils"

type DrawerDemoProps = {
    professores: Professores[] | []
}

export const DrawerDemo = ({ professores = [] }: DrawerDemoProps) => {

    const form = useForm<z.infer<typeof formEventos>>({
        resolver: zodResolver(formEventos),
        defaultValues: {
            descricao: "",
            professorId: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formEventos>) {
        await createEvent(values)
    }

    return (
        <Sheet>
            <SheetTrigger className="self-center bg-black text-white p-2 rounded-full absolute bottom-8 right-8">
                <Plus size={36} />
            </SheetTrigger>
            <SheetContent side="top" className="p-8">
                <SheetHeader>
                    <SheetTitle>Deseja adicionar um evento?</SheetTitle>
                    <SheetDescription>Deixe o dia de alguém mais triste.</SheetDescription>
                </SheetHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
                        <div className="grid grid-cols-2 gap-4">
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
                            <FormField
                                control={form.control}
                                name="data"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col items-between gap-2">
                                        <FormLabel>Data</FormLabel>

                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "dd/MM/yyyy")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date < new Date()
                                                    }
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
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
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
                <SheetClose className="border-2 w-full px-4 py-2 h-10 text-sm border-gray-300/50 rounded mt-2">
                    Cancel
                </SheetClose>
            </SheetContent>
        </Sheet>
    )
}