export function validateLength(value: string, min: number, max: number) {
    return value.length >= min && value.length <= max;
}