import { UserRound, Mail, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/useAuth";

const Profile = () => {
  const { user } = useAuth();

  const details = [
    {
      label: "Full Name",
      value: user?.name || "Not available",
      icon: UserRound,
    },
    {
      label: "Email Address",
      value: user?.email || "Not available",
      icon: Mail,
    },
    {
      label: "Account Status",
      value: "Active",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          My Profile
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          View your personal account information.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="bg-indigo-600 px-8 py-10">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-indigo-600">
              <UserRound size={38} />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">
                {user?.name || "User"}
              </h2>
              <p className="mt-1 text-sm text-indigo-100">
                TaskFlow Member
              </p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <h3 className="mb-6 text-lg font-semibold text-gray-900">
            Personal Information
          </h3>

          <div className="space-y-5">
            {details.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                    <Icon size={21} />
                  </div>

                  <div>
                    <p className="text-xs font-medium text-gray-500">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-gray-800">
                      {item.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;