import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className='max-w-5xl mx-auto flex gap-1'>
      <Button>Login</Button>
      {/* <button className='py-1 px-3 bg-indigo-600 text-white rounded border border-indigo-600'>Default</button>
      <button className='py-1 px-3 bg-indigo-600 text-white rounded border border-indigo-600'>Default</button>
      <button className='py-1 px-3 bg-white text-indigo-600 rounded border border-indigo-600'>Outline</button> */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant='outline'>Open Alert Dialog</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
