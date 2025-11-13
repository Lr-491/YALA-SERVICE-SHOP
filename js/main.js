 /* --- MENU NAVIGATION --- */
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

// Ouvrir le menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Fermer le menu
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// Fermer le menu quand on clique sur un lien
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link =>
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    })
);

const counters = document.querySelectorAll('.counter');
const speed = 200; // plus le nombre est grand, plus l'animation est rapide

counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;

        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 20);
        } else {
            counter.innerText = target;
        }
    };

    updateCount();
});

/* --- DONNÉES PRODUITS --- */
const products = [
    {
        name: "Nikon D5300",
        description: "Capturez chaque instant avec une clarté époustouflante grâce au Nikon D5300.",
        price: 440000,
        img: "../images/Nikon_D5300/1.jpeg",
        shap: [
            { shape: 'Vue gauche', img: '../images/Nikon_D5300/2.jpeg' },
            { shape: 'Vue droite', img: '../images/Nikon_D5300/3.jpeg' },
        ]
    },
    {
        name: "Nikon D3200",
        description: "Capteur APS-C de 24,2 Mpx pour des images ultra nettes.",
        price: 380000,
        img: "../images/Nikon_D3200/1.jpeg",
        shap: [
            { shape: 'Vue gauche', img: '../images//LENOVO/lenovo2.jpg' },
            { shape: 'Vue droite', img: '../images/Nikon_D3200/3.jpeg' },
            { shape: 'Vue de haut', img: '../images/Nikon_D3200/4.jpeg' },
        ]
    },
    {
        name: "Nikon D7500",
        description: "Appareil photo puissant, rapide et précis, conçu pour capturer chaque instant.",
        price: 700000,
        img: "../images/Nikon_D7500/1.jpeg",
        shap: [
            { shape: 'Vue gauche', img: '../images/Nikon_D7500/2.jpeg' },
            { shape: 'Vue droite', img: '../images/Nikon_D7500/3.jpeg' },
            { shape: 'Vue de haut', img: '../images/Nikon_D7500/4.jpeg' },
        ]
    },
    {
        name: "Machine à crème",
        description: "",
        price: 750000,
        img: "../images/MACHINE/machien_creme.jpg"
    },
    {
        name: "Machine à Popcorn",
        description: "",
        price: 90000,
        img: "../images/MACHINE/machineçpop_corn.jpg"
    },
    {
        name: "Machine à Poulet",
        description: "",
        price: 750000,
        img: "../images/MACHINE/machine_poulet.jpg"
    },
    {
        name: "PC portable lenovo",
        description: "Lenovo l380 YOGA 8éme génération RAM 8GB écran digital 14 pouces SSD 256GB avec son stylo CPU 2.20 2.21",
        price: 199000,
        img: "../images/LENOVO/lenovo1.jpg",
        shap: [
            { shape: 'Vue gauche', img: '../images/LENOVO/lenovo2.jpg' },
            { shape: 'Vue droite', img: '../images/LENOVO/lenovo3.jpg' },
            { shape: 'Vue de haut', img: '../images/LENOVO/lenovo4.jpg' },
        ]                
    },
    {
        name: "CANON EOS 800D",
        description: "",
        price: 750000,
        img: "../images/CANON/1.jpg",
        shap: [
            { shape: 'Vue gauche', img: '../images/CANON/2.jpg' },
            { shape: 'Vue droite', img: '../images/CANON/3.jpg' },
            { shape: 'Vue de haut', img: '../images/CANON/4.jpg' },
        ] 
    },
    {
        name: "HP ElitBook",
        description: "",
        price: 350000,
        img: "../images/HP/1.jpg",
        shap: [
            { shape: 'Vue gauche', img: '../images/HP/2.jpg' },
            { shape: 'Vue droite', img: '../images/HP/3.jpg' },
            { shape: 'Vue de haut', img: '../images/HP/4.jpg' },
        ]
    },
];

/* --- AFFICHAGE PRODUITS --- */
const container = document.getElementById("product-container");
const modal = document.getElementById('modal');
const closeModalBtn = document.querySelector('.close__btn');
const modalTitle = document.getElementById('modal__title');
const changeOption = document.getElementById('change__saw');
const productDisplay = document.getElementById('product__display');

function displayProducts(list) {
    container.innerHTML = "";
    list.forEach((product, index) => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">${product.price.toLocaleString()} FCFA</p>
            <label>Quantité :</label>
            <input type="number" min="1" value="1" id="qty${index}">
            <button class="open__modal" data-index="${index}">Voir plus ...</button>
            <button class="btn-order" onclick="orderProduct(${index})">
                <i class='bx bxl-whatsapp'></i> Commander via WhatsApp
            </button>
        `;
        container.appendChild(card);
    });

    // Ajouter les événements d’ouverture du modal
    document.querySelectorAll(".open__modal").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = e.target.getAttribute("data-index");
            openModal(products[index]);
        });
    });
}

displayProducts(products);

/* --- MODAL --- */
function openModal(product) {
    modalTitle.textContent = product.name;
    changeOption.innerHTML = "";
    productDisplay.innerHTML = `
        <img src="${product.img}" alt="${product.name}" style="width:300px; height:200px;">
        <p>${product.description}</p>
    `;

    if (product.shap && product.shap.length > 0) {
        product.shap.forEach(s => {
            const button = document.createElement("button");
            button.classList.add('btnChange');
            button.textContent = s.shape;
            button.addEventListener("click", () => {
                productDisplay.innerHTML = `
                    <img src="${s.img}" alt="${product.name}" style="width:300px; height:200px;">
                    <p>${s.shape}</p>
                `;
            });
            changeOption.appendChild(button);
        });
    }

    modal.classList.remove('hidden');
}

// Fermer le modal
closeModalBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
});

/* --- FILTRE PRODUITS --- */
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = products.filter(
        p => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)
    );
    displayProducts(filtered);
});

/* --- COMMANDE VIA WHATSAPP --- */
function orderProduct(index) {
    const p = products[index];
    const qty = document.getElementById(`qty${index}`).value;
    const phone = "242065350024";
    const total = qty * p.price;
    const message = `Bonjour 👋, je souhaite commander ${qty} x ${p.name} (${p.description}) pour un total de ${total.toLocaleString()} FCFA.`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
}