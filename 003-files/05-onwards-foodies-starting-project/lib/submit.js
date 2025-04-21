'use server';
import { saveMeal } from '@/lib/meals'
import { redirect } from 'next/navigation';

function textCheckerInvalid (text){
    return (!text || text.trim() === '');
}
export async function shareMeal(formData){
    
    const meal = {  
      title: formData.get('title'),
      summary: formData.get('summary'),
      instructions: formData.get('instructions'),
      image: formData.get('image'),
      creator: formData.get('name'),
      creator_email: formData.get('email'),
    }

    if(textCheckerInvalid(meal.title) 
        || textCheckerInvalid(meal.summary)
        || textCheckerInvalid(meal.instructions)
        || textCheckerInvalid(meal.creator)
        || textCheckerInvalid(meal.summary_email)
        || !meal.creator_email.includes('@')
        || !meal.image || meal.image.size == 0) {
            throw new Error('Invalid input');
        }
    await saveMeal(meal);
    redirect('/meals');
  }