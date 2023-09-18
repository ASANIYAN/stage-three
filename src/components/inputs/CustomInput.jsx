/* eslint-disable react/prop-types */
import { ErrorMsg } from "../../alert/ErrorMsg";
import { InputWrap, labelStyling } from "./InputStyles";

export const CustomInput = ({ method, name, label, ...rest }) => {
    const {
      formState: { errors },
      register,
    } = method;



    return (
        <>
          <InputWrap>
            <label style={labelStyling}> {label} </label>
            <input
            {...register(`${name}`)}
             className="focus:outline-none"
             name={name}
             {...rest}
            />
            { errors[name] && <ErrorMsg msg={errors[name].message} /> }
          </InputWrap>
        </>
      );
}