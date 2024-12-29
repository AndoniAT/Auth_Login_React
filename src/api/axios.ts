import axios from 'axios';

const BACK_END_URL = import.meta.env.VITE_BACKEND_URL;

export default axios.create( {
    baseURL: BACK_END_URL
} );

