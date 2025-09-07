import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { ASSESSMENT_QUESTIONS } from '../src/constants';
import Card from './shared/Card';
const AssessmentPage = ({ onSubmit, error }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
    const [answers, setAnswers] = React.useState([]);
    const handleAnswer = (answer) => {
        const questionText = ASSESSMENT_QUESTIONS[currentQuestionIndex];
        const formattedAnswer = `${questionText}: ${answer}`;
        const newAnswers = [...answers, formattedAnswer];
        setAnswers(newAnswers);
        if (currentQuestionIndex < ASSESSMENT_QUESTIONS.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
        else {
            onSubmit(newAnswers);
        }
    };
    const progressPercentage = Math.round(((currentQuestionIndex) / ASSESSMENT_QUESTIONS.length) * 100);
    return (_jsxs("div", { className: "w-full max-w-2xl animate-fade-in", children: [_jsx("h2", { className: "text-3xl font-bold text-center mb-2 text-cyan-600", children: "Career Personality Test" }), _jsx("p", { className: "text-center text-gray-600 mb-6", children: "For each statement, choose if you agree or disagree. Go with your first instinct!" }), error && (_jsxs("div", { className: "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6", role: "alert", children: [_jsx("strong", { className: "font-bold", children: "Error: " }), _jsx("span", { className: "block sm:inline", children: error })] })), _jsx("div", { className: "w-full bg-gray-200 rounded-full h-2.5 mb-6", children: _jsx("div", { className: "bg-cyan-500 h-2.5 rounded-full", style: { width: `${progressPercentage}%`, transition: 'width 0.5s' } }) }), _jsx(Card, { children: _jsxs("div", { className: "p-8", children: [_jsx("p", { className: "text-xl md:text-2xl text-center font-medium text-gray-800 mb-8 h-24 flex items-center justify-center", children: ASSESSMENT_QUESTIONS[currentQuestionIndex] }), _jsxs("div", { className: "flex justify-around", children: [_jsx("button", { onClick: () => handleAnswer('Agree'), className: "w-40 px-6 py-3 bg-cyan-600 text-white font-bold rounded-full hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 transform hover:scale-105 transition-all duration-300", children: "Agree" }), _jsx("button", { onClick: () => handleAnswer('Disagree'), className: "w-40 px-6 py-3 bg-gray-500 text-white font-bold rounded-full hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 transform hover:scale-105 transition-all duration-300", children: "Disagree" })] })] }) }), _jsxs("p", { className: "text-center mt-4 text-sm text-gray-500", children: ["Question ", currentQuestionIndex + 1, " of ", ASSESSMENT_QUESTIONS.length] })] }));
};
export default AssessmentPage;
