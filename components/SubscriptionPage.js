import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
import Card from './shared/Card';
import { subscriptionPlans, CheckIcon } from '../src/constants';
import PaymentForm from './PaymentForm';
const SubscriptionPage = ({ user, onBack, onSubscriptionSuccess }) => {
    const [selectedPlan, setSelectedPlan] = React.useState(null);
    const handleChoosePlan = (plan) => {
        if (!user) {
            alert("You must be logged in to subscribe.");
            return;
        }
        if (plan.price === "Contact Us") {
            alert("Please contact our sales team for custom pricing.");
            return;
        }
        setSelectedPlan(plan);
    };
    return (_jsxs(_Fragment, { children: [selectedPlan && user && (_jsx(PaymentForm, { user: user, plan: selectedPlan, onClose: () => setSelectedPlan(null), onSuccess: () => {
                    setSelectedPlan(null);
                    onSubscriptionSuccess();
                } })), _jsxs("div", { className: "w-full max-w-7xl animate-fade-in-up", children: [_jsxs("div", { className: "mb-8 text-center", children: [_jsxs("button", { onClick: onBack, className: "text-sm text-cyan-600 hover:text-cyan-500 mb-6 flex items-center mx-auto", children: [_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4 mr-1", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 19l-7-7 7-7" }) }), "Back to Dashboard"] }), _jsx("h1", { className: "text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600", children: "Upgrade Your Experience" }), _jsx("p", { className: "mt-4 text-lg text-gray-600", children: "Choose the plan that best fits your needs and unlock your full potential." })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: subscriptionPlans.map((plan, index) => (_jsxs(Card, { className: `flex flex-col relative ${plan.highlight ? 'border-cyan-500 ring-2 ring-cyan-500' : 'border-gray-200'}`, children: [plan.highlight && (_jsx("div", { className: "absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase", children: "Most Popular" })), _jsxs("div", { className: "p-6 flex-grow flex flex-col", children: [_jsx("h3", { className: "text-2xl font-bold text-gray-800", children: plan.name }), _jsx("p", { className: "text-sm text-gray-500 mb-6", children: plan.audience }), _jsx("ul", { className: "space-y-3 text-gray-600 flex-grow", children: plan.features.map((feature, i) => (_jsxs("li", { className: "flex items-start", children: [_jsx(CheckIcon, {}), _jsx("span", { children: feature })] }, i))) }), _jsxs("div", { className: "mt-8 text-center", children: [_jsx("p", { className: "text-3xl font-bold text-gray-800", children: plan.price }), plan.priceDetails && _jsx("p", { className: "text-sm text-gray-500", children: plan.priceDetails }), _jsx("button", { onClick: () => handleChoosePlan(plan), className: `w-full mt-4 py-2 font-bold rounded-lg ${plan.highlight ? 'bg-cyan-600 text-white hover:bg-cyan-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`, children: plan.price === "Contact Us" ? 'Get in Touch' : 'Choose Plan' })] })] })] }, index))) })] })] }));
};
export default SubscriptionPage;
