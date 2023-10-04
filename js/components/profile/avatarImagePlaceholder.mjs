export default function avatarImagePlaceholder(author) {
  const avatar = document.createElement("div");
  var randomColor = Math.floor(Math.random() * 16777215).toString(16);
  avatar.innerHTML = `
      <div class="rounded w-100 h-100 d-flex p-1 text-dark fw-bold justify-content-center" style="background: #${randomColor};">
        <span>${author.name.substring(0, 2).toUpperCase()}</span>
      </div>
    `;
  return avatar;
}
