'use server'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@kit/ui/card';
import { Trans } from '@kit/ui/trans';




import { AddressList } from './address-list';
import { AddressAdd } from './address-add';

import { z } from 'zod';
import { PersonalContactAddressSchema, IdSchema } from '../../_lib/schema/personal-contact-schema';
const PersonalContactAddressSafeSchema = PersonalContactAddressSchema.merge(IdSchema)
export type PersonalContactAddressProps = z.infer<typeof PersonalContactAddressSafeSchema>;

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
                <AddressList />

            </CardContent>
        </Card>
    );
}


