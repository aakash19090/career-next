import { Metadata } from 'next';

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

const getPageTitle = ({ q, type, location, remote }: JobFilterFormType) => {
    const titlePrefix = q
        ? `${q} jobs`
        : type
          ? `${type} developer jobs`
          : remote
            ? 'Remote developer jobs'
            : 'All Developer jobs';

    const titleSuffix = location ? ` in ${location}` : '';

    return `${titlePrefix}${titleSuffix}`;
};

// Generate MetaData for SEO
export function generateMetadata({ searchParams: { q, type, location, remote } }: IPageProps): Metadata {
    const filterValues: JobFilterFormType = {
        q,
        type,
        location,
        remote: remote === 'true',
    };
    return {
        title: `${getPageTitle(filterValues)} | Career Next`,
        description: 'Find your dream developer job.',
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
        <main className='m-auto my-10 max-w-5xl space-y-10 px-3'>
            <div className='space-y-5 text-center'>
                <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl'> {getPageTitle(filterValues)} </h1>
                <p className='text-muted-foreground'>Find your dream job.</p>
            </div>
            <section className='flex flex-col gap-4 md:flex-row'>
                <JobSidebarFilter defaultValues={filterValues} />
                <JobResults filterValues={filterValues} />
            </section>
        </main>
    );
}
