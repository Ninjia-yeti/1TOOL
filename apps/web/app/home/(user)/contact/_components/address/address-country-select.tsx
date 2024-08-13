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

import countries from "world-countries";
import Flag from 'react-flagkit';


const formattedCountries = countries.map((country) => ({
    value: country.cca2,
    flag: country.flag,
    label: country.name.common
}))

type AddressCountrySelectProps = {
    value: string | null,
    onChange: (value: string) => void,
}

export const CountryForValue = (value: string) => {
    return formattedCountries.find((a) => a.value === value)?.label ?? ''
}
const CountryForLabel = (value: string) => {
    return formattedCountries.find((a) => a.label === value)?.value ?? ''
}

export function AddressCountrySelect({ onChange, value }: AddressCountrySelectProps) {
    const [open, setOpen] = React.useState(false)
    const [selectedCountry, setSelectedCountry] = React.useState<string | null>(CountryForValue(value ?? ''))
    const { t } = useTranslation();
    React.useEffect(() => {
        if (value) {
            setSelectedCountry(CountryForValue(value));
        }
    }, [value])
    return (
        <div className="flex items-center space-x-4 w-full">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="w-full justify-start"
                    >
                        {selectedCountry ? (
                            <div className="flex items-center gap-2">
                                <Flag country={CountryForLabel(selectedCountry)} />
                                <span>{selectedCountry}</span>
                            </div>
                        ) : (
                            <span className="text-slate-400">{t('Country')}</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-full" side="bottom" align="start">
                    <Command className="w-full">
                        <CommandInput placeholder="type country..." />
                        <CommandList>
                            <CommandEmpty>{t('No results found.')}</CommandEmpty>
                            <CommandGroup>
                                {formattedCountries.map((country) => (
                                    <CommandItem
                                        key={country.value}
                                        value={country.label}
                                        onSelect={(value: string) => {
                                            setSelectedCountry(value)
                                            onChange(country.value)
                                            setOpen(false)
                                        }}
                                    >
                                        <div className="flex items-center gap-2">
                                            <Flag country={country.value} />
                                            <span>{country.label}</span>
                                        </div>
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
