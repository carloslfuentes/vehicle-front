import { get, post } from '../utils/axios';

export async function fetchVehicles(data) {
  return get({
    url: `/api/v1/vehicles`,
  });
}

export async function getVeicles(params) {
  return get({
    url: `/api/v1/vehicles/${params}`
  });
}

export async function postVeicles(data) {
  return post({
    url: `/api/v1/vehicles`,
    data: data,
  });
}

