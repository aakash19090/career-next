'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

import logo from '@/assets/logo.png';
import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
    const { setTheme } = useTheme();

    return (
        <header className='border-b-2'>
            <nav className='m-auto flex max-w-5xl items-center justify-between px-3 py-5'>
                <Link href='/' className='flex items-center gap-4'>
                    <Image src={logo} width={40} height={40} alt='site-logo' />
                    <span className='text-xl font-bold tracking-tight'>Career Next</span>
                </Link>

                <div className='flex items-center gap-4'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant='outline' size='icon'>
                                <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
                                <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
                                <span className='sr-only'>Toggle theme</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                            <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button asChild>
                        <Link href='/'>Post Job</Link>
                    </Button>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
