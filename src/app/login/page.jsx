"use client";

import { authClient } from "@/lib/auth-client";
import { ArrowRightToSquare } from "@gravity-ui/icons";
import { Form, TextField, Input, FieldError } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const handleGoogle = async () => {
    await authClient.signIn.social({
        provider: "google",
    });
};

const LoginPage = () => {
    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault();

        const user = Object.fromEntries(new FormData(e.currentTarget));
        console.log(user);

        const { data, error } = await authClient.signIn.email({
            email: user.email,
            password: user.password,
        });

        if (data) {
            toast.success("Signed in successfully!");
            router.push("/");
            router.refresh();
        } else {
            toast.error(error.message || "Failed to sign in");
        }
    };

    const validatePassword = (value) => {
        if (!value || value.length === 0) return "Password is required.";
        return null;
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-zinc-950 flex items-center justify-center p-4 transition-colors">
            <div className="w-full max-w-105 bg-white dark:bg-zinc-900 rounded-3xl shadow-xl dark:shadow-zinc-900 px-8 py-10 border border-transparent dark:border-zinc-800">

                {/* Logo */}
                <div className="flex justify-center mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-[#4f35e8] flex items-center justify-center shadow-lg">
                        <span className="text-white text-2xl font-bold">M</span>
                    </div>
                </div>

                <h1
                    className="text-center text-[1.65rem] font-extrabold text-[#0d1117] dark:text-white mb-1"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                    Welcome back
                </h1>
                <p
                    className="text-center text-sm text-gray-400 dark:text-zinc-500 mb-7"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                    Sign in to your MediQueue account.
                </p>

                {/* Form */}
                <Form onSubmit={onSubmit} className="flex flex-col gap-3">

                    {/* Email */}
                    <TextField isRequired name="email" type="email" className="w-full">
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-500">
                                <EmailIcon />
                            </span>
                            <Input
                                placeholder="Email address"
                                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#f4f5f9] dark:bg-zinc-800 border border-transparent focus:border-[#4f35e8] focus:bg-white dark:focus:bg-zinc-700 outline-none text-sm text-gray-700 dark:text-zinc-100 placeholder-gray-400 dark:placeholder-zinc-500 transition-all"
                            />
                        </div>
                        <FieldError className="text-xs text-red-500 mt-1 pl-1" />
                    </TextField>

                    {/* Password */}
                    <TextField isRequired name="password" type="password" validate={validatePassword} className="w-full">
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-500">
                                <LockIcon />
                            </span>
                            <Input
                                placeholder="Password"
                                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#f4f5f9] dark:bg-zinc-800 border border-transparent focus:border-[#4f35e8] focus:bg-white dark:focus:bg-zinc-700 outline-none text-sm text-gray-700 dark:text-zinc-100 placeholder-gray-400 dark:placeholder-zinc-500 transition-all"
                            />
                        </div>
                        <FieldError className="text-xs text-red-500 mt-1 pl-1" />
                    </TextField>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="mt-3 w-full flex items-center justify-center gap-2 bg-[#4f35e8] hover:bg-[#3d27c9] active:scale-95 text-white font-semibold text-sm rounded-2xl py-3.5 transition-all duration-200 shadow-md shadow-indigo-200 dark:shadow-indigo-900"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                        <ArrowRightToSquare />
                        Login
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-1">
                        <div className="flex-1 h-px bg-gray-200 dark:bg-zinc-700" />
                        <span className="text-xs text-gray-400 dark:text-zinc-500" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                            Or sign in with
                        </span>
                        <div className="flex-1 h-px bg-gray-200 dark:bg-zinc-700" />
                    </div>

                    {/* Google Button */}
                    <button
                        type="button"
                        onClick={handleGoogle}
                        className="w-full flex items-center justify-center gap-3 border border-gray-200 dark:border-zinc-700 hover:border-gray-300 dark:hover:border-zinc-600 hover:bg-gray-50 dark:hover:bg-zinc-800 active:scale-95 text-gray-700 dark:text-zinc-300 font-medium text-sm rounded-2xl py-3.5 transition-all duration-200"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                        <GoogleIcon />
                        Sign in with Google
                    </button>
                </Form>

                <p
                    className="text-center text-sm text-gray-400 dark:text-zinc-500 mt-6"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                    Don&apos;t have an account?{" "}
                    <Link href="/sign-up" className="text-[#4f35e8] dark:text-indigo-400 font-semibold hover:underline">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;

const EmailIcon = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
);

const LockIcon = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="11" x="3" y="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
);

const GoogleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
);