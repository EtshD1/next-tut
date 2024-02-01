import {
  fetchInvoiceById,
  fetchCustomers,
  fetchCustomerById,
} from '@/app/lib/data';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import Form from '@/app/ui/invoices/edit-form';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

const Page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
};

export default Page;

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const id = params.id;
  const invoice = await fetchInvoiceById(id);
  const customer = invoice
    ? await fetchCustomerById(invoice.customer_id)
    : undefined;

  if (customer)
    return {
      title: `Edit ${customer.name}'s Invoice`,
    };

  return {
    title: 'Edit Invoice',
  };
}
