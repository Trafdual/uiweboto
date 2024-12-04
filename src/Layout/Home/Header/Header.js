import React, { useState, useEffect } from 'react';
import Login from '../../Login/Login';
import './Header.scss';
import { useLocation, useNavigate } from 'react-router-dom';




function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const user = location.state?.user;
    if (user) {
      setUserData(user);
    }
  }, [location.state]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUserData(null);
    window.location.href = '/';
  };

  const handleLoginSuccess = (user) => {
    setUserData(user);
    setIsModalOpen(false);
  };

  const handleBecomeCarOwner = () => {
    if (!userData) {
      openModal();
    } else {
      const userId = userData.user._id; 
      navigate(`/dangkychuxe`, {
        state: {
          userId,
        },
      });
    }
  };

  return (
    <div className="header-container">
      <div className="header-logo">
        <span>MIOTO</span>
      </div>
      <div className="header-links">
        <a href="/">Về Mioto</a>
        <button onClick={handleBecomeCarOwner}>Trở thành chủ xe</button>
        {!userData ? (
          <>
            <a href="/register">Đăng ký</a>
            <button className="login-button" onClick={openModal}>
              Đăng nhập
            </button>
          </>
        ) : (
          <>
            <span>Welcome, {userData.user.hovaten}</span>
            {userData.role === 'admin' && (
              <a href="/admin" className="admin-link">
                Quản lý
              </a>
            )}
            <button className="login-button" onClick={handleLogout}>
              Đăng xuất
            </button>
          </>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeModal}>
              X
            </button>
            <Login onLoginSuccess={handleLoginSuccess} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
