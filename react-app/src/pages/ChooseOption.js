import { NavLink } from "react-router-dom";
import { UserContext } from './globalValue';
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function ChooseOption() {

    const navigation = useNavigate();
    const { user } = useContext(UserContext);

    const move = async (e) => {
        navigation("/home");
    }

    useEffect(() => {
        if (user?.email) {
            move();
        }
    }, [user?.email]);

    return (
        <div className="home">
            {
                !user?.email && (
                    <>
                        <h1>IMPROVISED CHEF</h1>
                        <ul>
                            <li><NavLink to="/home" className="navegationLink">DEMO</NavLink></li>
                            <li><NavLink to="/components" className="navegationLink">View all components</NavLink></li>
                        </ul>
                    </>
                )
            }
        </div>
    );
}