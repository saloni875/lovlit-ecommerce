import { useEffect } from "react";
import { Trash2, ExternalLink } from "lucide-react";
import { useIdeaStore } from "../stores/useIdeaStore";
import { useThemeStore } from "../stores/useThemeStore";

const IdeasList = () => {
    const { ideas, fetchIdeas, deleteIdea, loading } = useIdeaStore();
    const { darkMode } = useThemeStore();

    useEffect(() => {
        fetchIdeas();
    }, []);

    if (loading) {
        return (
            <p
                className={`text-center text-xl font-semibold ${darkMode ? "text-white" : "text-purple-700"
                    }`}
            >
                Loading ideas...
            </p>
        );
    }

    if (ideas.length === 0) {
        return (
            <p
                className={`text-center text-xl font-semibold ${darkMode ? "text-white" : "text-purple-700"
                    }`}
            >
                No ideas submitted yet.
            </p>
        );
    }

    return (
        <>
            <div
                className="mb-6 rounded-3xl p-6 shadow-lg backdrop-blur-md border"
                style={{
                    background: darkMode
                        ? "linear-gradient(135deg,#0c090f,#660c5e)"
                        : "#ffffff",

                }}
            >

                <h1
                    className={`text-3xl sm:text-4xl font-bold ${darkMode ? "text-white" : "text-purple-700"
                        }`}
                >
                    Customer Ideas
                </h1>

                <h1>Ideas</h1>

                {ideas.map((idea) => (
                    <div key={idea._id}>
                        {idea.name}
                    </div>
                ))}


                <p
                    className={`mt-2 text-sm sm:text-base ${darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                >
                    custom product ideas submitted by customers.
                </p>



                <div
                    className={`rounded-3xl shadow-xl overflow-hidden border ${darkMode
                        ? "border-fuchsia-700"
                        : "border-purple-200"
                        }`}
                    style={{
                        background: darkMode
                            ? "linear-gradient(135deg,#0c090f,#660c5e)"
                            : "#ffffff",
                    }}
                >
                    <div className="overflow-x-auto">

                        <table className="min-w-[1000px] w-full">

                            <thead
                                className={`sticky top-0 ${darkMode
                                    ? "bg-black/40 text-white"
                                    : "bg-gradient-to-r from-purple-200 via-white to-pink-100 text-purple-700"
                                    }`}
                            >
                                <tr>
                                    <th className="p-4 text-left">Name</th>

                                    <th className="p-4 text-left">
                                        Instagram / WhatsApp
                                    </th>

                                    <th className="p-4 text-left w-[45%]">
                                        Idea
                                    </th>

                                    <th className="p-4 text-center">
                                        Reference
                                    </th>

                                    <th className="p-4 text-center">
                                        Date
                                    </th>

                                    <th className="p-4 text-center">
                                        Delete
                                    </th>
                                </tr>
                            </thead>

                            <tbody>

                                {ideas.map((idea) => (

                                    <tr
                                        key={idea._id}
                                        className={`border-t transition ${darkMode
                                            ? "border-fuchsia-800 hover:bg-white/5"
                                            : "border-purple-100 hover:bg-purple-50"
                                            }`}
                                    >
                                        <td
                                            className={`p-4 font-semibold ${darkMode
                                                ? "text-white"
                                                : "text-purple-700"
                                                }`}
                                        >
                                            {idea.name}
                                        </td>

                                        <td
                                            className={`p-4 text-sm ${darkMode
                                                ? "text-gray-200"
                                                : "text-gray-700"
                                                }`}
                                        >
                                            {idea.contact}
                                        </td>

                                        <td
                                            className={`p-4 text-sm whitespace-pre-wrap break-words max-w-lg ${darkMode
                                                ? "text-gray-200"
                                                : "text-gray-700"
                                                }`}
                                        >
                                            {idea.idea}
                                        </td>

                                        <td className="text-center">
                                            {idea.inspirationLink ? (
                                                <a
                                                    href={idea.inspirationLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`inline-flex items-center justify-center p-2 rounded-full transition ${darkMode
                                                        ? "hover:bg-fuchsia-500 hover:text-black text-white"
                                                        : "hover:bg-purple-100 text-purple-700"
                                                        }`}
                                                >
                                                    <ExternalLink size={18} />
                                                </a>
                                            ) : (
                                                <span
                                                    className={
                                                        darkMode
                                                            ? "text-gray-400"
                                                            : "text-gray-500"
                                                    }
                                                >
                                                    —
                                                </span>
                                            )}
                                        </td>

                                        <td
                                            className={`text-center text-sm ${darkMode
                                                ? "text-gray-300"
                                                : "text-gray-600"
                                                }`}
                                        >
                                            {new Date(idea.createdAt).toLocaleDateString()}
                                        </td>

                                        <td className="text-center">
                                            <button
                                                onClick={() => deleteIdea(idea._id)}
                                                className={`p-2 rounded-full transition ${darkMode
                                                    ? "text-red-400 hover:bg-fuchsia-500 hover:text-black"
                                                    : "text-red-500 hover:bg-red-100"
                                                    }`}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>
                </div>
            </div>
        </>
    );



};

export default IdeasList;