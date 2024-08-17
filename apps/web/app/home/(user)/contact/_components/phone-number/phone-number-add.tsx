'use client'
import { Trans } from '@kit/ui/trans';
import { Button } from '@kit/ui/button';
import { PhoneNumberForm } from './phone-number-form';
import { ClientOnly } from '~/home/(user)/_components/client-only';


export function PhoneNumberAdd() {
    return (
        <>
            <ClientOnly>
                <PhoneNumberForm
                    mode='create'
                    number={
                        {
                            number: '',
                            type: ''
                        }
                    }
                    trigger={
                        <Button variant={'default'}>
                            <Trans i18nKey={'contact:add'} />
                        </Button>
                    }
                />
            </ClientOnly>
        </>

    );
}

