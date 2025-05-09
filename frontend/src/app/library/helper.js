
import { toast } from "react-toastify";
import axios from "axios";


const axiosApiInstance = axios.create({

    baseURL:process.env.NEXT_PUBLIC_API_BASE_URL
});


    function createSlug(text) {
        return text
            .toString()
            .toLowerCase()
            .trim()
            .replace(/[\s\W-]+/g, '-')  // Replace spaces and non-word characters with hyphens
            .replace(/^-+|-+$/g, '');   // Remove leading/trailing hyphens
    }


const notify = (msg, flag) => toast(msg, { type: flag ? "success" : "error" });

export { createSlug, notify,axiosApiInstance }