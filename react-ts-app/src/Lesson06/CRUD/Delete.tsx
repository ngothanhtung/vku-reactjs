const url = 'https://server.aptech.io/online-shop/customers';

type Props = {
  customerId: number; // ID of the customer to be deleted
  onDeleted?: (id: number) => void; // Optional callback when a customer is deleted
};

export default function Delete({ customerId, onDeleted }: Props) {
  const handleOnDelete = async (id: number) => {
    try {
      if (!confirm('Are you sure you want to delete this customer?')) {
        console.log('Delete operation cancelled');
        return; // Exit if the user cancels the operation
      }

      const response = await fetch(`${url}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Customer deleted successfully:', data);
      if (onDeleted && typeof onDeleted === 'function') {
        onDeleted(id); // Call the callback with the deleted customer's ID
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };
  return (
    <div>
      <button className='bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition-colors' onClick={() => handleOnDelete(customerId)}>
        Delete
      </button>
    </div>
  );
}
