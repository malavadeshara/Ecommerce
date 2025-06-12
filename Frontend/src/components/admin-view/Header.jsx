import React from 'react'
import { AlignJustify, LogOut } from 'lucide-react';
import { Button } from '../ui/button';

const AdminHeader = ({ setOpen }) => {
  return (
    <header className='flex items-center justify-between px-4 py-3 border-b bg-gray-50 border-gray-200'>
      <Button onClick={() => setOpen(true)} className='lg:hidden sm:block'>
        <AlignJustify />
        <span className='sr-only'>Toggel Menu</span>
      </Button>

      <div className='flex flex-1 justify-end'>
        <Button className='inline-flex gap-2 item-center rounded-md px-4 py-2 text-sm bg-black text-gray-50 font-medium shadow'>
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  )
}

export default AdminHeader