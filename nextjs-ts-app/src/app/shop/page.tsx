/* eslint-disable @typescript-eslint/no-explicit-any */
import AddToCart from '@/components/AddToCart';
import Image from 'next/image';
import React from 'react';

// Server side rendering
export default async function Shop() {
  const products = await fetch('https://server.aptech.io/online-shop/products');
  const data = await products.json();

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
      {data.map((product: any) => {
        // Find a image having isCover = true
        let coverImage = 'placeholder.jpg'; // Fallback image if no images are available
        if (product.images && product.images.length > 0) {
          const cover = product.images.find((image: any) => image.isCover);
          coverImage = cover ? cover.imageUrl : product.images[0].imageUrl; // Use the first image if no cover image is found
        }

        return (
          <div key={product.id} className='border rounded-lg p-4'>
            <Image src={'https://server.aptech.io/' + coverImage} alt={product.title} className='w-full h-64 object-cover mb-4 rounded' width={300} height={300} />
            <h2 className='text-xl font-semibold'>
              {product.id}. {product.name}
            </h2>
            <p className='text-gray-600'>Price: ${product.price}</p>
            <p className='text-gray-600'>Discount: {product.discount}%</p>
            <p className='text-gray-600'>Stock: {product.stock}</p>
            <div>
              <AddToCart product={product} quantity={1} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
