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


import { PersonalContactPetitionSchema } from '../../_lib/schema/personal-contact-schema';
import { zodResolver } from '@hookform/resolvers/zod';

import { If } from '@kit/ui/if';
import { ErrorAlert } from '../errorAlert';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { ContactDateSelector } from '../common/contact-date-selector';
import { CountrySelect } from '../common/contact-country-select';
import { DateTypes } from '../common/contact-date-selector';

import { z } from "zod"
import { useForm } from "react-hook-form"
import { createPersonalContactProceeding, editPersonalContactProceeding, } from '../../_lib/server/server-actions';
import { PersonalContactPetitionProps } from '.';

export interface TripsAbroadFromProps {
    trigger: ReactNode,
    petition?: PersonalContactPetitionProps,
    mode: 'edit' | 'create'
}

export function PetitionForm({ trigger, mode, petition }: TripsAbroadFromProps) {
    const [error, setError] = useState(false);
    const [errorString, setErrorString] = useState('');
    const [openDlg, setOpenDlg] = useState(false);
    const { t } = useTranslation('');
    const today = new Date();
    const defaultDateString = JSON.stringify({
        mode: DateTypes[0],
        value: today.toISOString()
    })
    const defaultFormValue = petition && mode === 'edit' ? petition : {
        dateFilled: defaultDateString,
        dateGranted: defaultDateString,
        nonImigrantVisa: false,
        imigrantVisa: false,
        affidavitOfSupport: false,
        advancePermissionToEnter: false,
        asyleeStatus: false,
        refugeeStatus: false,
        employmentAuthorization: false,
        reentryPermit: false,
        refugeeTravelDocument: false,

    }
    const form = useForm<z.infer<typeof PersonalContactPetitionSchema>>({
        resolver: zodResolver(PersonalContactPetitionSchema),
        defaultValues: defaultFormValue
    })


    async function onSubmit(data: z.infer<typeof PersonalContactPetitionSchema>) {
        console.log(data);

        const promise = async () => {
            try {
                setError(false);
                // if (mode === 'create') {
                //     await createPersonalContactProceeding(data)
                // }
                // if (mode === 'edit') {
                //     await editPersonalContactProceeding({
                //         ...data, id: proceeding?.id ?? 0
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
                success: t(`${mode}PetitionSuccess`),
                error: t(`${mode}PetitionError`),
                loading: t(`${mode}PetitionLoading`),
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
                            <Trans i18nKey={'contact:petition'} />
                        </DialogTitle>
                        <DialogDescription>
                            <Trans i18nKey={'contact:petitionDescription'} />
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} >
                            <div className='max-h-[80vh] overflow-y-auto flex flex-col gap-2 py-2'>
                                <div className='grid grid-cols-3 gap-2'>
                                    <FormField
                                        name='cityFilled'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel>City filled</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='City filled' maxLength={200} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name='stateFilled'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel>State filled</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='State filled' maxLength={200} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name='provinceFilled'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel>Province filled</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='Province filled' maxLength={200} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                </div>
                                <div className='grid grid-cols-3 gap-2'>
                                    <FormField
                                        name='countryFilled'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel>Country filled</FormLabel>
                                                <FormControl>
                                                    <CountrySelect value={field.value} onChange={field.onChange} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name='officeFilled'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel>Office filled</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='Office filled' maxLength={200} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name='dateFilled'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel>Date filled</FormLabel>
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
                                        name='cityGranted'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>City granted</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='City granted' maxLength={200} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name='stateGranted'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>State granted</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='State granted' maxLength={200} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name='provinceGranted'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Province granted</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='Province granted' maxLength={200} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='grid grid-cols-2 gap-2'>
                                    <FormField
                                        name='officeGranted'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Office granted</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='Office granted' maxLength={200} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name='dateGranted'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <FormLabel>Date granted</FormLabel>
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
                                        name='receiptNumber'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Receipt number</FormLabel>
                                                <FormControl>
                                                    <Input type='number' placeholder='Receipt number' maxLength={200} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name='result'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Result</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Result" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="approved">Approved</SelectItem>
                                                        <SelectItem value="denied">Denied</SelectItem>
                                                        <SelectItem value="withrawn">Withrawn</SelectItem>
                                                        <SelectItem value="refused">Refused</SelectItem>
                                                        <SelectItem value="other">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                </div>
                                <div className='flex flex-col pt-2 gap-4'>
                                    <Label className='pt-2'>
                                        Name as listed in the petition
                                    </Label>
                                    <div className='grid grid-cols-3 gap-2'>
                                        <FormField
                                            name='firstName'
                                            control={form.control}
                                            render={({ field }) => (
                                                <FormItem>
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
                                                <FormItem>
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
                                                <FormItem>
                                                    <FormLabel>Middle name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder='Middle name' maxLength={200} {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                    </div>
                                </div>

                                <div className='flex flex-col pt-2 gap-4'>
                                    <Label className='pt-2'>
                                        Type of petition
                                    </Label>
                                    <div className="flex flex-row items-center space-x-3 space-y-0 rounded-md ">
                                        <FormField
                                            name='nonImigrantVisa'
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
                                                            Nonimigrant visa
                                                        </FormLabel>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="flex flex-row items-center space-x-3 space-y-0 rounded-md ">
                                        <FormField
                                            name='imigrantVisa'
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
                                                            Imigrant visa
                                                        </FormLabel>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="flex flex-row items-center space-x-3 space-y-0 rounded-md ">
                                        <FormField
                                            name='affidavitOfSupport'
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
                                                            Affidavit of support
                                                        </FormLabel>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />

                                    </div>
                                    <div className="flex flex-row items-center space-x-3 space-y-0 rounded-md ">
                                        <FormField
                                            name='advancePermissionToEnter'
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
                                                            Advance permission to enter
                                                        </FormLabel>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />

                                    </div>
                                    <div className="flex flex-row items-center space-x-3 space-y-0 rounded-md ">
                                        <FormField
                                            name='asyleeStatus'
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
                                                            Asylee status
                                                        </FormLabel>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />

                                    </div>
                                    <div className="flex flex-row items-center space-x-3 space-y-0 rounded-md ">
                                        <FormField
                                            name='refugeeStatus'
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
                                                            Refugee status
                                                        </FormLabel>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />

                                    </div>
                                    <div className="flex flex-row items-center space-x-3 space-y-0 rounded-md ">
                                        <FormField
                                            name='employmentAuthorization'
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
                                                            Employment authorization
                                                        </FormLabel>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />

                                    </div>
                                    <div className="flex flex-row items-center space-x-3 space-y-0 rounded-md ">
                                        <FormField
                                            name='reentryPermit'
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
                                                            Reentry permit
                                                        </FormLabel>
                                                    </div>
                                                </FormItem>
                                            )}
                                        />

                                    </div>
                                    <div className="flex flex-row items-center space-x-3 space-y-0 rounded-md ">
                                        <FormField
                                            name='refugeeTravelDocument'
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
                                                            Refuse travel document
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
        </div>
    );
}

