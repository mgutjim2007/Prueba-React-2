import React, { useContext , useEffect , useState} from "react";

const AppContext = React.createContext()

import axios from "axios";
const allMealUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

const AppProvider = ({ children }) => {

    const [ meals , setMeals ] =  useState([]);

    const [loading , setLoading ] = useState(false);

    const [searchTerm, setSearchTerm ] = useState('');

    const [showModal , setShowModal] = useState(false);

    const [selectedMeal , setSelectedMeal] = useState(null);

    const [favorites, setFavorites] = useState([]);

    const fetchMeals = async (url) => {
        setLoading(true);   
        try {
            const {data} =  await axios(url)
            if (data.meals) {
                setMeals(data.meals)
            }else{
                setMeals([])
            }
            s
        } catch (error) {
            console.log(error.response)
        }
        setLoading(false);
    }

    const fetchRandomMeal = () => {
        fetchMeals(randomMealUrl)
    }

    const selectMeal = ( idMeal , favoriteMeal ) => {
        let meal;

            meal = meals.find((meal) => meal.idMeal === idMeal);

        setSelectedMeal(meal);
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const addToFavorites = (idMeal) => {
        const meal = meals.find((meal) => meal.idMeal === idMeal);

        const alreadyFavorite = favorites.find((meal) => meal.idMeal === idMeal);

        if ( alreadyFavorite ) return

            const updateFavorites = [...favorites, meal]

            setFavorites(updateFavorites)   
    }

    const removeFromFavorites = (idMeal) => {

        const updateFavorites = favorites.filter((meal) => meal.idMeal !== idMeal);

        setFavorites(updateFavorites);

    }

    useEffect(() => {
        fetchMeals(allMealUrl)
    }, [])

    useEffect(() => {
        if (!searchTerm) return
        fetchMeals(`${allMealUrl}${searchTerm}`)
    }, [searchTerm])

    return <AppContext.Provider value={{ loading , meals , setSearchTerm , fetchRandomMeal , showModal , selectMeal , selectedMeal , closeModal , favorites , addToFavorites , removeFromFavorites}}>
        { children }
    </AppContext.Provider>
} 

export const useGlobalContext = () => { 
    return useContext ( AppContext )
}

export { AppContext, AppProvider }