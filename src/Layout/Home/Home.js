/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './Header/Header'
import CarRentalList from '../Home/DanhsachCar/CarRentalList'
import CarDetails from '../Home/DetailCar/DetailCar'
import DangKyChuXe from '../Home/DangKyChuXe/DangKyChuXe'

function Home () {
  const [userData, setUserData] = useState(null)
  const [selectedBlogId, setSelectedBlogId] = useState(null)

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('user'))
    if (storedUser) {
      setUserData(storedUser)
    }
  }, [sessionStorage.getItem('user')])
  console.log(userData?.user?._id)
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route
            path='/'
            element={
              !selectedBlogId ? (
                <CarRentalList onSelectBlog={id => setSelectedBlogId(id)} />
              ) : (
                <CarDetails id={selectedBlogId} userId={userData?.user?._id} />
              )
            }
          />
          <Route path='/dangkychuxe' element={<DangKyChuXe />} />
        </Routes>
      </main>
    </div>
  )
}

export default Home
