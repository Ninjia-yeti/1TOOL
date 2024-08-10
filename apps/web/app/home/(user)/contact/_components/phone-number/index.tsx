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
import { ContactPhoneNumberAddForm } from './phone-number-add-form';

export interface NumberProps {
    id?: number
    number: string;
    type: string;
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

                <ContactPhoneNumberAddForm />
                <PhoneNumberList />

            </CardContent>
        </Card>
    );
}


