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
import { deletePersonalContacFamily_Mother } from '../../../_lib/server/server-actions';
import { MotherForm } from './mother-form';

import { ClientOnly } from '~/home/(user)/_components/client-only';

import { PersonalContactFamily_MotherProps } from '.'


export function MotherItem({ mother }: { mother: PersonalContactFamily_MotherProps }) {
    const [error, setError] = useState(false);

    const { t } = useTranslation('');

    const createToaster = useCallback(
        (promise: () => Promise<unknown>) => {
            return toast.promise(promise, {
                success: t(`deleteMotherSuccess`),
                error: t(`deleteMotherError`),
                loading: t(`deleteMotherLoading`),
            });
        },
        [t],
    );

    const deleteMother = useCallback(() => {
        const promise = async () => {
            try {
                await deletePersonalContacFamily_Mother({ id: mother.id })
            }
            catch (e) {
                setError(true);
            }
        }
        createToaster(promise)
    }, [mother, createToaster])


    return (
        <>
            <ClientOnly>
                <div className='flex flex-col gap-4 p-2 px-4'>
                    <div className='flex gap-4 items-center w-full'>
                        {mother.firstName}{` `}
                        {mother.lastName}
                        <MotherForm
                            trigger={
                                <Pencil color='#707070' size={17} />
                            }
                            mode='edit'
                            mother={mother}
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
                                        <AlertDialogAction onClick={deleteMother}>Continue</AlertDialogAction>
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