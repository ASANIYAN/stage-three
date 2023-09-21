import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";

import { CustomInput } from "../inputs/CustomInput";
import { ButtonHoverDark } from "../button/button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../api/firebase-config/firebase-config";
import { SuccessToast } from "../toast/toasts";
import { useState } from "react";
import { ErrorMsg } from "../alert/ErrorMsg";

const schema  = yup.object().shape({
    email: yup.string().email().required("email is required"),
    password: yup.string().required('password is required'),
});

const LoginComponent = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const method = useForm({
        resolver: yupResolver(schema)
    });

    const { handleSubmit } = method;

    const handleClick = (data) => {
        setLoading(true);
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then(() => {
                setLoading(false)
                SuccessToast();
                navigate("/");
            })
            .catch((error) => {
                setLoading(false);
                switch (error.code) {
                    case 'auth/wrong-password':
                        setError('Incorrect password');
                        break;
                    case 'auth/user-not-found':
                        setError('no user associated with this email');
                        break;
                    case 'auth/invalid-login-credentials':
                        setError('invalid login details');
                        break;
                    default:
                        setError("error occurred.")
                        break;
                }
            })
    }


    return (
        <section className="max-w-[500px] mt-10 rounded-xl p-2 xs:p-3 md:p- mx-auto my-auto shadow-md">
            <h2 className="text-black text-xl sm:text-2xl text-center mt-2"> Login </h2>
            <section className="mt-2">
                <CustomInput 
                    label={"Email"} 
                    name={"email"} 
                    placeholder={"enter email"} 
                    method={method}
                    defaultType={"text"}
                />
                
                <CustomInput
                    method={method}
                    name={"password"}
                    label={"Password"}
                    placeholder={"enter password"}
                    defaultType={"password"}
                />
            </section>
            { error && 
                <section className="flex justify-center my-3">
                    <ErrorMsg msg={error} />
                </section>
            }

            <section className="flex justify-center">
                { loading 
                    ?
                    <ButtonHoverDark 
                        text={"Loading..."}
                    />
                    :
                    <ButtonHoverDark 
                        text={"Login"}
                        handleClick={handleSubmit(handleClick)} 
                    />
                }
            </section>

            <p className="mt-2 text-lg text-center"> 
                Don&apos;t have an account? 
                <Link className="cursor-pointer text-blue-600 font-bold" to={"/signup"}> sign-up </Link> 
            </p>

        </section>
    );
}
 
export default LoginComponent;