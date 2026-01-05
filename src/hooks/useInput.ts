import { useState } from "react";

export function useInput(
    validateFn: (value: string) => boolean
) {
    const [value, setValue] = useState('');
    const [isError, setIsError] = useState(false);
    const [isTouched, setIsTouched] = useState(false);

    const handleChange = (value: string) => {
        const isValid = validateFn(value);
        setIsError(!isValid)
        setValue(value);
    };

    const handleTouch = () => {
        setIsTouched(true);
    };

    return {
        value,
        error: isError && isTouched,
        isValid: !isError && value.trim().length > 0,
        handleChange,
        handleTouch
    }
};