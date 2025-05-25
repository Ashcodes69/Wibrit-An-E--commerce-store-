export default function Home() {
  return (
    <div className="p-6 space-y-4 bg-white text-black dark:bg-black dark:text-white min-h-screen">
      {/* Text and Color */}
      <h1 className="text-4xl font-bold text-red-500 underline">
        Red Heading
      </h1>
      <p className="text-lg text-blue-600">This is a blue paragraph.</p>
      <p className="text-sm text-green-600 italic">Small green italic text.</p>

      {/* Buttons */}
      <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-800">
        Click Me
      </button>

      {/* Box Shadow */}
      <div className="w-40 h-20 bg-yellow-300 shadow-lg flex items-center justify-center rounded">
        Shadow Box
      </div>

      {/* Borders & Rounded */}
      <div className="border border-gray-400 p-4 rounded-xl">
        Bordered and Rounded Box
      </div>

      {/* Flex Layout */}
      <div className="flex space-x-4">
        <div className="bg-pink-500 w-16 h-16 rounded-full"></div>
        <div className="bg-cyan-500 w-16 h-16 rounded-full"></div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-indigo-500 h-16 text-center text-white">1</div>
        <div className="bg-indigo-500 h-16 text-center text-white">2</div>
        <div className="bg-indigo-500 h-16 text-center text-white">3</div>
      </div>

      {/* Responsive */}
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl">
        Resize me — I change size on screen width!
      </p>
    </div>
  );
}
