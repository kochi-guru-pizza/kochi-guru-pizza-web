export default function PlaceholderPage() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <div className="w-16 h-16 rounded-2xl bg-orange-50 dark:bg-orange-900/10 flex items-center justify-center text-3xl">
        🚧
      </div>
      <div className="text-center">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Coming Soon
        </h1>
        <p className="text-sm text-gray-400 mt-2">
          This section is under construction.
        </p>
      </div>
    </div>
  );
}
