'use server'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@kit/ui/card';
import { Trans } from '@kit/ui/trans';




import { TripsAbroadList } from './trips-abroad-list';
import { TripsAbroadAdd } from './trips-abroad-add';

import { z } from 'zod';
import { PersonalContactTripsAbroadSchema, IdSchema } from '../../_lib/schema/personal-contact-schema';
const PersonalContactTripsAbroadSafeSchema = PersonalContactTripsAbroadSchema.merge(IdSchema)
export type PersonalContactTripsAbroadProps = z.infer<typeof PersonalContactTripsAbroadSafeSchema>;

export async function ContactTripsAbroad() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <Trans i18nKey={'contact:tripsAbroads'} />
                </CardTitle>

                <CardDescription>
                    <Trans i18nKey={'contact:tripsAbroadsDescription'} />
                </CardDescription>
            </CardHeader>
            <CardContent className={'space-y-4'}>
                <TripsAbroadAdd />
                <TripsAbroadList />

            </CardContent>
        </Card>
    );
}


