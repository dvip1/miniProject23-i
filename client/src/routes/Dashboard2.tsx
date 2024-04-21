import { createChart, CrosshairMode } from "lightweight-charts";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedStocks } from "../slices/selectedStocksSlice";
import { increaseCredit, decreaseCredit } from '../slices/totalCreditSlice';
import { useSelector } from "react-redux";
import { RootState } from '../store/store';
import ReactSelect from "react-select";
const dateOptions = [
  { value: '1d', label: '1d' },
  { value: '5d', label: '5d' },
  { value: '1mo', label: '1mo' },
  { value: '3mo', label: '3mo' },
  { value: '6mo', label: '6mo' },
  { value: '1y', label: '1y' },
  { value: '2y', label: '2y' },
  { value: '5y', label: '5y' },
  { value: '10y', label: '10y' },
  { value: 'ytd', label: 'ytd' },
  { value: 'max', label: 'max' },
];
interface Recommendation {
  RECOMMENDATION: string;
  BUY: number;
  SELL: number;
  NEUTRAL: number;
}

const Dashboard2 = () => {
  // const backgroundColor = "white";
  // const lineColor = "#2962FF";
  // const textColor = "black";
  // const areaTopColor = "#2962FF";
  // const areaBottomColor = "rgba(41, 98, 255, 0.28)";
  const [Data, setData] = useState();
  const [companyNames, setCompanyNames] = useState<Array<string>>();
  const [selectedCompany, setSelectedCompany] = useState<string>();
  const [buyDetails, setBuyDetails] = useState();
  const [selectedPeriod, setSelectedPeriod] = useState<string>();
  const credit = useSelector((state: RootState) => state.credit.credit);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);

  const dispatch = useDispatch();

  const chartContainerRef = useRef<any>();

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      width: 1200,
      height: 700,
      layout: {
        background: {
          type: "solid",
          color: "#000000",
        },
        textColor: "rgba(255, 255, 255, 0.9)",
      },
      grid: {
        vertLines: {
          color: "rgba(197, 203, 206, 0.5)",
        },
        horzLines: {
          color: "rgba(197, 203, 206, 0.5)",
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      rightPriceScale: {
        borderColor: "rgba(197, 203, 206, 0.8)",
      },
      timeScale: {
        borderColor: "rgba(197, 203, 206, 0.8)",
      },
    });
    chart.timeScale().fitContent();

    const candleSeries = chart.addCandlestickSeries();

    Data ? candleSeries.setData(Data) : null;

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [Data]);

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

  const fetchData = async (buttonValue: string) => {
    const params = {
      button_value: buttonValue,
      period: selectedPeriod || '1mo'  // Use '1d' as a default value if selectedPeriod is undefined
    };
    await fetch("http://localhost:5000/get_data", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(params),
    })
      .then((response) => response.json())
      .then((data) => {
        const parsedData = JSON.parse(data.data);
        setRecommendation(data.recommend);
        //    console.log(parsedData);
        const cdata = parsedData.map((d: any) => {
          const date = new Date(d.Date);
          const formattedDate = date.toISOString().split("T")[0];
          return {
            time: formattedDate,
            open: parseFloat(d.Open),
            high: parseFloat(d.High),
            low: parseFloat(d.Low),
            close: parseFloat(d.Close),
          };
        });
        setData(cdata);
      });
  };
  const BuySell = (amount: number, buy: boolean) => {
    if (buy) {
      if (credit >= amount) {
        dispatch(decreaseCredit(amount));
      } else {
        console.log('Not enough credit to buy');
      }
    } else {
      dispatch(increaseCredit(amount));
      console.log(credit);
    }
  };
  function checkIfNaN(amount: any) {
    if (amount) return parseInt(amount)
    else return 0;
  }
  const buyStock = () => {
    console.log(Data[Data.length - 1]);
    const stockDetails = {
      stockName: selectedCompany,
      price: Data[Data.length - 1].low,
      date: Data[Data.length - 1].time,
      quantity: 1
    };
    dispatch(setSelectedStocks(stockDetails));
    BuySell(stockDetails.price, true)


  };
  const options = companyNames?.map((companyName: any) => ({
    value: companyName.SYMBOL,
    label: `${companyName.SYMBOL}, ${companyName["NAME OF COMPANY"]}`,
  }));
  return (
    <div className="bg-white h-full">
      <div className="reccomend flex justify-center">
        <p>
          Recommendation:
          <span className={recommendation?.RECOMMENDATION === 'BUY' ? 'text-green-500' : 'text-red-500'}>
            <span className="text-lg"> {recommendation?.RECOMMENDATION} </span>
          </span>
          <br />
          <span className="px-2"> <span className="text-md ">Sell </span>: {recommendation?.SELL} </span>
          <span className="px-2"> <span className="text-md ">Buy </span>: {recommendation?.BUY} </span>
          <span className="px-2"> <span className="text-md ">Neutral </span>: {recommendation?.NEUTRAL}</span>
        </p>
      </div>
      <div className="p-2 pb-0  flex justify-center items-center">
        <ReactSelect
          className="p-3 w-[10vw] rounded-md"
          name="period"
          id="period"
          options={dateOptions}
          defaultValue={dateOptions[2]}  // Set default value to '1d'
          onChange={(option) => setSelectedPeriod(option?.value)}  // Update selectedInterval when the selected option changes
        />
        <ReactSelect
          className="p-3 w-[30vw] rounded-md"
          name="companyName"
          id="company"
          value={options?.find((option) => option.value === selectedCompany)}
          onChange={(option) => setSelectedCompany(option?.value)}
          options={options}
          isSearchable
        />

        <button
          className=" px-3 py-3 rounded-xl shadow-xl bg-slate-700 text-white font-bold"
          onClick={() => fetchData(`${selectedCompany}`)}
        >
          Get Data
        </button>


      </div>
      <div className="filters  mb-5 flex justify-center items-center">

        <button
          className="p-3 ml-2 rounded-xl shadow-md bg-green-600 text-white font-bold"
          onClick={buyStock}
        >
          Buy
        </button>
      </div >
      <div className="min-h-screen min-w-[100vw] flex justify-center items-center -translate-y-2">
        <div
          className="overflow-clip rounded-2xl w-min flex justify-center items-center"
          id="tvchart"
          ref={chartContainerRef}
        ></div>
      </div>
    </div >
  );
};
export default Dashboard2;
