'use client'
import { Trans } from '@kit/ui/trans';
import { Button } from '@kit/ui/button';
import { PetitionForm } from './petition-form';
import { ClientOnly } from '~/home/(user)/_components/client-only';



export function PetitionAdd() {
    return (
        <>
            <ClientOnly>
                <PetitionForm
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

