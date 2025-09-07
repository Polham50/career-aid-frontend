import { jsx as _jsx } from "react/jsx-runtime";
import StudentDashboard from './dashboards/StudentDashboard';
import ParentDashboard from './dashboards/ParentDashboard';
import TeacherDashboard from './dashboards/TeacherDashboard';
import SchoolAdminDashboard from './dashboards/SchoolAdminDashboard';
import CbtCentreDashboard from './dashboards/CbtCentreDashboard';
const DashboardPage = ({ user, careerProfiles, onSubmitAssessment, error, onUpgrade, onStartInterview, isSubscribed, redirectToRecommendations, onRedirectConsumed, onErrorAcknowledged }) => {
    const renderDashboardByRole = () => {
        const commonProps = { user, profiles: careerProfiles, onSubmitAssessment, error, onUpgrade, onStartInterview, isSubscribed, onErrorAcknowledged };
        switch (user.role) {
            case 'Student':
                return _jsx(StudentDashboard, { ...commonProps, redirectToRecommendations: redirectToRecommendations, onRedirectConsumed: onRedirectConsumed });
            case 'Parent/Guardian':
                return _jsx(ParentDashboard, { ...commonProps });
            case 'Counselor/Teacher':
                return _jsx(TeacherDashboard, { ...commonProps });
            case 'School Administrator':
                return _jsx(SchoolAdminDashboard, { ...commonProps });
            case 'JAMB CBT Centre':
                return _jsx(CbtCentreDashboard, { ...commonProps });
            default:
                return _jsx("div", { className: "text-center text-red-500", children: "Error: Unknown user role." });
        }
    };
    return (_jsx("div", { className: "w-full animate-fade-in-up", children: renderDashboardByRole() }));
};
export default DashboardPage;
