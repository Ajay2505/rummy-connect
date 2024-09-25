import { memo } from 'react';

const MainBox = memo(function MainBox(props) {
    return (
        <div className={`${props.className || ""} rounded-md shadow-md transition-shadow`}>
            {props.children}
        </div>
    );
});

export default MainBox;
