import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  ClipboardList,
  X,
  AlertTriangle,
} from "lucide-react";
import api from "../services/api";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
  let isMounted = true;

  const loadTasks = async () => {
    try {
      const response = await api.get("/tasks?limit=100");

      if (isMounted) {
        setTasks(response.data.data || []);
        setError("");
      }
    } catch (error) {
      if (isMounted) {
        setError(
          error.response?.data?.message || "Failed to load tasks."
        );
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  };

  loadTasks();

  return () => {
    isMounted = false;
  };
}, []);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      status === "all" || task.status === status;

    return matchesSearch && matchesStatus;
  });

  const handleDelete = async () => {
    if (!selectedTask) return;

    try {
      setDeleting(true);
      await api.delete(`/tasks/${selectedTask.id}`);

      setTasks((previousTasks) =>
        previousTasks.filter(
          (task) => task.id !== selectedTask.id
        )
      );

      setSelectedTask(null);
      setError("");
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to delete task."
      );
    } finally {
      setDeleting(false);
    }
  };

  const statusColors = {
    pending: "bg-amber-50 text-amber-700",
    "in-progress": "bg-blue-50 text-blue-700",
    completed: "bg-green-50 text-green-700",
  };

  return (
    <div className="mx-auto max-w-7xl space-y-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            All Tasks
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Manage and track all your tasks in one place.
          </p>
        </div>

        <Link
          to="/tasks/create"
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          <Plus size={18} />
          Add New Task
        </Link>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 sm:flex-row">
        <div className="flex flex-1 items-center gap-3 rounded-xl border border-gray-200 px-4">
          <Search size={19} className="text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="w-full py-3 text-sm outline-none"
          />
        </div>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 outline-none focus:border-indigo-500"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {error && (
        <p className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
          {error}
        </p>
      )}

      {loading ? (
        <p className="py-12 text-center text-gray-500">
          Loading tasks...
        </p>
      ) : filteredTasks.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center">
          <ClipboardList
            size={40}
            className="mx-auto text-gray-300"
          />
          <h2 className="mt-4 font-semibold text-gray-800">
            No tasks found
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Try another search or create a new task.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-6 py-4">Task</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Priority</th>
                  <th className="px-6 py-4">Due Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-800">
                        {task.title}
                      </p>
                      <p className="mt-1 max-w-xs truncate text-xs text-gray-500">
                        {task.description || "No description"}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          statusColors[task.status] ||
                          "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 capitalize text-gray-600">
                      {task.priority || "Normal"}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {task.due_date
                        ? new Date(task.due_date).toLocaleDateString()
                        : "No date"}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-3">
                        <Link
                          to={`/tasks/edit/${task.id}`}
                          title="Edit task"
                          className="text-gray-500 transition hover:text-indigo-600"
                        >
                          <Pencil size={18} />
                        </Link>

                        <button
                          type="button"
                          onClick={() => setSelectedTask(task)}
                          title="Delete task"
                          className="text-gray-500 transition hover:text-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <p className="text-sm text-gray-500">
        Showing {filteredTasks.length} of {tasks.length} tasks
      </p>

      {/* Delete Confirmation Modal */}
      {selectedTask && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl">
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <AlertTriangle size={25} />
              </div>

              <button
                type="button"
                onClick={() => setSelectedTask(null)}
                disabled={deleting}
                className="text-gray-400 transition hover:text-gray-700"
                aria-label="Close modal"
              >
                <X size={22} />
              </button>
            </div>

            <h2 className="mt-5 text-xl font-bold text-gray-900">
              Delete this task?
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-800">
                "{selectedTask.title}"
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-7 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedTask(null)}
                disabled={deleting}
                className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deleting ? "Deleting..." : "Delete Task"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;