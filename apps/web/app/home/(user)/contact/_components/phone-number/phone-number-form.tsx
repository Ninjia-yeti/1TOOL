'use client';
import React, { ReactNode, useCallback, useState } from 'react';
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
import { If } from '@kit/ui/if';
import { ErrorAlert } from '../errorAlert';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';


import { createPersonalContactPhone, editPersonalContactPhone } from '../../_lib/server/server-actions';
import { NumberSafeProps } from '.';
const phoneNumberTypes = ['dayTime', 'evening', 'fax', 'home', 'mobile', 'work', 'other'];

export interface PhoneNumberFormProps {
    mode: 'create' | 'edit';
    number: NumberSafeProps;
    trigger: ReactNode
}

export function PhoneNumberForm({ mode, number, trigger }: PhoneNumberFormProps) {
    const [error, setError] = useState(false);
    const [errorString, setErrorString] = useState('');
    const [currentNumber, setCurrentNumber] = useState<NumberSafeProps>(number);
    const [openDlg, setOpenDlg] = useState(false);
    const { t } = useTranslation('');

    const createToaster = useCallback(
        (promise: () => Promise<unknown>) => {
            return toast.promise(promise, {
                success: t(`${mode}PhoneNumberSuccess`),
                error: t(`${mode}PhoneNumberError`),
                loading: t(`${mode}PhoneNumberLoading`),
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
        const { number, type } = currentNumber;
        const phoneRegex = /^(\+?\d{1,4}[\s-]?)?(\(?\d{1,4}\)?[\s-]?)?[\d\s-]{5,16}$/;
        const isValidNumber = phoneRegex.test(number);
        if (!isValidNumber) {
            setError(true);
            setErrorString('Please provide a valid phone number.');
            return;
        }
        const currentType = type.split(',');

        if (!(currentType.length > 1)) {
            setError(true);
            setErrorString('Please provide at least one phone number type.');
            return;
        }
        setError(false);
        const promise = async () => {
            try {
                if (mode === 'create') {
                    await createPersonalContactPhone(currentNumber);
                }
                if (mode === 'edit') {
                    await editPersonalContactPhone({ ...currentNumber, id: currentNumber.id ?? 0 });
                }
                setError(false);
                setOpenDlg(false);
                setCurrentNumber(
                    {
                        number: '',
                        type: ''
                    }
                )
            }
            catch (e) {
                setError(true);
                setErrorString('Something went wrong.')
            }
        }
        createToaster(promise);
    }, [currentNumber, createToaster])
    return (
        <div>
            <Dialog
                open={openDlg}
                onOpenChange={(v: boolean) => setOpenDlg(v)}
            >
                <DialogTrigger>
                    {trigger}
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
                        <ErrorAlert error={errorString} />
                    </If>
                    <DialogFooter>
                        <Button onClick={saveNumber} type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

