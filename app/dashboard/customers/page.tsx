import Search from '@/app/ui/search';
import Table from '@/app/ui/customers/table';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { fetchCustomers, fetchFilteredCustomers } from '@/app/lib/data';
import { Metadata } from 'next';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const customers = await fetchFilteredCustomers(query);

  return (
    <div className="w-full">
      <Table customers={customers} />
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Customers',
};
