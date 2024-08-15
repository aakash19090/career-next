'use client';

import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        console.error(`Error Boundary ->: ${error}`);
    }, [error]);

    return (
        <main className='flex h-screen items-center justify-center'>
            <div className='text-center'>
                <h1 className='mb-8 text-4xl font-extrabold tracking-tight lg:text-5xl'>
                    An unexpected error occurred
                </h1>
                <p className='text-lg text-muted-foreground'>{`Error: ${error.message}`}</p>
                <p className='my-8'>Attempt to recover by trying to re-render the segment</p>
                <Button onClick={() => reset()}>Try again</Button>
            </div>
        </main>
    );
}
