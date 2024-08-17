'use client'
import { MotherForm } from './mother-form';
import { ClientOnly } from '~/home/(user)/_components/client-only';
import { Plus } from 'lucide-react';




export function MotherAdd() {
    return (
        <>
            <ClientOnly>
                <MotherForm
                    mode='create'
                    trigger={
                        <Plus color='#707070' />
                    }
                />
            </ClientOnly>
        </>

    );
}

