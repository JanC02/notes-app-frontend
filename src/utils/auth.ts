export function validateEmail(email: string) {
    return /^[\w.!#$%&'*+/=?^`{|}~-]+@[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?(?:\.[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?)*$/i.test(email);
}

export function validatePassword(password: string) {
    return password.length >= 8;
}