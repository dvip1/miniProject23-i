import axios from 'axios';
import { logout } from '../slices/authslice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export const useHandleLogout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return async () => {
        try {
            const response = await axios.post(
                "http://localhost:5000/sign_out",
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            if (response.status === 200) {
                console.log("User logged out");
                dispatch(logout());
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    };
};