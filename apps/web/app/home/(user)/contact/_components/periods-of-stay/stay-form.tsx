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

import { PersonalContactStaySchema } from '../../_lib/schema/personal-contact-schema';
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
import { createPersonalContactStay, editPersonalContactStay } from '../../_lib/server/server-actions';
import { PersonalContactStayProps } from '.';

export interface StayFormProps {
    trigger: ReactNode,
    stay?: PersonalContactStayProps,
    mode: 'edit' | 'create'
}


const admissions = [
    { value: 'USC', label: 'USC - United States Citizen' },
    { value: 'LPR', label: 'LPR - Lawful Permanent Resident' },
    { value: 'Other-Legal-Status', label: 'Other Legal Status' },
    { value: 'No-Legal-Status', label: 'No Legal Status' },
    { value: 'Paroled-in-Place', label: 'Paroled in Place' },
    { value: 'A-1', label: 'A-1 - Foreign Government Officials Ambassador, Public Minister, Career Diplomat or Consular Officer, or Immediate Family' },
    { value: 'A-2', label: 'A-2 - Other Foreign Government Official or Employee, or Immediate Family' },
    { value: 'A-3', label: 'A-3 - Foreign Government Officials Attendant, Servant, or Personal Employee of A-1 or A-2, or Immediate Family' },
    { value: 'B-1', label: 'B-1 - Visitor for Business or Domestic Servant' },
    { value: 'B-2', label: 'B-2 - Visitor for Pleasure or Medical Treatment' },
    { value: 'C-1', label: 'C-1 - Alien in Transit' },
    { value: 'C-1/D', label: 'C-1/D - Combined Transit and Crewman Visa' },
    { value: 'C-2', label: 'C-2 - Alien in Transit to United Nations Headquarters' },
    { value: 'C-3', label: 'C-3 - Foreign Government Official, Immediate Family, Attendant, Servant or Personal Employee, in Transit' },
    { value: 'C-4', label: 'C-4 - Transit Without Visa' },
    { value: 'CW-1', label: 'CW-1 - Commonwealth of the Northern Mariana Islands-Only transitional worker' },
    { value: 'CW-2', label: 'CW-2 - Dependent of a CW-1 visa holder' },
    { value: 'D-1', label: 'D-1 - Crewmember departing on same vessel of arrival' },
    { value: 'D-2', label: 'D-2 - Crewmember departing by means other than vessel of arrival' },
    { value: 'E-1', label: 'E-1 - Treaty Trader and Spouse or Child under age twenty-one' },
    { value: 'E-2', label: 'E-2 - Treaty Investor and Spouse or Child under age twenty-one' },
    { value: 'E-3', label: 'E-3 - Australian Citizen in Specialty Occupation and Spouse or Child under age twenty-one' },
    { value: 'F-1', label: 'F-1 - Student in Full-Time Academic Program' },
    { value: 'F-2', label: 'F-2 - Academic Student`s Spouse or Child under age twenty-one' },
    { value: 'F-3', label: 'F-3 - Canadian or Mexican academic commuter students' },
    { value: 'G-1', label: 'G-1 - Principal Resident Representative of Recognized Foreign Government to International Organization, Staff, or Immediate Family' },
    { value: 'G-2', label: 'G-2 - Other Representative of Recognized Foreign Member Government to International Organization, or Immediate Family' },
    { value: 'G-3', label: 'G-3 - Representative of Non-recognized Nonmember Foreign Government to International Organization, or Immediate Family' },
    { value: 'G-4', label: 'G-4 - International Organization Officer or Employee, or Immediate Family' },
    { value: 'G-5', label: 'G-5 - Attendant, Servant, or Personal Employee of G-1 through G-4, or Immediate Family' },
    { value: 'GB', label: 'GB - Temporary Visitor to Guam (limited to Guam)' },
    { value: 'H-1B', label: 'H-1B - Professionals who come temporarily to the U.S. to perform a specialty occupation' },
    { value: 'H-1B1', label: 'H-1B1 - Chile or Singapore Professionals who come temporarily to the U.S. to perform a specialty occupation' },
    { value: 'H-1B2', label: 'H-1B2 - Aliens who come temporarily to the U.S. to perform cooperative research and development projects' },
    { value: 'H-1B3', label: 'H-1B3 - Aliens who come temporarily to the U.S. as a fashion model' },
    { value: 'H-1C', label: 'H-1C - Nurse coming to areas of health professional shortage' },
    { value: 'H-2A', label: 'H-2A - Temporary or seasonal agricultural labor' },
    { value: 'H-2B', label: 'H-2B - Non-agricultural temporary worker' },
    { value: 'H-2R', label: 'H-2R - Special type of H-2B visa which was temporarily provided as a way to bypass the quotas for the H-2B' },
    { value: 'H-3', label: 'H-3 - Aliens who come to the U.S. for a training program' },
    { value: 'H-4', label: 'H-4 - Spouse or Child under twenty-one of H-1B' },
    { value: 'I-1', label: 'I-1 - Representative of Foreign Information Media and Spouse or Child under twenty-one' },
    { value: 'J-1', label: 'J-1 - Exchange Visitor' },
    { value: 'J-2', label: 'J-2 - Exchange Visitor Spouse or Child' },
    { value: 'K-1', label: 'K-1 - Alien Fiancé(e) of a US Citizen' },
    { value: 'K-2', label: 'K-2 - Child under twenty-one of K-1 Fiancé(e)' },
    { value: 'K-3', label: 'K-3 - Spouse of US Citizen under LIFE Act' },
    { value: 'K-4', label: 'K-4 - Child under twenty-one of K-3 Spouse' },
    { value: 'L-1A', label: 'L-1A - Intracompany Transferee Executive Manager' },
    { value: 'L-1B', label: 'L-1B - Intracompany Transferee Specialized Knowledge Worker' },
    { value: 'L-2', label: 'L-2 - Spouse or Child under twenty-one of L-1' },
    { value: 'M-1', label: 'M-1 - Vocational Student' },
    { value: 'M-2', label: 'M-2 - Spouse or Child under twenty-one of M-1' },
    { value: 'N-8', label: 'N-8 - Parent of SK-3 Special Immigrant' },
    { value: 'N-9', label: 'N-9 - Child under twenty-one of N-8 or of an SK-1, SK-2, or SK-4 Special Immigrant' },
    { value: 'NATO-1', label: 'NATO-1 - Principal Permanent Representative of Member State to NATO' },
    { value: 'NATO-2', label: 'NATO-2 - Other Representative of Member State to NATO' },
    { value: 'NATO-3', label: 'NATO-3 - Official Clerical Staff Accompanying Representative of Member State to NATO' },
    { value: 'NATO-4', label: 'NATO-4 - Official NATO (Other Than Those Classifiable as NATO-1) or Immediate Family' },
    { value: 'NATO-5', label: 'NATO-5 - Expert, Other Than NATO Officials Classifiable Under the NATO-4, Employed in Missions on Behalf of NATO, and their Dependents' },
    { value: 'NATO-6', label: 'NATO-6 - Member of a Civilian Component' },
    { value: 'NATO-7', label: 'NATO-7 - Attendant, Servant, or Personal Employee of NATO-1, NATO-2, NATO-3, NATO-4, NATO-5, and NATO-6 Classes, or Immediate Family' },
    { value: 'O-1A', label: 'O-1A - Alien of extraordinary abilities in the sciences, arts, education, business, or athletics' },
    { value: 'O-1B', label: 'O-1B - Aliens of extraordinary ability in the arts or extraordinary achievement in the motion picture or television industry' },
    { value: 'O-2', label: 'O-2 - Accompanying assistant to O-1 visa holder' },
    { value: 'O-3', label: 'O-3 - Spouse or Child Under 21 of an O-1 or O-2 visa holder' },
    { value: 'P-1', label: 'P-1 - Athletes, Entertainment Groups and Support Personnel' },
    { value: 'P-2', label: 'P-2 - Artists or Entertainers in Reciprocal Exchange Program' },
    { value: 'P-3', label: 'P-3 - Artist or Entertainer in Culturally Unique Program' },
    { value: 'P-4', label: 'P-4 - Spouse or Child under 21 of a P-1, P-2, or P-3 visa holder' },
    { value: 'Q-1', label: 'Q-1 - International Cultural Exchange Program Participant' },
    { value: 'Q-2', label: 'Q-2 - Irish Peace Process Cultural and Training Program' },
    { value: 'Q-3', label: 'Q-3 - Spouse or Child under 21 of a Q-1 or Q-2 visa holder' },
    { value: 'R-1', label: 'R-1 - Religious Worker' },
    { value: 'R-2', label: 'R-2 - Spouse or Child under 21 of a R-1 visa holder' },
    { value: 'S-5', label: 'S-5 - Criminal Informant (and spouse and children)' },
    { value: 'S-6', label: 'S-6 - Terrorist Informant (and spouse and children)' },
    { value: 'S-7', label: 'S-7 - Spouse and children of S-5/S-6 visa holders' },
    { value: 'T-1', label: 'T-1 - Victim of human trafficking' },
    { value: 'T-2', label: 'T-2 - Spouse of T-1 visa holder' },
    { value: 'T-3', label: 'T-3 - Child under 21 of T-1 visa holder' },
    { value: 'T-4', label: 'T-4 - Parent of T-1 visa holder' },
    { value: 'T-5', label: 'T-5 - Sibling of T-1 visa holder (under certain conditions)' },
    { value: 'TD', label: 'TD - Dependent of TN visa holder' },
    { value: 'TN', label: 'TN - NAFTA Professional' },
    { value: 'U-1', label: 'U-1 - Victim of Certain Crimes' },
    { value: 'U-2', label: 'U-2 - Spouse of U-1 visa holder' },
    { value: 'U-3', label: 'U-3 - Child of U-1 visa holder' },
    { value: 'U-4', label: 'U-4 - Parent of U-1 visa holder' },
    { value: 'V-1', label: 'V-1 - Spouse of Lawful Permanent Resident under the LIFE Act' },
    { value: 'V-2', label: 'V-2 - Child under 21 of Lawful Permanent Resident' },
    { value: 'V-3', label: 'V-3 - Child of a V-1 or V-2 visa holder' }
];




