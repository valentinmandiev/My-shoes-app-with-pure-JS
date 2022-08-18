import { html } from '../../node_modules/lit-html/lit-html.js';

import { createSubmitHandler } from '../utils.js';
import * as shoeService from '../api/shoe.js';

const createTemplate = onSubmit => html`


        <section id="create">
          <div class="form" @submit=${onSubmit}>
            <h2>Add item</h2>
            <form class="create-form">
              <input
                type="text"
                name="brand"
                id="shoe-brand"
                placeholder="Brand"
              />
              <input
                type="text"
                name="model"
                id="shoe-model"
                placeholder="Model"
              />
              <input
                type="text"
                name="imageUrl"
                id="shoe-img"
                placeholder="Image url"
              />
              <input
                type="text"
                name="release"
                id="shoe-release"
                placeholder="Release date"
              />
              <input
                type="text"
                name="designer"
                id="shoe-designer"
                placeholder="Designer"
              />
              <input
                type="text"
                name="value"
                id="shoe-value"
                placeholder="Value"
              />

              <button type="submit">post</button>
            </form>
          </div>
        </section>
`;

export const createPage = ctx => {
  ctx.render(createTemplate(createSubmitHandler(ctx, onSubmit)));
};

const onSubmit = async (ctx, data, event) => {
  if (Object.values(data).some(f => f === '')) {
    alert('All fields are required!');
    return;
  }

  await shoeService.create({
    brand: data.brand,
    model: data.model,
    imageUrl: data.imageUrl,
    release: data.release,
    designer: data.designer,
    value: data.value
  });

  event.target.reset();
  ctx.page.redirect('/catalog');
};