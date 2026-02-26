import { useNavigate } from "react-router-dom";
import Product from "./Product";
function Dashboard({ setIsAuth }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
      setIsAuth(false);

    navigate("/login");
  };

  return (
    <div>
      <h2>Welcome to Dashboard</h2>
      <Product />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;