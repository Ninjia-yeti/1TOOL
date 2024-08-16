'use server'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@kit/ui/card';
import { Trans } from '@kit/ui/trans';




// import { PetitionList } from './petition-list';
import { PetitionAdd } from './petition-add';

import { z } from 'zod';
import { PersonalContactPetitionSchema, IdSchema } from '../../_lib/schema/personal-contact-schema';
const PersonalContactPetitionSafeSchema = PersonalContactPetitionSchema.merge(IdSchema)
export type PersonalContactPetitionProps = z.infer<typeof PersonalContactPetitionSafeSchema>;

export async function ContactPetition() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <Trans i18nKey={'contact:petitions'} />
                </CardTitle>

                <CardDescription>
                    <Trans i18nKey={'contact:petitionsDescription'} />
                </CardDescription>
            </CardHeader>
            <CardContent className={'space-y-4'}>
                <PetitionAdd />
                {/* <PetitionList /> */}

            </CardContent>
        </Card>
    );
}


