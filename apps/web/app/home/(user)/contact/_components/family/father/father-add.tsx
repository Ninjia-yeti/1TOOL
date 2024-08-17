'use client'
import { FatherForm } from './father-form';
import { ClientOnly } from '~/home/(user)/_components/client-only';
import { Plus } from 'lucide-react';




export function FatherAdd() {
    return (
        <>
            <ClientOnly>
                <FatherForm
                    mode='create'
                    trigger={
                        <Plus color='#707070' />
                    }
                />
            </ClientOnly>
        </>

    );
}

