'use server'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@kit/ui/card';
import { Trans } from '@kit/ui/trans';




// import { PhoneNumberList } from './phone-number-list';
import { AddressAdd } from './address-add';

export interface NumberProps {
    number: string;
    type: string;
}
export interface NumberSafeProps extends NumberProps {
    id?: number
}


export async function ContactAddress() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <Trans i18nKey={'contact:addresses'} />
                </CardTitle>

                <CardDescription>
                    <Trans i18nKey={'contact:addressesDescription'} />
                </CardDescription>
            </CardHeader>
            <CardContent className={'space-y-4'}>
                <AddressAdd />
                {/* <PhoneNumberList /> */}

            </CardContent>
        </Card>
    );
}


