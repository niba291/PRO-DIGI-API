import axiosInstance from "axios";

const baseURL = "https://digi-api.com/api/v1";

export interface Props {
    url: string;
}

export const axios              = async (props : Props) => {
    try{
        const response          = await axiosInstance({
            baseURL             : baseURL,
            method              : "GET",
            headers             : {
                "Content-type"  : "application/json"
            },
            ...props
        });
        return response.data;
    }catch(ex){
        if(!axiosInstance.isAxiosError(ex)){
            return ex;
        }
        return ex;
    }
};