'use client';
export default function ReloadButton() {
    const reloadPage = () => {
        location.reload();
    };

    return (
        <button onClick={reloadPage} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Get another game
        </button>
    );
}