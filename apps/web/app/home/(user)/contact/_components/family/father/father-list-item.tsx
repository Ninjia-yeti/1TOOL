'use client'

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
import { Pencil, Trash2 } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { deletePersonalContacFamily_Father } from '../../../_lib/server/server-actions';
import { FatherForm } from './father-form';

import { ClientOnly } from '~/home/(user)/_components/client-only';

import { PersonalContactFamily_FatherProps } from '.'

type Petition = {
    [key: string]: string | number | boolean;
};

export function FatherItem({ father }: { father: PersonalContactFamily_FatherProps }) {
    const [error, setError] = useState(false);

    const { t } = useTranslation('');

    const createToaster = useCallback(
        (promise: () => Promise<unknown>) => {
            return toast.promise(promise, {
                success: t(`deleteFatherSuccess`),
                error: t(`deleteFatherError`),
                loading: t(`deleteFatherLoading`),
            });
        },
        [t],
    );

    const deleteFather = useCallback(() => {
        const promise = async () => {
            try {
                await deletePersonalContacFamily_Father({ id: father.id })
            }
            catch (e) {
                setError(true);
            }
        }
        createToaster(promise)
    }, [father, createToaster])


    return (
        <>
            <ClientOnly>
                <div className='flex flex-col gap-4 p-2 px-4'>
                    <div className='flex gap-4 items-center w-full'>
                        {father.firstName}{` `}
                        {father.lastName}
                        <FatherForm
                            trigger={
                                <Pencil color='#707070' size={17} />
                            }
                            mode='edit'
                            father={father}
                        />
                        <div className='flex flex-wrap'>

                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Trash2 color='#707070' size={17} />
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete your
                                            family information from our servers.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={deleteFather}>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>

                        </div>
                    </div>
                </div>
            </ClientOnly>
        </>

    )
}