import { EyeClosed, EyeIcon } from "lucide-react";
import { useState} from "react";
import { useNavigate } from "react-router-dom";
import  AuthService  from "../appwrite/auth";
import {useDispatch} from "react-redux";
import { login as authLogin } from "../store/authSlice";

function Login(){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [showPassword,setShowPassword]=useState(false);
    const navigate=useNavigate();
    const dispatch=useDispatch();



    const handleChangePassword=(e)=>{
        setPassword(e.target.value);
    }

    const handleEmailChange=(e)=>{
        setEmail(e.target.value);
    }
    const handleLogin=async(e)=>{
        e.preventDefault();
        try {
            
            const session=await AuthService.login({email,password})
            if(session){
                const userData=await AuthService.getCurrentUser();
                if(userData) dispatch(authLogin(userData));
                navigate("/");
            }
        } catch (error) {
            console.error("login error",error)
            
        }
    }

    return(
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-purple-100 to bg-purple-400">
            <div className="container flex gap-5 flex-col justify-between items-center ">
                <h1 className="heading text-3xl text-black font-bold">Login</h1>
                <form onSubmit={handleLogin} className="w-full flex flex-col justify-center bg-white max-w-md mx-auto rounded-xl p-6 space-y-6">
                    <div className="relative">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-1">Email</label>
                        <span className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-center text-gray-600">

                        </span>
                        <input type="email"
                           id="email"
                           value={email}
                           onChange={handleEmailChange}
                           placeholder="enter your email.."
                           required
                           className="w-full h-[40px] pl-10 pr-4 rounded-md shadow-md "
                            />

                    </div>
                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-1">Password</label>
                        <span onClick={()=>setShowPassword(prev=>!prev)} className="absolute inset-y-0 right-0 pr-3 pt-3 mt-4   flex items-center text-gray-600">
                            {showPassword ? <EyeIcon/> : <EyeClosed/> }
                        </span>
                        <input type={showPassword ? "text" : "password"}
                               id="password"
                               value={password}
                               onChange={handleChangePassword}
                               required
                               placeholder="enter your password...."
                               className="w-full h-[40px] pl-10 pr-4 rounded-md shadow-md " />
                    </div>
                    <div className="text-right">
                        <button type="button" className="text-gray-600 text-sm hover:underline">Forgot Password?</button>
                    </div>
                    <button type="submit" className="w-full h-[40px] pl-10 pr-4 text-white bg-[#583D72] rounded-md text-lg font-semibold items-center">Login</button>
                </form>
                <div className="flex items-center justify-center-safe mt-7 text-md text-gray-700">
                        Don't have an account?{' '}
                        <button type="button" onClick={()=>{navigate("/sign-up")}} className="text-white ml-1 hover:underline font-medium">
                            Sign up
                        </button>
                    </div>
            </div>
        </div>





    )

}
export default Login;