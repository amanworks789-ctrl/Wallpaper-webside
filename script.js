/* =========================================
   NOCTURA WALLPAPER STORE
========================================= */


/* =========================================
   PRODUCT DATABASE
========================================= */

const products = [

    {
        id: 1,
        title: "Moon Warrior",
        category: "anime",
        price: 199,
        image: "images/anime/anime1.jpg",
        download: "wallpapers/anime1.jpg"
    },

    {
        id: 2,
        title: "Neon Samurai",
        category: "anime",
        price: 249,
        image: "images/anime/anime2.jpg",
        download: "wallpapers/anime2.jpg"
    },

    {
        id: 3,
        title: "Silent Ronin",
        category: "anime",
        price: 199,
        image: "images/anime/anime3.jpg",
        download: "wallpapers/anime3.jpg"
    },

    {
        id: 4,
        title: "Cyber Dream",
        category: "anime",
        price: 299,
        image: "images/anime/anime4.jpg",
        download: "wallpapers/anime4.jpg"
    },


    {
        id: 5,
        title: "The Champion",
        category: "sports",
        price: 249,
        image: "images/sports/sports1.jpg",
        download: "wallpapers/sports1.jpg"
    },

    {
        id: 6,
        title: "Final Whistle",
        category: "sports",
        price: 199,
        image: "images/sports/sports2.jpg",
        download: "wallpapers/sports2.jpg"
    },

    {
        id: 7,
        title: "Game Day",
        category: "sports",
        price: 299,
        image: "images/sports/sports3.jpg",
        download: "wallpapers/sports3.jpg"
    },

    {
        id: 8,
        title: "Victory",
        category: "sports",
        price: 249,
        image: "images/sports/sports4.jpg",
        download: "wallpapers/sports4.jpg"
    },


    {
        id: 9,
        title: "Into The Wild",
        category: "nature",
        price: 199,
        image: "images/nature/nature1.jpg",
        download: "wallpapers/nature1.jpg"
    },

    {
        id: 10,
        title: "Mountain Silence",
        category: "nature",
        price: 249,
        image: "images/nature/nature2.jpg",
        download: "wallpapers/nature2.jpg"
    },

    {
        id: 11,
        title: "Ocean Dreams",
        category: "nature",
        price: 199,
        image: "images/nature/nature3.jpg",
        download: "wallpapers/nature3.jpg"
    },

    {
        id: 12,
        title: "Forest Mist",
        category: "nature",
        price: 299,
        image: "images/nature/nature4.jpg",
        download: "wallpapers/nature4.jpg"
    },


    {
        id: 13,
        title: "Black Luxury",
        category: "luxury",
        price: 299,
        image: "images/luxury/luxury1.jpg",
        download: "wallpapers/luxury1.jpg"
    },

    {
        id: 14,
        title: "Golden Empire",
        category: "luxury",
        price: 399,
        image: "images/luxury/luxury2.jpg",
        download: "wallpapers/luxury2.jpg"
    },

    {
        id: 15,
        title: "Midnight Palace",
        category: "luxury",
        price: 349,
        image: "images/luxury/luxury3.jpg",
        download: "wallpapers/luxury3.jpg"
    },

    {
        id: 16,
        title: "Royal Night",
        category: "luxury",
        price: 399,
        image: "images/luxury/luxury4.jpg",
        download: "wallpapers/luxury4.jpg"
    }

];


/* =========================================
   STATE
========================================= */

let cart =
    JSON.parse(localStorage.getItem("nocturaCart"))
    || [];

let favorites =
    JSON.parse(localStorage.getItem("nocturaFavorites"))
    || [];

let currentFilter = "all";


/* =========================================
   DOM
========================================= */

const productGrid =
    document.getElementById("productGrid");

const cartCount =
    document.getElementById("cartCount");

const favoriteCount =
    document.getElementById("favoriteCount");

const cartOverlay =
    document.getElementById("cartOverlay");

const cartItems =
    document.getElementById("cartItems");

const cartEmpty =
    document.getElementById("cartEmpty");

const cartTotal =
    document.getElementById("cartTotal");

const checkoutOverlay =
    document.getElementById("checkoutOverlay");

const checkoutItems =
    document.getElementById("checkoutItems");

const checkoutSubtotal =
    document.getElementById("checkoutSubtotal");

const checkoutTotal =
    document.getElementById("checkoutTotal");

