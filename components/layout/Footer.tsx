export default function Footer() {
  return (
    <footer className="border-t-3 flex justify-end bg-yellow-400 h-10 items-center border-t-yellow-400 text-black">
      <p>&copy; {new Date().getFullYear()} TV Fanatic. All rights reserved.</p>
    </footer>
  );
}