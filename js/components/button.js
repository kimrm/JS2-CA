export default function button() {
  const html = `<button class="btn btn-primary" type="submit">Submit</button>`;

  const data = {
    content: "My button",
    post_body: post.body,
  };

  return render(
    `<button class="btn btn-primary" type="submit">Submit</button>`
  );

  return render(template, data);
}

function render(html, data) {
  const template = document.createElement("template");
  template.innerHTML = html;
  Object.entries(data).forEach(([key, value]) => {
    const el = template.content.querySelector(`[data-slot*="${key}"]`);
    el.textContent = value;
  });
  return template.content;
}
