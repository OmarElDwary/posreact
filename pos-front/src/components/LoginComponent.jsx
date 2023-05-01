import React from 'react'

const style = {
    form: "flex flex-end items-center h-screen text-center bg-[#74b9ff] border-10 p-10 border-blue-500 rounded-md shadow-md",
    formGroup: "flex flex-col justify-center items-center",
    input: "border border-gray-400 rounded-md p-2 m-2 w-64",
    button: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center  w-64",
    link: "flex justify-between items-center w-64"
}

function LoginComponent() {
  return (
    <div>
        <form className={style.form}>
            <div className={style.formGroup}>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" className={style.input} />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" className={style.input} />
                <button className={style.button}>Login</button>
                <div className={style.link}>
                    <a href="#" className={style.link}>Forgot Password?</a>
                    <a href="#" className={style.link}>Create Account</a>
                </div>
            </div>
        </form>
    </div>
  )
}

export default LoginComponent