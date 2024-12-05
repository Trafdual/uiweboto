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
      setData(response.data)
    } catch (error) {
      console.error('Error fetching data', error)
    }
  }
  useEffect(()=>{
    fetchLichDat()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[userId])

  return (
    <ModalBig isOpen={isOpen} onClose={onClose}>
      <div>
        <h2>Danh sách lịch đặt</h2>
        <table
          border='1'
          className='custom-table'
        >
          <thead>
            <tr>
              <th>STT</th>
              <th>Ngày nhận</th>
              <th>Ngày trả</th>
              <th>Biển số</th>
              <th>Chủ xe</th>
              <th>Đã thanh toán</th>
              <th>Chưa thanh toán</th>
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
                  <td>{item.dathanhtoan}</td>
                  <td>{item.chuathanhtoan}</td>
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
