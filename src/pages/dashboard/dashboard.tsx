
import Teamboard from "./components/teamBoard";

export default function Dashboard() {
  
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
      <Teamboard/>
    </div>
  );
}
