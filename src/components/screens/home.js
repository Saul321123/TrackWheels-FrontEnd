import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import Header from './header';
import Sidebar from './sidebar';
import { io } from 'socket.io-client';
import carMarker from '../../assets/icons/carMarker.png';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [devices] = useState([
    { name: 'Dispositivo 1', serial: '12345', phone: '555-1234', active: true },
    { name: 'Dispositivo 2', serial: '54321', phone: '555-5678', active: false },
  ]);

  const [vehiclePosition, setVehiclePosition] = useState({ lat: 18.602482, lng: -98.467619 });
  const [deviceData, setDeviceData] = useState(null); // Para almacenar los datos del dispositivo
  const { isLoaded } = useLoadScript({ googleMapsApiKey: "AIzaSyASyzQCCxyNZ3LfWahjeScmG3DGjJPPqzg" });

  // WebSocket
  useEffect(() => {
    const socket = io('http://44.207.165.192:3003/data', {
      transports: ['websocket'], // Forzar WebSocket
    });

    socket.on('connect', () => {
      console.log('Conectado al servidor WebSocket:', socket.id);
    });

    socket.on('ultimoDato', (data) => {
      console.log("Datos recibidos del WebSocket:", data);
      const lat = parseFloat(data.latitud);
      const lng = parseFloat(data.longitud);
  
      if (!isNaN(lat) && !isNaN(lng)) {
        setVehiclePosition({ lat, lng });
        setDeviceData(data);  // Guardar los datos del dispositivo en el estado
      } else {
        console.warn("Coordenadas inválidas recibidas.");
      }
    });

    socket.on('disconnect', () => {
      console.log('Conexión cerrada');
    });

    socket.onerror = (error) => {
      console.error("WebSocket: Error:", error);
    };

    socket.onclose = (event) => {
      console.log("WebSocket: Conexión cerrada:", event.reason);
    };

    return () => {
      console.log("WebSocket: Conexión cerrada manualmente.");
      socket.close();
    };
  }, []);

  const handleLogout = () => {
    console.log("Cerrar sesión.");
  };

  const filteredDevices = devices.filter(device =>
    (filter === 'all' || (filter === 'active' && device.active) || (filter === 'inactive' && !device.active)) &&
    (device.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (!isLoaded) return <div>Cargando mapa...</div>;

  return (
    <div className="home-container">
      {/* Header */}
      <Header onLogout={handleLogout} />

      <div className="main-content">
        {/* Sidebar */}
        <Sidebar />

        {/* Panel Izquierdo para Dispositivos */}
        <div className="left-panel">
          <input
            type="text"
            placeholder="Buscar dispositivo"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="filters">
            <button onClick={() => setFilter('all')}>Todos</button>
            <button onClick={() => setFilter('active')}>Activos</button>
            <button onClick={() => setFilter('inactive')}>Inactivos</button>
          </div>

          <div className="device-list">
          {deviceData && (
            <div className="device-item">
              <p><strong>Detalles del Dispositivo</strong></p>
              <p><strong>IMEI:</strong> {deviceData.imei}</p>
              <p><strong>Teléfono:</strong> {deviceData.numTel}</p>
              <p><strong>Chofer:</strong> {deviceData.nombre}{deviceData.apellidos}</p>
            </div>
          )}  
          </div>
                    
            


        </div>

        <div className="map-container">
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            zoom={15}
            center={vehiclePosition}
          >
            {/* Marker con ícono personalizado */}
            <Marker position={vehiclePosition}  
              icon={{
                url: carMarker, // Reemplaza con la URL de tu imagen
                scaledSize: new window.google.maps.Size(45, 55), // Tamaño de la imagen
              }}  
            />
          </GoogleMap>
        </div>
      </div>
    </div>
  );
}

export default Home;










