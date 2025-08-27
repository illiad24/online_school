import { SignUpForm } from "@/features/auth/signup";

function SignUpPage() {
    return (
        <div className="container container-center">
            <div>
                <SignUpForm title='SignUp' />
            </div>
        </div>
    );
}

export default SignUpPage;