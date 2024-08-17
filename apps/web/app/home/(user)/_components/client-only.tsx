'use cleint'
import React, { useEffect, useState } from "react";

interface ClientOnlyProps {
    children: React.ReactNode
}

export const ClientOnly: React.FC<ClientOnlyProps> = ({ children }: ClientOnlyProps) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return null
    } else {
        return (
            <>
                {children}
            </>
        )
    }
}