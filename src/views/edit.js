import { html } from '../../node_modules/lit-html/lit-html.js';

import * as shoeService from '../api/shoe.js';
import { createSubmitHandler } from '../utils.js';

const editTemplate = (shoe, onSubmit) => html`


        <section id="edit">
          <div class="form" @submit=${onSubmit}>
            <h2>Edit item</h2>
            <form class="edit-form">
              <input
                type="text"
                name="brand"
                id="shoe-brand"
                placeholder="Brand"
                .value=${shoe.brand}
              />
              <input
                type="text"
                name="model"
                id="shoe-model"
                placeholder="Model"
                .value=${shoe.model}
              />
              <input
                type="text"
                name="imageUrl"
                id="shoe-img"
                placeholder="Image url"
                .value=${shoe.imageUrl}
                
              />
              <input
                type="text"
                name="release"
                id="shoe-release"
                placeholder="Release date"
                .value=${shoe.release}
              />
              <input
                type="text"
                name="designer"
                id="shoe-designer"
                placeholder="Designer"
                .value=${shoe.designer}
              />
              <input
                type="text"
                name="value"
                id="shoe-value"
                placeholder="Value"
                .value=${shoe.value}
              />

              <button type="submit">post</button>
            </form>
          </div>
        </section>
`;

export const editPage = async ctx => {
  const shoeId = ctx.params.id;
  const shoe = await shoeService.getById(shoeId);

  ctx.render(editTemplate(shoe, createSubmitHandler(ctx, onSubmit)));
};

const onSubmit = async (ctx, data, event) => {
  const shoeId = ctx.params.id;
  if (data.brand.trim() === '' || data.model.trim() === '' || data.imageUrl.trim() === '' || data.release.trim() === '' || data.designer.trim() === '' || data.value.trim() === '') {
    alert('All fields are required!');
    return;
  }
  if (Object.values(data).some(f => f === '')) {
    alert('All fields are required!');
    return;
  }

  await shoeService.update(shoeId, {
    brand: data.brand,
    model: data.model,
    imageUrl: data.imageUrl,
    release: data.release,
    designer: data.designer,
    value: data.value
  });

  event.target.reset();
  ctx.page.redirect(`/details/${shoeId}`);
};