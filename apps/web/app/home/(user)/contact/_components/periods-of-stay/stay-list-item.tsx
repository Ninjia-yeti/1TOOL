'use client'
import {
    Card,
    CardContent,
} from '@kit/ui/card';
import { Trans } from '@kit/ui/trans';
import { Button } from '@kit/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@kit/ui/alert-dialog"
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { deletePersonalContactStay } from '../../_lib/server/server-actions';
import { StayForm } from './stay-form';

import { ClientOnly } from '~/home/(user)/_components/client-only';
import { renderDate } from '../common/contact-date-selector';
import Flag from 'react-flagkit';

import { CountryForValue } from '../common/contact-country-select';
import { PersonalContactStayProps } from '.'



type Stay = {
    [key: string]: string | number | boolean;
};

export function StayListItem({ stay }: { stay: PersonalContactStayProps }) {
    const [error, setError] = useState(false);

    const { t } = useTranslation('');

    const createToaster = useCallback(
        (promise: () => Promise<unknown>) => {
            return toast.promise(promise, {
                success: t(`deletePhoneNumberSuccess`),
                error: t(`deletePhoneNumberError`),
                loading: t(`deletePhoneNumberLoading`),
            });
        },
        [t],
    );

    const deleteStay = useCallback(() => {
        const promise = async () => {
            try {
                await deletePersonalContactStay({ id: stay.id })
            }
            catch (e) {
                setError(true);
            }
        }
        createToaster(promise)
    }, [stay, createToaster])

    const renderPropeties = (stay: Stay) => {
        const keys = Object.keys(stay);
        let matchedProperties: string[] = [];
        keys.forEach((aKey: string) => {
            if (stay[aKey] === true) {
                matchedProperties.push(aKey);
            }
        })
        return (
            <div className='w-full flex flex-wrap'>
                {matchedProperties.map((a, idx) => {
                    return (
                        <div>
                            <Trans key={idx} i18nKey={`contact:${a}`} />{`${idx === matchedProperties.length - 1 ? '' : ','}`}
                        </div>
                    )
                })}
            </div>
        )
    }
    const renderNumberOfDays = () => {
        const startDateString = JSON.parse(stay.dateOfEntry).value;
        const endDateString = JSON.parse(stay.dateOfExit).value;

        const startDate = new Date(startDateString);
        const endDate = new Date(endDateString);

        const diffInTime = Math.abs(endDate.getTime() - startDate.getTime());

        const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));

        return diffInDays > 0 ? diffInDays : 1;
    }
    return (
        <>
            <ClientOnly>
                <Card>
                    <CardContent className='flex flex-col gap-4 p-2 px-4'>
                        <div className='flex flex-col gap-4'>
                            <div className='flex gap-2'>Date of entry: {
                                renderDate(new Date(JSON.parse(stay.dateOfEntry).value), JSON.parse(stay.dateOfEntry).mode)
                            }</div>
                            <div className='flex gap-2'>Place of entry:{
                                `${stay.portOfEntry}, ${stay.cityOfEntry}, ${stay.stateOfEntry}`
                            }
                            </div>
                            <div className='flex gap-2'>1-94 Number:{
                                stay.number_1_94
                            }
                            </div>
                            <div className='flex gap-2'>Number of days:{
                                renderNumberOfDays()
                            }
                            </div>
                        </div>
                        <div className='flex flex-wrap'>
                            <StayForm
                                trigger={
                                    <Button variant={'ghost'}>
                                        <Trans i18nKey={'common:edit'} />
                                    </Button>
                                }
                                mode='edit'
                                stay={stay}
                            />
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant={'ghost'}>
                                        <Trans i18nKey={'common:delete'} />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete your
                                            address from our servers.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={deleteStay}>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>

                        </div>
                    </CardContent>
                </Card>
            </ClientOnly>
        </>

    )
}