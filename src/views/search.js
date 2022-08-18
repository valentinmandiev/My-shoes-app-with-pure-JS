import { html, nothing } from '../../node_modules/lit-html/lit-html.js';

import * as shoeService from '../api/shoe.js';
import { cardTempalte } from './catalog.js';

const searchTemplate = (searchHandler, shoes, isLoggedIn) => html`
  <section id="search">
          <h2>Search by Brand</h2>

          <form class="search-wrapper cf">
            <input
              id="search-input"
              type="text"
              name="search"
              placeholder="Search here..."
              required
            />
            <button type="submit" @click=${searchHandler}>Search</button>
          </form>

          <h3>Results:</h3>

          <div id="search-container">
            <ul class="card-wrapper">
              <!-- Display a li with information about every post (if any)-->
              ${shoes.map(shoe => cardTempalte(shoe, isLoggedIn))}
           
              ${shoes.length > 0 ? nothing : html`<h2>There are no results found.</h2>`}
            </ul>
            

          </div>
        </section>
     
    
`;



export const searchPage = ctx => {
   
    const searchHandler = () => {
      const searchElement = document.getElementById('search-input');
     
      
      shoeService.search(searchElement.value).then(shoes => {
        const isLoggedIn = !!ctx.user;
        ctx.render(searchTemplate(searchHandler, shoes, isLoggedIn));
      });
    };
  
    ctx.render(searchTemplate(searchHandler, []));
  };