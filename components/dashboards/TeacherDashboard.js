import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import Card from '../shared/Card';
import ResultsPage from '../ResultsPage';
import AssessmentPage from '../AssessmentPage';
import Chatbot from '../Chatbot';
import UpgradeCard from './UpgradeCard';
import UpgradePrompt from './UpgradePrompt';
const usePrevious = (value) => {
    const ref = React.useRef(undefined);
    React.useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};
const UserAddIcon = () => _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6 mr-3 text-cyan-500", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" }) });
const ChartIcon = () => _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6 mr-3 text-cyan-500", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" }) });
const DownloadIcon = () => _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", viewBox: "0 0 20 20", fill: "currentColor", children: _jsx("path", { fillRule: "evenodd", d: "M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z", clipRule: "evenodd" }) });
const mockStudents = [
    { name: 'Adebayo Johnson', class: 'SS2', status: 'Completed', date: '2 days ago' },
    { name: 'Chiamaka Nwosu', class: 'SS3', status: 'Completed', date: '5 days ago' },
    { name: 'Musa Ibrahim', class: 'SS2', status: 'Pending', date: 'N/A' },
    { name: 'Fatima Bello', class: 'SS3', status: 'Completed', date: '1 week ago' },
    { name: 'Tunde Adekunle', class: 'SS2', status: 'Pending', date: 'N/A' },
];
const mockHollandData = [
    { code: 'R', count: 8, color: 'bg-red-500' },
    { code: 'I', count: 12, color: 'bg-blue-500' },
    { code: 'A', count: 15, color: 'bg-purple-500' },
    { code: 'S', count: 18, color: 'bg-cyan-500' },
    { code: 'E', count: 10, color: 'bg-orange-500' },
    { code: 'C', count: 13, color: 'bg-indigo-500' },
];
const StatCard = ({ title, value, color = "text-gray-800" }) => (_jsxs(Card, { className: "p-4 text-center", children: [_jsx("p", { className: "text-sm font-medium text-gray-500", children: title }), _jsx("p", { className: `text-3xl font-bold ${color}`, children: value })] }));
const TeacherDashboard = ({ user, profiles, onSubmitAssessment, error, onUpgrade, isSubscribed }) => {
    const [activeTab, setActiveTab] = React.useState('overview');
    const [copilotQuery, setCopilotQuery] = React.useState('');
    const [copilotResponse, setCopilotResponse] = React.useState('');
    const prevProfilesLength = usePrevious(profiles.length);
    const latestProfile = profiles.length > 0 ? profiles[0] : null;
    React.useEffect(() => {
        if (prevProfilesLength !== undefined && profiles.length > prevProfilesLength && isSubscribed) {
            setActiveTab('recommendations');
        }
    }, [profiles, prevProfilesLength, isSubscribed]);
    const handleGetAdvice = () => {
        if (!copilotQuery)
            return;
        // Mocked AI response
        setCopilotResponse(`
        <h4 class="font-bold text-lg text-gray-800 mb-2">Guidance Strategy</h4>
        <p class="text-gray-600 mb-4">This is a common and sensitive situation. The key is to validate both the student's passion and the parents' concerns, then bridge the gap with data and possibilities.</p>
        <ol class="list-decimal list-inside space-y-3 text-gray-600">
            <li><strong>Validate & Empathize:</strong> Start by acknowledging the parents' desire for their child's security and success, which is often the root of their preference for traditional careers like medicine. Then, validate the student's artistic talent and passion.</li>
            <li><strong>Reframe the "Struggling Artist" Narrative:</strong> Use local data to show the viability of creative careers. You could say, "Nigeria's creative industry, including fields like UI/UX Design, Animation, and Digital Marketing, contributed over ₦730 billion to our GDP. Let's explore how [Student's Name]'s talent fits into these modern, high-demand roles."</li>
            <li><strong>Explore Hybrid Pathways:</strong> Suggest careers that blend art with science or technology, such as Medical Illustration, UI/UX Design for HealthTech apps, or Architectural Design. This shows a compromise and opens new avenues.</li>
            <li><strong>Set Up an Informational Interview:</strong> Connect the family with a successful Nigerian professional in a creative field. Hearing a real-life success story is often more powerful than any statistic.</li>
        </ol>
    `);
    };
    const profileExists = !!latestProfile;
    const renderOverview = () => (_jsxs("div", { className: "space-y-8", children: [!isSubscribed && (_jsx(Card, { className: "bg-orange-50 border-orange-200", children: _jsxs("div", { className: "p-4 text-center", children: [_jsx("p", { className: "font-semibold text-orange-700", children: "You are on the Freemium Plan." }), _jsx("p", { className: "text-sm text-orange-600", children: "You can manage 1 student. Upgrade to manage up to 5 students monthly and unlock classroom tools." })] }) })), _jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-6", children: [_jsx(StatCard, { title: "Total Students", value: "48" }), _jsx(StatCard, { title: "Assessments Taken", value: "35", color: "text-cyan-600" }), _jsx(StatCard, { title: "Completion Rate", value: "73%", color: "text-cyan-600" }), _jsx(StatCard, { title: "Pending Invites", value: "13", color: "text-orange-500" })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsx(Card, { children: _jsxs("div", { className: "p-6", children: [_jsx("h3", { className: "text-xl font-semibold text-cyan-600 mb-4", children: "Classroom Insights" }), _jsx("p", { className: "text-sm text-gray-500 mb-4", children: "Holland Code distribution for your SS2 class:" }), _jsx("div", { className: "space-y-2", children: mockHollandData.map(item => (_jsxs("div", { className: "flex items-center", children: [_jsx("span", { className: "w-8 font-bold text-gray-600", children: item.code }), _jsx("div", { className: "flex-grow bg-gray-200 rounded-full h-6", children: _jsx("div", { className: `${item.color} h-6 rounded-full flex items-center justify-end pr-2 text-white text-xs font-bold`, style: { width: `${(item.count / 20) * 100}%` }, children: item.count }) })] }, item.code))) })] }) }), _jsxs("div", { className: "space-y-6", children: [_jsx(Card, { children: _jsxs("div", { className: "p-6 h-full flex flex-col", children: [_jsx("h3", { className: "text-xl font-semibold text-cyan-600 mb-4", children: "Classroom Tools" }), _jsxs("div", { className: "space-y-4 flex-grow", children: [_jsxs("button", { className: "w-full text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center transition-colors", children: [_jsx(UserAddIcon, {}), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold text-gray-800", children: "Invite Students" }), _jsx("p", { className: "text-sm text-gray-500", children: "Generate and send invitation codes." })] })] }), _jsxs("button", { className: "w-full text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center transition-colors", children: [_jsx(ChartIcon, {}), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold text-gray-800", children: "View Full Analytics" }), _jsx("p", { className: "text-sm text-gray-500", children: "See class-wide career interest trends." })] })] })] })] }) }), _jsx(Card, { children: _jsxs("div", { className: "p-6", children: [_jsx("h3", { className: "text-xl font-semibold text-cyan-600 mb-4", children: "Resource Library" }), _jsxs("ul", { className: "space-y-2 text-sm", children: [_jsx("li", { children: _jsxs("a", { href: "#", className: "flex items-center text-gray-600 hover:text-cyan-600", children: [_jsx(DownloadIcon, {}), " ", _jsx("span", { className: "ml-2", children: "Classroom Guide: Discussing Careers" })] }) }), _jsx("li", { children: _jsxs("a", { href: "#", className: "flex items-center text-gray-600 hover:text-cyan-600", children: [_jsx(DownloadIcon, {}), " ", _jsx("span", { className: "ml-2", children: "Lesson Plan: Holland Codes" })] }) })] })] }) })] })] }), _jsx(Card, { children: _jsxs("div", { className: "p-6", children: [_jsx("h3", { className: "text-xl font-semibold text-cyan-600 mb-4", children: "Student Roster (SS2 Class)" }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-left text-sm", children: [_jsx("thead", { className: "border-b border-gray-200 text-gray-500", children: _jsxs("tr", { children: [_jsx("th", { className: "py-2 px-3", children: "Student Name" }), _jsx("th", { className: "py-2 px-3", children: "Status" }), _jsx("th", { className: "py-2 px-3", children: "Last Activity" }), _jsx("th", { className: "py-2 px-3", children: "Actions" })] }) }), _jsx("tbody", { children: mockStudents.map(student => (_jsxs("tr", { className: "border-b border-gray-100 hover:bg-gray-50", children: [_jsx("td", { className: "py-3 px-3 font-medium text-gray-800", children: student.name }), _jsx("td", { className: "py-3 px-3", children: _jsx("span", { className: `px-2 py-1 text-xs font-semibold rounded-full ${student.status === 'Completed' ? 'bg-cyan-100 text-cyan-800' : 'bg-orange-100 text-orange-800'}`, children: student.status }) }), _jsx("td", { className: "py-3 px-3 text-gray-500", children: student.date }), _jsx("td", { className: "py-3 px-3", children: student.status === 'Completed' ? (_jsxs("button", { onClick: () => alert(`Downloading report for ${student.name}...`), className: "flex items-center text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-300", children: [_jsx(DownloadIcon, {}), _jsx("span", { className: "ml-1", children: "Download Report" })] })) : (_jsx("button", { className: "text-xs text-gray-400 cursor-not-allowed", children: "N/A" })) })] }, student.name))) })] }) })] }) })] }));
    const renderCopilot = () => (_jsx(Card, { children: _jsxs("div", { className: "p-6", children: [_jsx("h3", { className: "text-2xl font-bold text-center text-cyan-600 mb-2", children: "Guidance Co-Pilot" }), _jsx("p", { className: "text-center text-gray-500 mb-6", children: "Describe a challenging student guidance scenario to get AI-powered advice." }), _jsxs("div", { className: "space-y-4", children: [_jsx("textarea", { value: copilotQuery, onChange: (e) => setCopilotQuery(e.target.value), placeholder: "E.g., How do I advise a student who is artistically gifted but whose parents insist on them studying medicine?", className: "w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-cyan-500 focus:outline-none min-h-[100px]" }), _jsx("button", { onClick: handleGetAdvice, className: "w-full py-3 bg-cyan-600 text-white font-bold rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50", disabled: !copilotQuery, children: "Get AI-Powered Advice" }), copilotResponse && (_jsx("div", { className: "mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200 animate-fade-in", children: _jsx("div", { dangerouslySetInnerHTML: { __html: copilotResponse } }) }))] })] }) }));
    const renderContent = () => {
        const isLocked = !isSubscribed;
        switch (activeTab) {
            case 'overview':
                return renderOverview();
            case 'copilot':
                if (isLocked)
                    return _jsx(UpgradePrompt, { featureName: "Guidance Co-Pilot", onUpgrade: onUpgrade });
                return renderCopilot();
            case 'assessment':
                return _jsx(AssessmentPage, { onSubmit: onSubmitAssessment, error: error });
            case 'recommendations':
                if (isLocked)
                    return _jsx(UpgradePrompt, { featureName: "Sample Profiles", onUpgrade: onUpgrade });
                return latestProfile ? _jsx(ResultsPage, { profile: latestProfile }) : _jsx("p", { className: "text-center p-8", children: "Complete the assessment to view a sample career profile." });
            case 'clinic':
                if (isLocked)
                    return _jsx(UpgradePrompt, { featureName: "Career Clinic", onUpgrade: onUpgrade });
                return latestProfile ? _jsx(Chatbot, { careerProfile: latestProfile }) : _jsx("p", { className: "text-center p-8", children: "Complete the assessment to access the Career Clinic." });
            default:
                return null;
        }
    };
    const NavButton = ({ tab, label, disabled = false }) => (_jsxs("button", { onClick: () => {
            if (disabled)
                return;
            if (!isSubscribed && (tab !== 'overview' && tab !== 'assessment')) {
                onUpgrade();
            }
            else {
                setActiveTab(tab);
            }
        }, disabled: disabled, className: `w-full text-left px-4 py-3 rounded-lg font-semibold transition-colors relative ${activeTab === tab
            ? 'bg-cyan-600 text-white'
            : 'text-gray-600 hover:bg-gray-200'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`, children: [label, !isSubscribed && (tab !== 'overview' && tab !== 'assessment') && !disabled && (_jsx("span", { className: "absolute right-3 top-1/2 -translate-y-1/2 text-orange-400", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor", children: _jsx("path", { fillRule: "evenodd", d: "M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z", clipRule: "evenodd" }) }) }))] }));
    return (_jsxs("div", { className: "w-full max-w-7xl mx-auto", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600", children: "Teacher & Counselor Dashboard" }), _jsxs("p", { className: "text-lg text-gray-500 mt-1", children: ["Welcome, ", user.name, "! Guide your students to success."] })] }), _jsxs("div", { className: "flex flex-col md:flex-row md:space-x-8", children: [_jsxs("aside", { className: "md:w-1/4 flex-shrink-0 mb-8 md:mb-0", children: [_jsxs("nav", { className: "space-y-2", children: [_jsx(NavButton, { tab: "overview", label: "Overview" }), _jsx(NavButton, { tab: "copilot", label: "Guidance Co-Pilot" }), _jsx(NavButton, { tab: "assessment", label: "Take Sample Assessment" }), _jsx(NavButton, { tab: "recommendations", label: "My Sample Profile", disabled: !profileExists }), _jsx(NavButton, { tab: "clinic", label: "Career Clinic", disabled: !profileExists })] }), !isSubscribed && _jsx(UpgradeCard, { onUpgrade: onUpgrade })] }), _jsx("main", { className: "flex-grow md:w-3/4", children: renderContent() })] })] }));
};
export default TeacherDashboard;
