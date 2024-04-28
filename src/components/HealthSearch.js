import React, { useEffect, useState } from 'react';
import './HealthSearch.css';

const HealthSearch = () => {
  const [stores, setStores] = useState([]);

  const handleSearch = async () => {
    try {
      // Directly use the coordinates for the specified ZIP codes
      const chicagoZipCodes = [
        { zipCode: '60601', coordinates: { lat: 41.8869, lng: -87.6225 } },
        { zipCode: '60602', coordinates: { lat: 41.8837, lng: -87.6315 } },
        { zipCode: '60603', coordinates: { lat: 41.8796, lng: -87.6306 } },
        { zipCode: '60604', coordinates: { lat: 41.8786, lng: -87.6317 } },
        { zipCode: '60605', coordinates: { lat: 41.8676, lng: -87.6150 } },
        { zipCode: '60606', coordinates: { lat: 41.8831, lng: -87.6314 } },
        { zipCode: '60607', coordinates: { lat: 41.8782, lng: -87.6512 } },
        { zipCode: '60608', coordinates: { lat: 41.8459, lng: -87.6659 } },
        { zipCode: '60609', coordinates: { lat: 41.8120, lng: -87.6565 } },
        { zipCode: '60610', coordinates: { lat: 41.9066, lng: -87.6313 } },
        { zipCode: '60611', coordinates: { lat: 41.8947, lng: -87.6170 } },
        { zipCode: '60612', coordinates: { lat: 41.8806, lng: -87.6876 } },
        { zipCode: '60613', coordinates: { lat: 41.9537, lng: -87.6561 } },
        { zipCode: '60614', coordinates: { lat: 41.9221, lng: -87.6496 } },
        { zipCode: '60615', coordinates: { lat: 41.8017, lng: -87.5963 } },
      ];

      setStores(chicagoZipCodes);
    } catch (error) {
      console.error('Error fetching nearby stores:', error.message);
    }
  };

  useEffect(() => {
    if (stores.length > 0) {
      // Load Google Maps API script dynamically
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyABANJ4sDFfq_cObRWDBTCAqfwsQI6sJm4&libraries=places`;
      script.onload = initMap;
      document.head.appendChild(script);
    }
  }, [stores]);

  const initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 41.8781, lng: -87.6298 }, // Chicago's coordinates
      zoom: 11,
    });

    stores.forEach((store) => {
      const marker = new window.google.maps.Marker({
        position: store.coordinates,
        map: map,
        title: `Store in ZIP ${store.zipCode}`,
      });
    });
  };

  return (
    <div style={{ paddingTop: '150px' }} className="store-map-container">
      <h2 className="store-map-title">Store Locator</h2>
      <div className="store-map-search">
        <button className="store-map-button" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div id="map" className="store-map" />
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.118248214307!2d-87.62958619999999!3d41.834873100000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2c06ed2e695f%3A0x5decf4f463c7f626!2sIllinois%20Institute%20of%20Technology!5e0!3m2!1sen!2sus!4v1649792125748!5m2!1sen!2sus" width="100%" height="150" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
    </div>
  );
};

export default HealthSearch;


