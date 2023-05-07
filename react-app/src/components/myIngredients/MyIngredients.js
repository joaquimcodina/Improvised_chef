import axios from 'axios';
import './MyIngredients.css';
import classNames from 'classnames';
import { BsTrash3 } from 'react-icons/bs';
import { UserContext } from '../../pages/globalValue';
import { useEffect, useContext, useState } from 'react';
import { getIngredientIcon } from '../myKitchen/MyKitchen';
import SearchIngredient from '../searchIngredient/SearchIngredient';

export default function MyIngredients() {

    const [call, setCall] = useState({ clicked: false })
    const { user } = useContext(UserContext);
    const [ingredients, setIngredients] = useState(null)

    useEffect(() => {
        const getInfo = async () => {
            try {
                // eslint-disable-next-line
                if (user.email != '') {
                    const response = await axios.post('http://localhost:3000/user/ingredients', {
                        userId: user.id
                    });
                    setIngredients(response);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getInfo();
    }, []);

    async function deleteIngredient(id, name) {
        let ingEliminated = {};
        let newIngredientList = Object.assign({}, ingredients);
        try {
            if (user.email !== '') {
                ingEliminated = await axios.post('http://localhost:3000/user/removeIngredient', {
                    userId: user.id,
                    ingredientId: id,
                    ingredientName: name
                });
                for (let j = 0; j < ingredients.data.length; j++) {
                    if (ingEliminated.data.name === ingredients.data[j].name) { //quan trobi el ingredient l'elimina
                        newIngredientList.data.splice(j,1);
                    }
                }
                setIngredients(newIngredientList);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const clicked = async (message) => {
        if (message === 'true') {
            
            setCall({ clicked: false })
        }
        else {
            setCall({ clicked: true })
        }
    }

    const updateScreen = async (data) => {
        setIngredients(data);
    }

    const myIngredientsClass = classNames('div-myIngridients', { 'dark': call.clicked });
    const outBox = classNames('div-outBox', { 'dark': call.clicked });

    return (
        <div className={myIngredientsClass}>
            <div className={outBox}>
                <h2 className="ingredientsTitle">INGREDIENTS LIST</h2>
                <button className="addButton" onClick={() => { clicked('false') }}>Add more ingredients to the list</button>
                <div className="div-inBox">
                    {!ingredients?.data && (
                        <div className="container_list" id='no_list'>
                            Loading Ingredients...
                        </div>
                    )}
                    {ingredients?.data && (
                        <div className='ingredients-list'>
                            {ingredients.data.map((ingredient) => (
                                <li className='ingredient-li'>
                                    <div className='icon-div'>
                                        <div className='ingredientIcon'>{getIngredientIcon(ingredient.name)}</div>
                                    </div>
                                   
                                    <div className='ingredientName'>{ingredient.name}</div>

                                    <div className='trashButt-div'>
                                    <BsTrash3 onClick={() => deleteIngredient(ingredient.id, ingredient.name)} className='trashButt'></BsTrash3>
                                    </div>
                                    {ingredients.data[ingredients.data.length - 1] !== ingredients && (
                                        <hr className="separador2" />
                                    )}                                
                                </li>
                            ))}                    
                        </div>
                    )}   
                </div>
            </div>
            {call.clicked && (
                <div>
                    <div className='popUpIngredients'>
                        <SearchIngredient list='ingredients' clicked={clicked} updateScreen={updateScreen}></SearchIngredient>
                    </div>
                </div>

            )}
        </div>
    );
}