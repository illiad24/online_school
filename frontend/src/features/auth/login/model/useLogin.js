import { useLoginMutation } from '../../api/authApi'

export function useLogin() {
    const [loginMutation, { isLoading, error }] = useLoginMutation()
    console.log('error', error)
    async function login(credentials) {
        const result = await loginMutation(credentials).unwrap()
        return result
    }
    return { login, isLoading, error }
}