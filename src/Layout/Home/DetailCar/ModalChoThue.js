import { useState, useEffect } from 'react'
import Modal from '../../../components/Modal/Modal'
import './ModalChoThue.scss'

function ModalChoThue ({ isOpen, onClose, idxe, nguoidat, tongtien }) {
  const [amount, setAmount] = useState(tongtien)
  const [bankCode, setBankCode] = useState('')
  const [language, setLanguage] = useState('')
  const [trangthai, setTrangthai] = useState('đặt cọc')
  const [ngaynhan, setNgaynhan] = useState('')
  const [ngaytra, setNgaytra] = useState('')
  const [soNgayThue, setSoNgayThue] = useState(0) // Số ngày thuê

  // Tính số ngày thuê khi ngaynhan hoặc ngaytra thay đổi
  useEffect(() => {
    if (ngaynhan && ngaytra) {
      const startDate = new Date(ngaynhan)
      const endDate = new Date(ngaytra)

      if (startDate <= endDate) {
        const differenceInTime = endDate - startDate
        const differenceInDays = Math.ceil(
          differenceInTime / (1000 * 60 * 60 * 24)
        )
        setSoNgayThue(differenceInDays)
      } else {
        setSoNgayThue(0)
      }
    }
  }, [ngaynhan, ngaytra])

  useEffect(() => {
    if (soNgayThue > 0) {
      if (trangthai === 'đặt cọc') {
        const tien = tongtien * soNgayThue
        const tienfull = tien - tien * 0.3
        setAmount(tienfull) // 30% của tổng tiền
      } else if (trangthai === 'thanh toán ngay') {
        const tien = tongtien * soNgayThue
        setAmount(tien) // Tổng tiền đầy đủ
      }
    }
    else{
      setAmount(0)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trangthai, tongtien,soNgayThue])

  const handelThanhToan = async () => {
    try {
      const response = await fetch(`http://localhost:8080/create_payment_url`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount,
          bankCode,
          language,
          trangthai,
          idxe,
          nguoidat,
          ngaynhan,
          ngaytra
        })
      })
      const data = await response.json()
      if (response.ok) {
        window.location.href = data
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <div className='date'>
          <div className='datecon'>
            <label htmlFor='ngaynhan'>Ngày nhận</label>
            <input
              type='date'
              id='ngaynhan'
              value={ngaynhan}
              onChange={e => setNgaynhan(e.target.value)} // Đảm bảo giá trị đúng định dạng
            />
          </div>

          <div className='datecon'>
            <label htmlFor='ngaytra'>Ngày trả</label>
            <input
              type='date'
              id='ngaytra'
              value={ngaytra}
              onChange={e => setNgaytra(e.target.value)} // Đảm bảo giá trị đúng định dạng
            />
          </div>
        </div>
        <div className='divinputthanhtoan'>
          <input
            type='text'
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder='Tổng tiền'
          />
          <div className='bankcode-select'>
            <label>Mã ngân hàng</label>
            <div>
              <input
                type='radio'
                id='vnpay'
                name='bankCode'
                value=''
                checked={bankCode === ''}
                onChange={e => setBankCode(e.target.value)}
              />
              <label htmlFor='vnpay'>Cổng thanh toán VNPAYQR</label>
            </div>
            <div>
              <input
                type='radio'
                id='vnbank'
                name='bankCode'
                value='VNBANK'
                checked={bankCode === 'VNBANK'}
                onChange={e => setBankCode(e.target.value)}
              />
              <label htmlFor='vnbank'>
                Thanh toán qua ATM-Tài khoản ngân hàng nội địa
              </label>
            </div>
            <div>
              <input
                type='radio'
                id='intcard'
                name='bankCode'
                value='INTCARD'
                checked={bankCode === 'INTCARD'}
                onChange={e => setBankCode(e.target.value)}
              />
              <label htmlFor='intcard'>Thanh toán qua thẻ quốc tế</label>
            </div>
          </div>
          <div className='language-select'>
            <label htmlFor='language'>Ngôn ngữ</label>
            <select
              id='language'
              value={language}
              onChange={e => setLanguage(e.target.value)}
            >
              <option value='vn'>Tiếng Việt</option>
              <option value='en'>English</option>
            </select>
          </div>
          <div className='language-select'>
            <label htmlFor='trangthai'>Trạng thái</label>
            <select
              id='trangthai'
              value={trangthai}
              onChange={e => setTrangthai(e.target.value)}
            >
              <option value='đặt cọc'>Đặt cọc</option>
              <option value='thanh toán ngay'>Thanh toán ngay</option>
            </select>
          </div>
        </div>
      </div>
      <div>
        <button onClick={handelThanhToan}>Thanh toán</button>
      </div>
    </Modal>
  )
}

export default ModalChoThue
