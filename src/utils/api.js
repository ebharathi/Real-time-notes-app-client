import axios from "axios";

export const SignUp = async (email, name, password) => {
    try {
        const response = await axios.post("http://localhost:5000/user/signup", {
            email: email,
            name: name,
            password: password
        })
        return response.data;
    } catch (error) {
        console.log("ERROR IN SIGNIN");
    }
}
export const SignIn = async (email, password) => {
    try {
        const response = await axios.post("http://localhost:5000/user/login", {
            email: email,
            password: password
        })
        return response.data;
    } catch (error) {
        console.log("ERROR IN SIGNIN");
    }
}