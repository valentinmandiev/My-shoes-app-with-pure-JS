import { html } from '../../node_modules/lit-html/lit-html.js';

import { createSubmitHandler } from '../utils.js';
import * as userService from '../api/user.js';

const loginTemplate = onSubmit => html`
  
        <section id="login">
          <div class="form" @submit=${onSubmit}>
            <h2>Login</h2>
            <form class="login-form">
              <input type="text" name="email" id="email" placeholder="email" />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
              <button type="submit">login</button>
              <p class="message">
                Not registered? <a href="/register">Create an account</a>
              </p>
            </form>
          </div>
        </section>
`;

export const loginPage = ctx => {
  ctx.render(loginTemplate(createSubmitHandler(ctx, onSubmit)));
};

const onSubmit = async (ctx, data, event) => {
  if (data.email.trim() === '' || data.password.trim() === '') {
    alert('All fields are required!');
    return;
  }
  await userService.login(data.email, data.password);
  event.target.reset();
  ctx.page.redirect('/');
};