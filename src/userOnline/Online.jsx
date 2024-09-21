import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Online.css';

const INACTIVITY_THRESHOLD = 1 * 60 * 1000;

export const Online = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [lastActiveTime, setLastActiveTime] = useState(Date.now());

  const handleUserActivity = () => {
    const currentTime = Date.now();
    setLastActiveTime(currentTime);

    if (!isOnline) {
      setIsOnline(true);
      toast.dismiss();
      toast.success('You are now active!');
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);

    const checkInactivity = () => {
      const currentTime = Date.now();
      if (currentTime - lastActiveTime > INACTIVITY_THRESHOLD && isOnline) {
        setIsOnline(false);
        toast.dismiss();
        toast.warning('You have been inactive for a while.');
      }
    };

    const intervalId = setInterval(checkInactivity, 1000);

    return () => {
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      clearInterval(intervalId);
    };
  }, [lastActiveTime, isOnline]);

  return (
    <div className='main-container'>
      <div className={`online-container ${isOnline ? 'online' : 'offline'}`}>
        <div className="img-container">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjyswBsiybReOTgYzPXCCvoih69xPWBek9jg&s"
            alt={isOnline ? 'User is online' : 'User is offline'}
          />
        </div>
        <div className="status">
          {isOnline ? 'Online' : 'Offline'}
        </div>
        <div className="extra-content">
          <p>{isOnline ? 'You are currently active. Feel free to continue using the app.' : 'You have been inactive for a while. Please move your cursor to stay active.'}</p>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};



