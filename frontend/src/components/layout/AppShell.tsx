import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const AppShell = () => {
  return (
    <div className="min-h-screen bg-[#f7f7f5]">
      <Header />

      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default AppShell