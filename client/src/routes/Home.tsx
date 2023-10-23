import "../components/homeStyles.css";
import HomeNav from "../components/partials/homeNav";
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
        <HomeNav />
        <div className="center">
          <h1>Welcome to TradeVista</h1>
          <p className="description">Your gateway to Financial Proficiency</p>
          <div className="info">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Dignissimos animi unde iure, vitae illum eligendi excepturi
              quaerat similique. Sapiente dolorum, earum eveniet exercitationem
              facilis ipsam voluptate aliquid corporis autem sint?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              reprehenderit fugiat ad voluptatem, odio{" "}
            </p>
          </div>
          <button onClick={() => fetchData("AAPL")}>Test Button</button>
        </div>
      </div>
    </>
  );
}
