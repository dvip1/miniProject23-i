import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedStocks } from "../slices/selectedStocksSlice";
import { RecommendationInterface } from "../components/recommendationDisplay";
import RecommendationDisplay from "../components/recommendationDisplay";
import CandleStick from "../components/candleStick";
import { PeriodSelector, CompanySelector, FetchDataButton, BuyStockInput } from "../components/DashboardSelectors";
import fetchData from "../utils/fetchdata";
import BuySell from "../utils/buySell";
import GetStockDetails from "../services/getStockDetails";
import { StockDataServiceCreate } from "../services/StockDataService";
import { StockDataInterface } from "../services/StockDataService";
import { decreaseCredit } from "../slices/totalCreditSlice";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
function roundToTwoDecimals(num: number) {
  return parseInt(num.toFixed(2));
}
const Dashboard2 = () => {
  const [sideDetails, setSideDetails] = useState();
  const [thisData, setThisData] = useState();
  const [currentCompanyNames, setCurrentCompanyNames] = useState<Array<string>>();
  const [currentSelectedCompany, setCurrentSelectedCompany] = useState<string>();
  const [currentSelectedPeriod, setCurrentSelectedPeriod] = useState<string>();
  const [recommendation, setRecommendation] = useState<RecommendationInterface | null>(null);
  const credit = useSelector((state: RootState) => state.credit)
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    const getCompanyNames = async () => {
      await fetch("http://localhost:5000/getCompanyNames")
        .then((response) => response.json())
        .then((data) => {
          const parsedData = JSON.parse(data.data);
          //   console.log(parsedData);
          setCurrentCompanyNames(parsedData);
        }
        )
    };
    getCompanyNames();
    const fetchStockDetails = async (sym: string) => {
      const details = await GetStockDetails(sym); // replace 'AAPL' with your stock symbol
      setSideDetails(details);
    };

    currentSelectedCompany && fetchStockDetails(currentSelectedCompany);
  }, [currentSelectedCompany]);

  const fetchDataAndSetData = async (buttonValue: string) => {
    const { data, recommend } = await fetchData(buttonValue, currentSelectedPeriod);
    setThisData(data);
    setRecommendation(recommend);

  };

  const buyStock = () => {
    if (!thisData) return 0;
    console.log(thisData[thisData.length - 1]);
    const stockDetails = {
      stockName: currentSelectedCompany,
      price: roundToTwoDecimals(thisData[thisData.length - 1].low),
      date: thisData[thisData.length - 1].time,
      quantity: quantity
    };
    dispatch(setSelectedStocks(stockDetails));
    BuySell(stockDetails.price, true, dispatch);
    console.log(credit);
    localStorage.setItem("credit", JSON.stringify(credit?.credit))
    const postStockData: StockDataInterface = {
      stockName: stockDetails.stockName,
      purchasedDate: stockDetails.date,
      purchasedPrice: stockDetails.price,
      quantity: stockDetails.quantity,
      currentPrice: stockDetails.price
    }
    StockDataServiceCreate(postStockData)
    window.alert('Virtual Transaction complete ');
  };
  const options = currentCompanyNames?.map((companyName: any) => ({
    value: companyName.SYMBOL,
    label: `${companyName.SYMBOL}, ${companyName["NAME OF COMPANY"]}`,
  }));
  return (
    <div className="bg-white h-full">

      <RecommendationDisplay recommendation={recommendation} />

      <div className="p-2 pb-0  flex justify-center items-center">
        <PeriodSelector setSelectedPeriod={setCurrentSelectedPeriod} />
        <CompanySelector options={options} selectedCompany={currentSelectedCompany} setSelectedCompany={setCurrentSelectedCompany} />
        <FetchDataButton fetchData={fetchDataAndSetData} selectedCompany={currentSelectedCompany} />

      </div>
      <div className="filters  mb-5 flex justify-center items-center">
        <BuyStockInput quantity={quantity} setQuantity={setQuantity} buyStock={buyStock} />

      </div >
      <div className=" flex justify-center items-center -translate-y-2">
        <CandleStick data={thisData} />
      </div>
      <div className="text-center">
        {sideDetails && (
          <div className="mt-5 mb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-gray-100 p-5 rounded shadow">
            <p>Symbols: <span className="font-medium">{sideDetails.symbol}</span></p>
            <p>Current Price: <span className="font-medium">{sideDetails.currentPrice}</span></p>
            <p>Day High: <span className="font-medium">{sideDetails.dayHigh}</span></p>
            <p>Day Low: <span className="font-medium">{sideDetails.dayLow}</span></p>
            <p>Open: <span className="font-medium">{sideDetails.open}</span></p>
            <p>Previous Close: <span className="font-medium">{sideDetails.previousClose}</span></p>
            <p>Volume: <span className="font-medium">{sideDetails.volume}</span></p>
          </div>
        )}
      </div>
    </div >
  );
};
export default Dashboard2;
