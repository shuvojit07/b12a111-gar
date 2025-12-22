const AdminStats = () => {
  const stats = [
    { title: "Total Products", value: 120 },
    { title: "Total Orders", value: 340 },
    { title: "Total Users", value: 85 },
    { title: "Active Managers", value: 6 },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">
        Admin Analytics
      </h2>

      <div className="grid md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded shadow text-center"
          >
            <h3 className="text-lg font-semibold">
              {stat.title}
            </h3>
            <p className="text-3xl font-bold mt-2">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminStats;
