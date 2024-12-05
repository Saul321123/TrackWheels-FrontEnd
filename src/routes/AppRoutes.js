import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Home from '../components/screens/home';
import CreateDevice from '../components/screens/createDevice';
import CreateVehicle from '../components/screens/createVehicle';
import DeviceList from '../components/screens/deviceList';
import EditDevice from '../components/screens/editDevice';
import EmployeeList from '../components/screens/employeeList';
import CreateEmployee from '../components/screens/createEmployee';
import EditEmployee from '../components/screens/editEmployee';
import VehicleList from '../components/screens/vehicleList';
import EditVehicle from '../components/screens/editVehicle';
import DeviceAssignment from '../components/screens/deviceAssignment';
import DriverAssignment from '../components/screens/driverAssignment';
import DriverAssignmentList from '../components/screens/driverAssignmentList';
import DeviceAssignmentList from '../components/screens/deviceAssignmentList';
import Login from '../components/screens/login';

const AppRoutes = () => {
  const isAuthenticated = () => {
    return localStorage.getItem('userToken') !== null; // Verifica si existe un token
  };

  const onLogout = () => {
    const logout = async () => {
      try {
        localStorage.removeItem('accessToken');
        console.log('Token eliminado, sesión cerrada.');
  
        // Opcional: Llamar al backend para invalidar el token
        await fetch('http://44.207.165.192:3000/auth/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
  
        // Redirigir a la pantalla de login
        window.location.href = '/login';  // O usa useNavigate() si estás usando React Router
      } catch (error) {
        console.error('Error al cerrar sesión', error);
      }
    };
  
    return (
      <button onClick={logout}>Cerrar sesión</button>
    );
  };
    

  return (
    <Routes>
      {/* Ruta de login */}
      <Route path="/login" element={<Login />} />

      {/* Rutas privadas (requieren autenticación) */}
      <Route path="/" element={isAuthenticated() ? <Home onLogout={onLogout} /> : <Navigate to="/login" />} />
      <Route path="/create-vehicle" element={isAuthenticated() ? <CreateVehicle /> : <Navigate to="/login" />} />
      <Route path="/create-device" element={isAuthenticated() ? <CreateDevice /> : <Navigate to="/login" />} />
      <Route path="/device-list" element={isAuthenticated() ? <DeviceList /> : <Navigate to="/login" />} />
      <Route path="/employee-list" element={isAuthenticated() ? <EmployeeList /> : <Navigate to="/login" />} />
      <Route path="/vehicle-list" element={isAuthenticated() ? <VehicleList /> : <Navigate to="/login" />} />
      <Route path="/dispositivo/:id/edit" element={isAuthenticated() ? <EditDevice /> : <Navigate to="/login" />} />
      <Route path="/empleado/:id/edit" element={isAuthenticated() ? <EditEmployee /> : <Navigate to="/login" />} />
      <Route path="/unidades/:id/edit" element={isAuthenticated() ? <EditVehicle /> : <Navigate to="/login" />} />
      <Route path="/device-assignment" element={isAuthenticated() ? <DeviceAssignment /> : <Navigate to="/login" />} />
      <Route path="/driver-assignment" element={isAuthenticated() ? <DriverAssignment /> : <Navigate to="/login" />} />
      <Route path="/driver-assignment-list" element={isAuthenticated() ? <DriverAssignmentList /> : <Navigate to="/login" />} />
      <Route path="/device-assignment-list" element={isAuthenticated() ? <DeviceAssignmentList /> : <Navigate to="/login" />} />
      <Route path="/create-employee" element={isAuthenticated() ? <CreateEmployee /> : <Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;




