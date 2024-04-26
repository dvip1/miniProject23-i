import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedStocks } from "../slices/selectedStocksSlice";
import { RecommendationInterface } from "../components/recommendationDisplay";
import RecommendationDisplay from "../components/recommendationDisplay";
import CandleStick from "../components/candleStick";
import { PeriodSelector, CompanySelector, FetchDataButton, BuyStockInput } from "../components/DashboardSelectors";
import fetchData from "../utils/fetchdata";
import BuySell from "../utils/buySell";

const Dashboard2 = () => {

  const [thisData, setThisData] = useState();
  const [currentCompanyNames, setCurrentCompanyNames] = useState<Array<string>>();
  const [currentSelectedCompany, setCurrentSelectedCompany] = useState<string>();
  const [currentSelectedPeriod, setCurrentSelectedPeriod] = useState<string>();
  const [recommendation, setRecommendation] = useState<RecommendationInterface | null>(null);

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
        });
    };
    getCompanyNames();
  }, []);

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
      price: thisData[thisData.length - 1].low,
      date: thisData[thisData.length - 1].time,
      quantity: quantity
    };
    dispatch(setSelectedStocks(stockDetails));
    BuySell(stockDetails.price, true, dispatch)
    window.alert('Virtual Transaction complete ')
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
    </div >
  );
};
export default Dashboard2;
