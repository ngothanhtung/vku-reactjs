'use client'
import { signOut } from 'next-auth/react'

const LogoutButton = () => {
  return (
    <button onClick={()=>{
      signOut()
    }}>Đăng xuất</button>
  )
}

export default LogoutButton