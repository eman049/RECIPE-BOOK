import React, { useEffect, useState } from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import foodImg from '../assets/foodRecipe.png'
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';

export default function RecipeItems() {
    const recipes = useLoaderData()
    const [allRecipes, setAllRecipes] = useState()
    let path = window.location.pathname === "/myRecipe" ? true : false
    let favItems = JSON.parse(localStorage.getItem("fav")) ?? []
    const [isFavRecipe, setIsFavRecipe] = useState(false)
    const [deleteMessage, setDeleteMessage] = useState("") // State for success message
    const navigate = useNavigate()
    console.log(allRecipes)

    useEffect(() => {
        setAllRecipes(recipes)
    }, [recipes])

    const onDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this recipe?");
        if (confirmDelete) {
            try {
                const response = await axios.delete(`http://localhost:5000/recipe/${id}`);
                console.log(response.data);  // Check response from backend
                
                // Update the UI if the recipe was deleted
                setAllRecipes(recipes => recipes.filter(recipe => recipe._id !== id));
                let filterItem = favItems.filter(recipe => recipe._id !== id);
                localStorage.setItem("fav", JSON.stringify(filterItem));
                
                // Show success message
                setDeleteMessage("Recipe deleted successfully!");
                setTimeout(() => setDeleteMessage(""), 3000); // Clear message after 3 seconds
            } catch (error) {
                console.error("Error deleting recipe:", error);
                alert("Failed to delete the recipe.");
            }
        }

    };

    const favRecipe = (item) => {
        let filterItem = favItems.filter(recipe => recipe._id !== item._id)
        favItems = favItems.filter(recipe => recipe._id === item._id).length === 0 ? [...favItems, item] : filterItem
        localStorage.setItem("fav", JSON.stringify(favItems))
        setIsFavRecipe(pre => !pre)
    }

    return (
        <>
            {/* Success message for deletion */}
            {deleteMessage && <div className="success-message">{deleteMessage}</div>}

            <div className='card-container'>
                {
                    allRecipes?.map((item, index) => {
                        return (
                            <div key={index} className='card' onDoubleClick={() => navigate(`/recipe/${item._id}`)}>
                                <img src={`http://localhost:5000/images/${item.coverImage}`} width="120px" height="100px" alt="recipe"></img>
                                <div className='card-body'>
                                    <div className='title'>{item.title}</div>
                                    <div className='icons'>
                                        <div className='timer'><BsStopwatchFill />{item.time}</div>
                                        {(!path) ? <FaHeart onClick={() => favRecipe(item)}
                                            style={{ color: (favItems.some(res => res._id === item._id)) ? "red" : "" }} /> :
                                            <div className='action'>
                                                <Link to={`/editRecipe/${item._id}`} className="editIcon"><FaEdit /></Link>
                                                <MdDelete onClick={() => onDelete(item._id)} className='deleteIcon' />
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