export function StayForm({ trigger, mode, stay }: StayFormProps) {
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
    const defaultFormValue = stay && mode === 'edit' ? stay : {
        dateStatusWasGranted: defaultDateString,
        dateStatusExpires: defaultDateString,
        dateOfEntry: defaultDateString,
        passport_travelDocIssued: defaultDateString,
        passport_travelDocExpires: defaultDateString,
        dateOfExit: defaultDateString,
        mostRecentEntry: false,
        plannedStay: false,
        onH_LStatus: false,
        onRStatus: false,
        grantedDurationOfStatus: false

    }
    const form = useForm<z.infer<typeof PersonalContactStaySchema>>({
        resolver: zodResolver(PersonalContactStaySchema),
        defaultValues: defaultFormValue
    })

    async function onSubmit(data: z.infer<typeof PersonalContactStaySchema>) {
        const promise = async () => {
            try {
                setError(false);
                if (mode === 'create') {
                    await createPersonalContactStay(data)
                }
                if (mode === 'edit') {
                    await editPersonalContactStay({
                        ...data, id: stay?.id ?? 0
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
                success: t(`${mode}StayInfoSuccess`),
                error: t(`${mode}StayInfoError`),
                loading: t(`${mode}StayInfoLoading`),
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
                            <Trans i18nKey={'contact:stay'} />
                        </DialogTitle>
                        <DialogDescription>
                            <Trans i18nKey={'contact:stayDescription'} />
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} >
                            <div className='flex flex-col gap-3  max-h-[80vh]  overflow-y-auto'>
                                <div className='flex justify-between gap-2'>
                                    <FormField
                                        name='dateOfEntry'
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
                                        name='number_1_94'
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
                                <div className='grid grid-cols-3 gap-2'>
                                    <FormField
                                        name='portOfEntry'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Port of entry</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='Port of entry' {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name='cityOfEntry'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>City of entry</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='City of entry' {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name='stateOfEntry'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>State of entry</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='State of entry' {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        name='classOfAdmission'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Class of admission</FormLabel>
                                                <FormControl>
                                                    <ComboElement placeholder='Class of admission' values={admissions} value={field.value} onChange={field.onChange} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        name='mannerOfEntry'
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
                                                        <SelectItem value="Inspected">Inspected</SelectItem>
                                                        <SelectItem value="Paroled">Paroled</SelectItem>
                                                        <SelectItem value="Not Inspected">Not Inspected</SelectItem>
                                                        <SelectItem value="Other">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='grid grid-cols-3 gap-2'>
                                    <FormField
                                        name='statusAfterAdmission'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Status after admission</FormLabel>
                                                <FormControl>
                                                    <ComboElement placeholder='Status after admission' values={admissions} value={field.value} onChange={field.onChange} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name='dateStatusWasGranted'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Date status was granted</FormLabel>
                                                <FormControl>
                                                    <ContactDateSelector value={field.value} onChange={field.onChange} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name='dateStatusExpires'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Date status expires</FormLabel>
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
                                        name='authorizedStayExpiry'
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
                                        name='purposeOfStay'
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
                                        name='modeOfTravel'
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
                                        name='passportNumber'
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
                                        name='travelDocumentNumber'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Travel document number</FormLabel>
                                                <FormControl>
                                                    <Input placeholder='Travel document number' maxLength={200} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name='passport_travelDocCountry'
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
                                        name='passport_travelDocIssued'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Passport/travel doc issued</FormLabel>
                                                <FormControl>
                                                    <ContactDateSelector value={field.value} onChange={field.onChange} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name='passport_travelDocExpires'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Passport/travel doc expires</FormLabel>
                                                <FormControl>
                                                    <ContactDateSelector value={field.value} onChange={field.onChange} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name='cityOfResidenceInUs'
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
                                        name='firstNameUsed'
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
                                        name='middleNameUsed'
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
                                        name='lastNameUsed'
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
                                        name='cityOfExit'
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
                                        name='stateOfExit'
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
                                        name='dateOfExit'
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
                                        name='mostRecentEntry'
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
                                            name='plannedStay'
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
                                            name='onH_LStatus'
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
                                            name='onRStatus'
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
                                            name='grantedDurationOfStatus'
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

