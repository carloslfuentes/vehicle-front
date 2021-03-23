import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { DataGrid } from '@material-ui/data-grid';
import { InputLabel, TextField, Button, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

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
    }

  }


  componentDidMount() {
    this.saveData = this.saveData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.filterData = this.filterData.bind(this);
    this.filterChange = this.filterChange.bind(this);
    this.getData();
  }

  getData(query=''){
    axios.get(`http://localhost:3000/api/v1/vehicles${query}`)
      .then(res => {
        const vehicles = res.data;
        this.setState({ vehicles: vehicles });
      })
  }

  handleChange(event) {
    let params = this.state.params;
    params[event.target.name] = event.target.value;
    this.setState({ params: params });
  }

  filterChange(event) {
    let filter = this.state.filter;
    filter[event.target.name] = event.target.value;
    this.setState({ filter: filter });
  }


  saveData() {
    let params = this.state.params;
    this.clear();
    axios.post(`http://localhost:3000/api/v1/vehicles`, params )
      .then(res => {
        this.getData();
      })
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
    this.getData(search);
    console.log(search);
  }

  getDefaultState() {
    return { model: '', brand: '',mileage: '', year: '', price: '' };
  }

  clear(){
    this.setState({ params: this.getDefaultState() })
  }

  render() {
    return (
      <div>
        <div style={{ height: 350, width: '60%' }}>

          <form noValidate autoComplete="off">
            <div>
              <TextField id="model_name" label="Model" value={ this.state.params.model } name="model" onChange={this.handleChange}/>
              <TextField id="brand_name" label="Brand" value={ this.state.params.brand } name="brand" onChange={this.handleChange}/>
            </div>
            <div>
              <TextField id="year" label="year" value={ this.state.params.year } name="year" onChange={this.handleChange}/>
              <TextField id="mileage" label="Mileage" value={ this.state.params.mileage } name="mileage" onChange={this.handleChange} />
            </div>
            <div>
              <TextField id="price" label="Price" value={ this.state.params.price } name="price" onChange={this.handleChange} />
            </div>
            <div style={{ marginTop: '18px' }}>
              <Button variant="contained" color="primary" onClick={() => this.saveData()}>
                Save
              </Button>
            </div>
          </form>

          <div>
            <div>
              <TextField id="model_filter" label="Model"  name="model_name" onChange={this.filterChange}/>

              <TextField id="brand_filter" label="Brand"  name="brand_name" onChange={this.filterChange}/>

              <TextField id="year_filter" label="Year"  name="year" onChange={this.filterChange}/>

              <TextField id="mileage_filter" label="Mileage"  name="mileage" onChange={this.filterChange}/>

              <TextField id="price_filter" label="Price"  name="price" onChange={this.filterChange}/>
            </div>
            <div style={{ marginTop: '18px' }}>
              <Button variant="contained" color="primary" onClick={() => this.filterData()}>
                Search
              </Button>
            </div>

          </div>

        </div>
        <div style={{ height: 550, width: '60%' }}>
          <DataGrid
            columns={[{ field: 'id' }, { field: 'model_name' }, { field: 'brand_name' }, { field: 'year' }, { field: 'mileage' }, { field: 'price' }]}
            rows={ this.state.vehicles }
          />
        </div>
      </div>
    )
  }
}
export default VehiclesList;
