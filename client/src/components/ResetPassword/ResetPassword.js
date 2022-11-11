import React, { useState } from "react";

const ResetPassword = (props) => {

    const [inputValid, setInputValid] = useState(false)
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const checkValidPassword = (password, confirmPassword) => {
        if(password === confirmPassword){
            setInputValid(true);
        }
    }

    const handlePasswordInput = (event) => {
        setPassword(event.target.value);
        checkValidPassword(password, confirmPassword);
    }

    const handleConfirmPasswordInput = (event) => {
        setConfirmPassword(event.target.value);
        checkValidPassword(password, confirmPassword);
    }

    return (
        <main
        class="mx-auto flex min-h-screen w-full items-center justify-center bg-maptile-background-dark text-white"
      >
        <div class="bg-maptile-purple flex w-[40rem] h-[22rem] justify-center align-middle shadow-md rounded-lg">
          <section class="flex w-[30rem] flex-col space-y-10 mt-10">
            <div class="text-center text-4xl font-medium">Create New Password</div>

            <div
              class="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500"
            >
              <input
                type="password"
                name="password"
                placeholder="Enter new password"
                class="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                onChange={handlePasswordInput}
              />
            </div>

            <div
              class="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500"
            >
              <input
                type="password"
                name="password"
                placeholder="Confirm new password"
                class="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                onChange={handleConfirmPasswordInput}
              />
            </div>

            <button 
            className={`${!inputValid ? 'transform rounded-sm py-2 font-bold duration-300 bg-maptile-red-unselected hover:bg-maptile-red rounded-xl' : 'transform rounded-sm py-2 font-bold duration-300 bg-maptile-green-highlight hover:bg-maptile-green rounded-xl'}`}
          >
            UPDATE PASSWORD
          </button>

          </section>
        </div>
      </main>
    );
}

export default ResetPassword;