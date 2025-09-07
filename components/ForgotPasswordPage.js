import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import Card from './shared/Card';
import { forgotPassword } from '../src/services/apiService';
const ForgotPasswordPage = ({ onGoToLogin }) => {
    const [email, setEmail] = React.useState('');
    const [error, setError] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [message, setMessage] = React.useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setMessage(null);
        try {
            const { message } = await forgotPassword(email);
            setMessage(message);
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred.';
            setError(errorMessage);
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsx("div", { className: "w-full max-w-md animate-fade-in", children: _jsx(Card, { children: _jsxs("div", { className: "p-8", children: [_jsx("h2", { className: "text-2xl font-bold text-center text-gray-800 mb-2", children: "Reset Your Password" }), _jsx("p", { className: "text-center text-gray-500 mb-6", children: "Enter your email and we'll send you a link to reset your password." }), message && (_jsx("div", { className: "bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative mb-4", role: "alert", children: _jsx("span", { className: "block sm:inline", children: message }) })), error && (_jsx("div", { className: "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4", role: "alert", children: _jsx("span", { className: "block sm:inline", children: error }) })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-600 mb-1", children: "Email Address" }), _jsx("input", { type: "email", id: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true, className: "w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-cyan-500 focus:outline-none" })] }), _jsx("button", { type: "submit", disabled: isLoading || !!message, className: "w-full py-3 bg-cyan-600 text-white font-bold rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors disabled:bg-gray-400", children: isLoading ? 'Sending...' : 'Send Reset Link' }), _jsxs("p", { className: "text-center text-sm text-gray-500", children: ["Remember your password?", ' ', _jsx("button", { type: "button", onClick: onGoToLogin, className: "font-semibold text-cyan-600 hover:text-cyan-500", children: "Log In" })] })] })] }) }) }));
};
export default ForgotPasswordPage;
