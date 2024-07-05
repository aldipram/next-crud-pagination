import ContactTable from '@/components/ContactTable'
import Pagination from '@/components/Pagination';
import Search from '@/components/Search'
import { TableSkeleton } from '@/components/Skeleton';
import { CreateButton } from '@/components/ui/Button'
import { getContactPages } from '@/lib/data';
import { Suspense } from 'react';

const Contacts = async ({ searchParams } : { searchParams: { query?: string, page?: string }}) => {

  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getContactPages(query);

  return (
    <div className='max-w-screen-md mx-auto mt-5'>
        <div className="flex items-center justify-between gap-1 mb-5">
            <Search />
            <CreateButton/>
        </div>
        <Suspense key={query + currentPage} fallback={<TableSkeleton />}>
            <ContactTable query={query} currentPage={currentPage} />
        </Suspense>
        <div className="flex justify-center mt-4">
            <Pagination totalPages={totalPages} />  
        </div>
    </div>
  )
}

export default Contacts