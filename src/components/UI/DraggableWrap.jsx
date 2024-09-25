// DraggableWrap.js
import { useLayoutEffect, useRef, useState } from "react";

import Draggable from "./Draggable";

export default function DraggableWrap(props) {
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: "auto", y: "auto" });
    const wrapRef = useRef();

    const handleMouseDown = () => {
        setIsDragging(true);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleDrag = ({ deltaX, deltaY }) => {
        setPosition((prevPosition) => ({
            x: deltaX || prevPosition.x,
            y: deltaY || prevPosition.y
        }));
    };

    const handleTouchStart = () => {
        setIsDragging(true);
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    useLayoutEffect(() => {
        function resizer() {
            // wrapSizeSetter();
            setPosition(() => ({
                x: "0",
                y: "100%"
            }));
        }
        
        window.addEventListener("resize", resizer);

        return () => {
            window.removeEventListener("resize", resizer);
        }
    }, []);

    return (
        <div ref={wrapRef}
            id="draggableWrapRef"
            className={"absolute w-fit h-fit " + props.className}
            style={{ top: `${position.y}px`, left: `${position.x}px`,}}
        >
            {props.children}
            <Draggable
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onDrag={handleDrag}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            />
        </div>
    );
}