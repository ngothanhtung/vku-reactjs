import React from 'react';
import { createBrowserRouter, RouterProvider, Form, redirect } from 'react-router';

function About() {
  return <h2>About Page</h2>;
}

function SubmitSuccess() {
  return <h2>Form submitted successfully!</h2>;
}

function NotFound() {
  return <h2>404 Not Found</h2>;
}
const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/submit-success', element: <SubmitSuccess /> },
  {
    path: '/submit',
    action: async ({ request }) => {
      const formData = await request.formData();
      const data = Object.fromEntries(formData);
      console.log('Form submitted:', data);
      return redirect('/submit-success');
    },
  },
  { path: '*', element: <NotFound /> },
]);

function Home() {
  return (
    <Form method='post' action='/submit'>
      <input type='text' name='name' placeholder='Your Name' required />
      <input type='email' name='email' placeholder='Your Email' required />
      <button type='submit'>Submit</button>
    </Form>
  );
}

export default function ActionsForFormSubmission() {
  return <RouterProvider router={router} />;
}
