import { ReadAndUpdateStockData } from "../services/StockDataService";
import { Dispatch, useEffect, useState } from "react";
import Loading from "./loading";
import { DeleteStockData } from "../services/StockDataService";
import buySell from "../utils/buySell";
import { useDispatch } from 'react-redux';
import GetStockDetails from "../services/getStockDetails";

interface StockData {
    stockname: string;
    purchased_price: number;
    date: string;
    quantity: number;
    current_price: number;
}
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    modalSelectedStock: StockData | null
    dispatch: Dispatch<any>
    sideDetails: any
}

function calProfitLoss(currentPrice: number, purchasedPrice: number, quantity: number) {
    const result = (currentPrice - purchasedPrice) * quantity;
    return parseFloat(result.toFixed(2));
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, modalSelectedStock, dispatch, sideDetails }) => {
    if (!isOpen || !modalSelectedStock) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto overflow-x-hidden h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-5">
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                        <h3 className="text-xl font-semibold text-gray-900">
                            {modalSelectedStock.stockname}
                        </h3>
                        <button type="button" className="appearance-none text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" onClick={onClose}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {sideDetails && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5 rounded shadow overflow-hidden">
                            <h2 className="col-span-full text-lg font-bold">{sideDetails.longName}</h2>
                            <p>Current Price: ${sideDetails.currentPrice}</p>
                            <p>Volume: {sideDetails.volume}</p>
                            <p>Average Daily Volume (10 Day): {sideDetails.averageDailyVolume10Day}</p>
                            <p>Sector: {sideDetails.sector}</p>
                            <p>Industry: {sideDetails.industry}</p>
                            <p>Price to Book: {sideDetails.priceToBook}</p>
                            <p>Price to Sales (Trailing 12 Months): {sideDetails.priceToSalesTrailing12Months}</p>
                            <p>Return on Assets: {sideDetails.returnOnAssets}</p>
                            <p>Return on Equity: {sideDetails.returnOnEquity}</p>
                            <p>Address: {sideDetails.address1}</p>
                            <p>Country: {sideDetails.country}</p>
                            <p>Website: <a href={sideDetails.website} target="_blank" rel="noopener noreferrer">{sideDetails.website}</a></p>
                        </div>
                    )}
                    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b ">
                        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            onClick={async () => {
                                buySell(modalSelectedStock.current_price, false, dispatch)
                                await DeleteStockData(modalSelectedStock.stockname)
                                onClose()
                                window.location.reload()
                            }}
                        >Sell</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default function DisplayStockData() {
    const dispatch = useDispatch();
    const [selectedStock, setSelectedStock] = useState<StockData | null>(null);
    const [data, setData] = useState<StockData[] | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [sideDetails, setSideDetails] = useState();

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    useEffect(() => {
        const fetchData = async () => {
            const result = await ReadAndUpdateStockData();
            setData(JSON.parse(result));
        };
        const fetchStockDetails = async (sym: string) => {
            const details = await GetStockDetails(sym); // replace 'AAPL' with your stock symbol
            setSideDetails(details);
        }
        selectedStock?.stockname && fetchStockDetails(selectedStock?.stockname)
        fetchData();
    }, [selectedStock]);

    if (data === null) {
        return <Loading />;
    }

    return (
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Company Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Quantity
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Profit/Loss
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 cursor-pointer">
                                {data.map((item, i) => (
                                    <tr key={i} onClick={() => { setSelectedStock(item); openModal(); }}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{item.stockname}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{item.quantity}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{calProfitLoss(item.current_price, item.purchased_price, item.quantity)}</div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Modal isOpen={isOpen} onClose={closeModal} modalSelectedStock={selectedStock} dispatch={dispatch} sideDetails={sideDetails} />
                    </div>
                </div>
            </div>
        </div>
    );
}