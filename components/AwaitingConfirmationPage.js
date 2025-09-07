import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
import Card from './shared/Card';
import { confirmEmail } from '../src/services/apiService';
import Spinner from './shared/Spinner';
const SuccessIcon = () => (_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-16 w-16 text-green-500", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.5, children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }));
const ErrorIcon = () => (_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-16 w-16 text-red-500", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.5, children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" }) }));
const AwaitingConfirmationPage = ({ email, token, onConfirmSuccess }) => {
    const [status, setStatus] = React.useState('awaiting');
    const [errorMessage, setErrorMessage] = React.useState(null);
    // This effect triggers verification if a token is passed from the URL
    React.useEffect(() => {
        const verifyToken = async () => {
            // The condition for auto-verification is when the component is loaded
            // with a token but without an email (which is only set post-registration).
            if (token && !email) {
                window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
                setStatus('verifying');
                setErrorMessage(null);
                try {
                    await confirmEmail(token);
                    setStatus('success');
                    // Redirect to login after a short delay
                    setTimeout(() => {
                        onConfirmSuccess();
                    }, 3000);
                }
                catch (err) {
                    const message = err instanceof Error ? err.message : 'Confirmation failed.';
                    setErrorMessage(message);
                    setStatus('error');
                }
            }
        };
        verifyToken();
    }, [token, email, onConfirmSuccess]);
    // Render content for post-signup flow
    if (email) {
        const confirmationUrl = `/#/confirm?token=${token}`;
        return (_jsx("div", { className: "w-full max-w-lg text-center animate-fade-in-up", children: _jsx(Card, { children: _jsxs("div", { className: "p-8", children: [_jsx("div", { className: "flex justify-center mb-4", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-16 w-16 text-cyan-500", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.5, children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) }) }), _jsx("h2", { className: "text-3xl font-bold text-gray-800 mb-3", children: "Confirm Your Email" }), _jsxs("p", { className: "text-gray-600", children: ["We've sent a confirmation link to ", _jsx("strong", { className: "text-gray-700", children: email }), ". Please check your inbox (and spam folder!) to complete your registration."] }), _jsxs("div", { className: "mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg", children: [_jsx("h4", { className: "font-bold text-yellow-800", children: "For Development Only" }), _jsx("p", { className: "text-sm text-yellow-700 mt-1", children: "Because the production email service is not configured, you can use this link to confirm your account directly:" }), _jsx("a", { href: confirmationUrl, className: "mt-2 inline-block bg-yellow-200 text-yellow-900 font-mono text-xs px-2 py-1 rounded hover:bg-yellow-300 break-all", children: "Confirm Account" })] })] }) }) }));
    }
    // Render content for verification flow from URL
    return (_jsx("div", { className: "w-full max-w-md text-center animate-fade-in", children: _jsx(Card, { children: _jsxs("div", { className: "p-8 min-h-[250px] flex flex-col justify-center items-center", children: [status === 'verifying' && (_jsxs(_Fragment, { children: [_jsx(Spinner, { message: "" }), _jsx("h2", { className: "text-2xl font-bold text-gray-800 mt-4", children: "Verifying your account..." })] })), status === 'success' && (_jsxs("div", { className: 'animate-fade-in', children: [_jsx(SuccessIcon, {}), _jsx("h2", { className: "text-2xl font-bold text-green-600 mt-4 mb-2", children: "Verification Successful!" }), _jsx("p", { className: "text-gray-600", children: "Your email has been confirmed. Redirecting you to the login page..." })] })), status === 'error' && (_jsxs("div", { className: 'animate-fade-in', children: [_jsx(ErrorIcon, {}), _jsx("h2", { className: "text-2xl font-bold text-red-600 mt-4 mb-2", children: "Verification Failed" }), _jsx("p", { className: "text-gray-600", children: errorMessage || 'The link may be invalid or expired.' })] }))] }) }) }));
};
export default AwaitingConfirmationPage;
