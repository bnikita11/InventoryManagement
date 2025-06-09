import { useState } from "react";
import  AuthService  from "../appwrite/auth";
import {EyeClosed,EyeIcon} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Signup(){


    const navigate=useNavigate("");
    const [username,setUsername]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [showPassword,setShowPassword]=useState(false);
    const [showConfirmPassword,setShowConfirmPassword]=useState(false);
    const [confirmPassword,setConfirmPassword]=useState("");
    const [usernameError,setUsernameError]=useState("");
    const [emailError,setEmailError]=useState("");
    const [passwordError,setPasswordError]=useState("");
    const [confirmPasswordError,setConfirmPasswordError]=useState("");


    const handleUsernameChange=(e)=>{
        setUsername(e.target.value);
        setEmailError("");
    }

    const handlePasswordChange=(e)=>{
        setPassword(e.target.value);
        setPasswordError("");

    }

    const handleEmailChange=(e)=>{
        setEmail(e.target.value);
        setEmailError("");
    }

    const handleConfirmPasswordChange=(e)=>{
        setConfirmPassword(e.target.value);
        setConfirmPasswordError("");
    }

    const validateForm=()=>{
        let isValid=true;
        let usernameErrorMessage=""
        let emailErrorMessage="";
        let passwordErrorMessage="";
        let confirmPasswordErrorMessage="";

    if(!username.trim()){
        usernameErrorMessage="Username is required";
        isValid=false;
    }
    setUsernameError(usernameErrorMessage);

    if(!email.trim())
    {
        emailErrorMessage="Email is required";
        isValid=false;
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
        emailErrorMessage="invalid email address";
        isValid=false;
    }
    setEmailError(emailErrorMessage);

    if(!password.trim()){
        passwordErrorMessage="Password is required";
        isValid=false;
    }else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)){
        passwordErrorMessage="please enter strong password ";
        isValid=false;
    }
    setPasswordError(passwordErrorMessage);

    if(!confirmPassword.trim()){
        confirmPasswordErrorMessage="Confirm password is required";
        
    }
    else if(confirmPassword!==password){
        confirmPasswordErrorMessage="Password does not match";
        isValid=false;
    }
    setConfirmPasswordError(confirmPasswordErrorMessage);
    return(isValid);
}

   const handleSignUp=async(e)=>{
    e.preventDefault();
    if(validateForm){
        try {
            const response=await AuthService.createAccount({email,password,username});
            console.log(response);
            // navigate("/login");
            
        } catch (error) {
            console.error("signing up error",error)
            
        }
    }
    
   };


    return(
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-purple-100 to bg-purple-400">
            <div className="container flex gap-5 flex-col justify-between items-center ">
                <h1 className="heading text-3xl text-black font-bold">Create an account</h1>
                <form onSubmit={handleSignUp} className="w-full flex flex-col justify-center bg-white max-w-md mx-auto rounded-xl p-6 space-y-6">
                    <div className="relative">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-900 mb-1">Username</label>
                        <span className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-center text-gray-600">
                            
                        </span>
                        <input type="username"
                               id="username"
                               value={username || "" }
                               onChange={handleUsernameChange}
                               placeholder="Roronoa Zoro"
                               required
                               className={`w-full h-[40px] pl-10 pr-4 rounded-md shadow-md border-2, ${usernameError && "border-red-500 focus:ring-red-500 focus:border-red-500"}`} 
                               />
                               {usernameError && <p className="text-red-500 text-sm mt-1 ">{usernameError}</p>}
                    </div>
                    <div className="relative">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-1">Email address</label>
                        <span className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-center text-gray-600">

                        </span>
                        <input type="email"
                               id="email"
                               value={email || "" }
                               onChange={handleEmailChange}
                               placeholder="monkeydluffy12@...."
                               required
                               className={`w-full h-[40px] pl-10 pr-4 rounded-md  shadow-md border-2, ${emailError && "border-red-500 focus:ring-red-500 focus:border-red-500"}`}
                                />
                                {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                    </div>
                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-1">Password</label>
                        <span  onClick={() => setShowPassword(prev => !prev)} className="absolute inset-y-0  pr-3 pt-3 right-0 mt-4  flex items-center text-gray-600">
                                      {showPassword ? <EyeIcon size={20} /> : <EyeClosed size={20} />}
                        </span>
                        <input type={showPassword ? "text" : "password"}
                               id="password"
                               value={password || "" }
                               onChange={handlePasswordChange}                             
                               placeholder="password.."
                               required
                               className={`w-full h-[40px] pl-10 pr-4 rounded-md  shadow-md , ${passwordError && "border-red-500 focus:ring-red-500 focus:border-red-500"}`}
                                />
                                {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError} </p>}
                    </div>
                    <div className="relative">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900 mb-1">Confirm Password</label>
                        <span onClick={() => setShowConfirmPassword(prev => !prev)} className="absolute inset-y-0 pl-3 right-0 pr-3 pt-3 mt-4 flex items-center text-gray-600">
                                {showConfirmPassword ? <EyeIcon size={20} /> : <EyeClosed size={20} />}
                        </span>
                        <input type={showConfirmPassword ? "text" : "password"}
                               id="confirmPassword"
                               value={confirmPassword  || "" }
                               onChange={handleConfirmPasswordChange}
                               placeholder="confirm password"
                               required
                               className={`w-full h-[40px] pl-10 pr-4 rounded-md  shadow-md , ${confirmPasswordError && "border-red-500 focus:ring-red-500 focus:border-red-500"}`}
                                />
                                {confirmPasswordError && <p className="text-red-500 text-sm mt-1">{confirmPasswordError} </p>}
                    </div>
                    <button type="submit" onClick={()=>{navigate("/login")}} className="w-full h-[40px] pl-10 pr-4 text-white bg-[#583D72] rounded-md text-lg font-semibold">Sign Up</button>

                </form>
                <div className="flex items-center justify-center-safe mt-7 text-md text-gray-700">
                        Already have an account?{' '}
                        <button type="button" onClick={()=>{navigate("/login")}} className="text-white ml-1 hover:underline font-medium">
                            Sign in
                        </button>
                    </div>
            </div>
        </div>
    )
}
export default Signup;