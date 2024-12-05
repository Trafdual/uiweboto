/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import '../Home/DangKyChuXe/DangKyChuXe.scss'
import axios from 'axios'
function ThemXe () {
  const [userId, setUserId] = useState(null)

  const [formData, setFormData] = useState({
    bienso: '',
    hangxe: '',
    mauxe: '',
    soghe: '',
    namsanxuat: '',
    truyendong: '',
    loainhienlieu: '',
    muctieuthunl: '',
    loaixe: '',
    mota: '',
    tinhnang: '',
    giachothue: '',
    giamgia: '',
    diachixe: '',
    giaotannoi: false,
    quangduonggiaoxe: '',
    phigiaoxe: '',
    mienphigxkm: '',
    gioihan: false,
    sokmtrongngay: '',
    phivuotgh: '',
    dieukhoan: '',
    image: null
  })
  console.log(userId)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  useEffect(() => {
    const storedUserId = JSON.parse(sessionStorage.getItem('user'))

    if (storedUserId) {
      setUserId(storedUserId)
      console.log(storedUserId)

    } else {
      setError('Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.')
    }
  }, [sessionStorage.getItem('user')])

  const handleInputChange = e => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleFileChange = event => {
    const files = Array.from(event.target.files) // Chuyển FileList thành mảng
    setFormData({
      ...formData,
      image: files // Lưu danh sách các file trong state
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!userId) {
      setError('Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.')
      return
    }

    const data = new FormData()

    // Thêm tất cả các trường khác vào FormData
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        if (key === 'image') {
          // Đảm bảo thêm từng hình ảnh vào FormData
          formData.image.forEach(image => {
            data.append('image', image)
          })
        } else {
          // Thêm các trường khác vào FormData
          data.append(key, formData[key])
        }
      }
    }

    try {
      await axios.post(
        `http://localhost:8080/postxe/${userId.user._id}`,
        data,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      )
      setSuccess('Đăng ký chủ xe thành công!')
      setError('')
    } catch (err) {
      setError('Đăng ký thất bại, vui lòng thử lại.')
      setSuccess('')
    }
  }

  return (
    <div className='dangkychuxe-container'>
      {error && <div className='error-message'>{error}</div>}
      {success && <div className='success-message'>{success}</div>}
      <form className='dangkychuxe-form' onSubmit={handleSubmit}>
        <h1 style={{ textAlign: 'center' }}>Đăng Ký Chủ Xe</h1>
        <div className='form-row'>
          <label>
            Biển số:
            <input
              type='text'
              name='bienso'
              value={formData.bienso}
              onChange={handleInputChange}
              required
            />
          </label>

          <label>
            Hãng xe:
            <input
              type='text'
              name='hangxe'
              value={formData.hangxe}
              onChange={handleInputChange}
              required
            />
          </label>

          <label>
            Mẫu xe:
            <input
              type='text'
              name='mauxe'
              value={formData.mauxe}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Loại xe:
            <select
              name='loaixe'
              value={formData.loaixe}
              onChange={handleInputChange}
              required
            >
              <option value=''>Chọn Loại Xe</option>
              <option value='xe tự lái'>Xe Tự Lái</option>
              <option value='xe có người lái'>Xe Có Người Lái</option>
            </select>
          </label>
        </div>
        <div className='form-row'>
          <label>
            Số ghế:
            <input
              type='number'
              name='soghe'
              value={formData.soghe}
              onChange={handleInputChange}
              required
            />
          </label>

          <label>
            Năm sản xuất:
            <input
              type='number'
              name='namsanxuat'
              value={formData.namsanxuat}
              onChange={handleInputChange}
              required
            />
          </label>

          <label>
            Truyền động:
            <select
              name='truyendong'
              value={formData.truyendong}
              onChange={handleInputChange}
              required
            >
              <option value=''>Chọn truyền động</option>
              <option value='Số tự động'>Số tự động</option>
              <option value='Số sàn'>Số sàn</option>
            </select>
          </label>
        </div>
        <div className='form-row'>
          <label>
            Loại nhiên liệu:
            <select
              name='loainhienlieu'
              value={formData.loainhienlieu}
              onChange={handleInputChange}
              required
            >
              <option value=''>Chọn loại nhiên liệu</option>
              <option value='Xăng'>Xăng</option>
              <option value='Dầu'>Dầu</option>
              <option value='Điện'>Điện</option>
            </select>
          </label>

          <label>
            Mức tiêu thụ nhiên liệu (L/100km):
            <input
              type='number'
              step='0.1'
              name='muctieuthunl'
              value={formData.muctieuthunl}
              onChange={handleInputChange}
              required
            />
          </label>

          <label>
            Mô tả:
            <textarea
              name='mota'
              value={formData.mota}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div className='form-row'>
          <label>
            Tính năng:
            <textarea
              name='tinhnang'
              value={formData.tinhnang}
              onChange={handleInputChange}
              required
            />
          </label>

          <label>
            Giá cho thuê:
            <input
              type='number'
              name='giachothue'
              value={formData.giachothue}
              onChange={handleInputChange}
              required
            />
          </label>

          <label>
            Giảm giá (%):
            <input
              type='number'
              step='1'
              name='giamgia'
              value={formData.giamgia}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div className='form-row'>
          <label>
            Địa chỉ xe:
            <input
              type='text'
              name='diachixe'
              value={formData.diachixe}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Giao tận nơi:
            <input
              type='checkbox'
              name='giaotannoi'
              checked={formData.giaotannoi}
              onChange={handleInputChange}
            />
          </label>{' '}
        </div>
        <div className='form-row'>
          {formData.giaotannoi && (
            <>
              <label>
                Quãng đường giao xe (km):
                <input
                  type='number'
                  name='quangduonggiaoxe'
                  value={formData.quangduonggiaoxe}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label>
                Phí giao xe:
                <input
                  type='number'
                  name='phigiaoxe'
                  value={formData.phigiaoxe}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Miễn phí giao xe (km):
                <input
                  type='number'
                  name='mienphigxkm'
                  value={formData.mienphigxkm}
                  onChange={handleInputChange}
                />
              </label>
            </>
          )}
        </div>
        <div className='form-row'>
          <label>
            Giới hạn:
            <input
              type='checkbox'
              name='gioihan'
              checked={formData.gioihan}
              onChange={handleInputChange}
            />
          </label>
          {formData.gioihan && (
            <>
              <label>
                Số km trong ngày:
                <input
                  type='number'
                  name='sokmtrongngay'
                  value={formData.sokmtrongngay}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Phí vượt giới hạn:
                <input
                  type='number'
                  name='phivuotgh'
                  value={formData.phivuotgh}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </>
          )}
        </div>
        <label>
          Điều khoản:
          <textarea
            name='dieukhoan'
            value={formData.dieukhoan}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Hình ảnh xe:
          <input
            type='file'
            name='image'
            onChange={handleFileChange}
            accept='image/*'
            multiple
            required
          />
        </label>

        <button type='submit'>Đăng ký</button>
      </form>
    </div>
  )
}

export default ThemXe
