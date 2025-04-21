import MealItem from './meal-item';
import styles from './meals.module.css'

export default function MealsGrid({meals}){
    return(
        <ul className={styles.meals}>
            {meals.map(meals => <li key={meals.id}>
                <MealItem {...meals} />
            </li>)}
        </ul>

    );
}