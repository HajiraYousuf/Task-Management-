import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  Clock3,
  ListTodo,
  CircleDashed,
  Plus,
} from "lucide-react";

import { useAuth } from "../context/useAuth";
import api from "../services/api";

const Dashboard = () => {
  const { user } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get("/tasks");
        setTasks(response.data.data);
      } catch (error) {
        setError(
          error.response?.data?.message || "Failed to load tasks."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const stats = [
    {
      title: "Total Tasks",
      value: tasks.length,
      icon: ListTodo,
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      title: "Pending",
      value: tasks.filter((task) => task.status === "pending").length,
      icon: Clock3,
      color: "bg-amber-50 text-amber-600",
    },
    {
      title: "In Progress",
      value: tasks.filter((task) => task.status === "in-progress").length,
      icon: CircleDashed,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Completed",
      value: tasks.filter((task) => task.status === "completed").length,
      icon: CheckCircle2,
      color: "bg-green-50 text-green-600",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.name || "User"}!
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Here's an overview of your tasks and productivity.
          </p>
        </div>

        <Link
          to="/tasks/create"
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          <Plus size={18} />
          Create Task
        </Link>
      </div>

      {loading ? (
        <p className="py-10 text-center text-gray-500">
          Loading dashboard...
        </p>
      ) : error ? (
        <p className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
          {error}
        </p>
      ) : (
        <>
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
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Tasks
              </h2>

              <Link
                to="/tasks"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                View all
              </Link>
            </div>

            {tasks.length === 0 ? (
              <p className="py-8 text-center text-sm text-gray-500">
                No tasks found. Create your first task!
              </p>
            ) : (
              <div className="divide-y divide-gray-100">
                {tasks.slice(0, 5).map((task) => (
                  <div
                    key={task.id}
                    className="flex flex-wrap items-center justify-between gap-3 py-4"
                  >
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {task.title}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {task.description || "No description"}
                      </p>
                    </div>

                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                      {task.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;