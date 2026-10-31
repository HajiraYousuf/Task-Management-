import { useAuth } from "../context/useAuth";
import {
  CheckCircle2,
  Clock3,
  ListTodo,
  CircleDashed,
} from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: "Total Tasks",
      value: 12,
      icon: ListTodo,
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      title: "Pending",
      value: 4,
      icon: Clock3,
      color: "bg-amber-50 text-amber-600",
    },
    {
      title: "In Progress",
      value: 3,
      icon: CircleDashed,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Completed",
      value: 5,
      icon: CheckCircle2,
      color: "bg-green-50 text-green-600",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.name || "User"}!
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Here's an overview of your tasks and productivity.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>

                <div className={`rounded-xl p-3 ${stat.color}`}>
                  <Icon size={21} />
                </div>
              </div>

              <h2 className="mt-5 text-3xl font-bold text-gray-900">
                {stat.value}
              </h2>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Recent Tasks
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Your latest tasks will appear here.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;