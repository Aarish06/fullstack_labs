import { useState } from "react";

export function useFormInput(initialValue: string) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setError("");
  };

  const validate = (validator: (value: string) => string | null) => {
    const result = validator(value);

    if (result) {
      setError(result);
      return false;
    }

    setError("");
    return true;
  };

  return {
    value,
    error,
    onChange,
    validate,
    setError,
    setValue,
  };
}