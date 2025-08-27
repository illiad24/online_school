import { useSignupMutation } from '../../api/authApi'

export function useSignUp() {
    const [signUpMutation, { isLoading, error }] = useSignupMutation()
    async function signUp(credentials) {
        const result = await signUpMutation(credentials).unwrap()
        return result
    }
    return { signUp, isLoading, error }
}