import { X, Trash2 } from "lucide-react";

const DeleteConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Delete Product",
    message = "Are you sure you want to delete this item?",
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="w-[90%] max-w-md rounded-3xl bg-[#1a0f1d] border border-fuchsia-700 p-6 shadow-2xl">

                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-white">
                        {title}
                    </h2>

                    <button onClick={onClose}>
                        <X className="text-gray-300" />
                    </button>
                </div>

                <div className="my-6 flex justify-center">
                    <div className="rounded-full bg-red-500/20 p-4">
                        <Trash2 className="h-10 w-10 text-red-500" />
                    </div>
                </div>

                <div className="mt-5 text-center">
                    <p className="text-gray-300">
                        Are you sure you want to delete this product?
                    </p>

                    <h3 className="mt-4 text-xl font-bold text-fuchsia-400">
                        {message}
                    </h3>

                    <p className="mt-4 text-sm text-gray-400">
                        This action cannot be undone.
                    </p>
                </div>

                <div className="mt-8 flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 rounded-xl border border-gray-600 py-3 text-white hover:bg-gray-800"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="flex-1 rounded-xl bg-red-600 py-3 font-semibold text-white hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;