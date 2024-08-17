'use server'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@kit/ui/card';
import { Trans } from '@kit/ui/trans';

import { ContactFamily_Father } from './father';
import { ContactFamily_Mother } from './mother';
import { ContactFamily_Children } from './children';

export async function ContactFamily() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <Trans i18nKey={'contact:family'} />
                </CardTitle>
            </CardHeader>
            <CardContent className={'space-y-4'}>
                <div className='grid grid-cols-4 gap-2'>
                    <ContactFamily_Father />
                    <ContactFamily_Mother />
                    <ContactFamily_Children />
                </div>
            </CardContent>
        </Card>
    );
}


