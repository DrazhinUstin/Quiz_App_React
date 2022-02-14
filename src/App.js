import React, { useState, useEffect } from 'react';
import QuizSetup from './components/QuizSetup';

const initParams = {
    category: 9,
    difficulty: 'easy',
    amount: 5,
};

const App = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [categories, setCategories] = useState([]);
    const [params, setParams] = useState(initParams);
    const [quiz, setQuiz] = useState(null);

    const getQuizData = async (url) => {
        setLoading(true);
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.trivia_categories) {
                setCategories(data.trivia_categories);
            } else if (data.response_code === 0) {
                setQuiz(data.results);
                setError(false);
            } else if (data.response_code === 1) {
                setError(true);
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        getQuizData('https://opentdb.com/api_category.php');
    }, []);

    if (loading) {
        return <div className='loading'></div>;
    }

    return (
        <>
            <QuizSetup {...{ error, categories, params, setParams, getQuizData }} />
        </>
    );
};

export default App;
