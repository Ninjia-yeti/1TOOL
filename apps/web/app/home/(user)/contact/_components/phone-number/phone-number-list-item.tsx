import {
    Card,
    CardContent,
} from '@kit/ui/card';
import { Trans } from '@kit/ui/trans';
import { Button } from '@kit/ui/button';


import { NumberProps } from ".";
export function PhoneNumberListItem({ phoneNumber }: { phoneNumber: NumberProps }) {
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
                    <Button variant={'ghost'}>
                        <Trans i18nKey={'common:delete'} />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}