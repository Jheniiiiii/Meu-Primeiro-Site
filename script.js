const salon = {
  name: "Jheni Fio a Fio",
  whatsapp: "",
  instagram: "",
  phoneDisplay: "(11) 00000-0000",
  instagramDisplay: "@jhenifioaafio.exemplo",
  address: "",
  region: "",
  hours: "Segunda a sexta, das 9h às 18h; sábado, das 9h às 16h",
  paymentMethods: "Pix, dinheiro e cartões de débito e crédito",
  about: "",
  styles: [
    { name: "Box Braids", description: "Clássicas e versáteis, com divisões marcadas e muitas possibilidades de styling.", image: "Galeria/485e5fccb155aa68b66a0b3330c09fbf.jpg", price: "R$ 350", duration: "", lengths: "Curto · médio · longo", category: "Clássicas" },
    { name: "Knotless Braids", description: "Uma técnica de raiz mais leve, com tranças que começam sem nó aparente.", image: "Galeria/27e83a4653843a652fed1456f67db69d.jpg", price: "R$ 450", duration: "", lengths: "Curto · médio · longo", category: "Clássicas" },
    { name: "Nagô", description: "Tranças rente ao couro cabeludo, desenhadas em linhas, curvas e padrões criativos.", image: "Galeria/3a22f500f6f320090bd6345a6cb1c443.jpg", price: "R$ 120", duration: "", lengths: "Curto · médio · longo", category: "Rente à raiz" },
    { name: "Fulani Braids", description: "Um visual marcante que combina tranças rente à raiz com tranças soltas.", image: "Galeria/e245cee48c56badac250833196ba59d4.jpg", price: "R$ 350", duration: "", lengths: "Curto · médio · longo", category: "Rente à raiz" },
    { name: "Goddess Braids", description: "Tranças com mechas onduladas que trazem movimento e um acabamento delicado.", image: "Galeria/27e83a4653843a652fed1456f67db69d.jpg", price: "R$ 450", duration: "", lengths: "Curto · médio · longo", category: "Com textura" },
    { name: "Twists", description: "Fios entrelaçados em duas mechas para um resultado leve, natural e cheio de textura.", image: "Galeria/OIP.webp", price: "R$ 300", duration: "", lengths: "Curto · médio · longo", category: "Com textura" },
    { name: "Gypsy Braids", description: "Tranças com cachos soltos que criam um visual boêmio, volumoso e cheio de movimento.", image: "Galeria/Gypsy-Braids-405x720.jpg", price: "R$ 450", duration: "", lengths: "Curto · médio · longo", category: "Com textura" },
    { name: "Jumbo colorido", description: "Tranças com extensão em cores vibrantes para um visual autêntico e cheio de personalidade.", image: "Galeria/485e5fccb155aa68b66a0b3330c09fbf.jpg", price: "R$ 350", duration: "", lengths: "Curto · médio · longo", category: "Coloridas" }
  ],
  gallery: [
    { image: "Galeria/485e5fccb155aa68b66a0b3330c09fbf.jpg", alt: "Tranças longas com detalhes dourados", category: "Clássicas" },
    { image: "Galeria/3a22f500f6f320090bd6345a6cb1c443.jpg", alt: "Tranças rente à raiz com linhas definidas", category: "Rente à raiz" },
    { image: "Galeria/Gypsy-Braids-405x720.jpg", alt: "Tranças com cachos soltos e textura", category: "Com textura" },
    { image: "Galeria/OIP.webp", alt: "Tranças com volume e acabamento ondulado", category: "Com textura" },
    { image: "Galeria/aa057b2737695d330d6881b520bd4a8f.jpg", alt: "Tranças longas em estilo Fulani", category: "Rente à raiz" },
    { image: "Galeria/27e83a4653843a652fed1456f67db69d.jpg", alt: "Tranças com cachos e acabamento delicado", category: "Clássicas" }
  ]
};

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[character]));

document.querySelectorAll("[data-salon-name]").forEach((element) => {
  element.textContent = salon.name;
});
document.title = `${salon.name} | Tranças com identidade`;
document.querySelector('meta[name="description"]').content = `Tranças feitas para expressar sua beleza e identidade. Conheça os estilos do ${salon.name} e solicite seu agendamento.`;

const stylesGrid = document.querySelector("#styles-grid");
stylesGrid.innerHTML = salon.styles.map((style, index) => `
  <article class="style-card reveal">
    <a class="style-image" href="#agendamento" aria-label="Solicitar ${escapeHtml(style.name)}">
      <img src="${escapeHtml(style.image)}" alt="${escapeHtml(style.name)}" loading="lazy">
      <span class="style-number">${String(index + 1).padStart(2, "0")}</span>
      <span class="style-arrow" aria-hidden="true">↗</span>
    </a>
    <div class="style-info">
      <div class="style-title-row"><h3>${escapeHtml(style.name)}</h3><span class="style-price">${style.price ? `A partir de ${escapeHtml(style.price)}` : "Consulte"}</span></div>
      <p>${escapeHtml(style.description)}</p>
      <div class="style-meta"><span>◷ ${style.duration ? escapeHtml(style.duration) : "Tempo a consultar"}</span><span>${escapeHtml(style.lengths)}</span></div>
    </div>
  </article>
`).join("");

document.querySelector("#price-list").innerHTML = salon.styles.map((style, index) => `
  <div class="price-row"><span class="price-index">${String(index + 1).padStart(2, "0")}</span><span class="price-name">${escapeHtml(style.name)}</span><span class="price-value">${style.price ? `A partir de ${escapeHtml(style.price)}` : "Consulte"}</span></div>
`).join("");

