import React , { useState, useEffect } from 'react'
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getVeicles } from '../services/vehicles'
import { fetchVehiclesModel } from '../services/vehicle_models'
import { fetchVehiclesBrand } from '../services/vehicle_brands'

const VehicleFilter = (props) => {

  const [ brands, setBrands ] = useState([]);
  const [ models, setModels ] = useState([]);
  const [ filters, setFilters ] = useState({ brand: '',  model: '', year: '', mileage: '', price: '' })

  useEffect(() =>{
    fetchVehiclesBrand().then(res => {
      setBrands(res);
    });
    fetchVehiclesModel().then(res => {
      setModels(res);
    });
  }, []);

  const filterData = () => {
    props.changeLoading(true);
    const filter = filters;
    let search = '?';
    Object.keys(filter).map((key, i) =>
      {
        if(filter[key]){
          search += `${key}=${filter[key]}&`;
        }
      }
    )
    getVeicles(search).then(res => {
      props.dataVehicle(res);
      props.changeLoading(false);
    });
  }

  const addParams = (key, value) => {
    if(value === undefined){
      value='';
    }
    let filter = filters;
    filter[key] = value;
    setFilters(filter);
    filterData();
  }

  return (

      <form noValidate autoComplete="off" >
        <div style={{ marginLeft: '35px' }}>
            <Autocomplete
              id="brand_name_f" options={ brands } getOptionLabel={(option) => option.name} style={{ width: 150, float: 'left' }}
              renderInput={(params) => <TextField {...params} label="Brand" name="brand_name" />}
              onChange={(event, newValue) => {
                addParams( 'brand_name', newValue?.name );
              }}
            />
            <Autocomplete
              id="model_name_f" options={ models } getOptionLabel={(option) => option.name} style={{ width: 150, float: 'left' }}
              renderInput={(params) => <TextField {...params} label="Model" name="model_name" />}
              onChange={(event, newValue) => {
                addParams('model_name', newValue?.name );
              }}
            />
          <div style={{ float: 'left' }}>
            <TextField id="year_f" label="Year"  name="year" onChange={event => {
                addParams('year', event.target.value );
              }} />
            <TextField id="mileage_f" label="Mileage"  name="mileage"  onChange={event => {
                addParams('mileage', event.target.value );
              }} />
          </div>
          <div>
            <TextField id="price_f" label="Price"  name="price"  onChange={event => {
                addParams('price', event.target.value );
              }} />
          </div>
        </div>
      </form>
   );

}

export default VehicleFilter;
