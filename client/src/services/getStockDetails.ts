import axios from "axios"
export default async function GetStockDetails(sym: string) {
    try {
        const response = await axios.post("http://localhost:5000/stock-data/get-details",
            { sym: sym },
            {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            })
        return response.data;
    }
    catch (err) {
        console.error(`This is err ${err}`);
        return 0;
    }
}