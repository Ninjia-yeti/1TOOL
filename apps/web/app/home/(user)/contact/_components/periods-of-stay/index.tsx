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
import { StayAdd } from './stay-add';

import { z } from 'zod';
import { PersonalContactAddressSchema, IdSchema } from '../../_lib/schema/personal-contact-schema';
const PersonalContactAddressSafeSchema = PersonalContactAddressSchema.merge(IdSchema)
export type PersonalContactAddressProps = z.infer<typeof PersonalContactAddressSafeSchema>;

export async function ContactStay() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <Trans i18nKey={'contact:stays'} />
                </CardTitle>

                <CardDescription>
                    <Trans i18nKey={'contact:staysDescription'} />
                </CardDescription>
            </CardHeader>
            <CardContent className={'space-y-4'}>
                <StayAdd />
                {/* <AddressList /> */}

            </CardContent>
        </Card>
    );
}


