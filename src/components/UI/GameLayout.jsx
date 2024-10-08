import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import socket from '../../helpers/socket/socketService';
import RoomChat from './RoomChat';

const GameLayout = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        socket.on("redirect", ({ redirectURL }) => {
            navigate(redirectURL);
        });

        return () => {
            socket.off("redirect");
        }
    }, [navigate]);

    return (
        <div className="max-lg:pb-20 relative">
            <div className="sm:hidden flex items-center justify-center fixed inset-0 z-50 bg-[rgba(0,0,0,0.7)]">
                <div className="p-7 relative">
                    <div className="absolute inset-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-arrow-repeat" viewBox="0 0 16 16">
                            <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9"/>
                            <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"/>
                        </svg>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-phone-fill" viewBox="0 0 16 16">
                        <path d="M3 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zm6 11a1 1 0 1 0-2 0 1 1 0 0 0 2 0"/>
                    </svg>
                </div>
            </div>
            <div className="fixed z-30 right-5 lg:right-10 left-5 flex justify-end top-2 pointer-events-none">
                <div className="w-full">
                    <h3 className='text-end'><b>R</b>ummy <b>C</b>onnect</h3>
                    <RoomChat />
                </div>
            </div>
            <Outlet />
        </div>
    );
};

export default GameLayout;