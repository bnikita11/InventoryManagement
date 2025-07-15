import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import  AuthService  from '../appwrite/auth';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function LogOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userData); // Check user state

  const logoutHandler = async () => {
    try {
      await AuthService.logout();
      console.log("Logged out from Appwrite");

      dispatch(logout());
      console.log("Redux logout dispatched");

    //   const currentUser = await AuthService.getCurrentUser();
    //   console.log("After logout, current user:", currentUser); // Should be null

      navigate("/login");
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div>
      <button type="button" onClick={logoutHandler}>
        Logout (User: {user?.name || "None"})
      </button>
    </div>
  );
}

export default LogOut;
