import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";

import { CustomInput } from "../inputs/CustomInput";
import { ButtonHoverDark } from "../button/button";

const schema  = yup.object().shape({
    email: yup.string().email().required("email is required"),
    password: yup.string().required('password is required'),
});

const Login = () => {
    const method = useForm({
        resolver: yupResolver(schema)
    });

    const { handleSubmit } = method;

    const handleClick = (data) => {
        console.log(data);
    }


    return (
        <section className="max-w-[500px] mt-10 rounded-xl p-2 xs:p-3 md:p- mx-auto my-auto shadow-md">
            <h2 className="text-black text-lg sm:text-2xl text-center mt-2"> Login </h2>
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

            <section className="flex justify-center">
                <ButtonHoverDark 
                    text={"Login"}
                    handleClick={handleSubmit(handleClick)} 
                />
            </section>

        </section>
    );
}
 
export default Login;