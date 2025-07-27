import React, { useState } from "react";
import { Client, ID, Account, Databases } from 'appwrite';
import { Link } from "react-router";
import toast from 'react-hot-toast';
import { client, account } from '../../appwrite/config';
import { useNavigate } from "react-router";
import Swal from 'sweetalert2';
import { Code, Terminal, Lock, Mail, ArrowRight, Github, Zap, User, UserPlus, Shield, Check } from 'lucide-react';

function Signup() {
    const [loading, setLoading] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    // Focus states for enhanced UX
    const [firstNameFocused, setFirstNameFocused] = useState(false);
    const [lastNameFocused, setLastNameFocused] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

    const navigate = useNavigate();

    
    const getPasswordStrength = () => {
        if (password.length === 0) return { strength: 0, text: '' };
        if (password.length < 6) return { strength: 1, text: 'Weak', color: 'bg-red-500' };
        if (password.length < 10) return { strength: 2, text: 'Medium', color: 'bg-yellow-500' };
        return { strength: 3, text: 'Strong', color: 'bg-green-500' };
    };

    const passwordStrength = getPasswordStrength();

    async function handleSubmit() {
        setName(firstName + lastName);
        setLoading(true);
        try {
           
            setTimeout(() => {
                
                setLoading(false);
                setEmail("");
                setFirstName("");
                setLastName("");
                setPassword("");
            }, 2000);

           
            
            const response = await account.create(ID.unique(), email, password, firstName + lastName);
            console.log(response);

            setEmail("");
            setFirstName("");
            setLastName("");
            setPassword("");

            Swal.fire({
                title: 'Account Created! 🎉',
                text: 'Your account has been successfully created. Please log in to continue.',
                icon: 'success',
                confirmButtonText: 'Proceed to Login',
                timer: 2500,
                showConfirmButton: true,
                position: 'center',
                background: '#f0f9ff',
                color: '#0f172a',
                iconColor: '#10b981'
            });
            setLoading(false);
            navigate('/login');
            
        } catch (error) {
            alert('Signup failed: ' + (error.message || 'Please try again'));
            setLoading(false);
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
            <div className="relative z-10 w-full max-w-lg">
                

                {/* Signup form */}
                <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
                    <div className="space-y-6">
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-semibold text-white mb-2">Create your account</h2>
                            <p className="text-slate-400">Join thousands of developers already using ByteCode</p>
                        </div>

                        {/* Features highlight */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="text-center p-3 bg-slate-900/30 rounded-xl border border-slate-700/30">
                                <Shield className="w-6 h-6 text-green-400 mx-auto mb-2" />
                                <p className="text-xs text-slate-400">Secure</p>
                            </div>
                            <div className="text-center p-3 bg-slate-900/30 rounded-xl border border-slate-700/30">
                                <Code className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                                <p className="text-xs text-slate-400">Dev-First</p>
                            </div>
                            <div className="text-center p-3 bg-slate-900/30 rounded-xl border border-slate-700/30">
                                <Zap className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                                <p className="text-xs text-slate-400">Fast</p>
                            </div>
                        </div>

                        {/* Name fields */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-300">
                                    <User className="w-4 h-4 inline mr-2" />
                                    First Name
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="John"
                                        className={`w-full h-12 px-4 bg-slate-900/50 border-2 rounded-xl text-white placeholder-slate-500 transition-all duration-300 focus:outline-none ${
                                            firstNameFocused || firstName 
                                                ? 'border-purple-500 shadow-lg shadow-purple-500/20' 
                                                : 'border-slate-600 hover:border-slate-500'
                                        }`}
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        onFocus={() => setFirstNameFocused(true)}
                                        onBlur={() => setFirstNameFocused(false)}
                                    />
                                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/20 to-blue-600/20 -z-10 transition-opacity duration-300 ${
                                        firstNameFocused || firstName ? 'opacity-100' : 'opacity-0'
                                    }`}></div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-300">
                                    <User className="w-4 h-4 inline mr-2" />
                                    Last Name
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Doe"
                                        className={`w-full h-12 px-4 bg-slate-900/50 border-2 rounded-xl text-white placeholder-slate-500 transition-all duration-300 focus:outline-none ${
                                            lastNameFocused || lastName 
                                                ? 'border-purple-500 shadow-lg shadow-purple-500/20' 
                                                : 'border-slate-600 hover:border-slate-500'
                                        }`}
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        onFocus={() => setLastNameFocused(true)}
                                        onBlur={() => setLastNameFocused(false)}
                                    />
                                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/20 to-blue-600/20 -z-10 transition-opacity duration-300 ${
                                        lastNameFocused || lastName ? 'opacity-100' : 'opacity-0'
                                    }`}></div>
                                </div>
                            </div>
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
                                    placeholder="john.doe@bytecode.com"
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

                        {/* Password field with strength indicator */}
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
                            
                            {/* Password strength indicator */}
                            {password && (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 bg-slate-700 rounded-full h-2">
                                            <div 
                                                className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                                                style={{ width: `${(passwordStrength.strength / 3) * 100}%` }}
                                            ></div>
                                        </div>
                                        <span className={`text-xs font-medium ${
                                            passwordStrength.strength === 1 ? 'text-red-400' :
                                            passwordStrength.strength === 2 ? 'text-yellow-400' : 'text-green-400'
                                        }`}>
                                            {passwordStrength.text}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-500">
                                        Minimum 8 characters recommended
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Terms checkbox */}
                        <div className="flex items-start gap-3 p-4 bg-slate-900/30 rounded-xl border border-slate-700/30">
                            <div className="flex items-center h-5">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500 focus:ring-2"
                                />
                            </div>
                            <div className="text-sm">
                                <p className="text-slate-300">
                                    I agree to the{' '}
                                    <a href="#" className="text-purple-400 hover:text-purple-300 underline">Terms of Service</a>
                                    {' '}and{' '}
                                    <a href="#" className="text-purple-400 hover:text-purple-300 underline">Privacy Policy</a>
                                </p>
                            </div>
                        </div>

                        {/* Create account button */}
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-slate-600 disabled:to-slate-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/25 disabled:scale-100 disabled:shadow-none flex items-center justify-center gap-2 group"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Creating Account...</span>
                                </>
                            ) : (
                                <>
                                    <UserPlus className="w-5 h-5" />
                                    <span>Create Account</span>
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

                        {/* GitHub signup button (placeholder) */}
                        <button className="w-full h-12 bg-slate-900/50 border-2 border-slate-600 hover:border-slate-500 text-white font-medium rounded-xl transition-all duration-300 hover:bg-slate-700/50 flex items-center justify-center gap-3">
                            <Github className="w-5 h-5" />
                            <span>Continue with GitHub</span>
                        </button>

                        {/* Footer links */}
                        <div className="text-center space-y-2 pt-4">
                            <p className="text-slate-400">
                                Already have an account?{' '}
                                <a 
                                    href="/login" 
                                    className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200 hover:underline"
                                >
                                    Sign in
                                </a>
                            </p>
                        </div>
                    </div>
                </div>

               
            </div>

            <style>{`
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

export default Signup;