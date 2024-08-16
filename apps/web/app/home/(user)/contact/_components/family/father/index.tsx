'use server'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@kit/ui/card';
import { Trans } from '@kit/ui/trans';

// import { PetitionList } from './father-list';
import { FatherAdd } from './father-add';

import { z } from 'zod';
import { PersonalContactFamily_FatherSchema, IdSchema } from '../../../_lib/schema/personal-contact-schema';
const PersonalContactFamily_FatherSafeSchema = PersonalContactFamily_FatherSchema.merge(IdSchema)
export type PersonalContactFamily_FatherProps = z.infer<typeof PersonalContactFamily_FatherSafeSchema>;

export async function ContactFamily_Father() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <Trans i18nKey={'contact:father'} />
                </CardTitle>


            </CardHeader>
            <CardContent className={'space-y-4'}>
                <FatherAdd />
                {/* <PetitionList /> */}

            </CardContent>
        </Card>
    );
}


