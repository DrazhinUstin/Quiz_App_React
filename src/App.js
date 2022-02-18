import React, { useState, useEffect } from 'react';
import QuizSetup from './components/QuizSetup';
import Quiz from './components/Quiz';
import QuizResult from './components/QuizResult';

const initParams = {
    category: 9,
    difficulty: 'easy',
    amount: 5,
};

const initStats = {
    points: 0,
    startTime: 0,
    endTime: 0,
};

const App = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [categories, setCategories] = useState([]);
    const [params, setParams] = useState(initParams);
    const [quiz, setQuiz] = useState(null);
    const [step, setStep] = useState(0);
    const [stats, setStats] = useState(initStats);
    const [isTestPassed, setIsTestPassed] = useState(false);

    const getQuizData = async (url) => {
        setLoading(true);
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.trivia_categories) {
                setCategories(data.trivia_categories);
            } else if (data.response_code === 0) {
                setQuiz(data.results);
                setStats({ ...stats, startTime: Date.now() });
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

    if (quiz) {
        return (
            <>
                <Quiz {...{ quiz, step, setStep, setStats, isTestPassed, setIsTestPassed }} />
                <QuizResult
                    {...{ quiz, setQuiz, setStep, stats, setStats, isTestPassed, setIsTestPassed }}
                />
            </>
        );
    }

    return <QuizSetup {...{ error, categories, params, setParams, getQuizData }} />;
};

export default App;
