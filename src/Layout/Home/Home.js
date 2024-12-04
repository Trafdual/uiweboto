import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Header/Header';
import CarRentalList from '../Home/DanhsachCar/CarRentalList';
import CarDetails from '../Home/DetailCar/DetailCar';
import DangKyChuXe from '../Home/DangKyChuXe/DangKyChuXe'; 

function Home() {
  const [userData, setUserData] = useState(null);
  const [selectedBlogId, setSelectedBlogId] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('userId'));
    if (storedUser) {
      setUserData(storedUser);
    }
  }, []);

  return (
    <div>
      <Header
        userRole={userData?.role || null}
        userName={userData?.user?.hovaten || ''}
      />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              !selectedBlogId ? (
                <CarRentalList onSelectBlog={(id) => setSelectedBlogId(id)} />
              ) : (
                <CarDetails id={selectedBlogId} useId={userData?.user?._id}/>
              )
            }
          />
          <Route path="/dangkychuxe" element={<DangKyChuXe />} /> 
        </Routes>
      </main>
    </div>
  );
}

export default Home;
