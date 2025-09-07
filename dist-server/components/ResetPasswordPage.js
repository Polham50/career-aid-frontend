import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import Card from './shared/Card';
import { resetPassword } from '../src/services/apiService';
const ResetPasswordPage = ({ token, onResetSuccess }) => {
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [error, setError] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    React.useEffect(() => {
        // Clean the token from the URL as soon as the component loads
        window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            await resetPassword(token, password);
            onResetSuccess();
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to reset password.';
            setError(errorMessage);
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsx("div", { className: "w-full max-w-md animate-fade-in", children: _jsx(Card, { children: _jsxs("div", { className: "p-8", children: [_jsx("h2", { className: "text-2xl font-bold text-center text-gray-800 mb-2", children: "Set a New Password" }), _jsx("p", { className: "text-center text-gray-500 mb-6", children: "Please enter your new password below." }), error && (_jsx("div", { className: "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4", role: "alert", children: _jsx("span", { className: "block sm:inline", children: error }) })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-600 mb-1", children: "New Password" }), _jsx("input", { type: "password", id: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, minLength: 6, className: "w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-cyan-500 focus:outline-none" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "confirmPassword", className: "block text-sm font-medium text-gray-600 mb-1", children: "Confirm New Password" }), _jsx("input", { type: "password", id: "confirmPassword", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), required: true, className: "w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-cyan-500 focus:outline-none" })] }), _jsx("button", { type: "submit", disabled: isLoading, className: "w-full py-3 bg-cyan-600 text-white font-bold rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors disabled:bg-gray-400", children: isLoading ? 'Resetting...' : 'Reset Password' })] })] }) }) }));
};
export default ResetPasswordPage;
