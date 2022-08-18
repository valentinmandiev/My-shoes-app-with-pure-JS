import { html,nothing } from '../../node_modules/lit-html/lit-html.js';

import * as shoeService from '../api/shoe.js';

const homeTemplate = shoes => html`

<section id="home">
          <h1>Welcome to Sole Mates</h1>
          <img src="./images/home.jpg" alt="home" />
          <h2>Browse through the shoe collectibles of our users</h2>
          <h3>Add or manage your items</h3>
        </section>

`;



export const homePage = async ctx => {
  const shoes = await shoeService.getRecent();

  ctx.render(homeTemplate(shoes));
};