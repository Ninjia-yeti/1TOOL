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

const values: ComboValueType[] = [
    {
        value: "all",
        label: "All",
    },
    {
        value: "facebook",
        label: "Facebook",
    },
    {
        value: "instagram",
        label: "Instagram",
    },
    {
        value: "linkedin",
        label: "LinkedIn",
    },
    {
        value: "youtube",
        label: "YouTube",
    },
    {
        value: "tiktok",
        label: "TikTok",
    },
    {
        value: "wordpress",
        label: "Wordpress",
    },
    {
        value: "contao",
        label: "Contao",
    },
    {
        value: "joomla",
        label: "Joomla",
    },
]

type Props = {
    onChange: (value: string) => void,
    value: string,
    comboValues?: ComboValueType[],
    placeholder: string
}


export function ComboElement(props: Props) {
    const [open, setOpen] = React.useState(false)
    const [selectedValue, setSelectedValue] = React.useState<ComboValueType | null>(
        null
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
                            <>
                                {selectedValue.label}
                            </>
                        ) : (
                            <span className="text-slate-400">{t(props.placeholder)}</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0" side="bottom" align="start">
                    <Command>
                        <CommandInput placeholder="type to select..." />
                        <CommandList>
                            <CommandEmpty>{t('No results found.')}</CommandEmpty>
                            <CommandGroup>
                                {values.map((aValue) => (
                                    <CommandItem
                                        key={aValue.value}
                                        value={aValue.value}
                                        onSelect={(value) => {
                                            setSelectedValue(
                                                values.find((priority) => priority.value === value) ||
                                                null
                                            )
                                            props.onChange(value)
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
