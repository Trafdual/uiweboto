import React from 'react'
import { useNavigate } from 'react-router-dom'
import './HeaderAdmin.scss'

const HeaderAdmin = ({ setCurrentPage }) => {
  const navigate = useNavigate() 

  const handleLogout = () => {
    sessionStorage.clear(); 
    navigate('/');
  };

  return (
    <header className='header'>
      <div className='logo'>HELLO ADMIN</div>
      <nav className='nav'>
      <button className='nut' onClick={() => setCurrentPage('danhsachxe')}>
         Danh sách Xe
        </button>
      <button className='nut' onClick={() => setCurrentPage('themxe')}>
         Thêm Xe
        </button>
        <button className='nut' onClick={() => setCurrentPage('check-in')}>
          Duyệt Xe
        </button>
        <button className='nut' onClick={handleLogout}>
          Đăng xuất
        </button>
        
      </nav>
    </header>
  )
}

export default HeaderAdmin
