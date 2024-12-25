import React, { useEffect, useState } from 'react';
import Start from './Quizcomponent/Start';
import Quiz from './Quizcomponent/Quiz';
import Result from './Quizcomponent/Result';
import axios from "axios";
import toast from "react-hot-toast";

import { Link } from "react-router-dom";

function App2() {
    // All Quizs, Current Question, Index of Current Question, Answer, Selected Answer, Total Marks
    const [quizs, setQuizs] = useState([]);
    const [question, setQuesion] = useState({});
    const [questionIndex, setQuestionIndex] = useState(0);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [marks, setMarks] = useState(0);

    // Display Controlling States
    const [showStart, setShowStart] = useState(true);
    const [showQuiz, setShowQuiz] = useState(false);
    const [showResult, setShowResult] = useState(false);

    const [products, setProducts] = useState([]);

    //getall products
    const getAllProblem = async () => {
        try {
            const { data } = await axios.get("https://the-reading-room-3z29.onrender.com/api/v1/product/get-problem");
            setQuizs(data.problem);
        } catch (error) {
            console.log(error);
            toast.error("Someething Went Wrong");
        }
    };

    //lifecycle method
    useEffect(() => {
        getAllProblem();
    }, []);
    // Set a Single Question
    useEffect(() => {
        if (quizs.length > questionIndex) {
            setQuesion(quizs[questionIndex]);
        }
    }, [quizs, questionIndex])

    // Start Quiz
    const startQuiz = () => {
        setShowStart(false);
        setShowQuiz(true);
    }

    // Check Answer
    const checkAnswer = (event, selected) => {
        if (!selectedAnswer) {
            setCorrectAnswer(question.answer);
            setSelectedAnswer(selected);

            if (selected === question.answer) {
                event.target.classList.add('bg-success');
                setMarks(marks + 5);
            } else {
                event.target.classList.add('bg-danger');
            }
        }
    }

    // Next Quesion
    const nextQuestion = () => {
        setCorrectAnswer('');
        setSelectedAnswer('');
        const wrongBtn = document.querySelector('button.bg-danger');
        wrongBtn?.classList.remove('bg-danger');
        const rightBtn = document.querySelector('button.bg-success');
        rightBtn?.classList.remove('bg-success');
        setQuestionIndex(questionIndex + 1);
    }

    // Show Result
    const showTheResult = () => {
        setShowResult(true);
        setShowStart(false);
        setShowQuiz(false);
    }

    // Start Over
    const startOver = () => {
        setShowStart(false);
        setShowResult(false);
        setShowQuiz(true);
        setCorrectAnswer('');
        setSelectedAnswer('');
        setQuestionIndex(0);
        setMarks(0);
        const wrongBtn = document.querySelector('button.bg-danger');
        wrongBtn?.classList.remove('bg-danger');
        const rightBtn = document.querySelector('button.bg-success');
        rightBtn?.classList.remove('bg-success');
    }

    return (
        <>
            {/* Welcome Page */}
            <Start
                startQuiz={startQuiz}
                showStart={showStart}
            />

            {/* Quiz Page */}
            <Quiz
                showQuiz={showQuiz}
                question={question}
                quizs={quizs}
                checkAnswer={checkAnswer}
                correctAnswer={correctAnswer}
                selectedAnswer={selectedAnswer}
                questionIndex={questionIndex}
                nextQuestion={nextQuestion}
                showTheResult={showTheResult}
            />

            {/* Result Page */}
            <Result
                showResult={showResult}
                quizs={quizs}
                marks={marks}
                startOver={startOver} />
        </>
    );
}

export default App2;
