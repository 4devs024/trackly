import { busServerUrl } from "../constants/EndPointUrls";
import { postAPI, getAPI, getOneAPI } from "./ApiHandler"

export const addBusToServer = async (busData) => {
    try {
        const response = await postAPI(busServerUrl, busData);
        console.log("Bus added:", response.data);
    } catch (error) {
        console.error("Error adding bus:", error);
    }
};

export const getBusesData = async () => {
    const response = await getAPI(busServerUrl);
    console.log("this is from crud")
    console.log(response)
    return response;
}

export const getBusData = async () => {
    const response = await getOneAPI(busServerUrl, "temp num");
    return response;
}