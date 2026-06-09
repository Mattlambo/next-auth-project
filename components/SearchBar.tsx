export default function SearchBar() {
    return (
        <form className="flex justify-end bg-yellow-400">
            <label>
            <input className="border m-2 w-80 h-10 rounded-lg text-yellow-400 border-black bg-black p-2 shadow-medium"
            type="text"
            placeholder="search show"/>
            </label>
        </form>
    )
};