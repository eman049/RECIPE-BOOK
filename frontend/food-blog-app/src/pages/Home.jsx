import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RecipeItems from '../components/RecipeItems';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import InputForm from '../components/InputForm';

export default function Home() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current text
  const [isDeleting, setIsDeleting] = useState(false);
  const texts = ["Welcome To", "Our Recipy4U"]; // Texts for typewriter effect
  const typingSpeed = isDeleting ? 50 : 100; // Typing and deleting speed

  useEffect(() => {
    let timeout;

    const typeEffect = () => {
      const currentText = texts[currentIndex];
      if (!isDeleting) {
        setTypedText((prev) => currentText.substring(0, prev.length + 1));
        if (typedText === currentText) {
          timeout = setTimeout(() => setIsDeleting(true), 1000); // Pause before deleting
        }
      } else {
        setTypedText((prev) => currentText.substring(0, prev.length - 1));
        if (typedText === '') {
          setIsDeleting(false);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length); // Go to next text
        }
      }
    };

    timeout = setTimeout(typeEffect, typingSpeed);
    return () => clearTimeout(timeout); // Cleanup
  }, [typedText, isDeleting, currentIndex]);

  const addRecipe = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/addRecipe");
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <section className="home">
        <div className="left">
          <br /><br /><br /><br /><br /><br />
          <h1>{typedText}</h1> {/* Typewriter effect text */}
          <h4>
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
          </h4><br /><br />
          <button onClick={addRecipe}>Share your recipe</button>
        </div>
        <div className="right"><br /><br /><br /><br /><br />
          <img
            src="https://media.giphy.com/media/htYSox4rlkyBGeyGk5/giphy.gif"
            alt="Food Recipe Animation"
            width="600px"
            height="400px"
          />
        </div>
      </section>
   {/* Flip Card Section */}
   <section className="home-middle">
        <h2 className='for'>EXPLORE OUR FEATURED RECIPIES</h2>
        <div className="flip-container">
          {/* Flip Card 1 */}
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img
                  src="https://media4.giphy.com/media/7wbrSCbnMfc6b2dRSG/giphy.gif?cid=6c09b952jjywoodg0dfnhnddsi059dvp1scmt4dh9a45t2pw&ep=v1_gifs_search&rid=giphy.gif&ct=g" // Replace with your GIF URL
                  alt="CHICKEN BIRYANI RECIPIES "
                  width="200"
                  height="200"
                />
              </div>
              <div className="flip-card-back">
                <h3>CHICKEN BIRYANI RECIPIES </h3>
               
              </div>
            </div>
          </div>

          {/* Flip Card 2 */}
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img
                  src="https://media.tenor.com/WeHVqk5TxZ8AAAAM/sweet-dessert-sweets.gif" // Replace with your GIF URL
                  alt="Food 2 GIF"
                  width="200"
                  height="200"
                />
              
              </div>
              <div className="flip-card-back">
                <h3>DESERTS & SWEETS RECIPES</h3>
            
              </div>
            </div>
          </div>

          {/* Flip Card 3 */}
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
               <img src="https://cdn.shopify.com/s/files/1/0425/2699/8690/files/Burger_Gifs_480x480.gif?v=1653290211" alt=""  width="200"
                  height="200" />
    
              </div>
              <div className="flip-card-back">
                <h3>FAST FOOD RECIPIES</h3>
          
              </div>
            </div>
          </div>

          {/* Flip Card 4 */}
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img
                  src="https://media2.giphy.com/media/BMfotioKIPuXzsAOTC/giphy.gif?cid=6c09b952dkfjc7mzojxk6ro4eub1k3xq2hk0y7gbt2ruogqm&ep=v1_gifs_search&rid=giphy.gif&ct=g" // Replace with your GIF URL
                  alt="Food 4 GIF"
                  width="400"
                  height="400"
                />
              </div>
              <div className="flip-card-back">
                <h3>HOME MADE RECIPIES</h3>
                
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Marquee Section */}
      <section className="image-marquee"><br /><br />
        <h2 id="for">FEATURED IMAGES</h2><br />
        <div className="marquee">
          <div className="marquee-content"><br /> <br />
            <img src="https://media.giphy.com/media/htYSox4rlkyBGeyGk5/giphy.gif" alt="Food Animation 1" />
            <img src="https://www.seriouseats.com/thmb/uNyar6dZIHK7bi5pNeOAGC1DsHo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Favorite-recipes-of-the-year-2022-c135f762876347229ba8493e0f523730.gif" alt="Food Animation 2" />
            <img src="https://i.gifer.com/3Ov.gif" alt="Food Animation 3" />
            <img src=" https://i.gifer.com/origin/a0/a04b0da076a91f7b72a06fe60b50700e_w200.gif" alt="Food Animation 4" />
            <img src="https://media3.giphy.com/media/svdsMNSzOShzO/giphy.gif" alt="Food Animation 4" />
            <img src="https://i.gifer.com/origin/02/02f8ef07e796d1afdd6d57b22df2869e_w200.gif" alt="Food Animation 1" />
            <img src="https://media4.giphy.com/media/7wbrSCbnMfc6b2dRSG/giphy.gif" alt="Food Animation 2" />
            <img src="https://i.gifer.com/3Ov.gif" alt="Food Animation 3" />
            <img src="https://i.gifer.com/origin/02/02f8ef07e796d1afdd6d57b22df2869e_w200.gif" alt="Food Animation 4" />
            <img src="https://media.giphy.com/media/htYSox4rlkyBGeyGk5/giphy.gif" alt="Food Animation 1" />
            <img src=" https://i.gifer.com/origin/a0/a04b0da076a91f7b72a06fe60b50700e_w200.gif" alt="Food Animation 4" />
            <img src="https://media4.giphy.com/media/7wbrSCbnMfc6b2dRSG/giphy.gif" alt="Food Animation 2" />
            <img src="https://i.gifer.com/3Ov.gif" alt="Food Animation 3" />
            <img src="https://i.gifer.com/origin/02/02f8ef07e796d1afdd6d57b22df2869e_w200.gif" alt="Food Animation 4" />
            <img src=" https://i.gifer.com/origin/a0/a04b0da076a91f7b72a06fe60b50700e_w200.gif" alt="Food Animation 4" />
           
          </div>
        </div>
      </section>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <InputForm setIsOpen={() => setIsOpen(false)} />
        </Modal>
      )}

      <div className="recipe">
        <h2 id="for">MORE RECIPIES</h2>
        <RecipeItems />
      </div>

      <footer className="footer">
      <div className="footer-container">
        <div className="logo-and-about">
          <h2 className="logo">Recipy4U</h2>
          <p>Your ultimate destination for exploring and sharing recipes.</p>
          <p></p>

          <br /><br /><hr /><br />
          <div className="email-subscription">
          <h3>Subscribe our Newsletter</h3>
          <p>Don’t miss any updates of our new templates and extensions.! </p>
          <form>
            <input
              type="email"
              placeholder="Enter your email"
              className="email-input"
            />
            <button type="submit" className="subscribe-btn">Subscribe</button>
          </form>
          <br /><br /><hr />
        </div>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/">Recipes</a></li>
            <li><a href="https://help.cookbookmanager.com/hc/en-gb">About Us</a></li>
            <li><a href="https://help.cookbookmanager.com/hc/en-gb">FAQs</a></li>
          </ul>
        </div>

        <div className="social-contact">
          <h3>Contact Us</h3>
          <div className="social-icons">
            <a href="" target="_blank" rel="noopener noreferrer">
             <img src="https://cdn-icons-png.flaticon.com/128/15707/15707749.png" height={35} alt="" />
            </a>
            <a href="" target="_blank" rel="noopener noreferrer">
             <img src="https://cdn-icons-png.flaticon.com/128/15707/15707820.png"  height={35} alt="" />
            </a>
            <a href="" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn-icons-png.flaticon.com/128/3670/3670151.png"  height={35} alt="" />
            </a>
            <a href="https://github.com/eman049" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn-icons-png.flaticon.com/128/5968/5968866.png"  height={35} alt="" />
            </a>
            <a href="https://www.linkedin.com/in/eman-fatima-b121972a4/" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn-icons-png.flaticon.com/128/3536/3536505.png"  height={35} alt="" />
            </a>
          </div>
        </div>
      </div>


    </footer>
    </>
  );
}





   