import { Link, useNavigate } from "react-router-dom";
import { TbCheese } from 'react-icons/tb';
import { MdLogout, MdOutlineFavoriteBorder, MdOutlineShoppingCart, MdPersonOutline, MdOutlineHome, MdOutlineKitchen } from 'react-icons/md';
import React, { useContext, useState } from "react";
import { UserContext } from '../../pages/globalValue';
import { auth } from "../../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import './sideBar.css';

const Sidebar = () => {
    const { user, setUser } = useContext(UserContext);    //const {logOut} = useAuth();
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    const navigation = useNavigate();

    const handleLogOut = async () => {
        //await axios.post('http://localhost:3700/logout', {user});
        setUser({ email: '' });
        navigation("/home");
    }
    return (
        <>
        <div className="openIconDiv">
            <Link to='#' className="openIcon">
                <TbCheese onClick={showSidebar}></TbCheese>
            </Link>
        </div>
        <nav className={sidebar ? 'sidebar active' : 'sidebar'}>
            <div className="sidebar-top">
                <div className="closeIconDiv">
                    <Link to='#' className="openIcon">
                        <MdLogout onClick={showSidebar}></MdLogout>
                    </Link>
                </div>
                <div className="user-div">
                    <div className="image-div">
                        <Link to="/Profile"><img className="user-image" src="https://www.tooltyp.com/wp-content/uploads/2014/10/1900x920-8-beneficios-de-usar-imagenes-en-nuestros-sitios-web.jpg"></img></Link>
                    </div>
                    <Link to="/Profile"><h3 className="name">JUAN COCINERO</h3></Link>
                    <Link to="/Profile"><label className="username">@juancocinero</label></Link>
                </div>
                <div className="logout-div">
                    <button onClick={handleLogOut}><MdLogout size={22}></MdLogout> <label>Sign Out</label></button>
                </div>
                <br/>
            </div>
            <div className="sidebar-bottom">
                <ul>
                    <Link to="/home"><li><MdOutlineHome size={30} /><label>Home</label></li></Link>


                    <Link to="/Profile"><li><MdPersonOutline size={30} /><label>Profile</label></li></Link>


                    <Link to="/MyKitchen"><li><MdOutlineKitchen size={30} /><label>My Kitchen</label></li></Link>


                    <Link to="/MyIngredients"><li><TbCheese size={30} /><label>My Ingredients</label></li></Link>


                    <Link to="/ShoppingList"><li><MdOutlineShoppingCart size={30} /><label>Shopping List</label></li></Link>


                    <Link to="/FavouriteRecipes"><li><MdOutlineFavoriteBorder size={30} /><label>My Favourites</label></li></Link>
                </ul>
            </div>
        </nav>
        </>
    )
}

export default Sidebar;