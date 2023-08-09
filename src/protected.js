import { useNavigate } from "react-router-dom";
const Protected = ({ isLoggedIn, children }) => {
    console.log(isLoggedIn);
    const navigate = useNavigate();
    if (!isLoggedIn) {
      return navigate("/login");
    }else{
        return children;
    }
    
  };
  export default Protected;