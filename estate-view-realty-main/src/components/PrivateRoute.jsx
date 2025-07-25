import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';// outlet is used to render child routes, Navigate is used for redirection

export default function PrivateRoute() {
  const { user } = useSelector((state) => state.user); 
  return user ? <Outlet /> : <Navigate to='/Signin' />;
}