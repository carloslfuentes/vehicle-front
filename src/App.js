import React, { useState } from "react"
import VehicleTable from './component/VehicleTable';
import VehicleCreate from './component/VehicleCreate';
import VehicleFilter from './component/VehicleFilter';

function App() {
  const vehiclesData = []

  const [vehicles, setVehicles] = useState(vehiclesData);
  const [loading, setLoading] = useState(true);

  const addVehicle = (vehicle) => {
    setVehicles([
      ...vehicles,
      vehicle
    ]);
  }

  const changeLoading = (isLoading) => {
    setLoading(isLoading);
  }

  const dataVehicle = (vehicles) => {
    setVehicles(vehicles);
  }

  return (
    <div style={{ marginLeft: '450px', width: '50%', backgroundColor: '#00d0ff'}}>
      <h3 style={{ marginLeft: '350px'}}>Create Vehicle</h3>
      <VehicleCreate addVehicle={ addVehicle } changeLoading={ changeLoading }/>
      <h3  style={{ marginLeft: '350px'}}>Vehicle Filters</h3>
      <VehicleFilter dataVehicle={ dataVehicle } changeLoading={ changeLoading } />
      <VehicleTable vehicles={ vehicles } dataVehicle={ dataVehicle } loading={ loading } changeLoading={ changeLoading } />
    </div>
  );
}
export default App;


