/* eslint-disable react/prop-types */
import { useState } from "react";
import { InputWrap, labelStyling } from "./InputStyles";
import { Eye, EyeSlash } from "iconsax-react";
import { ErrorMsg } from "../alert/ErrorMsg";

export const CustomInput = ({ method, name, label, defaultType, ...rest }) => {
  const [isPassword, setIsPassword] = useState(defaultType); 
  const {
    formState: { errors },
    register,
  } = method;

  const togglePassword = () => {
      setIsPassword((prevInputType) => (prevInputType === 'text' ? 'password' : 'text'));
  };

  return (
      <>
        <InputWrap>
          <label style={labelStyling}> {label} </label>
          <input
          {...register(name)}
          className="focus:outline-none" 
          name={name}
           type={isPassword}
           {...rest}
          />
          { defaultType === 'password' && (
              <span 
                  onClick={togglePassword} 
                  className='absolute cursor-pointer translate-y-[42px] -translate-x-3 right-0'
              > 
                  {isPassword === "password" ? <Eye color="#848588"/> : <EyeSlash color="#848588"/> }
              </span>
          )}
          { errors && <ErrorMsg msg={errors[name]?.message ? errors[name]?.message : ""} /> }
        </InputWrap>
      </>
    );
}