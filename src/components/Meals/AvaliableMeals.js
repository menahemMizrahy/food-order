import { useEffect, useState } from "react";

import classes from "./AvaliableMeals.module.css";

import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";

const AvaliableMeals = (props) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-http-efb49-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Somthing Went Wrong!");
      }

      const data = await response.json();
      const meals = [];

      for (const key in data) {
        meals.push({
          id: key,
          ...data[key],
        });
      }
      setMeals(meals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
      const DUMMY_MEALS = [
        {
          id: "m1",
          description: "Finest fish and veggies",
          name: "Sushi",
          price: 22.99,
        },
        {
          id: "m2",
          description: "A german specialty!",
          name: "Schnitzel",
          price: 16.5,
        },
        {
          id: "m3",
          description: "American, raw, meaty",
          name: "Barbecue Burger",
          price: 12.99,
        },
        {
          id: "m4",
          description: "Healthy...and green...",
          name: "Green Bowl",
          price: 18.99,
        },
      ];
      setMeals(DUMMY_MEALS);
    });
  }, []);

  if (isLoading) {
    return <p className={classes.loading}>Loading...</p>;
  }

  const mealsList = meals.map((meal) => <MealItem key={meal.id} item={meal} />);

  return (
    <section className={classes.meals}>
      <Card>
        {httpError && <p className={classes.error}>{httpError}</p>}
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvaliableMeals;
