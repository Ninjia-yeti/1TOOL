'use client'
import { Trans } from '@kit/ui/trans';
import { Button } from '@kit/ui/button';
import { ProceedingForm } from './proceeding-form';
import { ClientOnly } from '~/home/(user)/_components/client-only';



export function ProceedingAdd() {
    return (
        <>
            <ClientOnly>
                <ProceedingForm
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

