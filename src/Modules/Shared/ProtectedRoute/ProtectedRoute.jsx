import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export default function ProtectedRoute({ loginData, children }) {
  if (localStorage.getItem('Token') || loginData) {
    return children;
  } else {
    return <Navigate to='/login' />;
  }
}
