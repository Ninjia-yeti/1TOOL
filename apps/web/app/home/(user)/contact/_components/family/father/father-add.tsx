'use client'
import { Trans } from '@kit/ui/trans';
import { Button } from '@kit/ui/button';
import { FatherForm } from './father-form';
import { ClientOnly } from '~/home/(user)/_components/client-only';



export function FatherAdd() {
    return (
        <>
            <ClientOnly>
                <FatherForm
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

