/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import './Pizzadata.css';

function Header({ pizzaCount }) {
  return (
    <div className="maran-header">
      <header>
        <h1 className='Heading'>-Fast react pizza co-</h1>
        <h3 className='ourmenu'>Our Menu</h3>
        <p>Authentic Italian cuisine. {pizzaCount} creative dishes to choose from. All from our stone oven, all organic, all delicious.</p>
      </header>
    </div>
  );
}

function Main({ isOpen }) {
  return (
    <main className='main-container'>
      {pizzaData.map((p, i) => (
        <div className='pizza-box' key={i}>
          <img className='pizza-img' src={p.photoName} alt={p.name} />
          <div className='pizza-details'>
            <h3 className='pizza-name'>{p.name}</h3>
            <p className='pizza-ingredients'>{p.ingredients}</p>
            <span className={`pizza-quantity ${p.soldOut || !isOpen ? 'sold-out' : ''}`}>
              {p.soldOut || !isOpen ? 'Sold Out' : `$${p.price}`}
            </span>
          </div>
        </div>
      ))}
    </main>
  );
}

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with Italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozzarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozzarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozzarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozzarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozzarella, ham, arugula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function Footer({ currentTime, isOpen }) {
  const formatTime = (time) => {
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <footer>
      {isOpen ? (
        <p className="footer-para">We are open until 10:00 PM. Come visit us or order online</p>
      ) : (
        <p className="footer-para">The shop is currently closed. We open again at 10:00 AM.</p>
      )}
      <p className="footer-time">Current time: {formatTime(currentTime)}</p>
      <button className='order-btn' disabled={!isOpen}>Order</button>
    </footer>
  );
}

export const Petsa = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);

      const currentHour = now.getHours();
      setIsOpen(currentHour >= 10 && currentHour < 22); // Update shop status
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Header pizzaCount={pizzaData.length} />
      <Main isOpen={isOpen} />
      <Footer currentTime={currentTime} isOpen={isOpen} />
    </div>
  );
};

