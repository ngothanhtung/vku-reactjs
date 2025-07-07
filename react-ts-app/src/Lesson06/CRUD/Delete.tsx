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
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0dW5nbnRAc29mdGVjaC52biIsImVtYWlsIjoidHVuZ250QHNvZnRlY2gudm4iLCJzdWIiOjEsImFwcGxpY2F0aW9uIjoiT25saW5lIFNob3AgLSBBUEkiLCJyb2xlcyI6W3siaWQiOjEsIm5hbWUiOiJBZG1pbmlzdHJhdG9ycyJ9LHsiaWQiOjIsIm5hbWUiOiJNYW5hZ2VycyJ9XSwiaWF0IjoxNzUxODYyNjI1LCJleHAiOjE3ODM0MjAyMjV9.IdQYdVwk1MC6HDZ0KcALJ7S1asehEWygJ8xbZXURC4E',
        },
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
