import { jsx as _jsx } from "react/jsx-runtime";
const Card = ({ children, className = '', onClick }) => {
    return (_jsx("div", { onClick: onClick, className: `bg-white border border-gray-200 rounded-xl shadow-md ${className}`, children: children }));
};
export default Card;
