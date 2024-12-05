/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react'
import './DetailCar.scss'
import ModalChoThue from './ModalChoThue'
function CarDetails ({ id, userId }) {
  const [isModalChothue, setIsModalChothue] = useState(false)
  const [carDetails, setCarDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  console.log(userId)
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/getchitietxechothue/${id}`
        )
        if (response.ok) {
          const data = await response.json()
          setCarDetails(data)
        } else {
          console.error('Failed to fetch car details')
        }
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCarDetails()
  }, [id])

  if (loading) return <div>Loading...</div>

  if (!carDetails) return <div>Car details not found</div>

  return (
    <div className='car-details'>
      <div className='car-header'>
        <h1 className='car-title'>
          {carDetails.hangxe} {carDetails.mauxe} {carDetails.namsanxuat}
        </h1>
        <div className='car-images'>
          {carDetails.image.map((imgSrc, index) => (
            <img
              key={index}
              src={imgSrc}
              alt={`Car image ${index + 1}`}
              className='car-image'
            />
          ))}
        </div>
      </div>

      <div className='car-info'>
        <h2>Thông tin xe</h2>
        <div className='info-grid'>
          <div>
            <strong>Biển số:</strong> {carDetails.bienso}
          </div>
          <div>
            <strong>Số ghế:</strong> {carDetails.soghe}
          </div>
          <div>
            <strong>Truyền động:</strong> {carDetails.truyendong}
          </div>
          <div>
            <strong>Loại nhiên liệu:</strong> {carDetails.loainhienlieu}
          </div>
          <div>
            <strong>Mức tiêu thụ nhiên liệu:</strong> {carDetails.muctieuthunl}{' '}
            L/100km
          </div>
          <div>
            <strong>Mô tả:</strong> {carDetails.mota}
          </div>
          <div>
            <strong>Tính năng:</strong> {carDetails.tinhnang.join(', ')}
          </div>
        </div>
      </div>

      <div className='rental-info'>
        <h2>Giá cho thuê</h2>
        <p className='price'>
          Giá: {carDetails.giachothue.toLocaleString()} VNĐ/ngày
        </p>
        <p>
          <strong>Địa chỉ xe:</strong> {carDetails.diachixe}
        </p>
        <p>
          <strong>Chủ xe:</strong> {carDetails.chuxe.hovaten}
        </p>
        <p>
          <strong>Điện thoại:</strong> {carDetails.chuxe.phone}
        </p>
        <p>
          <strong>Email:</strong> {carDetails.chuxe.email}
        </p>
      </div>

      <div className='insurance-options'>
        <h2>Bảo hiểm thuê xe</h2>
        <p>Bảo hiểm cơ bản: 2,000,000 VNĐ</p>
        <p>Bảo hiểm người trên xe: 45,000 VNĐ/ngày</p>
      </div>

      <div className='payment-summary'>
        <h2>Tóm tắt chi phí</h2>
        <p>
          <strong>Giảm giá:</strong> 0 VNĐ
        </p>
        <p>
          <strong>Tổng công:</strong> {carDetails.giachothue.toLocaleString()}{' '}
          VNĐ
        </p>
        <button
          className='rent-button'
          onClick={() => {
            if (userId) {
              setIsModalChothue(true)
            } else {
              alert('Vui lòng đăng nhập để đặt hàng')
            }
          }}
        >
          Chọn thuê
        </button>
      </div>

      <ModalChoThue
        idxe={id}
        nguoidat={userId}
        isOpen={isModalChothue}
        onClose={() => setIsModalChothue(false)}
        tongtien={carDetails.giachothue}
      />
    </div>
  )
}

export default CarDetails
