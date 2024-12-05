import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DanhSachXe.scss';

const DanhSachXe = () => {
  const [sanList, setSanList] = useState([]);  // List of available vehicles
  const [checkinList, setCheckinList] = useState([]);  // List of checked-in vehicles
  const [modalVisible, setModalVisible] = useState(false);

  // Fetch list of available vehicles
  useEffect(() => {
    fetchSanList();
  }, []);

  const fetchSanList = async () => {
    try {
      const response = await axios.get('http://localhost:8080/getxechothue');
      setSanList(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Handle check-in action
  const handleCheckIn = async (id) => {
    try {
      await axios.post(`http://localhost:8080/deletexechothue/${id}`);
      setModalVisible(true); // Show success modal
      fetchSanList(); // Refresh list after check-in
    } catch (error) {
      console.error('Error during check-in:', error);
    }
  };

  return (
    <div className="checkin-screen">
      <h2>Danh Sách Xe Cho Thuê</h2>
      <table className="checkin-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Biển Số</th>
            <th>Hãng Xe</th>
            <th>Màu Xe</th>
            <th>Loại Xe</th>
            <th>Năm Sản Xuất</th>
            <th>Địa Chỉ Xe</th>
            <th>Giá Cho Thuê</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {sanList.length > 0 ? (
            sanList.map((item, index) => (
              <tr key={item._id || index}>
                <td>{index + 1}</td>
                <td>{item.bienso}</td>
                <td>{item.hangxe}</td>
                <td>{item.mauxe}</td>
                <td>{item.loaixe}</td>
                <td>{item.namsanxuat}</td>
                <td>{item.diachixe}</td>
                <td>
                  {item.giachothue
                    ? item.giachothue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                    : 'Chưa có dữ liệu'}
                </td>
                <td>
                  <button onClick={() => handleCheckIn(item._id)} className="btn-checkin">
                    Xóa

                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">Không có dữ liệu check-in</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Table of checked-in vehicles */}
      {checkinList.length > 0 && (
        <>
          <h3>Danh Sách Xe Đã Check-In</h3>
          <table className="checkin-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Biển Số</th>
                <th>Hãng Xe</th>
                <th>Màu Xe</th>
                <th>Loại Xe</th>
                <th>Năm Sản Xuất</th>
                <th>Địa Chỉ Xe</th>
              </tr>
            </thead>
            <tbody>
              {checkinList.map((item, index) => (
                <tr key={item._id || index}>
                  <td>{index + 1}</td>
                  <td>{item.bienso}</td>
                  <td>{item.hangxe}</td>
                  <td>{item.mauxe}</td>
                  <td>{item.loaixe}</td>
                  <td>{item.namsanxuat}</td>
                  <td>{item.diachixe}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* Modal for successful check-in */}
      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <p>Xóa xe thành công!</p>
            <button onClick={() => setModalVisible(false)}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DanhSachXe;
