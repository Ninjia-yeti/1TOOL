'use client'
import { ChildrenForm } from './children-form';
import { ClientOnly } from '~/home/(user)/_components/client-only';
import { Plus } from 'lucide-react';




export function ChildrenAdd() {
    return (
        <>
            <ClientOnly>
                <ChildrenForm
                    mode='create'
                    trigger={
                        <Plus color='#707070' />
                    }
                />
            </ClientOnly>
        </>

    );
}

