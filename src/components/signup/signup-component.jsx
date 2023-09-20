import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";

import { CustomInput } from "../inputs/CustomInput";
import { ButtonHoverDark } from "../button/button";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../api/firebase-config/firebase-config";
import { ErrorMsg } from "../alert/ErrorMsg";
import { Link, useNavigate } from "react-router-dom";
import { SuccessToast } from "../toast/toasts";

const schema  = yup.object().shape({
    email: yup.string().email().required("email is required"),
    password: yup.string().required('password is required'),
});

const SignupComponent = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const method = useForm({
        resolver: yupResolver(schema)
    });
    const navigate = useNavigate();

    const { handleSubmit } = method;

    const handleClick = async (data) => {
        setLoading(true);
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(() => {
                setLoading(false);
                SuccessToast();
                setError("");
                navigate("/login");
            })
            .catch((error) => {
                setLoading(false);
                switch (error.code) {
                    case 'auth/weak-password':
                        setError("Password must be at least 6 charcaters.");
                        break;
                    case 'auth/email-already-in-use':
                        setError("email already exists.");
                        break;
                    default:
                        setError("user creation encountered an error.");
                        break;
                }
            });
    }


    return (
        <section className="max-w-[500px] mt-10 rounded-xl p-2 xs:p-3 md:p- mx-auto my-auto shadow-md">
            <h2 className="text-black text-xl sm:text-2xl text-center mt-2"> Signup </h2>
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
                        text={"Signup"}
                        handleClick={handleSubmit(handleClick)} 
                    />
                }
            </section>
            
            <p className="mt-2 text-lg text-center"> 
                Already have an account? 
                <Link className="cursor-pointer text-blue-600 font-bold" to={"/login"}> login </Link> 
            </p>

        </section>
    );
}
 
export default SignupComponent;