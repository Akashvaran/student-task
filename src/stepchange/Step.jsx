import { useState } from 'react';
import './Step.css';

export const Step = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Define initial card data with titles, messages, and images
  const [cardData] = useState([
    { title: 'Step 1', message: 'You are learning React', img: 'step/morning.jpg' },
    { title: 'Step 2', message: 'How do you learn React?', img: 'step/exercise.jpeg' },
    { title: 'Step 3', message: 'Don’t worry, we will help you', img: 'step/relax.jpeg' },
    { title: 'Step 4', message: 'If you need any help, please contact us anytime', img: 'step/lunch.jpeg' },
    { title: 'Step 5', message: 'If you need a trainer, we can help you', img: 'step/study.jpeg' }
  ]);

  const nextStep = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, cardData.length));
  };

  const prevStep = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  return (
    <div className='step-project'>
      <div className='image-container'>
        <img src={cardData[currentPage - 1].img} alt={cardData[currentPage - 1].title} />
      </div>
      <div className="step-container">
        <div className='number-box'>
          {cardData.map((_, index) => (
            <span key={index} className={currentPage === index + 1 ? 'active' : ''}>{index + 1}</span>
          ))}
        </div>
        <div className='msg-box'>
          <h2>{cardData[currentPage - 1].title}</h2>
          <p>{cardData[currentPage - 1].message}</p>
          <button className='learn-button'>Learn How</button>
        </div>
        <div className='btn-box'>
          <button className='btn' onClick={prevStep}>Prev Step</button>
          <button className='btn' onClick={nextStep}>Next Step</button>
        </div>
      </div>
    </div>
  );
};


