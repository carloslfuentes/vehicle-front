import { get } from '../utils/axios';

export async function fetchVehiclesModel(data) {
  return get({
    url: `/api/v1/vehicle_models`,
  });
}

export async function getVehiclesModel(params) {
  return get({
    url: `/api/v1/vehicle_models/${params}`
  });
}


