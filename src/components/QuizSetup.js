import React from 'react';

const QuizSetup = ({ error, categories, params, setParams, getQuizData }) => {
    const handleParams = (e) => {
        setParams((params) => {
            return { ...params, [e.target.id]: e.target.value };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { category, difficulty, amount } = params;
        const url = 'https://opentdb.com/api.php?';
        const fullUrl = `${url}category=${category}&difficulty=${difficulty}&amount=${amount}`;
        getQuizData(fullUrl);
    };

    return (
        <form className='quiz-setup'>
            <h2>setup quiz</h2>
            <div className='quiz-setup-field'>
                <label htmlFor='category'>category:</label>
                <select id='category' value={params.category} onChange={handleParams}>
                    {categories.map((category) => {
                        const { id, name } = category;
                        return (
                            <option key={id} value={id}>
                                {name}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div className='quiz-setup-field'>
                <label htmlFor='difficulty'>difficulty:</label>
                <select id='difficulty' value={params.difficulty} onChange={handleParams}>
                    <option value='easy'>easy</option>
                    <option value='medium'>medium</option>
                    <option value='hard'>hard</option>
                </select>
            </div>
            <div className='quiz-setup-field'>
                <label htmlFor='amount'>questions amount:</label>
                <select id='amount' value={params.amount} onChange={handleParams}>
                    <option value='5'>5</option>
                    <option value='10'>10</option>
                    <option value='15'>15</option>
                    <option value='20'>20</option>
                </select>
            </div>
            {error && (
                <p className='error-message'>Can't generate quiz. Please, try different options.</p>
            )}
            <button type='submit' className='btn' onClick={handleSubmit}>
                start quiz
            </button>
        </form>
    );
};

export default QuizSetup;
