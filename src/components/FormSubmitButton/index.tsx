'use client';

import React, { ButtonHTMLAttributes } from 'react';

import { LoaderCircle } from 'lucide-react';
import { useFormStatus } from 'react-dom';

import { Button } from '@/components/ui/button';

const FormSubmitButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
    const { pending } = useFormStatus();

    return (
        <Button type='submit' disabled={pending || props.disabled} {...props}>
            <span className='flex items-center justify-center gap-1'>
                {props.children}
                {pending && <LoaderCircle size={16} className='animate-spin' />}
            </span>
        </Button>
    );
};

export default FormSubmitButton;
