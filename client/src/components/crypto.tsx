import { useEffect } from "react";
import socketIOClient from "socket.io-client";

function Crypto() {
    useEffect(() => {
        const socket = socketIOClient("http://127.0.0.1:5000");

        socket.on("connect", () => {
            console.log("Connected to server");
        });

        // socket.on("message", (data) => {
        //   console.log("Received message:", data);
        //   // Handle incoming messages here
        // });

        // socket.on("disconnect", () => {
        //   console.log("Disconnected from server");
        // });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div>
            <h1>Crypto Data</h1>
        </div>
    );
}

export default Crypto;