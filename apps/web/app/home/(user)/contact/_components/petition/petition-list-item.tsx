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
import { deletePersonalContacPetition } from '../../_lib/server/server-actions';
import { PetitionForm } from './petition-form';

import { ClientOnly } from '~/home/(user)/_components/client-only';
import { renderDate } from '../common/contact-date-selector';

import { PersonalContactPetitionProps } from '.'

type Petition = {
    [key: string]: string | number | boolean;
};

export function PetitionItem({ petition }: { petition: PersonalContactPetitionProps }) {
    const [error, setError] = useState(false);

    const { t } = useTranslation('');

    const createToaster = useCallback(
        (promise: () => Promise<unknown>) => {
            return toast.promise(promise, {
                success: t(`deletePetitionSuccess`),
                error: t(`deletePetitionError`),
                loading: t(`deletePetitionLoading`),
            });
        },
        [t],
    );

    const deletePetition = useCallback(() => {
        const promise = async () => {
            try {
                await deletePersonalContacPetition({ id: petition.id })
            }
            catch (e) {
                setError(true);
            }
        }
        createToaster(promise)
    }, [petition, createToaster])
    const renderPropeties = (petition: Petition) => {
        const keys = Object.keys(petition);
        let matchedProperties: string[] = [];
        keys.forEach((aKey: string) => {
            if (petition[aKey] === true) {
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

    return (
        <>
            <ClientOnly>
                <Card>
                    <CardContent className='flex flex-col gap-4 p-2 px-4'>
                        <div className='flex flex-col gap-4'>
                            {renderPropeties(petition)}
                            {renderDate(new Date(JSON.parse(petition.dateFilled).value), JSON.parse(petition.dateFilled).mode)}
                            <div className='flex gap-2 items-center'>
                                {petition.cityFilled},
                                {petition.stateFilled}
                            </div>
                        </div>
                        <div className='flex flex-wrap'>
                            <PetitionForm
                                trigger={
                                    <Button variant={'ghost'}>
                                        <Trans i18nKey={'common:edit'} />
                                    </Button>
                                }
                                mode='edit'
                                petition={petition}
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
                                            petition information from our servers.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={deletePetition}>Continue</AlertDialogAction>
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