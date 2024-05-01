import axios from "axios"
export interface StockDataInterface {
    stockName: string | undefined
    purchasedPrice: number
    purchasedDate: string
    quantity: number
    currentPrice: number
}
export interface postStockDataInterface extends StockDataInterface {
    userId: string
}
const fetchUserData = async () => {
    try {
        const response = await axios.get("http://localhost:5000/is_authenticated",
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        )
        return response.data;
    }
    catch (error) {
        console.error('Error fetching the data' + error);
    }
}
const getUserID = async () => {
    const userData = await fetchUserData();
    return userData?._id;
}

const postStockData = async (props: postStockDataInterface) => {
    try {
        await axios.post(
            "http://localhost:5000/stock-data/create",
            props, // send props directly
            {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            }
        )
    }
    catch (error) {
        console.error('Error fetching the data' + error);
    }
}
export async function StockDataServiceCreate(props: StockDataInterface) {
    const userID = await getUserID();
    const userStockData: postStockDataInterface = {
        userId: userID,
        stockName: props.stockName,
        purchasedDate: props.purchasedDate,
        quantity: props.quantity,
        currentPrice: props.currentPrice,
        purchasedPrice: props.purchasedPrice
    }
    await postStockData(userStockData);
}

export async function DeleteStockData(stockName: string) {
    const userID = await getUserID();
    try {
        await axios.post(
            "http://localhost:5000/stock-data/delete",
            {
                stockName: stockName,
                userId: userID
            }, // send props directly
            {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            }

        )
    }
    catch (error) {
        console.log(`Error deleting the data ${error}`)
    }
}