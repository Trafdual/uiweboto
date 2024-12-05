import { useState, useEffect } from 'react'
import Modal from '../../../components/Modal/Modal'
import './ModalChoThue.scss'

function ModalChoThue ({
  isOpen,
  onClose,
  idxe,
  nguoidat,
  tongtien,
  giaotannoi,
  quangduonggiaoxe,
  phigiaoxe,
  mienphigxkm,
  giamgia
}) {
  const [amount, setAmount] = useState(tongtien)
  const [bankCode, setBankCode] = useState('')
  const [language, setLanguage] = useState('')
  const [trangthai, setTrangthai] = useState('đặt cọc')
  const [ngaynhan, setNgaynhan] = useState('')
  const [ngaytra, setNgaytra] = useState('')
  const [soNgayThue, setSoNgayThue] = useState(0)
  const [giao, setgiao] = useState(false)
  const [quangduong, setquangduong] = useState('')
  const [phigiaoxe2, setPhigiaoxe2] = useState(0)
  const [tatcatien, settatcatien] = useState(0)
  const phuphi = 20000
  const thue = 10

  useEffect(() => {
    if (quangduonggiaoxe > 0 && phigiaoxe > 0 && mienphigxkm > 0) {
      if (quangduong <= mienphigxkm) {
        setPhigiaoxe2(0)
      } else if (quangduong > mienphigxkm) {
        setPhigiaoxe2(quangduong * phigiaoxe)
      }
    }
  }, [quangduong, quangduonggiaoxe, phigiaoxe, mienphigxkm])

  const handleQuangDuongChange = e => {
    const value = e.target.value
    const quangduongValue = value === '' ? 0 : parseFloat(value)

    if (quangduongValue <= quangduonggiaoxe) {
      setquangduong(value) // Cập nhật giá trị quangduong nếu nó hợp lệ
    } else {
      if (value !== '') {
        alert(`Quảng đường không được lớn hơn ${quangduonggiaoxe} km`)
      }
    }
  }

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
    } else {
      setAmount(0)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trangthai, tongtien, soNgayThue])

  useEffect(() => {
    const tattien =
      amount - (amount * (giamgia + thue)) / 100 + phuphi + phigiaoxe2
    settatcatien(tattien)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, phigiaoxe2])
  const handelThanhToan = async () => {
    try {
      const response = await fetch(`http://localhost:8080/create_payment_url`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount:tatcatien,
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
          <div className='divinputtongtien'>
            <label htmlFor='tongtien'>Tổng tiền còn lại sau cọc</label>
            <input
              type='text'
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder='Tổng tiền'
              id='tongtien'
            />
          </div>

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
              <option value='đặt cọc'>Đặt cọc 30%</option>
              <option value='thanh toán ngay'>Thanh toán ngay</option>
            </select>
          </div>
          {giaotannoi && (
            <>
              <div>
                <input
                  type='radio'
                  checked={giao === true}
                  onClick={() => setgiao(!giao)}
                />
                <label>Giao tận nơi</label>
              </div>
              {giao && (
                <div className='chiphigiaoxe'>
                  <label htmlFor=''>{`Quãng đường giao xe (km)`}</label>
                  <input
                    type='text'
                    placeholder='Nhập quãng đường giao xe'
                    value={quangduong}
                    onChange={handleQuangDuongChange}
                  />
                  <h4>{`Phí giao xe ${phigiaoxe2} VNĐ`}</h4>
                </div>
              )}
            </>
          )}
          <div className='phuphi'>
            <h4>Giảm giá: {giamgia}%</h4>
            <h4>Phụ phí:{phuphi.toLocaleString()} VNĐ </h4>
            <h4>Thuế: {thue.toLocaleString()}%</h4>
          </div>
          <br />
          <div>
            <h2>Tổng tiền: {tatcatien.toLocaleString()} VNĐ</h2>
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
