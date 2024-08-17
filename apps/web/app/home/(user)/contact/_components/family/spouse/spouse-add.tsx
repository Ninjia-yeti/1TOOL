'use client'
import { SpouseForm } from './spouse-form';
import { ClientOnly } from '~/home/(user)/_components/client-only';
import { Plus } from 'lucide-react';




export function SpouseAdd() {
    return (
        <>
            <ClientOnly>
                <SpouseForm
                    mode='create'
                    trigger={
                        <Plus color='#707070' />
                    }
                />
            </ClientOnly>
        </>

    );
}

