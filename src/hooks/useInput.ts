import { useState } from "react";

export function useInput<T>(
    validateFn: (value: T) => boolean,
    initialValue: T
) {
    const [value, setValue] = useState<T>(initialValue);
    const [isError, setIsError] = useState(false);
    const [isTouched, setIsTouched] = useState(false);

    const handleChange = (value: T) => {
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
        handleChange,
        handleTouch
    }
};