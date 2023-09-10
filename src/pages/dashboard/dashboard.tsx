
import Popup from "./components/popup";
import Teamboard from "./components/teamBoard";
import { getHeros } from "../../reducers/predictReducer/predictAPI";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../..";
import Results from "./components/results";

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getHeros({}));
    
  }, []);
  return (
    <div
      style={{
        width: "100%",
        backgroundPosition: "center",
        backgroundImage: `url(${"/images/other/dashboard_background.jpg"})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        textAlign: "center",
        
      }}
    >
      <Popup/>
      <Teamboard/>
      <Results/>

    </div>
  );
}
