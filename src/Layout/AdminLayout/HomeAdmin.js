import React, { useState } from 'react'
import HeaderNhanVien from './HeaderAdmin'

import CheckInScreen from './CheckIn'
import './HomeAdmin.scss'
import ThemXe from './ThemXe'

const HomeAdmin = () => {
  const [currentPage, setCurrentPage] = useState('dat-lich')

  const renderPageContent = () => {
    switch (currentPage) {
      case 'themxe':
        return <ThemXe />
      case 'check-in':
        return <CheckInScreen />
      default:
        return <ThemXe />
    }
  }

  return (
    <div className='booking-screen'>
      
      <HeaderNhanVien setCurrentPage={setCurrentPage} />
      <main>{renderPageContent()}</main>
    </div>
  )
}

export default HomeAdmin
