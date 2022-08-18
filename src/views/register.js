import { html } from '../../node_modules/lit-html/lit-html.js';

import { createSubmitHandler } from '../utils.js';
import * as userService from '../api/user.js';

const registerTemplate = onSubmit => html`
<section id="register">
          <div class="form" @submit=${onSubmit}>
            <h2>Register</h2>
            <form class="login-form">
              <input
                type="text"
                name="email"
                id="register-email"
                placeholder="email"
              />
              <input
                type="password"
                name="password"
                id="register-password"
                placeholder="password"
              />
              <input
                type="password"
                name="re-password"
                id="repeat-password"
                placeholder="repeat password"
              />
              <button type="submit">login</button>
              <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
          </div>
        </section>

      
`;

export const registerPage = ctx => {
  ctx.render(registerTemplate(createSubmitHandler(ctx, onSubmit)));
};

const onSubmit = async (ctx, data, event) => {
  if (data.email.trim() === '' || data.password.trim() === '') {
    alert('All fields are required!');
    return;
  }

  if (data.password !== data['re-password']) {
    alert("Passwords don't match!");
    return;
  }

  await userService.register(data.email, data.password);
  event.target.reset();
  ctx.page.redirect('/');
};