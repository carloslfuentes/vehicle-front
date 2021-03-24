import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { TextField, Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { fetchVehicles, getVeicles, postVeicles } from '../services/vehicles'
import { fetchVehiclesModel, getVehiclesModel } from '../services/vehicle_models'
import { fetchVehiclesBrand } from '../services/vehicle_brands'
import SaveIcon from '@material-ui/icons/Save';


class VehiclesList extends React.Component {

  state = {
    vehicles: [],
    params: {
      model: '',
      brand: '',
      mileage: '',
      year: '',
      price: ''
    },
    filter: {
      model: '',
      brand: '',
      mileage: '',
      year: '',
      price: ''
    },
    showNew: false,
    brands: [],
    models: [],
    fetchModels: [],
    loading: true
  }

  componentDidMount() {
    this.saveData = this.saveData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.filterData = this.filterData.bind(this);
    this.filterChange = this.filterChange.bind(this);
    this.filterModels = this.filterModels.bind(this);
    this.loading(true);
    this.getData();
    this.getBrand();
    this.getModel();
  }

  loading(val=false){
      this.setState({ loading: val });

  }

  getData(query=''){
    fetchVehicles().then(res => {
      this.setState({ vehicles: res });
      this.loading(false);
    });
  }

  getBrand(){
    fetchVehiclesBrand().then(res => {
      this.setState({ brands: res });
    });
  }

  getModel(){
    fetchVehiclesModel().then(res => {
      this.setState({ fetchModels: res });
    });
  }

  filterModels(brand){
    let search = `?brand_name=${brand}`;
    getVehiclesModel(search).then(res => {
      this.setState({ models: res });
    });
  }

  handleChange(event) {
    let params = this.state.params;
    params[event.target.name] = event.target.value;
    this.setState({ params: params });
  }

  handleChange2(key, value) {
    if(value === undefined){
      value='';
    }
    let params = this.state.params;
    params[key] = value;
    this.setState({ params: params });
    if(key === 'brand'){
      this.filterModels(value);
    }
  }

  filterChange2(key, value) {
    this.loading(true);
    if(value === undefined){
      value='';
    }
    let filter = this.state.filter;
    filter[key] = value;
    this.setState({ filter: filter });
    this.filterData();
  }

  filterChange(event) {
    this.loading(true);
    let filter = this.state.filter;
    filter[event.target.name] = event.target.value;
    this.setState({ filter: filter });
    this.filterData();
  }

  saveData() {
    let params = this.state.params;
    this.clear();
    postVeicles(params).then(res => {
      this.getData();
    });
  }

  filterData() {
    const filters = this.state.filter
    let search = '?';
    Object.keys(filters).map((key, i) =>
      {
        if(filters[key]){
          search += `${key}=${filters[key]}&`;
        }
      }
    )
    getVeicles(search).then(res => {
      this.setState({ vehicles: res });
      this.loading(false);
    });
  }

  getDefaultState() {
    return { model: '', brand: '',mileage: '', year: '', price: '' };
  }

  clear(){
    this.setState({ params: this.getDefaultState() })
  }

  render() {
    return (
      <div style={{ marginTop: '20px', marginLeft: '420px'}}>
        <div style={{ width: '60%' }}>

          <form noValidate autoComplete="off" >
            <Button variant="contained" color="default" onClick={() => this.setState({showNew: !this.state.showNew})}>
              Add Vehicle
            </Button>
            <div style={this.state.showNew ? {} : { display: 'none' }}>
                <Autocomplete
                  loading={true}
                  id="brand_name" options={this.state.brands} getOptionLabel={(option) => option.name} style={{ width: 150, float: 'left' }}
                  onChange={(event, newValue) => {
                    this.handleChange2('brand', newValue?.name);
                  }}
                  renderInput={(params) => <TextField {...params} label="Brand" />}
                />
                <Autocomplete
                  id="model_name" options={this.state.models} getOptionLabel={(option) => option.name} style={{ width: 150, float: 'left' }}
                  onChange={(event, newValue) => {
                    this.handleChange2('model', newValue?.name);
                  }}
                  renderInput={(params) => <TextField {...params} label="Model" />}
                />
              <div style={{ float: 'left' }}>
                <TextField id="year" label="Year" value={ this.state.params.year } name="year" onChange={this.handleChange}/>
                <TextField id="mileage" label="Mileage" value={ this.state.params.mileage } name="mileage" onChange={this.handleChange} />
              </div>
              <div>
                <TextField id="price" label="Price" value={ this.state.params.price } name="price" onChange={this.handleChange} />
              </div>
              <div style={{ marginTop: '18px' }}>
                <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={() => this.saveData()} style={{ backgroundColor: '#00c72b' }}>
                  Create
                </Button>
              </div>
            </div>
          </form>

          <div >
            <div>
              <Autocomplete
                id="brand_filter" options={this.state.brands} getOptionLabel={(option) => option.name} style={{ width: 150, float: 'left' }}
                onChange={(event, newValue) => {
                  this.filterChange2('brand_name', newValue?.name);
                }}
                renderInput={(params) => <TextField {...params} label="Brand" />}
              />

              <Autocomplete
                id="model_filter" options={this.state.fetchModels} getOptionLabel={(option) => option.name} style={{ width: 150, float: 'left' }}
                onChange={(event, newValue) => {
                  this.filterChange2('model_name', newValue?.name);
                }}
                renderInput={(params) => <TextField {...params} label="Model" />}
              />

              <TextField id="year_filter" label="Year"  name="year" onChange={this.filterChange}/>

              <TextField id="mileage_filter" label="Mileage"  name="mileage" onChange={this.filterChange}/>

              <TextField id="price_filter" label="Price"  name="price" onChange={this.filterChange}/>
            </div>

          </div>

        </div>
        <div style={{ height: 550, width: '60%', marginTop: '20px' }}>
          <DataGrid
            loading={this.state.loading}
            columns={[{ field: 'id', width: 80 }, { field: 'model_name', headerName: 'Model', width: 160 }, { field: 'brand_name', headerName: 'Brand', width: 160  }, { field: 'year', headerName: 'Year', width: 110  }, { field: 'mileage', headerName: 'Mileage', width: 150  }, { field: 'price', headerName: 'Price', width: 100  }]}
            rows={ this.state.vehicles }
          />
        </div>
      </div>
    )
  }
}
export default VehiclesList;
