import { MdEmail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignIn } from "../../utils/api";
const Login = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({ email: "", password: "" });
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [error, setError] = useState("");
    const [btnLoader, setBtnLoader] = useState("LOGIN");

    const handleLogin = async () => {
        setBtnLoader("PLEASE WAIT..");
        if (data.email.length < 5 || !data.email.includes("@")) {
            setEmailError("Email should have min. 5 characters and include @");
            setBtnLoader("LOGIN");
            setTimeout(() => {
                setEmailError("");
            }, 5000);
            return;
        }
        if (data.password.length < 5) {
            setPasswordError("Password should have min. 5 characters");
            setBtnLoader("LOGIN");
            setTimeout(() => {
                setPasswordError("");
            }, 5000);
            return;
        }
        await SignIn(data.email, data.password).then((response) => {
            console.log("LOG NN RESPOSNE: ", response);
            if (response.error == false) {
                localStorage.setItem("token", response.data.token);
                navigate("/home");
            } else {
                setError(response.message)
            }

        })


        console.log("Login logic not implemented yet.");
        setBtnLoader("LOGIN");
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="flex flex-col gap-4">
                <div className={`flex flex-row border-[1px] border-neutral-300 ${emailError && "border-red-500"} px-2 rounded-3xl`}>
                    <div className="flex items-center">
                        <MdEmail className="text-[30px] text-primary-300" />
                    </div>
                    <div>
                        <input className="px-8 py-4 outline-none rounded-xl min-w-[360px]" type="email" placeholder="Enter Email" onChange={(e) => setData({ ...data, email: e.target.value })} />
                    </div>
                </div>
                {
                    emailError &&
                    <div className="text-center text-red-500">
                        {emailError}
                    </div>
                }
                <div className={`flex flex-row border-[1px] border-neutral-300 ${passwordError && "border-red-500"} px-2 rounded-3xl`}>
                    <div className="flex items-center">
                        <CiLock className="text-[30px] text-primary-300" />
                    </div>
                    <div>
                        <input className="px-8 py-4 outline-none rounded-xl min-w-[360px]" type="password" placeholder="Enter Password" onChange={(e) => setData({ ...data, password: e.target.value })} />
                    </div>
                </div>
                {
                    passwordError &&
                    <div className="text-center text-red-500">
                        {passwordError}
                    </div>
                }
                {
                    error &&
                    <div className="text-center text-red-500">
                        {error}
                    </div>
                }
                <div className="text-center">
                    <button onClick={handleLogin} className="bg-primary-500 hover:bg-white hover:text-primary-500 hover:border-[1px] hover:border-primary-500 text-white rounded-full px-5 py-2">{btnLoader}</button>
                </div>
                <div className="text-center">
                    <p>Don't have an account? <a href="/signup" className="text-primary-500">Sign Up</a></p>
                </div>
            </div>
        </div>
    )
}

export default Login;
