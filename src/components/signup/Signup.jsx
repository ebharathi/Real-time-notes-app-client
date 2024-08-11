import { MdEmail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { SignUp } from "../../utils/api";
import { useNavigate } from "react-router-dom";
const Signup = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({ email: "", name: "", password: "" });
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [error, setError] = useState("");
    const [btnLoader, setBtnLoader] = useState("SIGN UP");
    const handleSignup = () => {
        setBtnLoader("PLEASE WAIT..")
        if (data.email.length < 5 || !data.email.includes("@")) {
            setEmailError("Email should have min. 5 character and includes @");
            setBtnLoader("SIGN UP");
            setTimeout(() => {
                setEmailError("")
            }, 5000);
            return;
        }
        if (data.password.length < 5) {
            setPasswordError("Password should have min. 5 characters");
            setBtnLoader("SIGN UP");
            setTimeout(() => {
                setPasswordError("")
            }, 5000);
            return;
        }
        SignUp(data.email, data.name, data.password).then((response) => {
            if (response.error == false) {
                localStorage.setItem("token", response.data.token);
                console.log("NEW USER CREATED");
                navigate("/home");
                return;
            } else {
                console.log("ERROR CREAATING USER :", response.message);
                setBtnLoader("SIGN UP");
                setError(response.message);
                setTimeout(() => {
                    setError("");
                }, 3000);

            }
        })
    }

    useEffect(() => {
        if (localStorage.getItem("token"))
            navigate("/home");
    }, [])

    return (
        <div className="h-screen flex justify-center items-center">
            <div className=" flex flex-col gap-4">
                <div className={`flex flex-row border-[1px] border-neutral-300 ${emailError != "" && "border-red-500"} px-2 rounded-3xl`}>
                    <div className="flex items-center">
                        <MdEmail className="text-[30px] text-primary-300" />
                    </div>
                    <div>
                        <input className={`px-8 py-4 outline-none rounded-xl min-w-[360px] `} type="email" placeholder="Enter Email" onChange={(e) => setData({ ...data, email: e.target.value })} />
                    </div>
                </div>
                {
                    emailError != "" &&
                    <div className="text-center text-red-500">
                        {emailError}
                    </div>
                }
                <div className={`flex flex-row border-[1px] border-neutral-300   px-2 rounded-3xl`}>
                    <div className="flex items-center">
                        <FaRegUserCircle className="text-[30px] text-primary-300" />
                    </div>
                    <div>
                        <input className="px-8 py-4 outline-none rounded-xl min-w-[360px]" type="text" placeholder="Enter Username" onChange={(e) => setData({ ...data, name: e.target.value })} />
                    </div>
                </div>
                <div className={`flex flex-row border-[1px] border-neutral-300 ${passwordError != "" && "border-red-500"}  px-2 rounded-3xl`}>
                    <div className="flex items-center">
                        <CiLock className="text-[30px] text-primary-300" />
                    </div>
                    <div>
                        <input className="px-8 py-4 outline-none rounded-xl min-w-[360px]" type="email" placeholder="Create Password" onChange={(e) => setData({ ...data, password: e.target.value })} />
                    </div>
                </div>
                {
                    passwordError != "" &&
                    <div className="text-center text-red-500">
                        {passwordError}
                    </div>
                }
                {
                    error != "" &&
                    <div className="text-center text-red-500">
                        {error}
                    </div>
                }
                <div className="text-center">
                    <button onClick={handleSignup} className="bg-primary-500 hover:bg-white hover:text-primary-500 hover:border-[1px] hover:border-primary-500 text-white  rounded-full px-5 py-2">{btnLoader}</button>
                </div>
                <div className="text-center">
                    <p>Already have an account? <a href="/login" className="text-primary-500">Login</a></p>
                </div>
            </div>
        </div>
    )
}


export default Signup;