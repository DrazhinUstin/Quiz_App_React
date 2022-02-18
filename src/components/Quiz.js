import React, { useState, useEffect, useRef } from 'react';
import { shuffleArray } from '../utils';

const Quiz = ({ quiz, step, setStep, setPoints, isTestPassed, setIsTestPassed }) => {
    const [isUserAnswered, setIsUserAnswered] = useState(false);
    const [answers, setAnswers] = useState([]);
    const answersRef = useRef();

    const handleAnswer = (e) => {
        const answerDOM = e.target;
        if (answerDOM.innerHTML === correct_answer) {
            setPoints((points) => points + 1);
        } else {
            answerDOM.className = 'incorrect';
        }
        setIsUserAnswered(true);
    };

    const nextQuestion = () => {
        if (step === quiz.length - 1 && isUserAnswered) {
            setIsTestPassed(true);
            return;
        }
        setStep((step) => step + 1);
        setIsUserAnswered(false);
    };

    useEffect(() => {
        if (!isTestPassed) setIsUserAnswered(false);
    }, [isTestPassed]);

    useEffect(() => {
        setAnswers(shuffleArray([...incorrect_answers, correct_answer]));
    }, [step]);

    useEffect(() => {
        const answersDOM = answersRef.current;
        if (!isUserAnswered) {
            [...answersDOM.children].forEach((child) => {
                child.className = '';
            });
        }
    }, [isUserAnswered]);

    const { question, correct_answer, incorrect_answers } = quiz[step];
    return (
        <section className='quiz wrapper'>
            <header className='quiz-progress'>
                <div className='quiz-progress-indicator'>
                    <span style={{ width: `${(100 / quiz.length) * (step + 1)}%` }}></span>
                </div>
                <h4>
                    {step + 1} of {quiz.length}
                </h4>
            </header>
            <h4 className='quiz-question' dangerouslySetInnerHTML={{ __html: question }} />
            <ul className={`quiz-answers ${isUserAnswered && 'disabled'}`} ref={answersRef}>
                {answers.map((answer, index) => {
                    return (
                        <li
                            key={index}
                            dangerouslySetInnerHTML={{ __html: answer }}
                            onClick={handleAnswer}
                            className={`${
                                isUserAnswered && answer === correct_answer && 'correct'
                            }`}
                        />
                    );
                })}
            </ul>
            <footer className='quiz-footer'>
                <button className={`btn ${!isUserAnswered && 'disabled'}`} onClick={nextQuestion}>
                    {step !== quiz.length - 1 ? 'next question' : 'see result'}
                </button>
            </footer>
        </section>
    );
};

export default Quiz;
