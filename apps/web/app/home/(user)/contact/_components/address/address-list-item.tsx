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
import { deletePersonalContactAddress } from '../../_lib/server/server-actions';
import { AddressForm } from './address-form';

import { ClientOnly } from '~/home/(user)/_components/client-only';
import { renderDate } from '../common/contact-date-selector';
import Flag from 'react-flagkit';

import { CountryForValue } from './address-country-select';
import { PersonalContactAddressProps } from '.'



type Address = {
    [key: string]: string | number | boolean;
};

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
                await deletePersonalContactAddress({ id: address.id })
            }
            catch (e) {
                setError(true);
            }
        }
        createToaster(promise)
    }, [address, createToaster])

    const renderPropeties = (address: Address) => {
        const keys = Object.keys(address);
        let matchedProperties: string[] = [];
        keys.forEach((aKey: string) => {
            if (address[aKey] === true) {
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
                            <div>{address.inCareOf}</div>
                            <div>{address.address},{address.type}.{address.typeValue}</div>
                            <div>{address.city},{address.province},{address.postalCode}</div>
                            <div className='flex items-center gap-2'>
                                <Flag country={address.country} />
                                <div>{CountryForValue(address.country)}</div>
                            </div>
                            <div className='flex items-center gap-2'>
                                <div className='bg-neutral-300 dark:bg-slate-800 text-white p-1 px-2 rounded-[30px] shadow-md'>
                                    {renderDate(new Date(JSON.parse(address.from).value), JSON.parse(address.from).mode)}
                                </div>
                                -
                                <div className='bg-neutral-300 dark:bg-slate-800 text-white p-1 px-2 rounded-[30px] shadow-md'>
                                    {renderDate(new Date(JSON.parse(address.to).value), JSON.parse(address.to).mode)}
                                </div>
                            </div>
                            {renderPropeties(address)}
                        </div>
                        <div className='flex flex-wrap'>
                            <AddressForm
                                trigger={
                                    <Button variant={'ghost'}>
                                        <Trans i18nKey={'common:edit'} />
                                    </Button>
                                }
                                mode='edit'
                                address={address}
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