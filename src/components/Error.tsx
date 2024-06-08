import { useLocation } from "react-router-dom";

function Error() {
  const location = useLocation();
  const { errorMessage } = location.state || "Error not defined.";
  return <div>Error occured:{errorMessage}</div>;
}

export default Error;