const successOverlay =
    document.getElementById("successOverlay");

const downloadArea =
    document.getElementById("downloadArea");


/* =========================================
   SAVE DATA
========================================= */

function saveCart() {

    localStorage.setItem(
        "nocturaCart",
        JSON.stringify(cart)
    );

}


function saveFavorites() {

    localStorage.setItem(
        "nocturaFavorites",
        JSON.stringify(favorites)
    );

}


/* =========================================
   FORMAT PRICE
========================================= */

function formatPrice(price) {

    return "₹" + price.toLocaleString("en-IN");

}


/* =========================================
   RENDER PRODUCTS
========================================= */

function renderProducts(filter = "all") {

    currentFilter = filter;

    let filteredProducts =
        products.filter(product => {

            if (filter === "all") {
                return true;
            }

            return product.category === filter;

        });


    productGrid.innerHTML = "";


    filteredProducts.forEach(product => {

        const isFavorite =
            favorites.includes(product.id);


        const card =
            document.createElement("div");

        card.className = "product-card";


        card.innerHTML = `

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.title}"
                    loading="lazy"
                >

                <button
                    class="favorite-product ${isFavorite ? "active" : ""}"
                    onclick="toggleFavorite(${product.id})">

                    ${isFavorite ? "♥" : "♡"}

                </button>

            </div>


            <div class="product-info">

                <div class="product-category">
                    ${product.category}
                </div>

                <div class="product-title">
                    ${product.title}
                </div>


                <div class="product-bottom">

                    <div class="product-price">
                        ${formatPrice(product.price)}
                    </div>

                    <button
                        class="add-cart"
                        onclick="addToCart(${product.id})">

                        Add to Cart

                    </button>

                </div>

            </div>

        `;


        productGrid.appendChild(card);

    });


    updateCounters();

}


/* =========================================
   ADD TO CART
========================================= */

function addToCart(productId) {

    const existing =
        cart.find(item => item.id === productId);


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            id: productId,
            quantity: 1
        });

    }


    saveCart();

    updateCart();

    openCart();

}


/* =========================================
   REMOVE
========================================= */

function removeFromCart(productId) {

    cart =
        cart.filter(item => item.id !== productId);

    saveCart();

    updateCart();

}


/* =========================================
   QUANTITY
========================================= */

function changeQuantity(productId, amount) {

    const item =
        cart.find(item => item.id === productId);


    if (!item) {
        return;
    }


    item.quantity += amount;


    if (item.quantity <= 0) {

        removeFromCart(productId);

        return;

    }


    saveCart();

    updateCart();

}


/* =========================================
   UPDATE CART
========================================= */

