export default function Header() {
  return (
    <header className="w-full h-14 bg-gray-900 text-white flex items-center justify-between px-6 shadow">
      <h1 className="text-lg font-semibold">Smart Factory Dashboard</h1>
      <div className="flex items-center gap-4">
        <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
        <span className="text-sm text-gray-300">Live</span>
      </div>
    </header>
  );
}
