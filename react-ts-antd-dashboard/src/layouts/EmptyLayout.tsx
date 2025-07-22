import { Outlet } from 'react-router'

const EmptyLayout = () => {
  return (
    <main className='empty-layout'>
    <Outlet />
    </main>
  )
}

export default EmptyLayout