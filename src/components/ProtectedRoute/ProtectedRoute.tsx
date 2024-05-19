import { PropsWithChildren } from "react";
import supabase from "../../../supabase.js";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  children,
}: PropsWithChildren): React.ReactElement => {
  const user = supabase.auth.getUser();
  const isLoading = !user;

  if (!user && !isLoading) {
    return <Navigate to={"/"} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
