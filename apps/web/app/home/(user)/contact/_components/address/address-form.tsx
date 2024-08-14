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
    FormDescription
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

import { AddressCountrySelect } from './address-country-select';
import { If } from '@kit/ui/if';
import { ErrorAlert } from '../errorAlert';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { ContactDateSelector } from '../common/contact-date-selector';
import { DateTypes } from '../common/contact-date-selector';

import { z } from "zod"
import { useForm } from "react-hook-form"
import { createPersonalContactAddress, editPersonalContactAddress } from '../../_lib/server/server-actions';
import { PersonalContactAddressProps } from '.';

export interface AddressFromProps {
    trigger: ReactNode,
    address?: PersonalContactAddressProps,
    mode: 'edit' | 'create'
}

export function AddressForm({ trigger, mode, address }: AddressFromProps) {
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
                            <Trans i18nKey={'contact:address'} />
                        </DialogTitle>
                        <DialogDescription>
                            <Trans i18nKey={'contact:addressDescription'} />
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-2  max-h-[70vh] overflow-y-auto'>
                            <div className='flex justify-between gap-2'>
                                <FormField
                                    name='address'
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem className='w-full'>
                                            <FormLabel>Address</FormLabel>
                                            <FormControl>
                                                <Input placeholder='Address' maxLength={200} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className='flex gap-1'>
                                    <FormField
                                        name='type'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='opacity-0'>type</FormLabel>
                                                <FormControl>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="Apt">Apt</SelectItem>
                                                            <SelectItem value="Ste">Ste</SelectItem>
                                                            <SelectItem value="Flr">Flr</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name='typeValue'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Apt/Ste/Flr</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='Apt/Ste/Flr' maxLength={200} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                            </div>
                            <div className='grid grid-cols-3 gap-2'>
                                <FormField
                                    name='city'
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>City</FormLabel>
                                            <FormControl>
                                                <Input placeholder='City' maxLength={200} {...field} />
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
                                            <FormLabel>State</FormLabel>
                                            <FormControl>
                                                <Input placeholder='State' maxLength={200} {...field} />
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
                                            <FormLabel>County</FormLabel>
                                            <FormControl>
                                                <Input placeholder='County' maxLength={200} {...field} />
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
                                            <FormLabel>Zip Code</FormLabel>
                                            <FormControl>
                                                <Input placeholder='Zip Code' maxLength={200} {...field} />
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
                                            <FormLabel>Province</FormLabel>
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
                                            <FormLabel>Postal Code</FormLabel>
                                            <FormControl>
                                                <Input placeholder='Postal Code' maxLength={200} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='w-full'>
                                <FormField
                                    name='country'
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Country</FormLabel>
                                            <FormControl>
                                                <AddressCountrySelect value={field.value} onChange={field.onChange} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='grid grid-cols-3 gap-2'>
                                <div>
                                    <FormField
                                        name='from'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>From</FormLabel>
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
                                        name='to'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>To</FormLabel>
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
                                        name='inCareOf'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>In Care Of</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='In Care Of' maxLength={200} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
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
                                                    This is current physical address
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
                                                        This is previous address
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
                                                        {`This is mailing address(and is not physical address)`}
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
                                                        {`This is safe mailing address(and is not physical address)`}
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
                                                        {`This is current foreign address`}
                                                    </FormLabel>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex flex-row items-center space-x-3 space-y-0 rounded-md ">
                                    <FormField
                                        name='intendedAddress'
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
                                                        {`This is intended  address for moving to the US`}
                                                    </FormLabel>
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                </div>
                                <div className="flex flex-row items-center space-x-3 space-y-0 rounded-md ">
                                    <FormField
                                        name='investmentProperty'
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
                                                        {`This is investment property`}
                                                    </FormLabel>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex flex-row items-center space-x-3 space-y-0 rounded-md ">
                                    <FormField
                                        name='shareWithSpouse'
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
                                                        {`Share this address with spouse`}
                                                    </FormLabel>
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                </div>
                                <div className="flex flex-row items-center space-x-3 space-y-0 rounded-md ">
                                    <FormField
                                        name='recentlyFearedPersecution'
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
                                                        {`This is address at which most recently feared persecution(for asylum applicants)`}
                                                    </FormLabel>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex flex-row items-center space-x-3 space-y-0 rounded-md ">
                                    <FormField
                                        name='recentForeignAddress'
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
                                                        {`This is most recent foreign address`}
                                                    </FormLabel>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex flex-row items-center space-x-3 space-y-0 rounded-md ">
                                    <FormField
                                        name='mostRecentForeignAddress'
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
                                                        {`This is most recent foreign address for over one year`}
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

