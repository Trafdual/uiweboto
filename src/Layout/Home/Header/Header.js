/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import Login from '../../Login/Login'
import './Header.scss'
import { useNavigate } from 'react-router-dom'
import ModalLichDat from './ModalLichDat'

function Header () {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalLichDat, setIsModalLichDat] = useState(false)
  const [userData, setUserData] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'))
    if (user) {
      setUserData(user)
    }
  }, [sessionStorage.getItem('user')])

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('user')
    setUserData(null)
    window.location.href = '/'
  }

  const handleLoginSuccess = user => {
    setUserData(user)
    setIsModalOpen(false)
  }

  const handleBecomeCarOwner = () => {
    if (!userData) {
      openModal()
    } else {
      const userId = userData.user._id
      navigate(`/dangkychuxe`, {
        state: {
          userId
        }
      })
    }
  }

  return (
    <div className='header-container'>
      <div className='header-logo'>
        <img src='mioto.png' alt='' />
      </div>
      <div className='header-links'>
        <a href='/'>Về Mioto</a>
        <button onClick={handleBecomeCarOwner} className='btnttchuxe'>
          Trở thành chủ xe
        </button>

        {!userData ? (
          <>
            <a href='/register'>Đăng ký</a>
            <button className='login-button' onClick={openModal}>
              Đăng nhập
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsModalLichDat(true)}
              className='login-button'
            >
              Lịch đặt
            </button>
            <span>Welcome, {userData.user.hovaten}</span>
            {userData.role === 'admin' && (
              <a href='/admin' className='admin-link'>
                Quản lý
              </a>
            )}
            <button className='login-button' onClick={handleLogout}>
              Đăng xuất
            </button>
          </>
        )}
      </div>

      {isModalOpen && (
        <div className='modal-overlay' onClick={closeModal}>
          <div className='modal-content' onClick={e => e.stopPropagation()}>
            <button className='close-modal' onClick={closeModal}>
              X
            </button>
            <Login onLoginSuccess={handleLoginSuccess} />
          </div>
        </div>
      )}
      <ModalLichDat
        isOpen={isModalLichDat}
        onClose={() => setIsModalLichDat(false)}
        userData={userData}
      />
    </div>
  )
}

export default Header
