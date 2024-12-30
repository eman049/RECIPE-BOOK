import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeItems from '../components/RecipeItems'; // Ensure path is correct
import { useNavigate } from 'react-router-dom';


export default function MyRecipes() {
 const navigate = useNavigate();
  const addRecipe = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/addRecipe");
    } else {
      setIsOpen(true);
    }
  };
  return (
    <><section className="recipeee">
<br /><br /><br />
        <h2 id='for'>YOUR ALL FAVOURITE RECEPIES</h2><br />
     
         
            <RecipeItems />
          </section>
          
    
  
       
        </>
   
  );
}

