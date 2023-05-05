import axios from "axios";
import { debounce } from 'lodash';
import './searchIngredient.css';
import { useState, useContext } from "react";
import {RiAddCircleLine} from 'react-icons/ri';
import {MdFastfood} from 'react-icons/md'
import {TiTick} from 'react-icons/ti'
import { UserContext } from '../../pages/globalValue';


export default function SearchIngredient(props) {

    const [searching, setSearching] = useState(false);
    const [response, setResponse] = useState('');
    const { user } = useContext(UserContext);



    const handleChange = async (nomIngredient) => {
        if (nomIngredient === ''){
            setSearching(false);
            setResponse('');
        } else {
            setSearching(true)
            try {
                const res = await axios.post('http://localhost:3000/user/searchIngredients', { 
                    name: nomIngredient,
                    userId: user.id
                }); 
                setResponse(res);
            }
            catch (error) {
                console.error(error);
            }
        }
    }

    const debouncedSearch = debounce((e) =>{
        handleChange(e.target.value)
    }, 800);
    
    const afegirIngredient = async (name, id) => {
        try{
            const result = await axios.post('http://localhost:3000/user/addIngredient', {userId: user.id, ingredientId: id, ingredientName: name});
            let res = Object.assign({}, response);
            for (let j = 0; j < response.data.length; j++) {
                if (result.data.name === response.data[j].name) {
                    res.data[j].repeated = true;
                }
              }
            setResponse(res);
        }catch(error){
            console.log(error)
        }
    }

    return (
        <div className="search-ing-popup">
            <input
                className="searchBar1"
                //value={cercador}
                placeholder={"Search Ingredient"}
                onChange={(e) => debouncedSearch(e)}
            />
            <div className="ingredients-div">
                { response && (  //response.data (això es el que va en comptes de ingredientsJSON) 
                    response.data.map((ingredient) => 
                        <div className="ingredient">
                            <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <MdFastfood size={30} className="icon"></MdFastfood>
                                <div className="ingredient-name">{ingredient.name} </div>
                                {!ingredient.repeated && (
                                    <RiAddCircleLine size={25} className="add-button" onClick={() => afegirIngredient(ingredient.name, ingredient.id, response.data)} ></RiAddCircleLine>
                                )}
                                {ingredient.repeated && (
                                    <TiTick size={25} className="add-button"></TiTick>
                                )}
                            </li> 
                        </div>
                    ))
                }
                { !response && (
                    <div className="no-ingredients-searched">
                        <h3>NO</h3>
                        <h3>INGREDIENTS</h3>
                        <h3>SEARCHED</h3>
                    </div>
                    )
                }
            </div>
            <button className="exitButton" onClick={() => {props.clicked("true");}}>EXIT</button>
        </div>
    )
}
