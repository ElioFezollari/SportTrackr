import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useRefreshToken from '../hooks/useRefreshToken';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true); 
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    let isMounted = true
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (e) {
        console.error(e);
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
    return () => isMounted = false
  }, []);

  return (
    <>
      {isLoading ? <p>Loading...</p> : <Outlet />}
    </>
  );
};

export default PersistLogin;
