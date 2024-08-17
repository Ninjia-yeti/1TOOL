'use client'
import { Trans } from '@kit/ui/trans';
import { Button } from '@kit/ui/button';
import { TripsAbroadForm } from './trips-abroad-form';
import { ClientOnly } from '~/home/(user)/_components/client-only';



export function TripsAbroadAdd() {
    return (
        <>
            <ClientOnly>
                <TripsAbroadForm
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

