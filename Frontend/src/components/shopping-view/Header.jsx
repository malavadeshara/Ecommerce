import React from 'react'
import { House, LogOut, Menu, ShoppingCart, UserCog } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { shoppingViewHeaderMenuItems } from '@/config';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '../ui/dropdown-menu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Avatar } from '../ui/avatar';
import { AvatarFallback } from '@radix-ui/react-avatar';
import { logoutUser } from '@/store/auth-slice';

function MenuItems() {
  return <nav className='flex flex-col mb-3 lg:mb- lg:items-center gap-6 lg:flex-row'>
    {
      shoppingViewHeaderMenuItems.map(menuItem =>
        <Link to={menuItem.path} key={menuItem.id} className='text-sm font-medium'>{menuItem.label}</Link>
      )
    }
  </nav>
}

function HeaderRightContent() {

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <div className='flex lg:items-center lg:flex-row flex-col gap-4'>
      <Button variant='outline' size='icon'>
        <ShoppingCart className='h-6 w-6' />
        <span className='sr-only'>User Cart</span>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className='cursor-pointer'>
            <AvatarFallback className='w-full h-full bg-black text-gray-50 flex items-center justify-center font-bold'>
              {user.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent side='right' className='w-56'>
          <DropdownMenuLabel>
            Logged in as {user?.userName}
          </DropdownMenuLabel>

          <DropdownMenuSeparator className='bg-gray-300' />
          <DropdownMenuItem className='cursor-pointer' onClick={() => navigate('/shop/account')}>
            <UserCog className='mr-2 h-4 w-4' />
            <span>Account</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator className='bg-gray-300' />
          <DropdownMenuItem className='cursor-pointer' onClick={handleLogout}>
            <LogOut className='mr-2 h-4 w-4' />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

const ShoppingHeader = () => {

  const { isAuthenticated } = useSelector(state => state.auth);

  return (
    <header className='sticky top-0 z-40 w-full border-b bg-white'>
      <div className='flex h-16 items-center justify-between px-4 md:px-6'>
        <Link className='flex items-center gap-2' to='/shop/home'>
          <House className='h-6 w-6' />
          <span className='font-bold'>Ecommerce</span>
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant='outline' size='icon' className='lg:hidden'>
              <Menu className='h-6 w-6' />
              <span className='sr-only'>Toogle header menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent side='left' className='w-full max-w-xs p-10'>
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>

        <div className='hidden lg:block'>
          <MenuItems />
        </div>
        <div className='hidden lg:block'>
          <HeaderRightContent />
        </div>
      </div>

    </header>
  )
}

export default ShoppingHeader