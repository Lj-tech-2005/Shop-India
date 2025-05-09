
import { axiosApiInstance } from "./helper";



const getCategory = async (id = null) => {

    let API = "category"
    if (id != null) {
        API = `category/${id}`; 

    }
    return axiosApiInstance.get(API).then(

        (response) => {

            return response.data;
        }
    ).catch(
        (error) => {

            return null

        }

    )
};


const getColor = async (id = null) => {

    let API = "color"
    if (id !== null) {
        API = `color/${id}`; 
    }
    return axiosApiInstance.get(API).then(

        (response) => {

            return response.data;

        }
    ).catch(
        (error) => {

            return null

        }

    )
};


const getproduct = async (id = null) => {

    let API = "product"
    if (id !== null) {
        API = `product/${id}`; 
    }
    return axiosApiInstance.get(API).then(

        (response) => {

            return response.data;

        }
    ).catch(
        (error) => {

            return null

        }

    )
};




export { getColor, getCategory,getproduct };


