// import React from 'react'

import Header from '@/components/header'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div>
      <div className="grid-background"></div>
      <main className="min-h-screen container mx-auto p-4">
        <Header />
      <Outlet />  
      </main>
      {/* <div className='p-10 text-center bg-gray-600 mt-10 text-white  '>Great companies are built with great people.❤️
        

      </div> */}
      <div className='p-5 text-center bg-gray-900 mt-10 text-white'>
  "Great companies are built with great people."
  <div className="flex justify-end mt-2 text-right">
    <p className="text-sm">
      -AV
    </p>
  </div>
</div>

    </div>
  )
}

export default AppLayout
