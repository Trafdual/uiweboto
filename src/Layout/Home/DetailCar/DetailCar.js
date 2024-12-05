/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react'
import './DetailCar.scss'
import ModalChoThue from './ModalChoThue'
function CarDetails({ id, userId }) {
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
      <h1 className='car-title'>
        {carDetails.hangxe} {carDetails.mauxe} {carDetails.namsanxuat}
      </h1>
      <p className="car-location">📍 {carDetails.diachixe}</p>
      <div className='car-theloai-chitiet'>
        <div className="car-theloai1-chitiet">{carDetails.truyendong}</div>      <div className="car-theloai2-chitiet">{carDetails.loaixe}</div>
        {carDetails.giaotannoi && (
          <div className="car-theloai1-chitiet">Giao tận nơi</div>
        )}
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
            <strong>Tính năng:</strong> {carDetails.tinhnang.join(', ')}
          </div>
        </div>
      </div>
      <div className='car-info'><div>
            <strong>Mô tả:</strong> {carDetails.mota}
          </div></div>
      <div className="rental-documents-container">
      <div className="section">
        <h3 className="section-title">
          Giấy tờ thuê xe <span className="tooltip">?</span>
        </h3>
        <div className="section-content">
          <p className="note">
            <i className="info-icon">ℹ️</i> Chọn 1 trong 2 hình thức
          </p>
          <div className="option">
            <i className="document-icon">📄</i>
            <span>GPLX (đối chiếu) & Passport (giữ lại)</span>
          </div>
          <div className="option">
            <i className="document-icon">📄</i>
            <span>GPLX (đối chiếu) & CCCD (đối chiếu VNeID)</span>
          </div>
        </div>
      </div>
      <div className="section">
        <h3 className="section-title">
          Tài sản thế chấp <span className="tooltip">?</span>
        </h3>
        <div className="section-content">
          <p>Không yêu cầu khách thuê thế chấp Tiền mặt hoặc Xe máy</p>
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
          <strong>Giảm giá:</strong> {carDetails.giamgia}%
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
        giaotannoi={carDetails.giaotannoi}
        quangduonggiaoxe={carDetails.quangduonggiaoxe}
        phigiaoxe={carDetails.phigiaoxe}
        mienphigxkm={carDetails.mienphigxkm}
        giamgia={carDetails.giamgia}
      />
    </div>
  )
}

export default CarDetails
