/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product } from '@/types';
import React from 'react';

export const revalidate = 60; // Revalidate every seconds
export const dynamic = 'force-static'; // Use static generation for this page
export const dynamicParams = true; // Allow on-demand generation for unknown IDs

export async function generateStaticParams() {
  const products = await fetch('https://server.aptech.io/online-shop/products').then((res) => res.json());

  if (!products || !Array.isArray(products)) {
    return [];
  }

  // Generate static paths for the first 100 products
  // This is useful for SSG (Static Site Generation) to pre-render pages
  // for known product IDs at build time, unknown IDs will be generated on-demand.
  return products.slice(0, 100).map((product: Product) => ({
    id: product.id.toString(),
  }));
}

export default async function Index({ params }: { params: Promise<{ id: number }> }) {
  const { id } = await params;
  // Fetch product details based on the ID
  const response = await fetch(`https://server.aptech.io/online-shop/products/${id}`, {
    next: {
      revalidate: 60, // Revalidate every 60 seconds
      tags: ['products-isg-all-products', `product-${id}`], // Optional: Tag for cache invalidation
    },
  });
  const product = await response.json();

  return (
    <div className='bg-white rounded-lg shadow p-6'>
      <h1 className='text-2xl font-bold text-gray-800 mb-4'>Product Details</h1>
      <p className='text-gray-600'>This is the product details page content.</p>
      <p className='text-gray-600'>Product ID: {id}</p>
      <hr className='my-4 border-gray-200 border-t' />
      <div className='text-gray-800'>
        <h2 className='text-xl font-semibold'>{product.name}</h2>
        <p className='mt-2'>{product.description}</p>
        <p className='mt-4 text-lg font-bold'>Price: ${product.price}</p>
      </div>
    </div>
  );
}
