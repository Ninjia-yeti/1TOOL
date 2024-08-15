'use client';
import { useEffect, useState } from "react";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@kit/ui/select"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@kit/ui/popover"

import { Button } from "@kit/ui/button"
import { Calendar } from "@kit/ui/calendar"
import { cn } from "@kit/ui/utils";
import { CalendarIcon } from "@radix-ui/react-icons"






export interface ContactDateSelectorProps {
    value: string,
    onChange: (value: string) => void
}

export const DateTypes = ['month-day-year', 'month-year', 'year', 'present']
export const renderDate = (v: Date, mode: string) => {
    const year = v.getFullYear();
    const month = v.getMonth() + 1;
    const day = v.getDate();
    switch (mode) {
        case "month-day-year":
            return (
                <div>{`${month}/${day}/${year}`}</div>
            )
        case "month-year":
            return (
                <div>{`${month}/${year}`}</div>
            )
        case "year":
            return (
                <div>{`${year}`}</div>
            )
        case "present":
            return (
                <div>{`Present`}</div>
            )
        default:
            break;
    }

}
export function ContactDateSelector({ value, onChange }: ContactDateSelectorProps) {
    const [mode, setMode] = useState(JSON.parse(value).mode);
    const [dateValue, setDateValue] = useState<Date>(JSON.parse(value).mode === 'present' ? new Date() : new Date(JSON.parse(value).value));


    useEffect(() => {
        const formStringValue = JSON.stringify({
            mode: mode,
            value: mode === 'present' ? mode : dateValue.toISOString()
        })
        onChange(formStringValue);
    }, [mode])
    return (
        <div className="flex gap-1">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-[240px] grow pl-3 text-left font-normal",
                            !value && "text-muted-foreground"
                        )}
                    >
                        {dateValue ? (
                            renderDate(dateValue, mode)
                        ) : (
                            <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={dateValue}
                        onSelect={(v: Date | undefined) => {
                            const updateDate = v ?? new Date();
                            let update = updateDate.toISOString();
                            if (mode === 'present') {
                                update = 'present'
                            }
                            update = updateDate.toISOString();
                            setDateValue(updateDate);
                            onChange(JSON.stringify({
                                mode: mode,
                                value: update
                            }));
                        }}
                    />
                </PopoverContent>
            </Popover>
            <Select value={mode} onValueChange={(v) => setMode(v)}>
                <SelectTrigger className="w-[50px]">
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="month-day-year">Month-Day-Year</SelectItem>
                    <SelectItem value="month-year">Month-Year</SelectItem>
                    <SelectItem value="year">Year</SelectItem>
                    <SelectItem value="present">Present</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}