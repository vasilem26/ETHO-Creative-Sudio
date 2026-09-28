# ETHO Creative Studio website (v1.8)

First full version of the site: home page with studio intro, services, projects, process, a testimonial and a contact form.

## Structure

```
index.html        Page markup
css/style.css      Styles, colour tokens (Cherry Red, Columbia Blue, Butter Yellow, Dark Chocolate) and dark mode
js/main.js         Contact form validation
favicon.svg        Browser-tab icon (E mark)
assets/images/     Put real project photos here
CNAME              Tells GitHub Pages to serve this on etho.ro
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

## To do before launch

- Replace placeholder phone number, email domain, project names, dates and testimonial
- Replace placeholder phone number
- Confirm the client quote and, if you have one, a real client name
- The `#projects` photos are from your latest apartment project (assets/images/project-*.jpg) — add more projects as you complete them
- Connect the contact form in `js/main.js` to a backend or a form service (e.g. Formspree) so enquiries actually arrive somewhere
- Add real service descriptions/pricing detail if you want more than the current overview
