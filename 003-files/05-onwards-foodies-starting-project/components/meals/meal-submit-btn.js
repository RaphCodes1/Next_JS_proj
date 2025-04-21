'use client';

import { useActionState } from 'react';
export default function MealSubmitBtn(){
    const { pending } = useActionState();

    return(
        <button disabled={pending}>
            {pending ? 'Submitting...' : 'Share Meal'}
        </button>
    );
}