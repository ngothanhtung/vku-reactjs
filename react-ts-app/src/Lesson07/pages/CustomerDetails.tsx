import React, { useEffect } from 'react';
import { useParams } from 'react-router';

export default function CustomerDetails() {
  const [customer, setCustomer] = React.useState<any>(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await fetch(`https://server.aptech.io/online-shop/customers/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCustomer(data);
      } catch (error) {
        console.error('Error fetching customer details:', error);
      }
    };

    fetchCustomerDetails();
  }, [id]);

  return (
    <div>
      <h1>Customer Details for ID: {id}</h1>
      {/* Build a readonly form to display customer details here (tailwindcss). */}
      <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='firstName'>
            First Name
          </label>
          <input value={customer?.firstName || ''} type='text' id='firstName' name='firstName' readOnly className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='lastName'>
            Last Name
          </label>
          <input value={customer?.lastName || ''} type='text' id='lastName' name='lastName' readOnly className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
        </div>
        {/* Email */}
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
            Email
          </label>
          <input value={customer?.email || ''} type='email' id='email' name='email' readOnly className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
        </div>
        {/* Phone Number */}
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='phoneNumber'>
            Phone Number
          </label>
          <input value={customer?.phoneNumber || ''} type='text' id='phoneNumber' name='phoneNumber' readOnly className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
        </div>
        {/* Address */}
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='address'>
            Address
          </label>
          <input value={customer?.address || ''} type='text' id='address' name='address' readOnly className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
        </div>
        {/* Birthday */}
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='birthday'>
            Birthday
          </label>
          <input value={customer?.birthday || ''} type='date' id='birthday' name='birthday' readOnly className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
        </div>
      </form>
    </div>
  );
}
