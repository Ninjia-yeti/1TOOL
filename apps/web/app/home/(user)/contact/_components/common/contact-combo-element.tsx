"use client"

import * as React from "react"

import { Button } from "@kit/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@kit/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@kit/ui/popover"
import { useTranslation } from "react-i18next"

type ComboValueType = {
    value: string
    label: string
}

type Props = {
    onChange: (value: string) => void,
    value: string,
    comboValues?: ComboValueType[],
    placeholder: string,
    values: ComboValueType[]
}


export function ComboElement(props: Props) {
    const [open, setOpen] = React.useState(false)
    const [selectedValue, setSelectedValue] = React.useState<ComboValueType | null>(
        props.values.find((a) => a.value === props.value) ?? null
    )
    const { t } = useTranslation();

    return (
        <div className="flex items-center space-x-4">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="w-full grow justify-start"
                    >
                        {selectedValue ? (
                            <span className="w-full text-left text-ellipsis overflow-hidden">
                                {selectedValue.label}
                            </span>
                        ) : (
                            <span className="text-slate-400 text-left w-full text-ellipsis">{t(props.placeholder)}</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="max-w-full p-0" side="bottom" align="start">
                    <Command>
                        <CommandInput placeholder="type to select..." />
                        <CommandList>
                            <CommandEmpty>{t('No results found.')}</CommandEmpty>
                            <CommandGroup>
                                {props.values.map((aValue) => (
                                    <CommandItem
                                        key={aValue.value}
                                        value={aValue.label}
                                        onSelect={(_) => {
                                            setSelectedValue(aValue)
                                            props.onChange(aValue.value)
                                            setOpen(false)
                                        }}
                                    >
                                        <span>{aValue.label}</span>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}
