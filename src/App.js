import { useEffect, useState } from "react";
import "./App.css";
import GoogleSheetTable from "./GoogleSheettable";
export default function App() {
   useEffect(() => {
    const reloadInterval = 10000; // 10 seconds in milliseconds

    const reloadPage = () => {
      window.location.reload(true); // Reloads the page from the server
    };

    const reloadTimer = setTimeout(reloadPage, reloadInterval);

    return () => {
      // Clear the timeout when the component is unmounted to avoid memory leaks
      clearTimeout(reloadTimer);
    };
  }, []);
  return (
    <div className="App">
      <GoogleSheetTable/>
    </div>
  );
}
