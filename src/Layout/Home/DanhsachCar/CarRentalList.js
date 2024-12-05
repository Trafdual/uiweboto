import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CarRentalList.scss';
import axios from 'axios';

function CarRentalList({ onSelectBlog }) {
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

            <div className="car-image-container">
              <img src={car.image} alt={car.mauxe} className="car-image" />
              <div className="car-badge">Giảm {car.giamgia}%</div>
              <div className="car-datxe">Đặt xe nhanh</div>
            </div>
            <div className="car-details1">
              <div className='car-theloai'>
                <div className="car-theloai1">{car.truyendong}</div>      <div className="car-theloai2">{car.loaixe}</div>

              </div>
              <h3 className="car-name">{car.hangxe} {car.mauxe}</h3>
              <p className="car-location">📍 {car.diachixe}</p>
              <p className="car-price">
                <span className="old-price">1.550K</span>
                <span className="new-price">{car.giachothue.toLocaleString()}đ/ngày</span>
              </p>
              <div className="car-footer">
                <button
                  onClick={() => onSelectBlog(car._id)}
                  className="details-button"
                >
                  Xem chi tiết
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarRentalList;
