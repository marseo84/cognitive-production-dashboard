export default function MachinesOverview() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Machines Overview 🏭
      </h2>
      <p className="text-gray-600 mb-6">
        View all machines, their current status, and performance metrics here.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder cards — later these will be dynamic */}
        {[1, 2, 3, 4, 5, 6].map((machine) => (
          <div
            key={machine}
            className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-lg font-semibold text-gray-700">
              Machine #{machine}
            </h3>
            <p className="text-sm text-gray-500">
              Status: <span className="text-green-600">Running</span>
            </p>
            <p className="text-sm text-gray-500">OEE: {75 + machine}%</p>
            <p className="text-sm text-gray-500">
              Throughput: {100 + machine * 5} units/h
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
