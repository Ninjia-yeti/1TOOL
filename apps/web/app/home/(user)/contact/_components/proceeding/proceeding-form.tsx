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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@kit/ui/select"
import { Label } from '@kit/ui/label';

import { Input } from '@kit/ui/input';

import { PersonalContactProceedingSchema } from '../../_lib/schema/personal-contact-schema';
import { zodResolver } from '@hookform/resolvers/zod';

import { If } from '@kit/ui/if';
import { ErrorAlert } from '../errorAlert';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { ContactDateSelector } from '../common/contact-date-selector';
import { DateTypes } from '../common/contact-date-selector';

import { z } from "zod"
import { useForm } from "react-hook-form"
import { createPersonalContactProceeding, editPersonalContactTripsAbroad, } from '../../_lib/server/server-actions';
import { PersonalContactProceedingProps } from '.';

export interface TripsAbroadFromProps {
    trigger: ReactNode,
    proceeding?: PersonalContactProceedingProps,
    mode: 'edit' | 'create'
}

export function ProceedingForm({ trigger, mode, proceeding }: TripsAbroadFromProps) {
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
    const defaultFormValue = proceeding && mode === 'edit' ? proceeding : {
        dateStarted: defaultDateString,
        dateEnded: defaultDateString,
        current: false,
        hearing: false,
        removal: false,
        exclusion: false,
        deportation: false,
        rescission: false,
        otherJudicial: false,
    }
    const form = useForm<z.infer<typeof PersonalContactProceedingSchema>>({
        resolver: zodResolver(PersonalContactProceedingSchema),
        defaultValues: defaultFormValue
    })


    async function onSubmit(data: z.infer<typeof PersonalContactProceedingSchema>) {
        console.log(data);

        const promise = async () => {
            try {
                setError(false);
                if (mode === 'create') {
                    await createPersonalContactProceeding(data)
                }
                // if (mode === 'edit') {
                //     await editPersonalContactTripsAbroad({
                //         ...data, id: trip?.id ?? 0
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
                success: t(`${mode}ProceedingSuccess`),
                error: t(`${mode}ProceedingError`),
                loading: t(`${mode}ProceedingLoading`),
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
                            <Trans i18nKey={'contact:proceeding'} />
                        </DialogTitle>
                        <DialogDescription>
                            <Trans i18nKey={'contact:proceedingDescription'} />
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} >
                            <div className='max-h-[80vh] overflow-y-auto flex flex-col gap-2 py-2'>
                                <div className='grid grid-cols-2 gap-2'>
                                    <FormField
                                        name='locationCity'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel>Location - City</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='Departure City' maxLength={200} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name='locationState'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel>Location - State</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='Location - State' maxLength={200} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                </div>
                                <div className='grid grid-cols-2 gap-2'>
                                    <FormField
                                        name='dateStarted'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel>Date Started</FormLabel>
                                                <FormControl>
                                                    <ContactDateSelector value={field.value} onChange={field.onChange} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name='dateEnded'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel>Date Ended</FormLabel>
                                                <FormControl>
                                                    <ContactDateSelector value={field.value} onChange={field.onChange} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                </div>
                                <div className='grid grid-cols-2 gap-2'>
                                    <FormField
                                        name='office'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Office</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Office" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="imigratioinCourt">Imigratioin Court</SelectItem>
                                                        <SelectItem value="boardOfImigrationAppeals">Board of Imigration Appeals</SelectItem>
                                                        <SelectItem value="federalCourt">Federal Court</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name='status'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Status</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='Means of transport' maxLength={200} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        name='current'
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
                                                        This proceeding is current
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
                                            name='hearing'
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
                                                            This is a hearing proceeding
                                                        </FormLabel>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="flex flex-row items-center space-x-3 space-y-0 rounded-md ">
                                        <FormField
                                            name='removal'
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
                                                            This is a removal proceeding
                                                        </FormLabel>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="flex flex-row items-center space-x-3 space-y-0 rounded-md ">
                                        <FormField
                                            name='exclusion'
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
                                                            This is a exclusion proceeding
                                                        </FormLabel>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />

                                    </div>
                                    <div className="flex flex-row items-center space-x-3 space-y-0 rounded-md ">
                                        <FormField
                                            name='deportation'
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
                                                            This is a deportation proceeding
                                                        </FormLabel>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />

                                    </div>
                                    <div className="flex flex-row items-center space-x-3 space-y-0 rounded-md ">
                                        <FormField
                                            name='rescission'
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
                                                            This is a rescission proceeding
                                                        </FormLabel>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />

                                    </div>
                                    <div className="flex flex-row items-center space-x-3 space-y-0 rounded-md ">
                                        <FormField
                                            name='otherJudicial'
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
                                                            This is an other judicial proceeding
                                                        </FormLabel>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />

                                    </div>
                                </div>}
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

