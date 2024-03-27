"use client"

import { deleteEvent } from "@/actions/createEvents"
import {Popover, PopoverTrigger, PopoverContent} from "@/components/ui/popover"
import {EllipsisVertical, Trash2} from "lucide-react"

export const MenuOptions = ({id} : {id: string}) => {

    const handleClick = async () => {
        await deleteEvent(id)
    } 

    return (
        <Popover>
                <PopoverTrigger>
                  <EllipsisVertical className="text-gray-400"/>
                </PopoverTrigger>
                <PopoverContent onClick={handleClick} className="text-red-600 flex justify-between font-bold cursor-pointer">
                  Deletar
                  <Trash2/>
                </PopoverContent>
              </Popover>
    );
}
