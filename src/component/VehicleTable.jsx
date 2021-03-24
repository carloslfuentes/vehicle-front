import React , { useState, useEffect } from "react"
import { DataGrid } from '@material-ui/data-grid';
import { fetchVehicles, getVeicles, postVeicles } from '../services/vehicles'

const VehicleTable = (props) => {

  useEffect(() => {
    fetchVehicles().then(res => {
      props.dataVehicle(res);
      props.changeLoading(false);
    });
  }, []);

  return (
    <div style={{ height: 650, width: '90%', marginTop: '30px', marginLeft: '35px'}}>
      <DataGrid
        loading={ props.loading }
        columns={[
                  { field: 'id', width: 80 },
                  { field: 'model_name', headerName: 'Model', width: 160 },
                  { field: 'brand_name', headerName: 'Brand', width: 160  },
                  { field: 'year', headerName: 'Year', width: 110  },
                  { field: 'mileage', headerName: 'Mileage', width: 150  },
                  { field: 'price', headerName: 'Price', width: 100  }
                  ]}
        rows={ props.vehicles }
      />
    </div>
  );

}

export default VehicleTable;
