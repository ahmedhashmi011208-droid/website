// ============================================================
// VOLTIX ELECTRICALS
// COMMON JAVASCRIPT
// ============================================================

document.addEventListener("DOMContentLoaded", function () {


    // ============================================================
    // 1. PRODUCTS PAGE
    // SEARCH + CATEGORY FILTER
    // ============================================================

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const productCards =
        document.querySelectorAll(".shop-product-card");

    const searchInput =
        document.getElementById("productSearch");

    const noProducts =
        document.getElementById("noProducts");


    function filterProducts() {

        const activeButton =
            document.querySelector(".filter-btn.active");

        const category =
            activeButton
                ? activeButton.getAttribute("data-category")
                : "all";

        const searchValue =
            searchInput
                ? searchInput.value.toLowerCase().trim()
                : "";

        let visibleProducts = 0;


        productCards.forEach(function (card) {

            const cardCategory =
                (card.getAttribute("data-category") || "").toLowerCase();

            const cardName =
                (card.getAttribute("data-name") || "").toLowerCase();


            const categoryMatch =
                category === "all" ||
                cardCategory === category;


            const searchMatch =
                cardName.includes(searchValue) ||
                cardCategory.includes(searchValue);


            if (categoryMatch && searchMatch) {

                card.style.display = "";

                visibleProducts++;

            } else {

                card.style.display = "none";

            }

        });


        if (noProducts) {

            noProducts.style.display =
                visibleProducts === 0
                    ? "block"
                    : "none";

        }

    }


    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            filterButtons.forEach(function (btn) {

                btn.classList.remove("active");

            });


            this.classList.add("active");

            filterProducts();

        });

    });


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterProducts
        );

    }



    // ============================================================
    // 2. CART STORAGE
    // ============================================================

    function getCart() {

        return JSON.parse(
            localStorage.getItem("voltixCart")
        ) || [];

    }


    function saveCart(cart) {

        localStorage.setItem(
            "voltixCart",
            JSON.stringify(cart)
        );

    }



    // ============================================================
    // 3. CART COUNT
    // ============================================================

    function updateCartCount() {

        const cart =
            getCart();

        const count =
            cart.reduce(function (total, item) {

                return total + item.quantity;

            }, 0);


        const cartCount =
            document.getElementById("cartCount");


        if (cartCount) {

            cartCount.textContent = count;

        }

    }


    updateCartCount();



    // ============================================================
    // 4. ADD PRODUCT TO CART
    // ============================================================

    function addProductToCart(product) {

        let cart =
            getCart();


        const existingProduct =
            cart.find(function (item) {

                return item.name === product.name;

            });


        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({

                id: Date.now(),

                name: product.name,

                category: product.category,

                price: product.price,

                image: product.image,

                quantity: 1

            });

        }


        saveCart(cart);

        updateCartCount();


        alert(
            product.name +
            " has been added to your cart."
        );

    }



    // ============================================================
    // 5. PRODUCTS PAGE - ADD TO CART BUTTONS
    // ============================================================

    const addCartButtons =
        document.querySelectorAll(".add-cart");


    addCartButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const card =
                this.closest(".shop-product-card");


            if (!card) return;


            const nameElement =
                card.querySelector("h3");

            const categoryElement =
                card.querySelector(".product-category");

            const priceElement =
                card.querySelector(".product-bottom strong");

            const imageElement =
                card.querySelector("img");


            const name =
                nameElement
                    ? nameElement.textContent.trim()
                    : "Product";


            const category =
                categoryElement
                    ? categoryElement.textContent.trim()
                    : "Electrical";


            const priceText =
                priceElement
                    ? priceElement.textContent.trim()
                    : "Rs. 0";


            const image =
                imageElement
                    ? imageElement.src
                    : "";


            const price =
                parseInt(
                    priceText.replace(/[^0-9]/g, "")
                ) || 0;


            addProductToCart({

                name: name,

                category: category,

                price: price,

                image: image

            });

        });

    });



    // ============================================================
    // 6. PRODUCT DETAILS PAGE
    // ADD TO CART
    // ============================================================

    const detailsAddButton =
        document.querySelector(".add-to-cart-btn");


    if (detailsAddButton) {

        detailsAddButton.addEventListener(
            "click",
            function () {

                const nameElement =
                    document.querySelector(
                        ".product-details-info h1"
                    );


                const categoryElement =
                    document.querySelector(
                        ".details-category"
                    );


                const priceElement =
                    document.querySelector(
                        ".details-price strong"
                    );


                const imageElement =
                    document.querySelector(
                        ".main-product-image img"
                    );


                const name =
                    nameElement
                        ? nameElement.textContent.trim()
                        : "Product";


                const category =
                    categoryElement
                        ? categoryElement.textContent.trim()
                        : "Electrical";


                const priceText =
                    priceElement
                        ? priceElement.textContent.trim()
                        : "Rs. 0";


                const image =
                    imageElement
                        ? imageElement.src
                        : "";


                const price =
                    parseInt(
                        priceText.replace(/[^0-9]/g, "")
                    ) || 0;


                const quantityElement =
                    document.getElementById("quantity");


                const quantity =
                    quantityElement
                        ? parseInt(
                            quantityElement.textContent
                        ) || 1
                        : 1;


                let cart =
                    getCart();


                const existingProduct =
                    cart.find(function (item) {

                        return item.name === name;

                    });


                if (existingProduct) {

                    existingProduct.quantity += quantity;

                } else {

                    cart.push({

                        id: Date.now(),

                        name: name,

                        category: category,

                        price: price,

                        image: image,

                        quantity: quantity

                    });

                }


                saveCart(cart);

                updateCartCount();


                alert(
                    name +
                    " has been added to your cart."
                );

            }
        );

    }



    // ============================================================
    // 7. PRODUCT DETAILS QUANTITY
    // ============================================================

    const plusButton =
        document.getElementById("plusBtn");

    const minusButton =
        document.getElementById("minusBtn");

    const quantityElement =
        document.getElementById("quantity");


    if (
        plusButton &&
        minusButton &&
        quantityElement
    ) {

        plusButton.addEventListener(
            "click",
            function () {

                let quantity =
                    parseInt(
                        quantityElement.textContent
                    ) || 1;


                quantity++;

                quantityElement.textContent =
                    quantity;

            }
        );


        minusButton.addEventListener(
            "click",
            function () {

                let quantity =
                    parseInt(
                        quantityElement.textContent
                    ) || 1;


                if (quantity > 1) {

                    quantity--;

                }


                quantityElement.textContent =
                    quantity;

            }
        );

    }



    // ============================================================
    // 8. CART PAGE
    // ============================================================

    const cartItemsContainer =
        document.getElementById("cartItems");


    if (cartItemsContainer) {

        renderCart();

    }


    function renderCart() {

        const cart =
            getCart();


        const emptyCart =
            document.getElementById("emptyCart");


        const subtotalElement =
            document.getElementById("cartSubtotal");


        const deliveryElement =
            document.getElementById("cartDelivery");


        const totalElement =
            document.getElementById("cartTotal");


        if (cart.length === 0) {

            cartItemsContainer.innerHTML = "";


            if (emptyCart) {

                emptyCart.style.display = "block";

            }


            if (subtotalElement) {

                subtotalElement.textContent =
                    "Rs. 0";

            }


            if (deliveryElement) {

                deliveryElement.textContent =
                    "Rs. 0";

            }


            if (totalElement) {

                totalElement.textContent =
                    "Rs. 0";

            }


            updateCartCount();

            return;

        }


        if (emptyCart) {

            emptyCart.style.display = "none";

        }


        cartItemsContainer.innerHTML = "";


        let subtotal = 0;


        cart.forEach(function (item) {

            const itemTotal =
                item.price * item.quantity;


            subtotal += itemTotal;


            const cartItem =
                document.createElement("div");


            cartItem.className =
                "cart-item";


            cartItem.innerHTML = `

                <div class="cart-item-image">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >

                </div>


                <div class="cart-item-info">

                    <span class="cart-item-category">
                        ${item.category}
                    </span>

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        Quality electrical product
                    </p>

                </div>


                <div class="cart-item-right">

                    <span class="cart-item-price">
                        Rs. ${itemTotal.toLocaleString()}
                    </span>


                    <div class="cart-quantity">

                        <button
                            class="cart-minus"
                            data-id="${item.id}">
                            -
                        </button>


                        <span>
                            ${item.quantity}
                        </span>


                        <button
                            class="cart-plus"
                            data-id="${item.id}">
                            +
                        </button>

                    </div>


                    <button
                        class="remove-cart-item"
                        data-id="${item.id}">

                        <i class="fa-solid fa-trash"></i>

                        Remove

                    </button>

                </div>

            `;


            cartItemsContainer.appendChild(
                cartItem
            );

        });


        // ========================================================
        // DELIVERY
        // ========================================================

        let delivery = 0;


        if (subtotal > 0) {

            delivery = 200;

        }


        const total =
            subtotal + delivery;


        if (subtotalElement) {

            subtotalElement.textContent =
                "Rs. " +
                subtotal.toLocaleString();

        }


        if (deliveryElement) {

            deliveryElement.textContent =
                "Rs. " +
                delivery.toLocaleString();

        }


        if (totalElement) {

            totalElement.textContent =
                "Rs. " +
                total.toLocaleString();

        }


        updateCartCount();

    }



    // ============================================================
    // 9. CART PLUS / MINUS / REMOVE
    // ============================================================

    if (cartItemsContainer) {

        cartItemsContainer.addEventListener(
            "click",
            function (event) {


                const plusButton =
                    event.target.closest(".cart-plus");


                const minusButton =
                    event.target.closest(".cart-minus");


                const removeButton =
                    event.target.closest(
                        ".remove-cart-item"
                    );


                let cart =
                    getCart();



                // PLUS

                if (plusButton) {

                    const id =
                        Number(
                            plusButton.getAttribute(
                                "data-id"
                            )
                        );


                    const product =
                        cart.find(function (item) {

                            return item.id === id;

                        });


                    if (product) {

                        product.quantity++;

                    }


                    saveCart(cart);

                    renderCart();

                }



                // MINUS

                if (minusButton) {

                    const id =
                        Number(
                            minusButton.getAttribute(
                                "data-id"
                            )
                        );


                    const product =
                        cart.find(function (item) {

                            return item.id === id;

                        });


                    if (product) {

                        if (product.quantity > 1) {

                            product.quantity--;

                        } else {

                            cart =
                                cart.filter(
                                    function (item) {

                                        return item.id !== id;

                                    }
                                );

                        }

                    }


                    saveCart(cart);

                    renderCart();

                }



                // REMOVE

                if (removeButton) {

                    const id =
                        Number(
                            removeButton.getAttribute(
                                "data-id"
                            )
                        );


                    cart =
                        cart.filter(
                            function (item) {

                                return item.id !== id;

                            }
                        );


                    saveCart(cart);

                    renderCart();

                }

            }
        );

    }



    // ============================================================
    // 10. CHECKOUT BUTTON
    // ============================================================

    const checkoutButton =
        document.getElementById("checkoutBtn");


    if (checkoutButton) {

        checkoutButton.addEventListener(
            "click",
            function () {

                const cart =
                    getCart();


                if (cart.length === 0) {

                    alert(
                        "Your cart is empty."
                    );

                    return;

                }


                alert(
                    "Checkout system will be added next."
                );

            }
        );

    }



    // ============================================================
    // 11. CONTACT FORM
    // SAVE DATA IN LOCAL STORAGE
    // ============================================================

    const contactForm =
        document.getElementById("contactForm");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    document.getElementById(
                        "contactName"
                    ).value.trim();


                const email =
                    document.getElementById(
                        "contactEmail"
                    ).value.trim();


                const phone =
                    document.getElementById(
                        "contactPhone"
                    ).value.trim();


                const subject =
                    document.getElementById(
                        "contactSubject"
                    ).value.trim();


                const message =
                    document.getElementById(
                        "contactMessage"
                    ).value.trim();


                const contactMessage = {

                    id: Date.now(),

                    name: name,

                    email: email,

                    phone: phone,

                    subject: subject,

                    message: message,

                    date: new Date().toLocaleString()

                };


                let messages =
                    JSON.parse(
                        localStorage.getItem(
                            "voltixMessages"
                        )
                    ) || [];


                messages.push(
                    contactMessage
                );


                localStorage.setItem(
                    "voltixMessages",
                    JSON.stringify(messages)
                );


                const successMessage =
                    document.getElementById(
                        "contactSuccess"
                    );


                if (successMessage) {

                    successMessage.style.display =
                        "block";

                }


                contactForm.reset();


                setTimeout(
                    function () {

                        if (successMessage) {

                            successMessage.style.display =
                                "none";

                        }

                    },
                    4000
                );

            }
        );

    }



});