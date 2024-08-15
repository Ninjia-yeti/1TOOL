'use client';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { Trans } from '@kit/ui/trans';
import { Button } from '@kit/ui/button';
import { Checkbox } from '@kit/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@kit/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@kit/ui/form';
import { Input } from '@kit/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@kit/ui/select"
import { Label } from '@kit/ui/label';

import { PersonalContactTripsAbroadSchema } from '../../_lib/schema/personal-contact-schema';
import { zodResolver } from '@hookform/resolvers/zod';

import { CountrySelect } from '../common/contact-country-select';
import { If } from '@kit/ui/if';
import { ErrorAlert } from '../errorAlert';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { ContactDateSelector } from '../common/contact-date-selector';
import { DateTypes } from '../common/contact-date-selector';

import { z } from "zod"
import { useForm } from "react-hook-form"
import { createPersonalContactTripsAbroad, editPersonalContactTripsAbroad, } from '../../_lib/server/server-actions';
import { PersonalContactTripsAbroadProps } from '.';

export interface TripsAbroadFromProps {
    trigger: ReactNode,
    trip?: PersonalContactTripsAbroadProps,
    mode: 'edit' | 'create'
}

export function TripsAbroadForm({ trigger, mode, trip }: TripsAbroadFromProps) {
    const [error, setError] = useState(false);
    const [errorString, setErrorString] = useState('');
    const [openDlg, setOpenDlg] = useState(false);
    const { t } = useTranslation('');
    const today = new Date();
    const defaultDateString = JSON.stringify({
        mode: DateTypes[0],
        value: today.toISOString()
    })
    const defaultFormValue = trip && mode === 'edit' ? trip : {
        departureDate: defaultDateString,
        ReturnDate: defaultDateString,
        inspectedToReturnUS: false,
    }
    const form = useForm<z.infer<typeof PersonalContactTripsAbroadSchema>>({
        resolver: zodResolver(PersonalContactTripsAbroadSchema),
        defaultValues: defaultFormValue
    })


    async function onSubmit(data: z.infer<typeof PersonalContactTripsAbroadSchema>) {
        console.log(data);

        const promise = async () => {
            try {
                setError(false);
                if (mode === 'create') {
                    await createPersonalContactTripsAbroad(data)
                }
                if (mode === 'edit') {
                    await editPersonalContactTripsAbroad({
                        ...data, id: trip?.id ?? 0
                    })
                }
                setOpenDlg(false);
            }
            catch (e) {
                setError(true);
                setErrorString('something went wrong');
                throw new Error(`something went wrong${e}`);
            }
        }
        createToaster(promise);
    }

    const createToaster = useCallback(
        (promise: () => Promise<unknown>) => {
            return toast.promise(promise, {
                success: t(`${mode}AddressrSuccess`),
                error: t(`${mode}AddressrError`),
                loading: t(`${mode}AddressrLoading`),
            });
        },
        [t],
    );

    return (
        <div>
            <Dialog
                open={openDlg}
                onOpenChange={(v: boolean) => {
                    form.reset(defaultFormValue);
                    setOpenDlg(v)
                }}
            >
                <DialogTrigger>
                    {trigger}
                </DialogTrigger>
                <DialogContent className="max-w-[45%]">
                    <DialogHeader>
                        <DialogTitle>
                            <Trans i18nKey={'contact:tripsAbroad'} />
                        </DialogTitle>
                        <DialogDescription>
                            <Trans i18nKey={'contact:tripsAbroadDescription'} />
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} >
                            <div className='max-h-[80vh] overflow-y-auto flex flex-col gap-2 py-2'>
                                <div className='grid grid-cols-3 gap-2'>
                                    <FormField
                                        name='departureDate'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel>Departure Date</FormLabel>
                                                <FormControl>
                                                    <ContactDateSelector value={field.value} onChange={field.onChange} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name='departureCity'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Departure City</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='Departure City' maxLength={200} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name='departureState'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Departure State</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='Departure State' maxLength={200} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                </div>
                                <div className='grid grid-cols-3 gap-2'>
                                    <FormField
                                        name='ReturnDate'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel>Return Date</FormLabel>
                                                <FormControl>
                                                    <ContactDateSelector value={field.value} onChange={field.onChange} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name='ReturnCity'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Return City</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='Return City' maxLength={200} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name='ReturnState'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Return State</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='Return State' maxLength={200} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                </div>
                                <div className='grid grid-cols-2 gap-2'>
                                    <FormField
                                        name='countriesVisited'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Countries visited</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='Countries visited' maxLength={200} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name='meansOfTransport'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Means of transport</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='Means of transport' maxLength={200} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='grid grid-cols-1'>
                                    <FormField
                                        name='tripPurpose'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>The purpose of this trip</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='The purpose of this trip' maxLength={200} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        name='inspectedToReturnUS'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md pt-2">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel>
                                                        Inspected to return to the US
                                                    </FormLabel>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Save changes</Button>
                            </DialogFooter>
                        </form>
                        <If condition={error}>
                            <ErrorAlert error={errorString} />
                        </If>

                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

