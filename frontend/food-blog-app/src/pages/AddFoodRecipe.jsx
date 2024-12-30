import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddFoodRecipe() {
    const [recipeData, setRecipeData] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false); // Prevent multiple submissions
    const navigate = useNavigate();

    const onHandleChange = (e) => {
        let val = e.target.name === "ingredients" 
            ? e.target.value.split(",") 
            : e.target.name === "file" 
            ? e.target.files[0] 
            : e.target.value;
        setRecipeData(pre => ({ ...pre, [e.target.name]: val }));
    };

    const validateForm = () => {
        const { title, ingredients, instructions } = recipeData;
        if (!title || !ingredients || !instructions) {
            setSuccessMessage("Please fill in all required fields.");
            return false;
        }
        return true;
    };

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        setSuccessMessage("");

        await axios.post("http://localhost:5000/recipe", recipeData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'authorization': 'bearer ' + localStorage.getItem("token"),
            },
        })
            .then(() => {
                window.alert("Recipe added successfully!"); // Display alert box
                setRecipeData({}); // Reset form data
                setTimeout(() => {
                    navigate("/");
                }, 2000); // Navigate after 2 seconds
            })
            .catch((err) => {
                console.error("Error adding recipe:", err);
                window.alert("Failed to add the recipe. Please try again."); // Display alert box
            })
            .finally(() => {
                setIsSubmitting(false); // Re-enable the button
            });
    };

    return (
        <>
            <div className='container'>
                <form className='form' onSubmit={onHandleSubmit}>
                    <br /> <br />
                    <h2 id='for'>Add Your Own Recipes</h2>
                    <div className='form-control'>
                        <label>Title</label>
                        <input 
                            type="text" 
                            className='input' 
                            name="title" 
                            onChange={onHandleChange} 
                            value={recipeData.title || ""}
                            required
                        />
                    </div>
                    <div className='form-control'>
                        <label>Time</label>
                        <input 
                            type="text" 
                            className='input' 
                            name="time" 
                            onChange={onHandleChange} 
                            value={recipeData.time || ""}
                        />
                    </div>
                    <div className='form-control'>
                        <label>Ingredients</label>
                        <textarea 
                            className='input-textarea' 
                            name="ingredients" 
                            rows="5" 
                            onChange={onHandleChange} 
                            value={recipeData.ingredients?.join(",") || ""}
                            required
                        />
                    </div>
                    <div className='form-control'>
                        <label>Instructions</label>
                        <textarea 
                            className='input-textarea' 
                            name="instructions" 
                            rows="5" 
                            onChange={onHandleChange} 
                            value={recipeData.instructions || ""}
                            required
                        />
                    </div>
                    <div className='form-control'>
                        <label>Recipe Image</label>
                        <input 
                            type="file" 
                            className='input' 
                            name="file" 
                            onChange={onHandleChange}
                        />
                    </div>
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Add Recipe"}
                    </button>
                </form>
                {successMessage && <p className="success-message">{successMessage}</p>}
            </div>
        </>
    );
}
