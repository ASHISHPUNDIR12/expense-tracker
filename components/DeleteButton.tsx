// app/components/DeleteButton.tsx
'use client';

import { useFormStatus } from 'react-dom';

export function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="text-red-500 hover:text-red-700 disabled:text-gray-400"
    >
      {pending ? 'Deleting...' : 'Delete'}
    </button>
  );
}