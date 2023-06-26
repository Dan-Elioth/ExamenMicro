
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [registerMode, setRegisterMode] = useState(false);

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:9090/auth/login", {
        userName: userName,
        password: password,
      });
      // Procesar la respuesta del backend, por ejemplo, guardar el token en el almacenamiento local
      const token = response.data.token;
      console.log("Guardado exitoso");
      console.log("token", token);
      // Almacenar el token en el almacenamiento local
      localStorage.setItem("token", token);
      navigate("/category");
      window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setUserName("");
      setPassword("");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      setShowErrorMessage(true);
      return;
    }
    try {
      const response = await axios.post("http://localhost:9090/auth/create", {
        userName: userName,
        password: password,
      });
      console.log("Registro exitoso");
      console.log(response);
      setRegisterMode(false);
    } catch (error) {
      console.error(error);
    } finally {
      setUserName("");
      setPassword("");
      setRepeatPassword("");
    }
  };

  const handleRepeatPasswordChange = (e) => {
    setRepeatPassword(e.target.value);
    if (showErrorMessage) {
      setShowErrorMessage(false);
    }
  };

  return (
    <>
      

     
  

<div class="bg-gray-900">
        <div className="p-3 text-center">
                    <div className="flex justify-between">
                    <a
                        href="/inicio"
                        className="bg-cyan-500 shadow-lg shadow-cyan-500/50 inline-flex items-center px-3 py-1 bg-white rounded-lg font-normal text-xs text-gray-700 uppercase hover:text-gray-900 focus:outline-none active:text-white active:bg-gray-800 disabled:opacity-25 transition"
                    >
                        <i className="pi pi-arrow-left mr-0 "></i>
                        <b className="ml-1"> Back</b>
                        
                    </a>
                    <div></div>
                    </div>
                </div>
        <div className="w-full">

    
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="sombra w-full bg-white rounded-xl border max-w-sm border-gray-300 bg-opacity-100">
              <div className="p-6 space-y-5">
                
                <x-validation-errors />
                {registerMode ? (
                  <>
                    <span className="flex items-center justify-center text-lg font-semibold text-cyan-700">
                       <img
                        className="w-14 h-14 mr-2"
                        src='https://cdn-icons-png.flaticon.com/512/1040/1040254.png'
                        alt="logo"
                      /> 
                      <b>MiniMARKET</b>

                     
                      
                    </span>
                    

                    <div className="text-md font-normal md:text-base text-center">
                    <p class="mt-6 text-base font-bold text-gray-900">
                    Register new account
                    </p>
                    </div>
                    <form
                      className="flex flex-col gap-4"
                      onSubmit={handleRegister}
                      autoComplete="off"
                    >
                      <div className="">
                        <label className="block mb-2 text-sm font-normal">
                        <i className="pi pi-envelope"></i>
                            <b className="ml-1">Username</b>
                          
                        </label>
                        <label className="relative">
                          <input
                            type="userName"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="input-login text-xs sm:text-smshadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="usser"
                            required
                          />
                          <div className="absolute inset-y-0 left-0 pl-3 pt-1 flex items-center text-sm leading-5">
                            
                          </div>
                        </label>
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-normal text-gray-900">
                        <i className="pi pi-lock"></i>
                            <b className="ml-1">Password</b>
                          
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 pt-1 flex items-center text-sm leading-5">
                           
                          </div>
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                            placeholder="••••••••"
                            className="input-login text-xs sm:text-smshadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                            
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-normal text-gray-900">
                        <i className="pi pi-lock"></i>
                          <b className="ml-1">Register password</b>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 pt-1 flex items-center text-sm leading-5">
                            
                          </div>
                          <input
                            type="password"
                            value={repeatPassword}
                            onChange={handleRepeatPasswordChange}
                            required
                            autoComplete="new-password"
                            placeholder="••••••••"
                            className="input-login text-xs sm:text-smshadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                           
                          </div>
                        </div>
                        {showErrorMessage && (
                          <div className="text-red-500 text-xs pt-1">
                            {errorMessage}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-start">
                          <button
                            type="submit"
                            className="btn-ingresar text-sm  border border-gray-700 bg-gray-700 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-800 focus:outline-none focus:shadow-outline"
                          >
                            <div className="absolute left-0 inset-y-0 flex items-center pl-3 pt-1">
                              <i className="pi-arrow-circle-right"></i> 
                            </div>
                            Register
                            
                          </button>
                        </div>
                        <div className="flex items-start text-right">
                          <span
                            onClick={() => setRegisterMode(false)}
                            className="text-xs sm:text-sm font-base text-cyan-900 hover:underline hover:text-indigo-900 cursor-pointer"                          >
                            Already have an account? Sign in 
                          </span>
                        </div>
                      </div>
                    </form>
                  </>
                ) : (
                  <>
                    
                    <span className="flex items-center justify-center text-lg font-semibold text-cyan-700">
                    <img
                        className="w-14 h-14 mr-2"
                        src='https://cdn-icons-png.flaticon.com/512/1040/1040254.png'
                        alt="logo"
                      />
                      <b>MiniMARKET</b>
                      
                    </span>

                    <div className="text-md font-normal md:text-base text-center">
                        

                    <p class="mt-6 text-base font-bold text-gray-900">
                    Sign in
                    </p>

                        {/* <div className="cont-area top-1.5 rounded-b-lg">
                        <div className="flex gap-2">
                            <div className="flex-1 bg-cyan-800 h-0.5 rounded-md"></div>
                        </div>
                        </div> */}
                    </div>
                    <form
                      className="flex flex-col gap-4"
                      onSubmit={handleLogin}
                      autoComplete="off"
                    >
                      <div className="">
                        <label className="block mb-2 text-sm font-normal">
                        <i className="pi pi-envelope"></i>
                            <b className="ml-1">Username</b>
                          
                        </label>
                        <label className="relative">
                          <input
                            type="userName"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="input-login text-xs sm:text-smshadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="username"
                            required
                          />
                          <div className="absolute inset-y-0 left-0 pl-3 pt-1 flex items-center text-sm leading-5">
                            
                          </div>
                        </label>
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-normal text-gray-900">

                        <span><i className="pi pi-lock"></i></span>
                            
                            <b className="ml-1">Password</b>
                            
                         
                        </label>
                        
                        <div className="relative">
                        
                          <div className="absolute inset-y-0 left-0 pl-3 pt-1 flex items-center text-sm leading-5">
                          
                          </div>
                          
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                            placeholder="•••••••• " 
                            className="input-login text-xs sm:text-smshadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                          /> 
                          
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                            
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <a
                            href="{{ route('password.request') }}"
                            className="text-xs sm:text-sm font-base text-gray-50 hover:underline hover:text-green-500"
                          >
                            _
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                      <div className="flex items-start text-right">
                          <span
                            onClick={() => setRegisterMode(true)}
                            className="text-xs sm:text-sm font-base text-cyan-900 hover:underline hover:text-indigo-900 cursor-pointer"
                          >
                            Don't have an account? <br></br>
                            Register here
                          </span>
                        </div>
                        <div className="flex items-start">
                          <button
                            type="submit"
                            className="btn-ingresar text-sm border border-gray-700 bg-gray-700 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-800 focus:outline-none focus:shadow-outline"
                          >
                            <div className="absolute left-0 inset-y-0 flex items-center pl-3 pt-1">
                             
                            </div>
                            Log in
                          </button>
                        </div>
                        
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        
    </div>

        
        <div className="cont-area top-0 rounded-b-lg">
          <div className="flex gap-2">
            
            <div className="flex-1 bg-slate-800 h-1 rounded-md"></div>
        
          </div>
          
        </div>
        
        
      
    </>


  );
}

export default Login;