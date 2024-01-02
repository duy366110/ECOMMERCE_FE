import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authReload } from "./store/store.auth";
import { cartReload } from "./store/store.cart";
import './App.css';

function App() {
  const dispatch = useDispatch();

   // KIỂM TRA NGƯỜI DÙNG ĐĂNG NHẬP
   useEffect(() => {
    dispatch(cartReload());
    dispatch(authReload());

  }, [dispatch])

  return (
    <div>
      <Outlet />
    </div>
  );
}

export default App;