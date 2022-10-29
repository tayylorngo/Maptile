import React, { } from 'react';

const CreateAccount = (props) => {

    return (
        <main
            class="mx-auto flex min-h-screen w-full items-center justify-center bg-gray-900 text-white"
        >
            <div class="bg-maptile-purple flex w-[40rem] h-[35rem] justify-center align-middle">
                <section class="flex w-[30rem] flex-col space-y-10 mt-10">
                    <div class="text-center text-4xl font-medium">Create Account</div>

                    <div
                        class="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500"
                    >
                        <input
                            type="text"
                            placeholder="Username"
                            class="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                        />
                    </div>

                    <div
                        class="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500"
                    >
                        <input
                            type="email"
                            placeholder="Email"
                            class="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                        />
                    </div>
                    <div
                        class="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500"
                    >
                        <input
                            type="password"
                            placeholder="Password"
                            class="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                        />
                    </div>
                    <div
                        class="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500"
                    >
                        <input
                            type="confirmpassword"
                            placeholder="Confirm Password"
                            class="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                        />
                    </div>

                    <button onClick={() => props.handleLogIn()}
                        class="transform rounded-sm bg-maptile-green-highlight py-2 font-bold duration-300 hover:bg-maptile-green"
                    >
                        Register
                    </button>

                    <button
                        onClick={() => props.handleHomeScreenView()}
                        class="transform text-center font-semibold text-white duration-300 hover:text-gray-300"
                    >Return
                    </button>


                </section>
            </div>
        </main>

    )
}

export default CreateAccount