import axios from 'axios';
import { login } from '../slices/authslice';

export const checkAuth = async (dispatch: Function) => {
    try {
        const response = await axios.get(
            "http://localhost:5000/is_authenticated",
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );
        if (response.status === 200) {
            dispatch(login());
            console.log("User is authenticated");
            return true;
        } else {
            console.log("User is not authenticated");
            return false;
        }
    } catch (error) {
        console.log("user not authenticated" + error);
        return false;
    }
};