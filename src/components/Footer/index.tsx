import Link from 'next/link';

import { FOOTERCONTENT } from '@/constants';

const Footer = () => {
    const { logoText, tagline, links, copyright } = FOOTERCONTENT;
    return (
        <footer className='border-t-2 py-8'>
            <div className='m-auto flex max-w-5xl items-center justify-between'>
                <div>
                    <h3 className='mb-2 text-xl font-bold tracking-tight'> {logoText} </h3>
                    <p className='text-sm text-muted-foreground'> {tagline} </p>
                </div>

                <ul className='flex items-center gap-5 text-sm text-muted-foreground'>
                    {links.map((link) => (
                        <li key={link.label}>
                            <Link href={link.href} className='hover:underline'>
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <p className='mt-4 text-center text-sm text-muted-foreground'> {copyright} </p>
        </footer>
    );
};

export default Footer;
