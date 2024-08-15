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
import { deletePersonalContactProceeding } from '../../_lib/server/server-actions';
import { ProceedingForm } from './proceeding-form';

import { ClientOnly } from '~/home/(user)/_components/client-only';
import { renderDate } from '../common/contact-date-selector';

import { PersonalContactProceedingProps } from '.'



export function ProceedingItem({ proceeding }: { proceeding: PersonalContactProceedingProps }) {
    const [error, setError] = useState(false);

    const { t } = useTranslation('');

    const createToaster = useCallback(
        (promise: () => Promise<unknown>) => {
            return toast.promise(promise, {
                success: t(`deleteTriprSuccess`),
                error: t(`deleteTriprError`),
                loading: t(`deleteTriprLoading`),
            });
        },
        [t],
    );

    const deleteProceeding = useCallback(() => {
        const promise = async () => {
            try {
                await deletePersonalContactProceeding({ id: proceeding.id })
            }
            catch (e) {
                setError(true);
            }
        }
        createToaster(promise)
    }, [proceeding, createToaster])


    return (
        <>
            <ClientOnly>
                <Card>
                    <CardContent className='flex flex-col gap-4 p-2 px-4'>
                        <div className='flex flex-col gap-4'>
                            <div>{`${proceeding.locationCity},${proceeding.locationState},${proceeding.office}`}</div>
                            <div className='flex gap-2 items-center'>
                                <div className='bg-neutral-300 dark:bg-slate-800 text-white p-1 px-2 rounded-[30px] shadow-md'>
                                    {renderDate(new Date(JSON.parse(proceeding.dateStarted).value), JSON.parse(proceeding.dateStarted).mode)}
                                </div>
                                -
                                <div className='bg-neutral-300 dark:bg-slate-800 text-white p-1 px-2 rounded-[30px] shadow-md'>
                                    {renderDate(new Date(JSON.parse(proceeding.dateEnded).value), JSON.parse(proceeding.dateEnded).mode)}
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-wrap'>
                            <ProceedingForm
                                trigger={
                                    <Button variant={'ghost'}>
                                        <Trans i18nKey={'common:edit'} />
                                    </Button>
                                }
                                mode='edit'
                                proceeding={proceeding}
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
                                            proceeding information from our servers.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={deleteProceeding}>Continue</AlertDialogAction>
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