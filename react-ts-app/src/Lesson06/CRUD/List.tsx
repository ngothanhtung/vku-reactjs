/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import Delete from './Delete';
import Update from './Update';

const url = 'https://server.aptech.io/online-shop/customers';

type Customer = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  birthday: string;
  // Add other fields if needed
};

type Props = {
  reload?: number; // Optional prop to trigger reload

  deleteComponent?: React.ComponentType<{ customerId: number; onDeleted: (id: number) => void }>;
  updateComponent?: React.ComponentType<{
    customerId: number;
    onUpdated: (customer: any) => void;
    onClose: () => void;
  }>;
};
export default function List({ reload = 0 }: Props) {
  const [selectedCustomer, setSelectedCustomer] = React.useState<Customer | null>(null);
  const [customers, setCustomers] = React.useState<Customer[]>([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCustomers(data);
        setLoading(false);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [reload]);

  const handleOnSelect = (customer: any) => {
    setSelectedCustomer(customer);
  };

  const handleOnUpdated = (customer: any) => {
    setCustomers((prev) => prev.map((c: any) => (c.id === customer.id ? customer : c)));
    // Close the update form after updating
    setSelectedCustomer(null);
  };

  return (
    <div className='container mx-auto bg-white rounded shadow mb-4 p-4'>
      {loading && <p>Loading...</p>}
      <table className='table-auto w-full border-collapse border border-gray-200 table-hover'>
        <thead>
          <tr>
            <th className='border border-gray-300 p-2'>ID</th>
            <th className='border border-gray-300 p-2'>Name</th>
            <th className='border border-gray-300 p-2'>Email</th>
            <th className='border border-gray-300 p-2'>Phone</th>
            <th className='border border-gray-300 p-2'>Address</th>
            <th className='border border-gray-300 p-2'>Birthday</th>
            <th className='border border-gray-300 p-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers?.map((customer: any, index) => {
            return (
              <tr key={index} className='hover:bg-gray-200'>
                <td className='border border-gray-300 p-2 text-right'>{customer.id}</td>
                <td className='border border-gray-300 p-2 font-bold'>{customer.firstName + ' ' + customer.lastName}</td>
                <td className='border border-gray-300 p-2'>{customer.email}</td>
                <td className='border border-gray-300 p-2'>{customer.phoneNumber}</td>
                <td className='border border-gray-300 p-2 whitespace-nowrap'>{customer.address}</td>
                <td className='border border-gray-300 p-2 whitespace-nowrap'>{customer.birthday}</td>
                <td className='w-1 border border-gray-300 p-2 whitespace-nowrap'>
                  <div className='flex justify-end'>
                    <button onClick={() => handleOnSelect(customer)} className='bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 transition-colors mr-2'>
                      Edit
                    </button>
                    <Delete
                      customerId={customer.id}
                      onDeleted={(id) => {
                        setCustomers((prev) => prev.filter((customer: any) => customer.id !== id));
                      }}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {selectedCustomer && <Update customerId={selectedCustomer.id} onUpdated={handleOnUpdated} onClose={() => setSelectedCustomer(null)} />}
    </div>
  );
}
