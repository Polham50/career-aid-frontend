import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Spinner = ({ message }) => {
    return (_jsxs("div", { className: "flex flex-col items-center justify-center text-center p-8", children: [_jsx("div", { className: "animate-spin rounded-full h-16 w-16 border-b-4 border-cyan-500" }), _jsx("p", { className: "mt-4 text-lg text-gray-600", children: message })] }));
};
export default Spinner;
