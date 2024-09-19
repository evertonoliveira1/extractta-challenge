import {
    Vehicle,
    VehicleFilter,
    VehicleResponse,
    SelectOptions,
} from '../types/common';

import instance from './axios';
import colorsJson from '../data/colors.json';

export const fetchVehicle = async (id: string): Promise<Vehicle> => {
    try {
        const { data } = await instance.get(`/vehicles/${id}`);
        return data;
    } catch (error) {
        throw new Error(`Falha ao tentar obter os dados dos automóveis: ${error}`);
    }
};

export const fetchVehicles = async (
    filter?: VehicleFilter,
    page?: number,
    limit?: number
): Promise<VehicleResponse> => {
    try {
        const { data } = await instance.get('/vehicles', {
            params: {
                ...filter,
                page,
                limit
            }
        });
        return data;
    } catch (error) {
        throw new Error(`Falha ao tentar obter os dados: ${error}`);
    }
};

export const createVehicle = async (vehicle: Vehicle) => {
    const { data } = await instance.post('/vehicles', vehicle);
    return data;
};

export const updateVehicle = async (id: string, vehicle: Vehicle) => {
    const { data } = await instance.put(`/vehicles/${id}`, vehicle);
    return data;
};

export const fetchUserProfile = async () => {
    try {
        const { data } = await instance.get('/auth/me');
        return data;
    } catch (error) {
        throw new Error(`Falha ao tentar obter os dados do perfil: ${error}`);
    }
};

export const getColors = (): SelectOptions[] => colorsJson?.map(color => ({
    value: color,
    label: color
}));

export const getYears = (): SelectOptions[] => Array.from({
    length: new Date().getFullYear() - 1986 + 1
},
    (_, i) => ({
        label: `${1986 + i}`,
        value: `${1986 + i}`
    }));

export const deleteVehicle = async (id: string) => {
    const { data } = await instance.delete(`vehicles/${id}`);
    return data;
};