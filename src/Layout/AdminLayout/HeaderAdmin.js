import React from 'react'
import { useNavigate } from 'react-router-dom'
import './HeaderAdmin.scss'

const HeaderAdmin = ({ setCurrentPage }) => {
  const navigate = useNavigate() // Dùng hook để điều hướng

  const handleLogout = () => {
    localStorage.clear(); 
    navigate('/');
  };

  return (
    <header className='header'>
      <div className='logo'>HELLO ADMIN</div>
      <nav className='nav'>
      <button className='nut' onClick={() => setCurrentPage('themxe')}>
         Thêm Xe
        </button>
        <button className='nut' onClick={() => setCurrentPage('check-in')}>
          Duyệt Xe
        </button>
        <button className='nut' onClick={handleLogout}>
          Đăng xuất
        </button>
        <div className='user-info'>nhan vien 1</div>
      </nav>
    </header>
  )
}

export default HeaderAdmin
