import { createChart, CrosshairMode } from "lightweight-charts";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedStocks } from "../slices/selectedStocksSlice";

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
  const dispatch = useDispatch();

  const chartContainerRef = useRef<any>();

  const purchasedStocks = useSelector((state) => state.selectedStocks.data);

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
    await fetch("http://localhost:5000/get_data", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        button_value: buttonValue,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const parsedData = JSON.parse(data.data);
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

  const buyStock = () => {
    console.log(Data[Data.length - 1]);
    const stockDetails = {
      stockName: selectedCompany,
      price: Data[Data.length - 1].low,
      date: Data[Data.length - 1].time,
    };
    dispatch(setSelectedStocks(stockDetails));
    console.log(stockDetails);
  };

  const sellStock = () => {
    console.log(Data);
  };
  return (
    <div className="bg-[#343232] h-full">
      <div className="p-2 pb-0 mb-2 flex justify-center items-center">
        <select
          className="p-3 w-[30vw] rounded-md"
          name="companyName"
          id="company"
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
        >
          <option value="">Select Company</option>
          {companyNames?.map((companyName: any) => (
            <option key={companyName.SYMBOL} value={companyName.SYMBOL}>
              {companyName.SYMBOL}, {companyName["NAME OF COMPANY"]}
            </option>
          ))}
        </select>
        <button
          className="p-3 ml-2 rounded-xl shadow-md bg-slate-700 text-white font-bold"
          onClick={() => fetchData(`${selectedCompany}`)}
        >
          Get Data
        </button>
        <button
          className="p-3 ml-2 rounded-xl shadow-md bg-green-600 text-white font-bold"
          onClick={buyStock}
        >
          Buy
        </button>
        {purchasedStocks.name === selectedCompany ? (
          <button
            className="p-3 ml-2 rounded-xl shadow-md bg-red-500 text-white font-bold"
            onClick={sellStock}
          >
            Sell
          </button>
        ) : null}
      </div>
      <div className="min-h-screen min-w-[100vw] flex justify-center items-center -translate-y-2">
        <div
          className="overflow-clip rounded-2xl w-min flex justify-center items-center"
          id="tvchart"
          ref={chartContainerRef}
        ></div>
      </div>
    </div>
  );
};
export default Dashboard2;
