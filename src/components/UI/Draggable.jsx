// Draggable.js
import React, { useRef, useState, useEffect } from "react";

export default function Draggable({ onMouseDown, onMouseUp, onTouchStart, onTouchEnd, onDrag }) {
    const draggableRef = useRef();
    const [isDragging, setIsDragging] = useState(false);
    
    const draggableWrapRef = document.getElementById("draggableWrapRef");

    function getWrapWidthAndHeight() {
        if (draggableWrapRef) {
            const elInfo = draggableWrapRef.getBoundingClientRect();
            return {
                width: elInfo.width,
                height: elInfo.height
            }
        } 
        return {
            width: "100%",
            height: "100%"
        }
    }

    useEffect(() => {
        const handleMouseMove = (event) => {
            if (isDragging) {
                const deltaX = event.clientX - getWrapWidthAndHeight().width + 20;
                const deltaY = event.clientY - 20;
                if ((event.clientX + 20 >= window.innerWidth || deltaX <= 0) && (deltaY <= 0 || getWrapWidthAndHeight().height + event.clientY - 20 >= window.innerHeight)) {
                    
                }
                else if (event.clientX + 20 >= window.innerWidth || deltaX <= 0) {
                    onDrag({ deltaY });
                }
                else if (deltaY <= 0 || getWrapWidthAndHeight().height + event.clientY - 20 >= window.innerHeight) {
                    onDrag({ deltaX });
                }
                else {
                    onDrag({ deltaX, deltaY });
                }
            }
        };
        
        const handleTouchMove = (event) => {
            if (isDragging && event.touches.length === 1) {
                const touch = event.touches[0];
                const deltaX = touch.clientX - getWrapWidthAndHeight().width + 20;
                const deltaY = touch.clientY - 20;
                if ((touch.clientX + 20 >= window.innerWidth || deltaX <= 0) && (deltaY <= 0 || getWrapWidthAndHeight().height + touch.clientY - 20 >= window.innerHeight)) {
                    
                }
                else if (touch.clientX + 20 >= window.innerWidth || deltaX <= 0) {
                    onDrag({ deltaY });
                }
                else if (deltaY <= 0 || getWrapWidthAndHeight().height + touch.clientY - 20 >= window.innerHeight) {
                    onDrag({ deltaX });
                }
                else {
                    onDrag({ deltaX, deltaY });
                }
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
            onMouseUp();
        };

        const handleTouchEnd = () => {
            setIsDragging(false);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);
            onTouchEnd();
        };

        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("touchmove", handleTouchMove);
            window.addEventListener("mouseup", handleMouseUp);
            window.addEventListener("touchend", handleTouchEnd);
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);
        };
    }, [isDragging, onDrag, onMouseUp, onTouchEnd]);

    const handleMouseDown = (event) => {
        setIsDragging(true);
        // setStartPosition({ x: event.clientX, y: event.clientY });
        onMouseDown();
    };

    const handleTouchStart = (event) => {
        setIsDragging(true);
        // const touch = event.touches[0];
        // setStartPosition({ x: touch.clientX, y: touch.clientY });
        onTouchStart();
    };

    return (
        <button
            ref={draggableRef}
            className="absolute top-0 right-0 p-2 max-w-10 z-10 bg-[rgba(0,0,0,0.3)] rounded-bl-[50%] cursor-move"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
        >
            <img className="invert select-none pointer-events-none" src="/images/drag.png" alt="" />
        </button>
    );
}
