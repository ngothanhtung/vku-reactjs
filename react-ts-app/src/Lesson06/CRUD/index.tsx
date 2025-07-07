import React from 'react';
import List from './List';
import Create from './Create';

type Props = {};

export default function Customers({}: Props) {
  const [reload, setReload] = React.useState(0);

  const handleOnCreated = (customer: any) => {
    console.log('Customer created:', customer);
    // You can add logic here to refresh the list or show a success message
    setReload((prev) => prev + 1);
  };
  return (
    <div>
      <Create onCreated={handleOnCreated} />
      <List reload={reload} />
    </div>
  );
}
