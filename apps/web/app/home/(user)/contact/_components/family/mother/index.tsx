'use server'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@kit/ui/card';
import { Trans } from '@kit/ui/trans';

import { MotherList } from './mother-list';
import { MotherAdd } from './mother-add';

import { z } from 'zod';
import { PersonalContactFamily_MotherSchema, IdSchema } from '../../../_lib/schema/personal-contact-schema';
const PersonalContactFamily_MotherSafeSchema = PersonalContactFamily_MotherSchema.merge(IdSchema)
export type PersonalContactFamily_MotherProps = z.infer<typeof PersonalContactFamily_MotherSafeSchema>;

export async function ContactFamily_Mother() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className='flex gap-2 items-center'>
                    <Trans i18nKey={'contact:mother'} />
                    <MotherAdd />
                </CardTitle>
            </CardHeader>
            <CardContent className={'space-y-4'}>
                <MotherList />
            </CardContent>
        </Card>
    );
}


