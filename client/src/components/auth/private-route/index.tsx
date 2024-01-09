import { useSelector } from "react-redux";
import { Navigate,  useLocation } from "react-router-dom";
import { selectCurrentToken } from "src/store/auth-slice";

interface PrivateRouteProps {
  children: React.ReactNode;
}
export default function PrivateRoute({ children }: PrivateRouteProps) {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

  return token ? (
    children
  ) : (
    <Navigate to={"/auth/login"} state={{ return_url: location.pathname }} replace />
  );
}
