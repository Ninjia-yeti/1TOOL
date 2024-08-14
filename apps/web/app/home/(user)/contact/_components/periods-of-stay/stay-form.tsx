'use client';
import React, { ReactNode, useCallback, useState } from 'react';
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

import { PersonalContactAddressSchema } from '../../_lib/schema/personal-contact-schema';
import { zodResolver } from '@hookform/resolvers/zod';

import { If } from '@kit/ui/if';
import { ErrorAlert } from '../errorAlert';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { ContactDateSelector } from '../common/contact-date-selector';
import { DateTypes } from '../common/contact-date-selector';

import { CountrySelect } from '../common/contact-country-select';
import { ComboElement } from '../common/contact-combo-element';

import { z } from "zod"
import { useForm } from "react-hook-form"
import { createPersonalContactAddress, editPersonalContactAddress } from '../../_lib/server/server-actions';
import { PersonalContactAddressProps } from '.';

export interface StayFormProps {
    trigger: ReactNode,
    address?: PersonalContactAddressProps,
    mode: 'edit' | 'create'
}

export function StayForm({ trigger, mode, address }: StayFormProps) {
    const [error, setError] = useState(false);
    const [errorString, setErrorString] = useState('');
    const [openDlg, setOpenDlg] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const { t } = useTranslation('');
    const today = new Date();
    const defaultDateString = JSON.stringify({
        mode: DateTypes[0],
        value: today.toISOString()
    })
    const form = useForm<z.infer<typeof PersonalContactAddressSchema>>({
        resolver: zodResolver(PersonalContactAddressSchema),
        defaultValues: address && mode === 'edit' ? address : {
            from: defaultDateString,
            to: defaultDateString,
            currentPhysicalAddress: false,
            previousAddress: false,
            mailingAddress: false,
            safeMailingAddress: false,
            foreignAddress: false,
            intendedAddress: false,
            investmentProperty: false,
            shareWithSpouse: false,
            recentlyFearedPersecution: false,
            recentForeignAddress: false,
            mostRecentForeignAddress: false,

        }
    })

    async function onSubmit(data: z.infer<typeof PersonalContactAddressSchema>) {
        const promise = async () => {
            try {
                setError(false);
                if (mode === 'create') {
                    await createPersonalContactAddress(data)
                }
                if (mode === 'edit') {
                    await editPersonalContactAddress({
                        ...data, id: address?.id ?? 0
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
                onOpenChange={(v: boolean) => setOpenDlg(v)}
            >
                <DialogTrigger>
                    {trigger}
                </DialogTrigger>
                <DialogContent className="max-w-[45%]">
                    <DialogHeader>
                        <DialogTitle>
                            <Trans i18nKey={'contact:stay'} />
                        </DialogTitle>
                        <DialogDescription>
                            <Trans i18nKey={'contact:stayDescription'} />
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-3  max-h-[80vh] overflow-y-auto'>
                            <div className='flex justify-between gap-2'>
                                <FormField
                                    name='from'
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem className='w-full'>
                                            <FormLabel>Date of entry</FormLabel>
                                            <FormControl>
                                                <ContactDateSelector value={field.value} onChange={field.onChange} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name='address'
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem className='w-full'>
                                            <FormLabel>1-94 Number</FormLabel>
                                            <FormControl>
                                                <Input placeholder='1-94 Number' {...field} type='number' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            </div>
                            <div>
                                <FormField
                                    name='city'
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Class of admission</FormLabel>
                                            <FormControl>
                                                <ComboElement placeholder='Class of admission' value={field.value} onChange={field.onChange} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div>
                                <FormField
                                    name='city'
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Manner of entry</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Manner of entry" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="m@example.com">m@example.com</SelectItem>
                                                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                                                    <SelectItem value="m@support.com">m@support.com</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='grid grid-cols-3 gap-2'>
                                <FormField
                                    name='city'
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Status after admission</FormLabel>
                                            <FormControl>
                                                <ComboElement placeholder='Status after admission' value={field.value} onChange={field.onChange} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name='city'
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Date status was granted</FormLabel>
                                            <FormControl>
                                                <ComboElement placeholder='Date status was granted' value={field.value} onChange={field.onChange} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name='city'
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Date statis expires</FormLabel>
                                            <FormControl>
                                                <ComboElement placeholder='Date statis expires' value={field.value} onChange={field.onChange} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='grid grid-cols-3 gap-2'>
                                <FormField
                                    name='city'
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Authorized stay expiry</FormLabel>
                                            <FormControl>
                                                <Input placeholder='Authorized stay expiry' maxLength={200} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name='state'
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Purpose of stay</FormLabel>
                                            <FormControl>
                                                <Input placeholder='Purpose of stay' maxLength={200} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name='county'
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Mode of travel</FormLabel>
                                            <FormControl>
                                                <Input placeholder='Mode of travel' maxLength={200} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='grid grid-cols-3 gap-2'>
                                <FormField
                                    name='zipCode'
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Passport number</FormLabel>
                                            <FormControl>
                                                <Input placeholder='Passport number' maxLength={200} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name='province'
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Travel document number</FormLabel>
                                            <FormControl>
                                                <Input placeholder='Province' maxLength={200} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name='postalCode'
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Passport/travel doc country</FormLabel>
                                            <FormControl>
                                                <CountrySelect placeholder='Passport/travel doc country' value={field.value} onChange={field.onChange} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='grid grid-cols-3 gap-2'>
                                <FormField
                                    name='postalCode'
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Passport/travel doc issued</FormLabel>
                                            <FormControl>
                                                <CountrySelect placeholder='Passport/travel doc issued' value={field.value} onChange={field.onChange} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name='postalCode'
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Passport/travel doc expires</FormLabel>
                                            <FormControl>
                                                <CountrySelect placeholder='Passport/travel doc expires' value={field.value} onChange={field.onChange} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name='postalCode'
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>City of residence in the US</FormLabel>
                                            <FormControl>
                                                <Input placeholder='City of residence in the US' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='grid grid-cols-3 gap-2'>
                                <FormField
                                    name='postalCode'
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>First name used</FormLabel>
                                            <FormControl>
                                                <Input placeholder='First name used' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name='postalCode'
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Middle name used</FormLabel>
                                            <FormControl>
                                                <Input placeholder='Middle name used' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name='postalCode'
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Last name used</FormLabel>
                                            <FormControl>
                                                <Input placeholder='Last name used' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='grid grid-cols-3 gap-2'>
                                <FormField
                                    name='postalCode'
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>City of exit</FormLabel>
                                            <FormControl>
                                                <Input placeholder='City of exit' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name='postalCode'
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>State of exit</FormLabel>
                                            <FormControl>
                                                <Input placeholder='State of exit' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name='to'
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Date of exit</FormLabel>
                                            <FormControl>
                                                <ContactDateSelector value={field.value} onChange={field.onChange} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div>
                                <FormField
                                    name='currentPhysicalAddress'
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
                                                    This is most recent entry
                                                </FormLabel>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex flex-row items-center space-x-3 space-y-0 rounded-md pt-2">
                                <Checkbox onCheckedChange={(v: boolean) => setShowMore(v)} />
                                <div className="space-y-1 leading-none">
                                    <Label className='text-slate-400'>
                                        Show more optoins
                                    </Label>
                                </div>
                            </div>
                            {showMore && <div className='flex flex-col pt-2 gap-4'>
                                <Label className='pt-2'>
                                    More optoins
                                </Label>
                                <div className="flex flex-row items-center space-x-3 space-y-0 rounded-md ">
                                    <FormField
                                        name='previousAddress'
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
                                                        This entry was planned stay
                                                    </FormLabel>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex flex-row items-center space-x-3 space-y-0 rounded-md ">
                                    <FormField
                                        name='mailingAddress'
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
                                                        This entry was on H or L status
                                                    </FormLabel>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex flex-row items-center space-x-3 space-y-0 rounded-md ">
                                    <FormField
                                        name='safeMailingAddress'
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
                                                        This entry was on R status
                                                    </FormLabel>
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                </div>
                                <div className="flex flex-row items-center space-x-3 space-y-0 rounded-md ">
                                    <FormField
                                        name='foreignAddress'
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
                                                        This entry was granted duration of status
                                                    </FormLabel>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>}
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

