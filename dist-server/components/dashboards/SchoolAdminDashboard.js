import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// ...existing code...
import React from 'react';
import Card from '../shared/Card';
import UpgradeCard from './UpgradeCard';
import UpgradePrompt from './UpgradePrompt';
import { getSchoolStudents, addSchoolStudent } from '../../src/services/apiService';
import Spinner from '../shared/Spinner';
const mockTeachers = [
    { id: 1, name: 'Bamidele Adeboye', email: 'b.adeboye@school.com', role: 'SS1 Coordinator', status: 'Active' },
    { id: 2, name: 'Chisom Okoro', email: 'c.okoro@school.com', role: 'Head Counselor', status: 'Active' },
    { id: 3, name: 'Aisha Yusuf', email: 'a.yusuf@school.com', role: 'JSS3 Teacher', status: 'Invited' },
];
const mockHollandData = [
    { code: 'R', count: 180, color: 'bg-red-500' },
    { code: 'I', count: 250, color: 'bg-blue-500' },
    { code: 'A', count: 220, color: 'bg-purple-500' },
    { code: 'S', count: 310, color: 'bg-cyan-500' },
    { code: 'E', count: 190, color: 'bg-orange-500' },
    { code: 'C', count: 280, color: 'bg-indigo-500' },
];
const AddUserIcon = () => _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-2", viewBox: "0 0 20 20", fill: "currentColor", children: _jsx("path", { fillRule: "evenodd", d: "M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z", clipRule: "evenodd" }) });
const UploadIcon = () => _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 mr-2", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" }) });
const SchoolAdminDashboard = ({ user, onUpgrade, isSubscribed }) => {
    const [activeTab, setActiveTab] = React.useState('overview');
    const [students, setStudents] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [isAddStudentModalOpen, setIsAddStudentModalOpen] = React.useState(false);
    const [newStudent, setNewStudent] = React.useState({ name: '', classLevel: 'JSS3' });
    const STUDENT_LIMIT = user.isSubscribed ? 1000 : 20;
    const fetchStudents = React.useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const fetchedStudents = await getSchoolStudents();
            setStudents(fetchedStudents);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Could not fetch students.');
        }
        finally {
            setIsLoading(false);
        }
    }, []);
    React.useEffect(() => {
        if (activeTab === 'manageStudents') {
            fetchStudents();
        }
        else if (activeTab === 'overview') {
            // Fetch students in background for overview stats
            getSchoolStudents().then(setStudents).catch(console.error);
        }
    }, [activeTab, fetchStudents]);
    const handleAddStudent = async (e) => {
        e.preventDefault();
        if (students.length >= STUDENT_LIMIT) {
            alert(`Student limit of ${STUDENT_LIMIT} reached. Please upgrade your plan to add more students.`);
            return;
        }
        if (newStudent.name && newStudent.classLevel) {
            try {
                const addedStudent = await addSchoolStudent(newStudent.name, newStudent.classLevel);
                setStudents(prev => [addedStudent, ...prev]);
                setNewStudent({ name: '', classLevel: 'JSS3' });
                setIsAddStudentModalOpen(false);
            }
            catch (err) {
                alert(err instanceof Error ? err.message : 'Failed to add student.');
            }
        }
    };
    const renderOverview = () => {
        const activeStudents = students.filter(s => s.status === 'Active').length;
        const completionRate = students.length > 0 ? Math.round((activeStudents / students.length) * 100) : 0;
        return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-6 text-center", children: [_jsxs(Card, { className: "p-4", children: [_jsx("p", { className: "text-sm font-medium text-gray-500", children: "Student Licenses" }), _jsxs("p", { className: "text-2xl font-bold text-gray-800", children: [students.length, " / ", STUDENT_LIMIT] }), _jsx("p", { className: "text-xs text-gray-400", children: "Go to \"Manage Students\" to sync." })] }), _jsxs(Card, { className: "p-4", children: [_jsx("p", { className: "text-sm font-medium text-gray-500", children: "Total Teachers" }), _jsx("p", { className: "text-2xl font-bold text-gray-800", children: mockTeachers.length })] }), _jsxs(Card, { className: "p-4", children: [_jsx("p", { className: "text-sm font-medium text-gray-500", children: "Active Students" }), _jsx("p", { className: "text-2xl font-bold text-cyan-600", children: activeStudents })] }), _jsxs(Card, { className: "p-4", children: [_jsx("p", { className: "text-sm font-medium text-gray-500", children: "Engagement Rate" }), _jsxs("p", { className: "text-2xl font-bold text-cyan-600", children: [completionRate, "%"] })] })] }), _jsx(Card, { children: _jsxs("div", { className: "p-6", children: [_jsx("h3", { className: "text-xl font-semibold text-cyan-600 mb-4", children: "School-Wide Insights" }), _jsx("p", { className: "text-sm text-gray-500 mb-2 font-semibold", children: "Holland Code Distribution:" }), _jsx("div", { className: "space-y-1.5", children: mockHollandData.map(item => (_jsxs("div", { className: "flex items-center", children: [_jsx("span", { className: "w-8 font-bold text-gray-600", children: item.code }), _jsx("div", { className: "flex-grow bg-gray-200 rounded-full h-5", children: _jsx("div", { className: `${item.color} h-5 rounded-full flex items-center justify-end pr-2 text-white text-xs font-bold`, style: { width: `${(item.count / 400) * 100}%` }, children: item.count }) })] }, item.code))) })] }) })] }));
    };
    const renderManageStudents = () => (_jsx(Card, { children: _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row justify-between sm:items-center mb-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-xl font-semibold text-cyan-600", children: "Student Roster" }), _jsxs("p", { className: "text-gray-500 text-sm", children: [students.length, " / ", STUDENT_LIMIT, " Students Registered"] })] }), _jsxs("div", { className: "flex space-x-2 mt-4 sm:mt-0", children: [_jsxs("button", { onClick: () => alert("Bulk upload functionality coming soon!"), className: "flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors", children: [_jsx(UploadIcon, {}), " Bulk Upload"] }), _jsxs("button", { onClick: () => setIsAddStudentModalOpen(true), className: "flex items-center justify-center px-4 py-2 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-700 transition-colors", children: [_jsx(AddUserIcon, {}), " Add New Student"] })] })] }), isLoading && _jsx(Spinner, { message: "Loading students..." }), error && _jsx("p", { className: "text-red-500 text-center p-4", children: error }), !isLoading && !error && (_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-left text-sm", children: [_jsx("thead", { className: "border-b border-gray-200 text-gray-500", children: _jsxs("tr", { children: [_jsx("th", { className: "py-2 px-3", children: "Student Name" }), _jsx("th", { className: "py-2 px-3", children: "Class" }), _jsx("th", { className: "py-2 px-3", children: "Access Code" }), _jsx("th", { className: "py-2 px-3", children: "Status" }), _jsx("th", { className: "py-2 px-3", children: "Actions" })] }) }), _jsx("tbody", { children: students.map(student => (_jsxs("tr", { className: "border-b border-gray-100 hover:bg-gray-50", children: [_jsx("td", { className: "py-3 px-3 font-medium text-gray-800", children: student.name }), _jsx("td", { className: "py-3 px-3 text-gray-600", children: student.classLevel }), _jsx("td", { className: "py-3 px-3 font-mono text-orange-600", children: student.accessCode }), _jsx("td", { className: "py-3 px-3", children: _jsx("span", { className: `px-2 py-1 text-xs font-semibold rounded-full ${student.status === 'Active' ? 'bg-cyan-100 text-cyan-800' : 'bg-orange-100 text-orange-800'}`, children: student.status }) }), _jsx("td", { className: "py-3 px-3", children: _jsx("button", { className: "text-red-600 hover:text-red-500 text-xs", children: "Remove" }) })] }, student._id))) })] }) }))] }) }));
    const renderManageTeachers = () => (_jsx(Card, { children: _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row justify-between sm:items-center mb-4", children: [_jsx("h3", { className: "text-xl font-semibold text-cyan-600", children: "Teacher & Counselor Roster" }), _jsxs("button", { onClick: () => alert("Invite teacher functionality coming soon!"), className: "flex items-center justify-center px-4 py-2 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-700 transition-colors mt-4 sm:mt-0", children: [_jsx(AddUserIcon, {}), " Invite New Staff"] })] }), _jsx("div", { className: "overflow-x-auto", children: _jsx("table", { className: "w-full text-left text-sm" }) })] }) }));
    const renderAddStudentModal = () => (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in", children: _jsx(Card, { className: "w-full max-w-md", children: _jsxs("form", { onSubmit: handleAddStudent, className: "p-8", children: [_jsx("h3", { className: "text-2xl font-bold text-gray-800 mb-4", children: "Register a New Student" }), _jsxs("div", { children: [_jsx("label", { htmlFor: "studentName", className: "block text-sm font-medium text-gray-600 mb-1", children: "Full Name" }), _jsx("input", { type: "text", id: "studentName", value: newStudent.name, onChange: (e) => setNewStudent({ ...newStudent, name: e.target.value }), required: true, className: "w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-cyan-500 focus:outline-none" })] }), _jsxs("div", { className: "mt-4", children: [_jsx("label", { htmlFor: "classLevel", className: "block text-sm font-medium text-gray-600 mb-1", children: "Class Level" }), _jsxs("select", { id: "classLevel", value: newStudent.classLevel, onChange: (e) => setNewStudent({ ...newStudent, classLevel: e.target.value }), required: true, className: "w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-cyan-500 focus:outline-none", children: [_jsx("option", { value: "JSS3", children: "JSS3" }), _jsx("option", { value: "SS1", children: "SS1" }), _jsx("option", { value: "SS2", children: "SS2" }), _jsx("option", { value: "SS3", children: "SS3" })] })] }), _jsxs("div", { className: "mt-6 flex justify-end space-x-3", children: [_jsx("button", { type: "button", onClick: () => setIsAddStudentModalOpen(false), className: "px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300", children: "Cancel" }), _jsx("button", { type: "submit", className: "px-4 py-2 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-700", children: "Register Student" })] })] }) }) }));
    const renderContent = () => {
        const isLocked = !isSubscribed;
        switch (activeTab) {
            case 'overview': return renderOverview();
            case 'manageStudents': return renderManageStudents();
            case 'manageTeachers': return renderManageTeachers();
            case 'analytics':
                if (isLocked)
                    return _jsx(UpgradePrompt, { featureName: "Analytics", onUpgrade: onUpgrade });
                return _jsx("p", { children: "Analytics coming soon." });
            case 'reports':
                if (isLocked)
                    return _jsx(UpgradePrompt, { featureName: "Reports", onUpgrade: onUpgrade });
                return _jsx("p", { children: "Reports coming soon." });
            default: return null;
        }
    };
    const NavButton = ({ tab, label }) => (_jsxs("button", { onClick: () => {
            if (!isSubscribed && (tab === 'analytics' || tab === 'reports')) {
                onUpgrade();
            }
            else {
                setActiveTab(tab);
            }
        }, className: `w-full text-left px-4 py-3 rounded-lg font-semibold transition-colors relative ${activeTab === tab ? 'bg-cyan-600 text-white' : 'text-gray-600 hover:bg-gray-200'}`, children: [label, !isSubscribed && (tab === 'analytics' || tab === 'reports') && (_jsx("span", { className: "absolute right-3 top-1/2 -translate-y-1/2 text-orange-400", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor", children: _jsx("path", { fillRule: "evenodd", d: "M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z", clipRule: "evenodd" }) }) }))] }));
    return (_jsxs(React.Fragment, { children: [isAddStudentModalOpen && renderAddStudentModal(), _jsxs("div", { className: "w-full max-w-7xl mx-auto", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600", children: "School Administrator Dashboard" }), _jsxs("p", { className: "text-lg text-gray-500 mt-1", children: ["Welcome, ", user.name, "! Manage your institution's access."] })] }), _jsxs("div", { className: "flex flex-col md:flex-row md:space-x-8", children: [_jsxs("aside", { className: "md:w-1/4 flex-shrink-0 mb-8 md:mb-0", children: [_jsxs("nav", { className: "space-y-2", children: [_jsx(NavButton, { tab: "overview", label: "Overview" }), _jsx(NavButton, { tab: "manageStudents", label: "Manage Students" }), _jsx(NavButton, { tab: "manageTeachers", label: "Manage Teachers" }), _jsx(NavButton, { tab: "analytics", label: "Analytics" }), _jsx(NavButton, { tab: "reports", label: "Reports" })] }), !isSubscribed && _jsx(UpgradeCard, { onUpgrade: onUpgrade })] }), _jsx("main", { className: "flex-grow md:w-3/4", children: renderContent() })] })] })] }));
};
export default SchoolAdminDashboard;
