// utils/fetchData.ts
const fetchData = async (buttonValue: string, selectedPeriod: string = '1mo') => {
  const params = {
    button_value: buttonValue,
    period: selectedPeriod
  };
  const response = await fetch("http://localhost:5000/get_data", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(params),
  });
  const data = await response.json();
  const parsedData = JSON.parse(data.data);
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
  return { data: cdata, recommend: data.recommend };
};

export default fetchData;