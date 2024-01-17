import React from "react";

interface IOwnProps {
  typeInput: string;
  valueInput: string;
  callBackInput: (email: string) => void;
  placeholderValue: string;
}

const FormInput: React.FC<IOwnProps> = ({
  typeInput,
  valueInput,
  callBackInput,
  placeholderValue,
}) => {
  return (
    <div>
      <input
        type={typeInput}
        value={valueInput}
        onChange={(e) => callBackInput(e.target.value)}
        placeholder={placeholderValue}
        className="Form_Input"
      />
    </div>
  );
};

export default FormInput;
