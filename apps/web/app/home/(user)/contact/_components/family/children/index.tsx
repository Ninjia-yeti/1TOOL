'use server'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@kit/ui/card';
import { Trans } from '@kit/ui/trans';

import { ChildrenList } from './children-list';
import { ChildrenAdd } from './children-add';

import { z } from 'zod';
import { PersonalContactFamily_ChildrenSchema, IdSchema } from '../../../_lib/schema/personal-contact-schema';
const PersonalContactFamily_ChildrenSafeSchema = PersonalContactFamily_ChildrenSchema.merge(IdSchema)
export type PersonalContactFamily_ChildrenProps = z.infer<typeof PersonalContactFamily_ChildrenSafeSchema>;

export async function ContactFamily_Children() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className='flex gap-2 items-center'>
                    <Trans i18nKey={'contact:children'} />
                    <ChildrenAdd />
                </CardTitle>
            </CardHeader>
            <CardContent className={'space-y-4'}>
                <ChildrenList />
            </CardContent>
        </Card>
    );
}


