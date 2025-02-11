import { useEffect, useState } from 'react'
import ModalBig from '../../../components/ModalBig/ModalBig'
import './ModalLichDat.scss'

function ModalLichDat ({ isOpen, onClose, userData }) {
  const [data, setData] = useState([])
  const userId = userData?.user?._id
  const fetchLichDat = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/getlichdadat/${userId}`
      )
      const data = await response.json()
      setData(data)
    } catch (error) {
      console.error('Error fetching data', error)
    }
  }
  useEffect(() => {
    if (userId) {
      fetchLichDat()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  return (
    <ModalBig isOpen={isOpen} onClose={onClose}>
      <div>
        <h2>Danh sách lịch đặt</h2>
        <table border='1' className='custom-table'>
          <thead>
            <tr>
              <th>STT</th>
              <th>Ngày nhận</th>
              <th>Ngày trả</th>
              <th>Biển số</th>
              <th>Chủ xe</th>
              <th>Tổng tiền</th>
              <th>Tiền cọc</th>
              <th>Còn lại</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.ngaynhan}</td>
                  <td>{item.ngaytra}</td>
                  <td>{item.bienso}</td>
                  <td>{item.chuxe}</td>
                  <td>{item.tongtien.toLocaleString()} VNĐ</td>
                  <td>{item.tiencoc.toLocaleString()} VNĐ</td>
                  <td>{item.phaitra.toLocaleString()} VNĐ</td>
                  <td>{item.trangthai}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='8' style={{ textAlign: 'center' }}>
                  Không có dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </ModalBig>
  )
}

export default ModalLichDat
