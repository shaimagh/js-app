var filterText = null

const items = [{
    id: 1,
    name: "T-Shirt",
    price: 39,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5lxWaLVr5pM0NxHVypIyBoX-ldcrqwu247qojnx2DLbPWZoCi4yJo6hjXVOvrFcS1C58&usqp=CAU"
}, {
    id: 2,
    name: "Belt",
    price: 42,
    image: "http://www.opaleinterim.fr/2020/wp-content/uploads/2019/01/belt-2-300x300.jpg"
}, {
    id: 3,
    name: "Beanie with Logo",
    price: 28,
    image: "http://www.opaleinterim.fr/2020/wp-content/uploads/2019/01/beanie-with-logo-1-300x300.jpg"
}, {
    id: 4, name: "Cap", price: 20, image: "http://www.opaleinterim.fr/2020/wp-content/uploads/2019/01/cap-2-300x300.jpg"
}, {
    id: 5,
    name: "Long Sleeve Tee",
    price: 50,
    image: "http://www.opaleinterim.fr/2020/wp-content/uploads/2019/01/long-sleeve-tee-2.jpg"
}, {
    id: 6,
    name: "Sunglasses",
    price: 90,
    image: "http://www.opaleinterim.fr/2020/wp-content/uploads/2019/01/sunglasses-2-300x300.jpg"
}]

function updateTotal() {
    const cartTotalText = document.getElementById("cart-total");

    const totals = document.getElementsByClassName("item-total")

    let totalValue = 0

    for (let i = 0; i < totals.length; i++) {
        totalValue += parseInt(totals[i].innerHTML, 10);
    }

    cartTotalText.innerText = `${totalValue} DT`
}

function increment(event, name, price) {
    const itemQuantityInputId = `quantity-${name}`
    const totalTextId = `total-${name}`

    const input = document.getElementById(itemQuantityInputId)

    const newValue = Number.parseInt(input.value, 10) + 1

    input.value = newValue


    const totalText = document.getElementById(totalTextId)

    totalText.innerText = newValue * Number.parseInt(price, 10)

    updateTotal()
}


function decrement(event, name, price) {
    const itemQuantityInputId = `quantity-${name}`
    const totalTextId = `total-${name}`

    const input = document.getElementById(itemQuantityInputId)

    if (input.value > 1) {
        const newValue = Number.parseInt(input.value, 10) - 1
        input.value = newValue;

        const totalText = document.getElementById(totalTextId)

        totalText.innerText = newValue * Number.parseInt(price, 10)
    }

    updateTotal()
}


function Checkout(x) {
    alert("Your payment was accepted");
}

function onSearchTextChange() {
    filterText = document.getElementById('searchInput').value.toLowerCase()
    renderCollection();
}

function removeFromCart(event, itemId) {
    const item = document.getElementById(itemId).remove();

    updateTotal()
}

function addToCart(event, name, price, image) {
    const cart = document.getElementById("cart")

    const itemId = `${name}`
    const quantityInputId = `quantity-${name}`
    const totalId = `total-${name}`

    const itemById = document.getElementById(itemId);

    if (!itemById) {

        const cartItem = `
                        <li class="list-group-item d-flex align-items-center" id="${itemId}">
                        <span type="button" onclick="removeFromCart(event,'${name}')" style="margin-right: 10px">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                        </span>
                            <img id="image" src="${image}" style="width: 48px;border-radius: .5rem;"/>
                            <span class="flex-grow-1 px-1">${name}</span>

                            <div class="d-flex align-items-center mx-2">
                                <button class="decrement btn-amount bg-danger" type="button" onclick="decrement(event, '${name}', '${price}')" >-</button>
                                <input id="quantity-${name}" type="text" name="quantity" class="amount-input mx-1" value="1"/>
                                <button class="increment btn-amount bg-success" type="button" onclick="increment(event, '${name}', '${price}')">+</button>
                            </div>


                            <span class="pl-1 item-total" id="${totalId}" >${price}</span>
                            <span> DT</span>
                           
                        </li>
    `;

        cart.innerHTML += cartItem
    }

    updateTotal()
}

function renderCollection() {
    const itemsContainer = document.getElementsByClassName("items-container")[0]

    itemsContainer.innerHTML = ""


    const filteredItems = filterText ? items.filter(function (item) {
        return item.name.toLowerCase().includes(filterText)
    }) : items

    filteredItems.forEach(function (item) {
        itemsContainer.innerHTML += `
       <div class="col col-4">
         <div class="card p-0 product-card d-flex flex-column">
            <img src="${item.image}"/>
            <div class="d-flex flex-column flex-grow-1 p-1">
                <h5 class="title">${item.name}</h5>
                <span class="fs-6">${item.price} DT</span>
                <div class="flex-grow-1"></div>
                <button class="btn btn-primary mt-3" onclick="addToCart(event, '${item.name}',${item.price},'${item.image}')">Add to cart</button>
            </div>
         </div>
        </div>
`
    });
}

renderCollection()

document.getElementById("Checkout").addEventListener("click", Checkout);


/*


 */