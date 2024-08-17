'use server'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@kit/ui/card';
import { Trans } from '@kit/ui/trans';




import { ProceedingList } from './proceeding-list';
import { ProceedingAdd } from './proceeding-add';

import { z } from 'zod';
import { PersonalContactProceedingSchema, IdSchema } from '../../_lib/schema/personal-contact-schema';
const PersonalContactProceedingSafeSchema = PersonalContactProceedingSchema.merge(IdSchema)
export type PersonalContactProceedingProps = z.infer<typeof PersonalContactProceedingSafeSchema>;

export async function ContactProceeding() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <Trans i18nKey={'contact:proceedings'} />
                </CardTitle>

                <CardDescription>
                    <Trans i18nKey={'contact:proceedingsDescription'} />
                </CardDescription>
            </CardHeader>
            <CardContent className={'space-y-4'}>
                <ProceedingAdd />
                <ProceedingList />

            </CardContent>
        </Card>
    );
}


