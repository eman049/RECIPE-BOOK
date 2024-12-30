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
    <><section className="recipee">
<br />
        <h2 id='for'>YOUR OWN CREATED RECIPIES</h2><br />
         <button  id='btn' onClick={addRecipe}>Add More Recipies</button><br /><br />
     
         
            <RecipeItems />
          </section>
          
    
  
       
        </>
   
  );
}

