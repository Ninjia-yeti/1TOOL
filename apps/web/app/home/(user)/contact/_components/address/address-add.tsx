'use client'
import { Trans } from '@kit/ui/trans';
import { Button } from '@kit/ui/button';
import { AddressForm } from './address-form';
import { ClientOnly } from '~/home/(user)/_components/client-only';



export function AddressAdd() {
    return (
        <>
            <ClientOnly>
                <AddressForm
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

