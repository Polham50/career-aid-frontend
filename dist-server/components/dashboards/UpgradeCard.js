import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Card from '../shared/Card';
const UpgradeIcon = () => (_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6 mr-2 text-orange-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M5 11l7-7 7 7M5 19l7-7 7 7" }) }));
const UpgradeCard = ({ onUpgrade }) => {
    return (_jsx(Card, { className: "mt-8 border-orange-300", children: _jsxs("div", { className: "p-5", children: [_jsxs("h4", { className: "font-bold text-gray-800 flex items-center mb-2", children: [_jsx(UpgradeIcon, {}), "Upgrade Your Plan"] }), _jsx("p", { className: "text-sm text-gray-500 mb-4", children: "Unlock unlimited assessments, custom roadmaps, and more powerful features." }), _jsx("button", { onClick: onUpgrade, className: "w-full py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors", children: "View Premium Plans" })] }) }));
};
export default UpgradeCard;
