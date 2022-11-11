import React, { useState } from "react";
import Axios from 'axios'
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import ResetPassword from "../ResetPassword/ResetPassword";
import EmailConfirmation from "../EmailConfirmation/EmailConfirmation";

const LogIn = (props) => {
  const [input, setInput] = useState({ userName: '', password: '' });
  const [inputValid, setInputValid] = useState(false)
  const [forgotPasswordView, toggleForgotPasswordView] = useState(false);
  const [emailConfirmationView, toggleEmailConfirmationView] = useState(false);
  const [resetPasswordView, toggleResetPasswordView] = useState(false);

  const updateInput = (e) => {
    const { name, value } = e.target;
    const updated = { ...input, [name]: value };
    setInput(updated);
    setInputValid(updated.userName !== '' && updated.password !== '' && updated.userName !== '');
  };

  Axios.defaults.withCredentials = true

  const handleLogIn = async (e) => {
    console.log(input)
    if (inputValid) {
      await Axios.post("https://maptile1.herokuapp.com/user/login",
        {
          userName: input.userName,
          password: input.password,
        },
        {
          headers: { Cookie: "_id=5"}
        }
        )
        .then(function(response){
          props.handleLogIn(response.data.user);
        })
        .catch(function(error){
          console.log("YOOO")
          window.alert(error.response.data.errorMessage)
        })
    }
  }

  const handleSendEmailCode = (email) => {
      console.log(email);
  }

  return (!forgotPasswordView && !resetPasswordView && !emailConfirmationView) ? (
    <main
      class="mx-auto flex min-h-screen w-full items-center justify-center bg-maptile-background-dark text-white"
    >
      <div class="bg-maptile-purple flex w-[40rem] h-[33rem] justify-center align-middle shadow-md rounded-lg">
        <section class="flex w-[30rem] flex-col space-y-10 mt-10">
          <div class="text-center text-4xl font-medium">Log In</div>

          <div
            class="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500"
          >
            <input
              type="userName"
              name="userName"
              placeholder="User Name"
              class="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
              onChange={updateInput}
            />
          </div>

          <div
            class="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500"
          >
            <input
              type="password"
              name="password"
              placeholder="Password"
              class="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
              onChange={updateInput}
            />
          </div>

          <button onClick={handleLogIn}
            className={`${!inputValid ? 'transform rounded-sm py-2 font-bold duration-300 bg-maptile-red-unselected hover:bg-maptile-red rounded-xl' : 'transform rounded-sm py-2 font-bold duration-300 bg-maptile-green-highlight hover:bg-maptile-green rounded-xl'}`}
          >
            LOG IN
          </button>

          <button
            onClick={() => toggleForgotPasswordView(true)}
            class="transform text-center font-semibold text-white duration-300 hover:text-gray-300 underline"
          >FORGOT PASSWORD?
          </button>

          <p class="text-center text-lg">
            No account?
            <button onClick={() => props.handleCreateAccountView()}
              class="font-medium text-indigo-200 underline-offset-4 hover:underline ml-2"
            > Create One
            </button>
          </p>

          <button
          onClick={() => props.handleHomeScreenView()}
          className="transform text-center font-semibold text-white duration-300 hover:text-gray-300 underline"
                >Return
            </button>
        </section>
      </div>
    </main>
  ) 
  : 
  forgotPasswordView ? (
    <ForgotPassword 
    closeView={toggleForgotPasswordView}
    toggleEmailConfirmationView={toggleEmailConfirmationView}
    handleSendEmailCode={handleSendEmailCode}
    />
  )
  :
  emailConfirmationView ? (
    <EmailConfirmation
    toggleEmailConfirmationView={toggleEmailConfirmationView}
    toggleForgotPasswordView={toggleForgotPasswordView}
    toggleResetPasswordView={toggleResetPasswordView}
    />
  )
  :
  (
    <ResetPassword/>
  )
  ;
};

export default LogIn;
