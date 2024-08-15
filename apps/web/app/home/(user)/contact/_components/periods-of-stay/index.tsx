'use server'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@kit/ui/card';
import { Trans } from '@kit/ui/trans';




import { StayList } from './stay-list';
import { StayAdd } from './stay-add';

import { z } from 'zod';
import { PersonalContactStaySchema, IdSchema } from '../../_lib/schema/personal-contact-schema';
const PersonalContactStaySafeSchema = PersonalContactStaySchema.merge(IdSchema)
export type PersonalContactStayProps = z.infer<typeof PersonalContactStaySafeSchema>;

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
                <StayList />

            </CardContent>
        </Card>
    );
}


