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

  const [Data, setData] = useState();
  const [companyNames, setCompanyNames] = useState<Array<string>>();
  const [selectedCompany, setSelectedCompany] = useState<string>();
  const [selectedPeriod, setSelectedPeriod] = useState<string>();
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
          setCompanyNames(parsedData);
        });
    };
    getCompanyNames();
  }, []);

  const fetchDataAndSetData = async (buttonValue: string) => {
    const { data, recommend } = await fetchData(buttonValue, selectedPeriod);
    setData(data);
    setRecommendation(recommend);

  };

  const buyStock = () => {
    console.log(Data[Data.length - 1]);
    const stockDetails = {
      stockName: selectedCompany,
      price: Data[Data.length - 1].low,
      date: Data[Data.length - 1].time,
      quantity: quantity
    };
    dispatch(setSelectedStocks(stockDetails));
    BuySell(stockDetails.price, true, dispatch)
    window.alert('Virtual Transaction complete ')
  };
  const options = companyNames?.map((companyName: any) => ({
    value: companyName.SYMBOL,
    label: `${companyName.SYMBOL}, ${companyName["NAME OF COMPANY"]}`,
  }));
  return (
    <div className="bg-white h-full">
      <RecommendationDisplay recommendation={recommendation} />
      <div className="p-2 pb-0  flex justify-center items-center">
        <PeriodSelector setSelectedPeriod={setSelectedPeriod} />
        <CompanySelector options={options} selectedCompany={selectedCompany} setSelectedCompany={setSelectedCompany} />
        <FetchDataButton fetchData={fetchDataAndSetData} selectedCompany={selectedCompany} />

      </div>
      <div className="filters  mb-5 flex justify-center items-center">
        <BuyStockInput quantity={quantity} setQuantity={setQuantity} buyStock={buyStock} />

      </div >
      <div className="min-h-screen min-w-[100vw] flex justify-center items-center -translate-y-2">
        <CandleStick data={Data} />
      </div>
    </div >
  );
};
export default Dashboard2;
