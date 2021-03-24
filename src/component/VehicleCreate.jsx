import React , { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { TextField, Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SaveIcon from '@material-ui/icons/Save';
import { postVeicles } from '../services/vehicles'
import { getVehiclesModel } from '../services/vehicle_models'
import { fetchVehiclesBrand } from '../services/vehicle_brands'

const VehicleCreate = (props) => {
  const defaultParams = { brand: '',  model: '', year: '', mileage: '', price: '' };
  const { handleSubmit } = useForm();
  const [ brands, setBrands ] = useState([]);
  const [ models, setModels ] = useState([]);
  const [ params, setParams ] = useState(defaultParams);

  useEffect(() =>{
    fetchVehiclesBrand().then(res => {
      setBrands(res);
    });
  }, []);

  const searchModels = (brand) => {
    let search = `?brand_name=${brand}`;
    getVehiclesModel(search).then(res => {
      setModels(res);
    });
  }

  const addParams = (key, value) => {
    console.log(key, value);
    if(value === undefined){
      value='';
    }
    let param = params;
    param[key] = value;
    setParams(param);
    if(key === 'brand'){
      searchModels(value);
    }
  }

  const onSubmit = (data, e) => {

    postVeicles(params).then(res => {
      props.changeLoading(false);
      if(res !== undefined){
        props.addVehicle(res);
      }else{
        alert('Not success')
      }
    });
    setParams(defaultParams)
    e.target.reset();
  }

  return (

      <form noValidate autoComplete="off"  onSubmit={ handleSubmit(onSubmit) }>
        <div style={{ marginLeft: '35px' }}>
            <Autocomplete
              id="brand_name" options={ brands } getOptionLabel={(option) => option.name}  style={{ width: 150, float: 'left' }}
              renderInput={(params) => <TextField {...params} label="Brand" value={ params.brand } name="brand_name" />}
              onChange={(event, newValue) => {
                addParams( 'brand', newValue?.name );
              }}
            />
            <Autocomplete
              id="model_name" freeSolo options={ models } getOptionLabel={(option) => option.name} style={{ width: 150, float: 'left' }}
              renderInput={(params) => <TextField {...params} label="Model" name="model_name" value={ params.model } onChange={event => {
                addParams('model', event.target.value );
              }} />}
              onChange={(event, newValue) => {
                addParams('model', newValue?.name );
              }}
            />
          <div style={{ float: 'left' }}>
            <TextField id="year" label="Year"  name="year" onChange={event => {
                addParams('year', event.target.value );
              }} />
            <TextField id="mileage" label="Mileage"  name="mileage"  onChange={event => {
                addParams('mileage', event.target.value );
              }} />
          </div>
          <div>
            <TextField id="price" label="Price"  name="price"  onChange={event => {
                addParams('price', event.target.value );
              }} />
          </div>
          <div style={{ marginTop: '18px' }}>
            <Button variant="contained" color="primary" type="submit" startIcon={<SaveIcon />} style={{ backgroundColor: '#00c72b' }}>
              Create
            </Button>
          </div>
        </div>
      </form>
   );

}

export default VehicleCreate;
