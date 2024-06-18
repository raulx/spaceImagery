import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function Error() {
  const location = useLocation();
  const { errorMessage } = location.state || "Error not defined.";
  return (
    <div>
      Error occured:{errorMessage}
      <div className="text-blue-500">
        <Link to="/">Home</Link>
      </div>
    </div>
  );
}

export default Error;
