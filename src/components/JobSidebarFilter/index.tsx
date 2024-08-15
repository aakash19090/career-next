import { redirect } from 'next/navigation';

import { JOBTYPES } from '@/constants';
import { JobFilterFormSchema, JobFilterFormType } from '@/zodSchemas';

import FormSubmitButton from '@/components/FormSubmitButton';
import Select from '@/components/Select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import prisma from '@/lib/prisma';

interface IJobSidebarFilterProps {
    defaultValues: JobFilterFormType;
}

const handleFilterSubmit = async (formData: FormData) => {
    'use server';

    const values = Object.fromEntries(formData.entries());

    const { q, type, location, remote } = JobFilterFormSchema.parse(values);

    const searchParams = new URLSearchParams({
        ...(q && { q: q.trim() }), // If 'q' is truthy, add 'q' to the query string with its trimmed value
        ...(type && { type }), // If 'type' is truthy, add 'type' to the query string
        ...(location && { location }), // If 'location' is truthy, add 'location' to the query string
        ...(remote && { remote: 'true' }), // If 'remote' is truthy, add 'remote' to the query string with the value 'true'
    });

    // console.log('searchParams', searchParams.toString());

    redirect(`/?${searchParams.toString()}`);
};

const JobSidebarFilter = async ({ defaultValues }: IJobSidebarFilterProps) => {
    const distinctLocations = (await prisma.job
        .findMany({ where: { approved: true }, select: { location: true }, distinct: ['location'] })
        .then((locations) => locations.map(({ location }) => location).filter(Boolean))) as string[];

    return (
        <aside className='sticky top-0 h-fit rounded-lg border bg-background p-4 md:w-72'>
            <form action={handleFilterSubmit}>
                <div className='form-wrapper space-y-4'>
                    <div className='space-y-4'>
                        <Label htmlFor='q'>Search</Label>
                        <Input
                            type='text'
                            placeholder='Title, company, etc.'
                            id='q'
                            name='q'
                            defaultValue={defaultValues.q || ''}
                        />
                    </div>

                    <div className='space-y-4'>
                        <Label htmlFor='type'>Type</Label>
                        <Select id='type' name='type' defaultValue={defaultValues.type || ''}>
                            <option value=''>All Types</option>
                            {JOBTYPES.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </Select>
                    </div>

                    <div className='space-y-4'>
                        <Label htmlFor='type'>Location</Label>
                        <Select id='location' name='location' defaultValue={defaultValues.location || ''}>
                            <option value=''>All locations</option>
                            {distinctLocations.map((location) => (
                                <option key={location} value={location}>
                                    {location}
                                </option>
                            ))}
                        </Select>
                    </div>

                    <div className='space-y-4'>
                        <input
                            type='checkbox'
                            id='remote'
                            name='remote'
                            className='mr-2 scale-125 cursor-pointer accent-black'
                            defaultChecked={defaultValues.remote}
                        />
                        <Label htmlFor='remote' className='cursor-pointer'>
                            Remote Jobs
                        </Label>
                    </div>

                    <div>
                        {/* Client Component */}
                        <FormSubmitButton className='w-full'> Filter Jobs </FormSubmitButton>
                    </div>
                </div>
            </form>
        </aside>
    );
};

export default JobSidebarFilter;
