import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserProvider } from '../pages/globalValue';

import Home from '../pages/Home'
import Components from '../pages/Components'
import ChooseOption from '../pages/ChooseOption'
import Profile from '../pages/Profile'
import MyKitchen from '../pages/MyKitchen'
import MyIngredients from '../pages/MyIngredients'
import ShoppingList from '../pages/ShoppingList'
import FavoriteRecipes from '../pages/FavoriteRecipes'

/*S'HAURAN DE BORRAR TOTS ELS COMPONENTS ABANS D'ENTREGAR EL PROJECTE */
import ForgotPassword from '../components/login/ForgotPassword'
import MyKitchenComp from '../components/myKitchen/MyKitchen'
import DetailRecipe from '../components/detailRecipe/DetailRecipe'
import UserProfile  from '../components/userProfile/UserProfile'


export default function RouterDirections() {
  return (
    
    <BrowserRouter>
     <UserProvider>
        <Routes>
            <Route exact path="/" element={<ChooseOption/>}/>
            <Route exact path="/home" element={<Home/>}/>
            {/*FINAL PAGES*/}
            <Route exact path="/forgotPassword" element={<ForgotPassword/>}/>
            <Route exact path="/profile" element={<Profile/>}/>
            <Route exact path="/MyKitchen" element={<MyKitchen/>}/>
            <Route exact path="/MyIngredients" element={<MyIngredients/>}/>
            <Route exact path="/ShoppingList" element={<ShoppingList/>}/>
            <Route exact path="/FavoriteRecipes" element={<FavoriteRecipes/>}/>

            {/* COMPONENTS */}
            <Route exact path="/components" element={<Components></Components>} />
            <Route exact path="/components/myKitchen" element={<MyKitchenComp/>} />
            <Route exact path="/components/detailRecipe" element={<DetailRecipe/>} />
            <Route exact path="/components/userProfile" element={<UserProfile/>} />

            
            <Route path='*' element={<Home/>}/>
        </Routes>
     </UserProvider>
    </BrowserRouter>
  );
}