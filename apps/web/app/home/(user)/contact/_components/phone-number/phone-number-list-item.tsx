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
import { NumberProps } from ".";
import { deletePersonalContactPhone } from '../../_lib/server/server-actions';

interface NumberPropsSafe extends NumberProps {
    id: number
}

export function PhoneNumberListItem({ phoneNumber }: { phoneNumber: NumberPropsSafe }) {
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

    const deleteNumber = useCallback(() => {
        const promise = async () => {
            try {
                await deletePersonalContactPhone({ id: phoneNumber.id })
            }
            catch (e) {
                setError(true);
            }
        }
        createToaster(promise)
    }, [phoneNumber, createToaster])

    const renderTypes = (type: string) => {
        const types = type.split(',').filter((a) => a !== '');
        return (
            <div className='flex gap-2 flex-wrap'>
                {types.map((a) => (
                    <div className='bg-neutral-300 dark:bg-slate-800 text-white p-2 px-4 rounded-lg'>
                        <Trans i18nKey={`contact:${a}`} />
                    </div>
                ))}
            </div>
        )
    }
    return (
        <Card>
            <CardContent className='flex flex-col gap-2 p-2 px-4'>
                <div className='text-xl'>
                    {phoneNumber.number}
                </div>
                <div>
                    {renderTypes(phoneNumber.type)}
                </div>
                <div className='flex flex-wrap'>
                    <Button variant={'ghost'}>
                        <Trans i18nKey={'common:edit'} />
                    </Button>
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
                                    phone number from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={deleteNumber}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                </div>
            </CardContent>
        </Card>
    )
}