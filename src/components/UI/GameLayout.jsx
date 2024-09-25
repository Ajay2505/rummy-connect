import { Outlet } from 'react-router-dom';
import Aside from '../Aside/Aside';

const GameLayout = () => {


    return (
        <div className="lg:pr-20 max-lg:pb-20">
            <Aside />
            <Outlet />
        </div>
    );
};

export default GameLayout;