'use client'
import { Trans } from '@kit/ui/trans';
import { Button } from '@kit/ui/button';
import { StayForm } from './stay-form';
import { ClientOnly } from '~/home/(user)/_components/client-only';



export function StayAdd() {
    return (
        <>
            <ClientOnly>
                <StayForm
                    mode='create'
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

