import { html, nothing } from '../../node_modules/lit-html/lit-html.js';

import * as shoeService from '../api/shoe.js';

const detailsTemplate = (shoe, onDelete) => html`

  
  <section id="details">
          <div id="details-wrapper">
            <p id="details-title">Shoe Details</p>
            <div id="img-wrapper">
              <img src=${shoe.imageUrl} alt="example1" />
            </div>
            <div id="info-wrapper">
              <p>Brand: <span id="details-brand">${shoe.brand}</span></p>
              <p>
                Model: <span id="details-model">${shoe.model}</span>
              </p>
              <p>Release date: <span id="details-release">${shoe.release}</span></p>
              <p>Designer: <span id="details-designer">${shoe.designer}</span></p>
              <p>Value: <span id="details-value">${shoe.value}</span></p>
            </div>

             
          ${shoe.isOwner
      ? html`
           <div id="action-buttons">
              <a href="/edit/${shoe._id}" id="edit-btn">Edit</a>
              <a href="/catalog" @click=${onDelete} id="delete-btn">Delete</a>
            </div>
            `
        : nothing}

           

          </div>
        </section>

  
 
`;

export const detailsPage = async ctx => {
  const shoeId = ctx.params.id;
  const shoe = await shoeService.getById(shoeId);

  if (ctx.user) {
    shoe.isOwner = ctx.user._id === shoe._ownerId;
    shoe.user=ctx.user._id;
  }

  const onDelete = async () => {
    const confirmed = confirm(`Are you sure you want to delete ${shoe.brand}?`);

    if (confirmed) {
      await shoeService.deleteById(shoeId);
      ctx.page.redirect('/catalog');
    }
  };

  ctx.render(detailsTemplate(shoe, onDelete));
};