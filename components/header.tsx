'use client';
import { useRootState } from '@/state/RootProvider';
import React from 'react'
import { LogoutBtn } from './logout';

function Header() {
const {user}=useRootState();
  console.log(user);
  return (
    <header className='h-12 max-w-screen flex justify-end items-center px-10 py-2'>
        <LogoutBtn/>
    </header>
  )
}

export default Header