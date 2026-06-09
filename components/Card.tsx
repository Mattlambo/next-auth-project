// Card.tsx
export default function Card() {
  return (
    <div className="w-60 h-90 rounded-2xl bg-black p-6 shadow-lg border-4 border-yellow-400 m-4">
        <h2 className="text-xl font-bold text-white mb-2 flex justify-center">Card Title</h2>
      <p className="flex justify-center text-zinc-400 text-sm leading-relaxed">Info</p>
    </div>
  );
}