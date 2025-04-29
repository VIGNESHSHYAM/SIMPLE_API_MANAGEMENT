// Example dashboard page
import CreateApiForm from '@/components/CreateApiForm';
import DashboardLayout from '../../components/dashboard';
import ApiListWithDelete from '@/components/ApiListWithDelete';

const DashboardPage = () => {
  return (
    <DashboardLayout current={true}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Welcome to Dashboard</h1>
        {/* Your page content */}
        <div className="p-8 space-y-8">
      <CreateApiForm />
      <ApiListWithDelete />
    </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;