function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;

    let count = 0;


    cart.forEach(item => {

        const product =
            products.find(
                product => product.id === item.id
            );


        if (!product) {
            return;
        }


        const itemTotal =
            product.price * item.quantity;


        total += itemTotal;

        count += item.quantity;


        const div =
            document.createElement("div");

        div.className = "cart-item";


        div.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.title}"
            >

            <div>

                <h4>
                    ${product.title}
                </h4>

                <p>
                    ${formatPrice(product.price)}
                </p>

                <div>

                    <button
                        onclick="changeQuantity(${product.id}, -1)">
                        −
                    </button>

                    ${item.quantity}

                    <button
                        onclick="changeQuantity(${product.id}, 1)">
                        +
                    </button>

                </div>

            </div>


            <button
                class="remove-item"
                onclick="removeFromCart(${product.id})">

                ×

            </button>

        `;


        cartItems.appendChild(div);

    });


    cartTotal.textContent =
        formatPrice(total);


    cartCount.textContent =
        count;


    if (cart.length === 0) {

        cartEmpty.style.display = "block";

    } else {

        cartEmpty.style.display = "none";

    }


    updateCheckout();

}


/* =========================================
   COUNTERS
========================================= */

function updateCounters() {

    cartCount.textContent =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    favoriteCount.textContent =
        favorites.length;

}


/* =========================================
   FAVORITES
========================================= */

function toggleFavorite(productId) {

    if (favorites.includes(productId)) {

        favorites =
            favorites.filter(
                id => id !== productId
            );

    } else {

        favorites.push(productId);

    }


    saveFavorites();

    renderProducts(currentFilter);

}


/* =========================================
   FILTERS
========================================= */

document.querySelectorAll(".filter")
.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            document
                .querySelectorAll(".filter")
                .forEach(btn =>
                    btn.classList.remove("active")
                );


            button.classList.add("active");


            renderProducts(
                button.dataset.filter
            );

        }
    );

});


/* =========================================
   CATEGORY CARDS
========================================= */

document
    .querySelectorAll(".category-card")
    .forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const category =
                    card.dataset.category;


                document
                    .querySelectorAll(".filter")
                    .forEach(btn => {

                        btn.classList.remove("active");

                        if (
                            btn.dataset.filter === category
                        ) {

                            btn.classList.add("active");

                        }

                    });


                renderProducts(category);


                document
                    .getElementById("shop")
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );

    });


/* =========================================
   CART OPEN / CLOSE
========================================= */

function openCart() {

    cartOverlay.classList.add("show");

}


function closeCart() {

    cartOverlay.classList.remove("show");

}


document
    .getElementById("cartBtn")
    .addEventListener(
        "click",
        openCart
    );


document
    .getElementById("closeCart")
    .addEventListener(
        "click",
        closeCart
    );


document
    .getElementById("continueShopping")
    .addEventListener(
        "click",
        closeCart
    );


/* =========================================
   CHECKOUT
========================================= */

document
    .getElementById("checkoutBtn")
    .addEventListener(
        "click",
        () => {

            if (cart.length === 0) {

                alert(
                    "Your cart is empty."
                );

                return;

            }


            closeCart();

            updateCheckout();

            checkoutOverlay.classList.add("show");

        }
    );


document
    .getElementById("closeCheckout")
    .addEventListener(
        "click",
        () => {

            checkoutOverlay.classList.remove("show");

        }
    );


/* =========================================
   UPDATE CHECKOUT
========================================= */

function updateCheckout() {

    checkoutItems.innerHTML = "";

    let total = 0;


    cart.forEach(item => {

        const product =
            products.find(
                product => product.id === item.id
            );


        if (!product) {
            return;
        }


        const itemTotal =
            product.price * item.quantity;


        total += itemTotal;


        const div =
            document.createElement("div");

        div.className =
            "summary-item";


        div.innerHTML = `

            <span>
                ${product.title}
                × ${item.quantity}
            </span>

            <span>
                ${formatPrice(itemTotal)}
            </span>

        `;


        checkoutItems.appendChild(div);

    });


    checkoutSubtotal.textContent =
        formatPrice(total);


    checkoutTotal.textContent =
        formatPrice(total);

}


/* =========================================
   PAYMENT METHOD
========================================= */

document
    .querySelectorAll(".payment-method")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".payment-method")
                    .forEach(btn =>
                        btn.classList.remove("active")
                    );

                button.classList.add("active");

            }
        );

    });


/* =========================================
   CHECKOUT FORM
========================================= */

document
    .getElementById("checkoutForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document
                    .getElementById("customerName")
                    .value;


            const email =
                document
                    .getElementById("customerEmail")
                    .value;


            if (!name || !email) {

                alert(
                    "Please complete your details."
                );

                return;

            }


            completeOrder();

        }
    );


/* =========================================
   COMPLETE ORDER
========================================= */

function completeOrder() {

    const purchasedProducts =
        cart.map(item => {

            return products.find(
                product =>
                    product.id === item.id
            );

        });


    downloadArea.innerHTML = "";


    purchasedProducts.forEach(product => {

        if (!product) {
            return;
        }


        const link =
            document.createElement("a");

        link.className =
            "download-link";


        link.href =
            product.download;


        link.download =
            "";


        link.textContent =
            "Download " + product.title;


        downloadArea.appendChild(link);

    });


    checkoutOverlay.classList.remove("show");

    successOverlay.classList.add("show");


    /*
       Clear cart after successful order.
    */

    cart = [];

    saveCart();

    updateCart();

}


/* =========================================
   SUCCESS CLOSE
========================================= */

document
    .getElementById("closeSuccess")
    .addEventListener(
        "click",
        () => {

            successOverlay.classList.remove("show");

        }
    );


/* =========================================
   SEARCH
========================================= */

const searchOverlay =
    document.getElementById(
        "searchOverlay"
    );

const searchInput =
    document.getElementById(
        "searchInput"
    );


document
    .getElementById("searchBtn")
    .addEventListener(
        "click",
        () => {

            searchOverlay.classList.add("show");

            searchInput.focus();

        }
    );


document
    .getElementById("closeSearch")
    .addEventListener(
        "click",
        () => {

            searchOverlay.classList.remove("show");

        }
    );


searchInput.addEventListener(
    "input",
    () => {

        const query =
            searchInput.value
                .toLowerCase()
                .trim();


        const results =
            products.filter(product => {

                return (
                    product.title
                        .toLowerCase()
                        .includes(query)
                    ||
                    product.category
                        .toLowerCase()
                        .includes(query)
                );

            });


        productGrid.innerHTML = "";


        results.forEach(product => {

            const isFavorite =
                favorites.includes(product.id);


            const card =
                document.createElement("div");

            card.className =
                "product-card";


            card.innerHTML = `

                <div class="product-image">

                    <img
                        src="${product.image}"
                        alt="${product.title}"
                    >

                    <button
                        class="favorite-product ${isFavorite ? "active" : ""}"
                        onclick="toggleFavorite(${product.id})">

                        ${isFavorite ? "♥" : "♡"}

                    </button>

                </div>


                <div class="product-info">

                    <div class="product-category">
                        ${product.category}
                    </div>

                    <div class="product-title">
                        ${product.title}
                    </div>

                    <div class="product-bottom">

                        <div class="product-price">
                            ${formatPrice(product.price)}
                        </div>

                        <button
                            class="add-cart"
                            onclick="addToCart(${product.id})">

                            Add to Cart

                        </button>

                    </div>

                </div>

            `;


            productGrid.appendChild(card);

        });

    });


/* =========================================
   FAVORITES BUTTON
========================================= */

document
    .getElementById("favoriteBtn")
    .addEventListener(
        "click",
        () => {

            if (favorites.length === 0) {

                alert(
                    "You haven't saved any wallpapers yet."
                );

                return;

            }


            productGrid.innerHTML = "";


            const favoriteProducts =
                products.filter(
                    product =>
                        favorites.includes(product.id)
                );


            favoriteProducts.forEach(product => {

                const card =
                    document.createElement("div");

                card.className =
                    "product-card";


                card.innerHTML = `

                    <div class="product-image">

                        <img
                            src="${product.image}"
                            alt="${product.title}"
                        >

                        <button
                            class="favorite-product active"
                            onclick="toggleFavorite(${product.id})">

                            ♥
                        </button>

                    </div>


                    <div class="product-info">

                        <div class="product-category">
                            ${product.category}
                        </div>

                        <div class="product-title">
                            ${product.title}
                        </div>

                        <div class="product-bottom">

                            <div class="product-price">
                                ${formatPrice(product.price)}
                            </div>

                            <button
                                class="add-cart"
                                onclick="addToCart(${product.id})">

                                Add to Cart

                            </button>

                        </div>

                    </div>

                `;


                productGrid.appendChild(card);

            });


            document
                .getElementById("shop")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );


/* =========================================
   NEWSLETTER
========================================= */

document
    .getElementById("newsletterForm")
    .addEventListener(
        "submit",
        event => {

            event.preventDefault();

            alert(
                "Welcome to the NOCTURA collection."
            );

            event.target.reset();

        }
    );


/* =========================================
   SWORD CURSOR
========================================= */

const sword =
    document.querySelector(
        ".sword-cursor"
    );

const glow =
    document.querySelector(
        ".cursor-glow"
    );


document.addEventListener(
    "mousemove",
    event => {

        sword.style.left =
            event.clientX + "px";

        sword.style.top =
            event.clientY + "px";


        glow.style.left =
            event.clientX + "px";

        glow.style.top =
            event.clientY + "px";

    }
);


/* =========================================
   CURSOR CLICK ANIMATION
========================================= */

document.addEventListener(
    "mousedown",
    () => {

        sword.style.transform =
            "translate(-50%, -50%) rotate(-35deg) scale(.7)";

    }
);


document.addEventListener(
    "mouseup",
    () => {

        sword.style.transform =
            "translate(-50%, -50%) rotate(-35deg) scale(1)";

    }
);


/* =========================================
   LOADER
========================================= */

window.addEventListener(
    "load",
    () => {

        setTimeout(
            () => {

                document
                    .getElementById("loader")
                    .classList.add("hide");

            },
            1200
        );

    }
);


/* =========================================
   INITIALIZE
========================================= */

renderProducts();

updateCart();