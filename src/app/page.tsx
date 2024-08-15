import { JobFilterFormType } from '@/zodSchemas';

import JobResults from '@/components/JobResults';
import JobSidebarFilter from '@/components/JobSidebarFilter';

// import prisma from '@/lib/prisma';

interface IPageProps {
    searchParams: {
        q?: string;
        type?: string;
        location?: string;
        remote?: string;
    };
}

export default async function Home({ searchParams: { q, type, location, remote } }: IPageProps) {
    const filterValues: JobFilterFormType = {
        q,
        type,
        location,
        remote: remote === 'true',
    };

    return (
        <main className='m-auto max-w-5xl px-3'>
            <div className='space-y-5 text-center'>
                <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl'>Developer jobs</h1>
                <p className='text-muted-foreground'>Find your dream job.</p>
            </div>
            <section className='flex flex-col gap-4 md:flex-row'>
                <JobSidebarFilter defaultValues={filterValues} />
                <JobResults filterValues={filterValues} />
            </section>
        </main>
    );
}
