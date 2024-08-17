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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@kit/ui/select"

import { Input } from '@kit/ui/input';


import { PersonalContactFamily_SpouseSchema } from '../../../_lib/schema/personal-contact-schema';
import { zodResolver } from '@hookform/resolvers/zod';

import { If } from '@kit/ui/if';
import { ErrorAlert } from '../../errorAlert';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { ContactDateSelector } from '../../common/contact-date-selector';
import { CountrySelect } from '../../common/contact-country-select';
import { DateTypes } from '../../common/contact-date-selector';

import { z } from "zod"
import { useForm } from "react-hook-form"
import { createPersonalContactFamily_Children, editPersonalContactFamily_Children } from '../../../_lib/server/server-actions';
import { PersonalContactFamily_SpouseProps } from '.';

export interface SpouseFormProps {
    trigger: ReactNode,
    spouse?: PersonalContactFamily_SpouseProps,
    mode: 'edit' | 'create',
}

export function SpouseForm({ trigger, mode, spouse }: SpouseFormProps) {
    const [error, setError] = useState(false);
    const [errorString, setErrorString] = useState('');
    const [openDlg, setOpenDlg] = useState(false);
    const { t } = useTranslation('');
    const today = new Date();
    const defaultDateString = JSON.stringify({
        mode: DateTypes[0],
        value: today.toISOString()
    })
    const defaultFormValue = spouse && mode === 'edit' ? spouse : {
        dateOfMarriage: defaultDateString,
        dateMarriageEnded: defaultDateString,
        liveTogetherSince: defaultDateString,
        liveTogetherUntil: defaultDateString,
        dateOfSeperation: defaultDateString,
        householdMember: false,
        headOfHousehold: false,
        derivativeApplicant: false,
        principalApplicant: false,

    }
    const form = useForm<z.infer<typeof PersonalContactFamily_SpouseSchema>>({
        resolver: zodResolver(PersonalContactFamily_SpouseSchema),
        defaultValues: defaultFormValue
    })


    async function onSubmit(data: z.infer<typeof PersonalContactFamily_SpouseSchema>) {
        console.log(data);

        const promise = async () => {
            try {
                setError(false);
                // if (mode === 'create') {
                //     await createPersonalContactFamily_Children(data)
                // }
                // if (mode === 'edit') {
                //     await editPersonalContactFamily_Children({
                //         ...data, id: spouse?.id ?? 0
                //     })
                // }
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
                success: t(`${mode}ChildSuccess`),
                error: t(`${mode}ChildError`),
                loading: t(`${mode}ChildLoading`),
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
                <DialogTrigger className='flex items-center'>
                    {trigger}
                </DialogTrigger>
                <DialogContent className="max-w-[45%]">
                    <DialogHeader>
                        <DialogTitle>
                            <Trans i18nKey={'contact:spouse'} />
                        </DialogTitle>
                        <DialogDescription>
                            <Trans i18nKey={'contact:familyDescription'} />
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} >
                            <div className='max-h-[80vh] overflow-y-auto flex flex-col gap-2 py-2'>
                                <div className='grid grid-cols-3 gap-2'>
                                    <FormField
                                        name='firstName'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel>First name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='First name' maxLength={200} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name='middleName'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel>Middle name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='Middle name' maxLength={200} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name='lastName'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel>Last name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='Last name' maxLength={200} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                </div>
                                <div className='grid grid-cols-3 gap-2'>
                                    <FormField
                                        name='email'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='email' maxLength={200} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name='DependentStatus'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Dependent status</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Relation type" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="whollyDependent">Wholly Dependent</SelectItem>
                                                        <SelectItem value="partiallyDependent">Partially Dependent</SelectItem>
                                                        <SelectItem value="noDependent">No dependent</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name='liveTogetherSince'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel>Date of marriage</FormLabel>
                                                <FormControl>
                                                    <ContactDateSelector value={field.value} onChange={field.onChange} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                </div>
                                <div className='grid grid-cols-3 gap-2'>
                                    <FormField
                                        name='cityOfMarriage'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel>City of marriage</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='City of marriage' maxLength={200} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name='stateOfMarriage'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel>State of marriage</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='State of marriage' maxLength={200} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name='provinceOfMarriage'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel>Province of marriage</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='Province of marriage' maxLength={200} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='grid grid-cols-3 gap-2'>
                                    <FormField
                                        name='countryOfMarriage'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel>Country of marriage</FormLabel>
                                                <FormControl>
                                                    <CountrySelect value={field.value} onChange={field.onChange} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name='liveTogetherSince'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel>Live together since</FormLabel>
                                                <FormControl>
                                                    <ContactDateSelector value={field.value} onChange={field.onChange} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name='liveTogetherUntil'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel>Live together until</FormLabel>
                                                <FormControl>
                                                    <ContactDateSelector value={field.value} onChange={field.onChange} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='grid grid-cols-3 gap-2'>
                                    <FormField
                                        name='reasonMarriageEnded'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel >Reason marriage ended</FormLabel>
                                                <FormControl>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Reason marriage ended" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="divorce">Divorce</SelectItem>
                                                            <SelectItem value="death">Death</SelectItem>
                                                            <SelectItem value="annulment">Annulment</SelectItem>
                                                            <SelectItem value="other">Other</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name='dateMarriageEnded'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel>Date marriage ended</FormLabel>
                                                <FormControl>
                                                    <ContactDateSelector value={field.value} onChange={field.onChange} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name='citymarriageEnded'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel>City marriage ended</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='City marriage ended' {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='grid grid-cols-3 gap-2'>
                                    <FormField
                                        name='stateMarriageEnded'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel>State marriage ended</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='State marriage ended' {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name='provinceMarriageEnded'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel>Province marriage ended</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='Province marriage ended' {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name='CountryMarriageEnded'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel>Country marriage ended</FormLabel>
                                                <FormControl>
                                                    <CountrySelect value={field.value} onChange={field.onChange} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='grid grid-cols-2 gap-2'>
                                    <FormField
                                        name='dateOfSeperation'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel>Date of seperation</FormLabel>
                                                <FormControl>
                                                    <ContactDateSelector value={field.value} onChange={field.onChange} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name='howMarriageEnded'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel>How marriage ended</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='How marriage ended' {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                </div>
                                <div className='flex flex-col pt-2 gap-4'>
                                    <div className="flex flex-row items-center space-x-3 space-y-0 rounded-md ">
                                        <FormField
                                            name='householdMember'
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
                                                            Household member
                                                        </FormLabel>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="flex flex-row items-center space-x-3 space-y-0 rounded-md ">
                                        <FormField
                                            name='headOfHousehold'
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
                                                            Head of Household
                                                        </FormLabel>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="flex flex-row items-center space-x-3 space-y-0 rounded-md ">
                                        <FormField
                                            name='derivativeApplicant'
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
                                                            Derivative applicant
                                                        </FormLabel>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />

                                    </div>
                                    <div className="flex flex-row items-center space-x-3 space-y-0 rounded-md ">
                                        <FormField
                                            name='principalApplicant'
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
                                                            Principal applicant
                                                        </FormLabel>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />

                                    </div>
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
        </div >
    );
}

