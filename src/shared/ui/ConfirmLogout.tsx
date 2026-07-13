import React from 'react';

type ConfirmLogoutProps = {
    open: boolean;
    onConfirm: () => void;
    onCancel: () => void;
};

export default function ConfirmLogout({ open, onConfirm, onCancel }: ConfirmLogoutProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md p-6 glass-surface">
                <h3 className="text-lg font-semibold text-white mb-2">Confirm sign out</h3>
                <p className="text-sm text-gray-200 mb-6">Are you sure you want to sign out? You will need to sign in again to access your tracked opportunities.</p>
                <div className="flex justify-end gap-3">
                    <button
                        className="px-4 py-2 rounded-md bg-transparent border border-gray-300 text-gray-100 hover:bg-white/5"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
                        onClick={onConfirm}
                    >
                        Sign out
                    </button>
                </div>
            </div>
        </div>
    );
}
