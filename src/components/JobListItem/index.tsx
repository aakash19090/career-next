import Image from 'next/image';

import CompanyLogoPlaceholder from '@/assets/Company Logo Placeholder.png';
import { Job } from '@prisma/client';
import { Banknote, Briefcase, Clock, Globe2, MapPin } from 'lucide-react';

import Badge from '@/components/Badge';

import { formatCurrency, showDistanceToNow } from '@/lib/utils';

interface JobListItemProps {
    job: Job;
}

const JobListItem = ({
    job: { title, companyName, type, locationType, location, salary, companyLogoUrl, createdAt },
}: JobListItemProps) => {
    return (
        <article className='flex gap-3 rounded-lg border p-5 hover:bg-muted/60'>
            <Image
                src={CompanyLogoPlaceholder}
                alt='Company logo'
                height={100}
                width={100}
                className='self-center rounded-lg'
            />

            <div className='flex-grow space-y-3'>
                <div>
                    <h2 className='text-xl font-medium'>{title}</h2>
                    <p className='text-muted-foreground'>{companyName}</p>
                </div>

                <div className='text-muted-foreground'>
                    <p className='flex items-center gap-1.5 sm:hidden'>
                        <Briefcase size={16} className='shrink-0' /> {type}
                    </p>

                    <p className='flex items-center gap-1.5'>
                        <MapPin size={16} className='shrink-0' /> {locationType}
                    </p>

                    <p className='flex items-center gap-1.5'>
                        <Globe2 size={16} className='shrink-0' /> {location || 'Worldwide'}
                    </p>

                    <p className='flex items-center gap-1.5'>
                        <Banknote size={16} className='shrink-0' /> {formatCurrency(salary)}
                    </p>

                    <p className='flex items-center gap-1.5 sm:hidden'>
                        <Briefcase size={16} className='shrink-0' /> {showDistanceToNow(createdAt)}
                    </p>
                </div>
            </div>

            <div className='hidden shrink-0 flex-col items-end justify-between sm:flex'>
                <Badge>{type}</Badge>
                <span className='flex items-center gap-1.5 text-muted-foreground'>
                    <Clock size={16} />
                    {showDistanceToNow(createdAt)}
                </span>
            </div>
        </article>
    );
};

export default JobListItem;
