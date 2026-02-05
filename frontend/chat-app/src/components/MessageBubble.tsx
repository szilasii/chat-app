/* eslint-disable @typescript-eslint/no-explicit-any */
export default function MessageBubble({ msg }: any) {
  const time = new Date(msg.timestamp).toLocaleTimeString("hu-HU", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (msg.fromUser) {
    return (
      <div className="ml-auto max-w-lg">
        <div className="text-right text-xs text-gray-500 mb-1">Én • {time}</div>
        <div className="bg-blue-600 text-white p-3 rounded-xl ml-auto">
          {msg.text}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg">
      <div className="flex items-center gap-2 mb-1">
        <img
          src={msg.avatar || `https://ui-avatars.com/api/?name=${msg.username}`}
          className="w-8 h-8 rounded-full"
        />
        <div className="text-sm font-semibold">{msg.username}</div>
        <div className="text-xs text-gray-500">{time}</div>
      </div>

      <div className="bg-gray-300 text-black p-3 rounded-xl">
        {msg.text}
      </div>
    </div>
  );
}
