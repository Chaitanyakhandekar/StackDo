import React, { useState, useEffect } from "react";
import { Client, Account, ID } from "appwrite";
import { Link } from 'react-router-dom';
import { setUserData } from "../../store/userSlice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { client, account } from '../../appwrite/config';
import Swal from 'sweetalert2';
import { Code, Terminal, Lock, Mail, ArrowRight, Github, Zap } from 'lucide-react';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userData);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(userData);
    }, [userData]);

    useEffect(() => {
        const clearExistingSessions = async () => {
            try {
                await account.get();
                await account.deleteSession('current');
                console.log("Session deleted.");
            } catch (error) {
                if (error.code === 401) {
                    console.log("No active session to delete.");
                } else {
                    console.warn("Error handling session:", error);
                }
            }
        };
        clearExistingSessions();
    }, []);

    function clearFields() {
        setEmail("");
        setPassword("");
    }

    async function handleLogin() {
        setLoading(true);
        try {
            // Simulate API call for demo
            setTimeout(() => {
                // alert('Login functionality would work with your Appwrite setup!');
                setLoading(false);
                clearFields();
            }, 2000);
            
            // Your original code (commented out for demo):
            
            const response = await account.createEmailPasswordSession(email, password);
            const session = await account.get();
            if (response && session) {
                localStorage.setItem('userId', response.userId);
                localStorage.setItem('appwriteUserId', response.$id);
                localStorage.setItem('createdAt', response.$createdAt);
                localStorage.setItem('updatedAt', response.$updatedAt);

                Swal.fire({
                    title: 'Login Successful!',
                    text: `Welcome back!`,
                    icon: 'success',
                    confirmButtonText: 'Continue',
                    timer: 2000,
                    showConfirmButton: false,
                    position: 'top-end',
                    toast: true
                });

                dispatch(setUserData({
                    userId: response.userId,
                    appwriteUserId: response.appwriteUserId,
                    createdAt: response.createdAt,
                    updatedAt: response.updatedAt,
                }));

                setLoading(false);
                navigate('/home');
            }
            
        } catch (error) {
            // Your original error handling:
            
            Swal.fire({
                title: 'Login Failed!',
                text: error.message || 'Invalid email or password',
                icon: 'error',
                confirmButtonText: 'Try Again'
            });
            
            alert('Login failed: ' + (error.message || 'Invalid email or password'));
            setLoading(false);
            clearFields();
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 font-urban relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
            </div>

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>

            {/* Main content */}
            <div className="relative z-10 w-full max-w-md">
                {/* Logo/Brand section */}
                {/* <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mb-4 shadow-2xl">
                        <Terminal className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-2">
                        ByteCode
                    </h1>
                    <p className="text-slate-400 text-lg">Developer's Task Manager</p>
                    <div className="flex items-center justify-center gap-2 mt-2 text-sm text-slate-500">
                        <Code className="w-4 h-4" />
                        <span>Organize • Build • Ship</span>
                        <Zap className="w-4 h-4" />
                    </div>
                </div> */}

                {/* Login form */}
                <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
                    <div className="space-y-6">
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-semibold text-white mb-2">Welcome back</h2>
                            <p className="text-slate-400">Enter your credentials to continue coding</p>
                        </div>

                        {/* Email field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-300">
                                <Mail className="w-4 h-4 inline mr-2" />
                                Email
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="developer@bytecode.com"
                                    className={`w-full h-12 px-4 bg-slate-900/50 border-2 rounded-xl text-white placeholder-slate-500 transition-all duration-300 focus:outline-none ${
                                        emailFocused || email 
                                            ? 'border-purple-500 shadow-lg shadow-purple-500/20' 
                                            : 'border-slate-600 hover:border-slate-500'
                                    }`}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={() => setEmailFocused(true)}
                                    onBlur={() => setEmailFocused(false)}
                                />
                                <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/20 to-blue-600/20 -z-10 transition-opacity duration-300 ${
                                    emailFocused || email ? 'opacity-100' : 'opacity-0'
                                }`}></div>
                            </div>
                        </div>

                        {/* Password field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-300">
                                <Lock className="w-4 h-4 inline mr-2" />
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder="••••••••••••"
                                    className={`w-full h-12 px-4 bg-slate-900/50 border-2 rounded-xl text-white placeholder-slate-500 transition-all duration-300 focus:outline-none ${
                                        passwordFocused || password 
                                            ? 'border-purple-500 shadow-lg shadow-purple-500/20' 
                                            : 'border-slate-600 hover:border-slate-500'
                                    }`}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => setPasswordFocused(true)}
                                    onBlur={() => setPasswordFocused(false)}
                                />
                                <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/20 to-blue-600/20 -z-10 transition-opacity duration-300 ${
                                    passwordFocused || password ? 'opacity-100' : 'opacity-0'
                                }`}></div>
                            </div>
                        </div>

                        {/* Login button */}
                        <button
                            onClick={handleLogin}
                            disabled={loading}
                            className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-slate-600 disabled:to-slate-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/25 disabled:scale-100 disabled:shadow-none flex items-center justify-center gap-2 group"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Authenticating...</span>
                                </>
                            ) : (
                                <>
                                    <span>Login</span>
                                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </button>

                        {/* Divider */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-600"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-slate-800 text-slate-400">or continue with</span>
                            </div>
                        </div>

                        {/* GitHub login button (placeholder) */}
                        <button className="w-full h-12 bg-slate-900/50 border-2 border-slate-600 hover:border-slate-500 text-white font-medium rounded-xl transition-all duration-300 hover:bg-slate-700/50 flex items-center justify-center gap-3">
                            <Github className="w-5 h-5" />
                            <span>Continue with GitHub</span>
                        </button>

                        {/* Footer links */}
                        <div className="text-center space-y-2 pt-4">
                            <p className="text-slate-400">
                                Don't have an account?{' '}
                                <a 
                                    href="/signup" 
                                    className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200 hover:underline"
                                >
                                    Create account
                                </a>
                            </p>
                            <p className="text-slate-500 hover:text-slate-400 cursor-pointer transition-colors duration-200">
                                Forgot password?
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom brand elements */}
                {/* <div className="text-center mt-8 space-y-2">
                    <div className="flex items-center justify-center gap-4 text-slate-500 text-sm">
                        <span>Trusted by 10k+ developers</span>
                        <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
                        <span>Enterprise grade security</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-xs text-slate-600">
                        <span>© 2024 ByteCode</span>
                        <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
                        <span>Terms</span>
                        <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
                        <span>Privacy</span>
                    </div>
                </div> */}
            </div>

            <style jsx>{`
                .bg-grid-white {
                    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.05)'%3e%3cpath d='m0 .5h32m-32 32v-32'/%3e%3c/svg%3e");
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
}

export default Login;