const bookingStyle = document.querySelector("#booking-style");
salon.styles.forEach((style) => {
  const option = document.createElement("option");
  option.value = style.name;
  option.textContent = style.name;
  bookingStyle.append(option);
});

const galleryGrid = document.querySelector("#gallery-grid");
const filters = ["Todos", ...new Set(salon.gallery.map((item) => item.category))];
const galleryFilters = document.querySelector("#gallery-filters");
let revealObserver;
galleryFilters.innerHTML = filters.map((filter, index) => `
  <button type="button" class="filter-button${index === 0 ? " is-active" : ""}" data-filter="${escapeHtml(filter)}" aria-pressed="${index === 0}">${escapeHtml(filter)}</button>
`).join("");

function renderGallery(filter = "Todos") {
  const photos = salon.gallery.filter((item) => filter === "Todos" || item.category === filter);
  galleryGrid.innerHTML = photos.map((item, index) => `
    <figure class="gallery-item reveal">
      <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.alt)}" loading="lazy">
      <figcaption><span>${escapeHtml(item.category)}</span><span>${String(index + 1).padStart(2, "0")} / ${String(photos.length).padStart(2, "0")}</span></figcaption>
    </figure>
  `).join("");
  observeReveals(galleryGrid);
}
renderGallery();

galleryFilters.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-filter]");
  if (!button) return;
  galleryFilters.querySelectorAll(".filter-button").forEach((filterButton) => {
    const active = filterButton === button;
    filterButton.classList.toggle("is-active", active);
    filterButton.setAttribute("aria-pressed", String(active));
  });
  renderGallery(button.dataset.filter);
});

const aboutCopy = salon.about.trim()
  ? salon.about
  : "Cada pessoa chega com uma história, uma ideia e um jeito único de expressar sua beleza. Nosso propósito é receber você com atenção e transformar essa inspiração em tranças feitas com dedicação. Personalize este texto com a história real do salão.";
document.querySelector("#about-story").textContent = aboutCopy;

const contactItems = [
  { label: "WhatsApp / telefone", value: salon.phoneDisplay || (salon.whatsapp ? salon.whatsapp : "Configure o número em script.js"), href: salon.whatsapp ? `https://wa.me/${salon.whatsapp.replace(/\D/g, "")}` : "" },
  { label: "Instagram", value: salon.instagramDisplay || (salon.instagram ? salon.instagram.replace(/^https?:\/\/(www\.)?instagram\.com\//, "@").replace(/\/$/, "") : "Configure o perfil em script.js"), href: salon.instagram || "" },
  { label: "Endereço / região", value: salon.address || salon.region || "Adicione o endereço ou região atendida em script.js", href: "" },
  { label: "Horários", value: salon.hours || "Adicione os horários de funcionamento em script.js", href: "" },
  { label: "Pagamento", value: salon.paymentMethods || "Adicione as formas de pagamento em script.js", href: "" }
];
document.querySelector("#contact-details").innerHTML = contactItems.map((item, index) => `
  <div class="contact-item"><span class="contact-index">0${index + 1}</span><div><span class="contact-label">${escapeHtml(item.label)}</span>${item.href ? `<a href="${escapeHtml(item.href)}" ${item.href.startsWith("http") ? 'target="_blank" rel="noopener noreferrer"' : ""}>${escapeHtml(item.value)} <span aria-hidden="true">↗</span></a>` : `<p>${escapeHtml(item.value)}</p>`}</div></div>
`).join("");

document.querySelector("#current-year").textContent = new Date().getFullYear();

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");
menuToggle.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!expanded));
  menuToggle.setAttribute("aria-label", expanded ? "Abrir menu" : "Fechar menu");
  mainNav.classList.toggle("is-open", !expanded);
});
mainNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
    mainNav.classList.remove("is-open");
  }
});

const form = document.querySelector("#booking-form");
const status = document.querySelector("#form-status");
const dateInput = form.elements.date;
const localToday = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
dateInput.min = localToday;
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  if (!salon.whatsapp.trim()) {
    status.textContent = "Para ativar o envio, configure o número do WhatsApp com código do país em script.js. Nenhum agendamento foi enviado.";
    return;
  }
  const details = new FormData(form);
  const message = [
    `Olá! Gostaria de consultar a disponibilidade para um agendamento no ${salon.name}.`,
    `Nome: ${details.get("name")}`,
    `Telefone: ${details.get("phone")}`,
    `Estilo: ${details.get("style")}`,
    `Comprimento: ${details.get("length")}`,
    `Data desejada: ${details.get("date")}`,
    `Horário desejado: ${details.get("time")}`,
    details.get("notes") ? `Observações: ${details.get("notes")}` : ""
  ].filter(Boolean).join("\n");
  const whatsappUrl = `https://wa.me/${salon.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
  const whatsappLink = document.createElement("a");
  whatsappLink.href = whatsappUrl;
  whatsappLink.target = "_blank";
  whatsappLink.rel = "noopener noreferrer";
  whatsappLink.click();
  status.textContent = "Mensagem pronta no WhatsApp. Aguarde a confirmação do salão; a solicitação ainda não confirma a reserva.";
});

function observeReveals(scope = document) {
  const elements = scope.querySelectorAll(".reveal:not(.is-visible)");
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }
  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
  }
  elements.forEach((element) => revealObserver.observe(element));
}
observeReveals();
