'use client'
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
import { deletePersonalContacFamily_Spouse } from '../../../_lib/server/server-actions';
import { SpouseForm } from './spouse-form';

import { ClientOnly } from '~/home/(user)/_components/client-only';

import { PersonalContactFamily_SpouseProps } from '.'


export function SpouseItem({ spouse }: { spouse: PersonalContactFamily_SpouseProps }) {
    const [error, setError] = useState(false);

    const { t } = useTranslation('');

    const createToaster = useCallback(
        (promise: () => Promise<unknown>) => {
            return toast.promise(promise, {
                success: t(`deleteSpouseSuccess`),
                error: t(`deleteSpouseError`),
                loading: t(`deleteSpouseLoading`),
            });
        },
        [t],
    );

    const deleteChild = useCallback(() => {
        const promise = async () => {
            try {
                await deletePersonalContacFamily_Spouse({ id: spouse.id })
            }
            catch (e) {
                setError(true);
            }
        }
        createToaster(promise)
    }, [spouse, createToaster])


    return (
        <>
            <ClientOnly>
                <div className='flex flex-col gap-4 p-2 px-4'>
                    <div className='flex gap-4 items-center w-full'>
                        {spouse.firstName}{` `}
                        {spouse.lastName}
                        <SpouseForm
                            trigger={
                                <Pencil color='#707070' size={17} />
                            }
                            mode='edit'
                            spouse={spouse}
                        />
                        <div className='flex flex-wrap'>

                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Trash2 color='#ef4444' size={17} />
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
                                        <AlertDialogAction onClick={deleteChild}>Continue</AlertDialogAction>
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