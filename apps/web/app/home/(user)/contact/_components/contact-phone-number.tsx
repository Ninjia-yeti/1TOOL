'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@kit/ui/card';
import { Trans } from '@kit/ui/trans';
import { Button } from '@kit/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@kit/ui/dialog';
import { Label } from '@kit/ui/label';
import { Input } from '@kit/ui/input';
import { Checkbox } from '@kit/ui/checkbox';
import { Alert, AlertDescription, AlertTitle } from '@kit/ui/alert';
import { If } from '@kit/ui/if';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import React, { useCallback, useState } from 'react';

import { createPersonalContactPhone } from '../_lib/server/server-actions';

export interface numberProps {
    number: string;
    type: string;
}


export function ContactPhoneNumber() {
    const phoneNumberTypes = ['dayTime', 'evening', 'fax', 'home', 'mobile', 'work', 'other'];
    const [error, setError] = useState(true);
    const [currentNumber, setCurrentNumber] = useState<numberProps>({
        number: '',
        type: ''
    });
    const { t } = useTranslation('');

    const createToaster = useCallback(
        (promise: () => Promise<unknown>) => {
            return toast.promise(promise, {
                success: t(`createPhoneNumberSuccess`),
                error: t(`createPhoneNumberError`),
                loading: t(`createPhoneNumberLoading`),
            });
        },
        [t],
    );

    const handleCheckBoxChange = (numberType: string) => {
        const currentType = currentNumber?.type.split(',');

        const isExist = currentType.some((a) => a === numberType);
        let nextType = currentType;
        if (isExist) {
            nextType = currentType.filter((a) => a !== numberType);
        } else {
            nextType = [...currentType, numberType];
        }

        setCurrentNumber({ ...currentNumber, type: nextType.join(',') })
    }

    const saveNumber = useCallback(() => {
        const promise = async () => {
            const result = await createPersonalContactPhone(currentNumber);
            console.log(result);
        }
        createToaster(promise);
    }, [currentNumber, createToaster])
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>
                        <Trans i18nKey={'contact:phoneNumbers'} />
                    </CardTitle>

                    <CardDescription>
                        <Trans i18nKey={'contact:phoneNumbersDescription'} />
                    </CardDescription>
                </CardHeader>
                <CardContent className={'space-y-4'}>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant={'default'}>
                                <Trans i18nKey={'contact:addPhoneNumber'} />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>
                                    <Trans i18nKey={'contact:phoneNumber'} />
                                </DialogTitle>
                                <DialogDescription>
                                    <Trans i18nKey={'contact:phoneNumberDescription'} />
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div>
                                    <Label htmlFor="phoneNumber" className="text-right">
                                        <Trans i18nKey={'contact:phoneNumber'} />
                                    </Label>
                                    <Input
                                        id="phoneNumber"
                                        onChange={(e) => { setCurrentNumber({ ...currentNumber, number: e.target.value }) }}
                                        value={currentNumber?.number}
                                        className="col-span-3"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="username">
                                        <Trans i18nKey={'contact:phoneNumberType'} />
                                    </Label>
                                    <div className='flex flex-col gap-4 pt-2'>
                                        {
                                            phoneNumberTypes.map((a, idx) => (
                                                <div key={idx} className='flex gap-2 items-center'>
                                                    <Checkbox
                                                        onClick={() => handleCheckBoxChange(a)}
                                                        checked={currentNumber?.type.split(',').some((b) => b === a)}
                                                        id={a}
                                                    />
                                                    <Label
                                                        htmlFor={a}
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >
                                                        <Trans i18nKey={`contact:${a}`} />
                                                    </Label>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <If condition={error}>
                                <ErrorAlert />
                            </If>
                            <DialogFooter>
                                <Button onClick={saveNumber} type="submit">Save changes</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <Card>
                        <CardContent className='flex flex-col gap-2 p-4'>
                            <div>
                                12345
                            </div>
                            <div>Mobiel, Home</div>
                            <div className='flex'>
                                <Button variant={'ghost'}>
                                    <Trans i18nKey={'common:edit'} />
                                </Button>
                                <Button variant={'ghost'}>
                                    <Trans i18nKey={'common:delete'} />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
        </div>
    );
}


function ErrorAlert() {
    return (
        <Alert variant={'destructive'}>
            <ExclamationTriangleIcon className={'h-4'} />

            <AlertTitle>
                <Trans i18nKey={'contact:errorTitle'} />
            </AlertTitle>

            <AlertDescription>
                error
            </AlertDescription>
        </Alert>
    );
}