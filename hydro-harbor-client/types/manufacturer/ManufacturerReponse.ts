import { Manufacturer } from "./Manufacturer";

export type ManufacturersResponse = {
    status: number;
    data?: Manufacturer[];
    errorMessage?: string;
};  