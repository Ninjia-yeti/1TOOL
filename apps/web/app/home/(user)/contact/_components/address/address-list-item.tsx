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
import { deletePersonalContactPhone } from '../../_lib/server/server-actions';
import { AddressForm } from './address-form';

import { ClientOnly } from '~/home/(user)/_components/client-only';

import { z } from 'zod';
import { PersonalContactAddressSchema, IdSchema } from '../../_lib/schema/personal-contact-schema';
const PersonalContactAddressSafeSchema = PersonalContactAddressSchema.merge(IdSchema)
export type PersonalContactAddressProps = z.infer<typeof PersonalContactAddressSafeSchema>;



export function AddressListItem({ address }: { address: PersonalContactAddressProps }) {
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

    const deleteAddress = useCallback(() => {
        const promise = async () => {
            try {
                await deletePersonalContactPhone({ id: address.id })
            }
            catch (e) {
                setError(true);
            }
        }
        createToaster(promise)
    }, [address, createToaster])

    const renderTypes = (type: string) => {
        const types = type.split(',').filter((a) => a !== '');
        return (
            <div className='flex gap-2 flex-wrap'>
                {types.map((a) => (
                    <div className='bg-neutral-300 dark:bg-slate-800 text-white p-1 px-2 rounded-[30px] shadow-md'>
                        <Trans i18nKey={`contact:${a}`} />
                    </div>
                ))}
            </div>
        )
    }
    return (
        <>
            <ClientOnly>
                <Card>
                    <CardContent className='flex flex-col gap-2 p-2 px-4'>
                        <div className='text-xl'>
                            {address.address}
                        </div>
                        <div>
                            {renderTypes(address.type)}
                        </div>
                        <div className='flex flex-wrap'>
                            <AddressForm
                                trigger={
                                    <Button variant={'ghost'}>
                                        <Trans i18nKey={'common:edit'} />
                                    </Button>
                                }
                            // mode='edit'
                            // number={phoneNumber}
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
                                            phone number from our servers.
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