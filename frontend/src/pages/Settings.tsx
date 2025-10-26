export default function Settings() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Settings ⚙️</h2>
      <p className="text-gray-600 mb-6">
        Manage dashboard preferences, theme options, and simulation controls.
      </p>

      <div className="bg-white shadow-md rounded-xl p-6 max-w-lg">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Theme
            </label>
            <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200">
              <option>Light</option>
              <option>Dark</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data Refresh Interval (seconds)
            </label>
            <input
              type="number"
              defaultValue={2}
              min={1}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Save Settings
          </button>
        </form>
      </div>
    </div>
  );
}
