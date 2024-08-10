'use client';
import { Trans } from '@kit/ui/trans';
import { Button } from '@kit/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@kit/ui/dialog';
import { Label } from '@kit/ui/label';
import { Input } from '@kit/ui/input';
import { Checkbox } from '@kit/ui/checkbox';
import { If } from '@kit/ui/if';
import { ErrorAlert } from '../errorAlert';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import React, { useCallback, useState } from 'react';

import { createPersonalContactPhone } from '../../_lib/server/server-actions';


export interface NumberProps {
    number: string;
    type: string;
}

const phoneNumberTypes = ['dayTime', 'evening', 'fax', 'home', 'mobile', 'work', 'other'];

export function ContactPhoneNumberAddForm() {
    const [error, setError] = useState(false);
    const [currentNumber, setCurrentNumber] = useState<NumberProps>({
        number: '',
        type: ''
    });
    const [openDlg, setOpenDlg] = useState(false);
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
            try {
                await createPersonalContactPhone(currentNumber);
            }
            catch (e) {
                setError(true);
            }
            setOpenDlg(false);
        }
        createToaster(promise);
    }, [currentNumber, createToaster])
    return (
        <div>
            <Button onClick={(() => setOpenDlg(true))} variant={'default'}>
                <Trans i18nKey={'contact:addPhoneNumber'} />
            </Button>
            <Dialog
                open={openDlg}
                onOpenChange={(v: boolean) => setOpenDlg(v)}
            >

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
                        <ErrorAlert error={'An error occured.'} />
                    </If>
                    <DialogFooter>
                        <Button onClick={saveNumber} type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

