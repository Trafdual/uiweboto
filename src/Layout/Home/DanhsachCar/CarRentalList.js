import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CarRentalList.scss';
import axios from 'axios';
import { Button } from 'react-bootstrap';

function CarRentalList({onSelectBlog}) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:8080/getxechothue');
        setCars(response.data);
      } catch (err) {
        setError('Failed to fetch car rental data.');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="car-rental-list">
      <h2>Danh sách xe cho thuê</h2>
      <div className="car-grid">
        {cars.map((car) => (
          <div key={car._id} className="car-card">
            <img src={car.image} alt={car.mauxe} className="car-image" />
            <div className="car-details">
              <h3>{car.mauxe}</h3>
              <p>Năm sản xuất: {car.namsanxuat}</p>
              <p>Truyền động: {car.truyendong}</p>
              <p>Loại xe: {car.loaixe}</p>
              <p>Giá cho thuê: {car.giachothue.toLocaleString()} VNĐ</p>
              <p>Địa chỉ xe: {car.diachixe}</p>
              <p>Giao tận nơi: {car.giaotannoi ? 'Có' : 'Không'}</p>
              <Button
                 onClick={() => onSelectBlog(car._id)}
                className="details-button"
              >
                Xem chi tiết
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarRentalList;
