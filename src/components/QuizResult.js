import React from 'react';
import { FaThumbsUp, FaThumbsDown, FaShareSquare } from 'react-icons/fa';

const QuizResult = ({
    quiz,
    setQuiz,
    setStep,
    points,
    setPoints,
    isTestPassed,
    setIsTestPassed,
}) => {
    const restartQuiz = () => {
        setStep(0);
        setPoints(0);
        setIsTestPassed(false);
    };

    const exitQuiz = () => {
        restartQuiz();
        setQuiz(null);
    };

    const { category, difficulty } = quiz[0];
    const successRate = Math.round((points / quiz.length) * 100);
    return (
        <div className={`quiz-result-overlay ${isTestPassed && 'show'}`}>
            <section className='quiz-result wrapper'>
                <h2 className='quiz-result-header'>quiz result</h2>
                <div className='quiz-result-field'>
                    <h4>category:</h4>
                    <p>{category}</p>
                </div>
                <div className='quiz-result-field'>
                    <h4>difficulty:</h4>
                    <p>{difficulty}</p>
                </div>
                <div className='quiz-result-field'>
                    <h4>total questions:</h4>
                    <p>{quiz.length}</p>
                </div>
                <div className='quiz-result-field'>
                    <h4>correct answers:</h4>
                    <p>{points}</p>
                </div>
                <div className='quiz-result-field'>
                    <h4>success rate:</h4>
                    <p className='success-rate'>
                        {successRate < 50 ? <FaThumbsDown /> : <FaThumbsUp className='up' />}
                        {successRate}%
                    </p>
                </div>
                <footer className='quiz-result-footer'>
                    <button className='btn' onClick={restartQuiz}>
                        restart
                    </button>
                    <button className='btn red' onClick={exitQuiz}>
                        <FaShareSquare />
                        exit
                    </button>
                </footer>
            </section>
        </div>
    );
};

export default QuizResult;
