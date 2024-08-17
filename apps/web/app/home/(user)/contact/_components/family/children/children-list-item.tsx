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
import { deletePersonalContacFamily_Children } from '../../../_lib/server/server-actions';
import { ChildrenForm } from './children-form';

import { ClientOnly } from '~/home/(user)/_components/client-only';

import { PersonalContactFamily_ChildrenProps } from '.'


export function ChildItem({ child }: { child: PersonalContactFamily_ChildrenProps }) {
    const [error, setError] = useState(false);

    const { t } = useTranslation('');

    const createToaster = useCallback(
        (promise: () => Promise<unknown>) => {
            return toast.promise(promise, {
                success: t(`deleteChildSuccess`),
                error: t(`deleteChildError`),
                loading: t(`deleteChildLoading`),
            });
        },
        [t],
    );

    const deleteChild = useCallback(() => {
        const promise = async () => {
            try {
                await deletePersonalContacFamily_Children({ id: child.id })
            }
            catch (e) {
                setError(true);
            }
        }
        createToaster(promise)
    }, [child, createToaster])


    return (
        <>
            <ClientOnly>
                <div className='flex flex-col gap-4 p-2 px-4'>
                    <div className='flex gap-4 items-center w-full'>
                        {child.firstName}{` `}
                        {child.lastName}
                        <ChildrenForm
                            trigger={
                                <Pencil color='#707070' size={17} />
                            }
                            mode='edit'
                            child={child}
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