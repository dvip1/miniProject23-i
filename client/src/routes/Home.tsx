import "../components/homeStyles.css";

export default function Home() {
  const fetchData = async (buttonValue: string) => {
    const response = await fetch("http://localhost:5000/get_data", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        button_value: buttonValue,
      }),
    });
    const data = await response.json();
    console.log(data);
  };
  return (
    <>
      <div className="my-container">
        <div className="center">
          <h1>Welcome to TradeVista</h1>
          <p className="description text-3xl">
            Your gateway to Financial Proficiency
          </p>
          <div className="info">
            <p className="text-white text-xl font-bold">
              Your gateway to a risk-free and educational trading experience.
              Our paper trading app combines cutting-edge technology with a
              user-friendly interface to help you hone your investment skills,
              explore financial markets, and make informed decisions without
              risking real capital. Whether you're a novice or an experienced
              trader, Catalyst Trading provides a realistic trading environment,
              educational resources, real-time market data, and risk management
              tools to support your financial growth.
            </p>
          </div>
          <button onClick={() => fetchData("AAPL")}>Test Button</button>
        </div>
      </div>
    </>
  );
}
