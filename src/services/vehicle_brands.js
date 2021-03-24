import { get } from '../utils/axios';

export async function fetchVehiclesBrand(data) {
  return get({
    url: `/api/v1/vehicle_brands`,
  });
}


