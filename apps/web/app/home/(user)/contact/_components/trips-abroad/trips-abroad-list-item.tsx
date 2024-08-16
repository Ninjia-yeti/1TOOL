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
import { deletePersonalContactTripsAbroad } from '../../_lib/server/server-actions';
import { TripsAbroadForm } from './trips-abroad-form';

import { ClientOnly } from '~/home/(user)/_components/client-only';
import { renderDate } from '../common/contact-date-selector';

import { PersonalContactTripsAbroadProps } from '.'



export function TripsAbroadListItem({ trip }: { trip: PersonalContactTripsAbroadProps }) {
    const [error, setError] = useState(false);

    const { t } = useTranslation('');

    const createToaster = useCallback(
        (promise: () => Promise<unknown>) => {
            return toast.promise(promise, {
                success: t(`deleteTripSuccess`),
                error: t(`deleteTripError`),
                loading: t(`deleteTripLoading`),
            });
        },
        [t],
    );

    const deleteAddress = useCallback(() => {
        const promise = async () => {
            try {
                await deletePersonalContactTripsAbroad({ id: trip.id })
            }
            catch (e) {
                setError(true);
            }
        }
        createToaster(promise)
    }, [trip, createToaster])


    return (
        <>
            <ClientOnly>
                <Card>
                    <CardContent className='flex flex-col gap-4 p-2 px-4'>
                        <div className='flex flex-col gap-4'>
                            <div>{trip.countriesVisited}</div>
                            <div>{trip.tripPurpose}</div>
                            <div className='flex items-center gap-2'>
                                <div className='bg-neutral-300 dark:bg-slate-800 text-white p-1 px-2 rounded-[30px] shadow-md'>
                                    {renderDate(new Date(JSON.parse(trip.departureDate).value), JSON.parse(trip.departureDate).mode)}
                                </div>
                                -
                                <div className='bg-neutral-300 dark:bg-slate-800 text-white p-1 px-2 rounded-[30px] shadow-md'>
                                    {renderDate(new Date(JSON.parse(trip.ReturnDate).value), JSON.parse(trip.ReturnDate).mode)}
                                </div>
                            </div>
                            <div>{`${trip.departureCity},${trip.departureState} - ${trip.departureCity},${trip.departureState}`}</div>
                        </div>
                        <div className='flex flex-wrap'>
                            <TripsAbroadForm
                                trigger={
                                    <Button variant={'ghost'}>
                                        <Trans i18nKey={'common:edit'} />
                                    </Button>
                                }
                                mode='edit'
                                trip={trip}
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
                                            trips abroads information from our servers.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={deleteAddress}>Continue</AlertDialogAction>
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