import { JobFilterFormType } from '@/zodSchemas';
import { Prisma } from '@prisma/client';

import JobListItem from '@/components/JobListItem';

import prisma from '@/lib/prisma';

interface IJobResultsProps {
    filterValues: JobFilterFormType;
}

const JobResults = async ({ filterValues: { q, type, location, remote } }: IJobResultsProps) => {
    // Create a search string by splitting the input 'q' on spaces, filtering out empty words, and joining the remaining words with ' & '
    // This will allow us to search for jobs that contain all the words in the search string. Eg. "React Developer" will match jobs with "React" and "Developer" from database
    const searchString = q
        ?.split(' ')
        .filter((word) => word.length > 0)
        .join(' & ');

    // Define a search filter for Prisma's JobWhereInput based on the search string
    const searchFilter: Prisma.JobWhereInput = searchString
        ? {
              OR: [
                  { title: { search: searchString, mode: 'insensitive' } },
                  { companyName: { search: searchString, mode: 'insensitive' } },
                  { type: { search: searchString, mode: 'insensitive' } },
                  { locationType: { search: searchString, mode: 'insensitive' } },
                  { location: { search: searchString, mode: 'insensitive' } },
              ],
          }
        : {};

    // Define the 'where' clause for the Prisma job query
    const where: Prisma.JobWhereInput = {
        AND: [
            searchFilter, // Include the search filter
            type ? { type } : {}, // Filter by job type if 'type' is provided
            location ? { location } : {}, // Filter by location if 'location' is provided
            remote ? { locationType: 'Remote' } : {}, // Filter by remote jobs if 'remote' is true
            { approved: true }, // Only include approved jobs
        ],
    };

    // Fetch jobs from the database using Prisma, applying the 'where' clause and ordering by creation date in descending order
    const jobs = await prisma.job.findMany({
        where,
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div className='grow space-y-4'>
            {jobs.map((job) => (
                <JobListItem key={job.id} job={job} />
            ))}
        </div>
    );
};

export default JobResults;
