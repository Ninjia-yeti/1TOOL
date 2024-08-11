'use server'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@kit/ui/card';
import { Trans } from '@kit/ui/trans';




import { PhoneNumberList } from './phone-number-list';
import { PhoneNumberAdd } from './phone-number-add';

export interface NumberProps {
    number: string;
    type: string;
}
export interface NumberSafeProps extends NumberProps {
    id?: number
}


export async function ContactPhoneNumber() {
    return (
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
                <PhoneNumberAdd />
                <PhoneNumberList />

            </CardContent>
        </Card>
    );
}


