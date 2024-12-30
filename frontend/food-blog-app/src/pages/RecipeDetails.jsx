import React from 'react';
import profileImg from '../assets/profile.png';
import food from '../assets/foodRecipe.png';
import { useLoaderData } from 'react-router-dom';

export default function RecipeDetails() {
    const recipe = useLoaderData();
    console.log(recipe);

    // Function to download the shopping list as a text file
    const downloadShoppingList = () => {
        const shoppingListContent = recipe.ingredients.join('\n');
        const blob = new Blob([shoppingListContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${recipe.title}-ShoppingList.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    // Function to handle voice narration of instructions
    const playVoiceInstructions = () => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(recipe.instructions);
        utterance.lang = 'en-US'; // Set the language
        utterance.rate = 1; // Adjust the speaking rate (1 is normal speed)
        synth.speak(utterance);
    };

    return (
        <>
            <br /> <br /> <br /> <br />

            <div className="outer-container">
                <h2 id="for">Recipe Details</h2><br /><br />
                <div className="profile">
                    <img src={profileImg} width="50px" height="50px" alt="Profile" />
                    <h5>{recipe.email}</h5>
                </div>
                <h3 className="title">{recipe.title}</h3>
                <img
                    src={`http://localhost:5000/images/${recipe.coverImage}`}
                    width="220px"
                    height="200px"
                    alt="Recipe"
                />
                 {/* Button for voice narration */}
                 <button  onClick={playVoiceInstructions} className="voice-btn">
                            🎤 Play Instructions
                        </button>
                <div className="recipe-details">
                    <div className="ingredients">
                        <h4>Ingredients</h4>
                        <ul>
                            {recipe.ingredients.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="instructions">
                        <h4>Instructions</h4>
                        <span>{recipe.instructions}</span>
                        <br /><br />
                       
                    </div>
                </div><br /><br /><br /><br /><br /><br />

                <h2 id='for' align='center'>Shopping List</h2>
                {/* Shopping List Section */}
                <div className="shopping-list-section">
                    <img src="https://64.media.tumblr.com/dcf03bbe13cf9158424a2d1e7032def8/tumblr_n8986yxRTA1rnwo2vo1_500.gif" alt="" />
                    <div className="shopping-list-container">
                        <h2 id='for' align='center'>List of Grocery</h2><br /><br />
                        <ul>
                            {recipe.ingredients.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <br /><br />
                    <button onClick={downloadShoppingList} className="download-btn">
                        📥 Download List
                    </button>
                </div>
            </div>
        </>
    );
}
