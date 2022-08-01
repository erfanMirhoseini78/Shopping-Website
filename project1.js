let allProduct = [
    { id: 1, src: 'shopImage/iphone-13pro.jpg', name: 'iphone 13 Pro', price: 999, count: 1 },
    { id: 2, src: 'shopImage/iphone-13.jpg', name: 'iphone 13', price: 699, count: 1 },
    { id: 3, src: 'shopImage/iphone-12.jpg', name: 'iphone 12', price: 599, count: 1 },

    { id: 4, src: 'shopImage/iphone-11.jpg', name: 'iphone 11', price: 499, count: 1 },
    { id: 5, src: 'shopImage/iphone-se.jpg', name: 'iphone SE', price: 429, count: 1 },
    { id: 6, src: 'shopImage/ipad.jpg', name: 'ipad', price: 329, count: 1 },

    { id: 7, src: 'shopImage/ipad-pro.jpg', name: 'ipad-pro', price: 799, count: 1 },
    { id: 8, src: 'shopImage/ipad-mini.jpg', name: 'ipad-mini', price: 499, count: 1 },
    { id: 9, src: 'shopImage/ipad-air.jpg', name: 'ipad-air', price: 599, count: 1 },
]

let userBasket = [];

let $ = document;

const shopItemsContainer = $.querySelector('.shop-items');
const basketProductsContainer = $.querySelector('.cart-items');
const removeAllProductsBtn = $.querySelector('#remove-all-products');
const cartTotalPriceElem = $.querySelector('.cart-total-price');
const paginationContainer = document.querySelector('#pagination');

let currentPage = 1;
let rowsCount = 4;

function displayUsersList(allProduct, shopItemsContainer, currentPage, rowsCount) {

    shopItemsContainer.innerHTML = '';

    let endIndex = currentPage * rowsCount;
    let startIndex = endIndex - rowsCount;

    let paginatedProduct = allProduct.slice(startIndex, endIndex);
    // console.log(paginatedProduct);

    paginatedProduct.forEach(function (product) {
        let productContainer = $.createElement('div');
        productContainer.classList.add('shop-item');

        let productTitleSpan = $.createElement('span');
        productTitleSpan.classList.add('shop-item-title');
        productTitleSpan.innerHTML = product.name;

        let productImageElem = $.createElement('img');
        productImageElem.classList.add('shop-item-image');
        productImageElem.setAttribute('src', product.src);

        let productDetailsContainer = $.createElement('div');
        productDetailsContainer.classList.add('shop-item-details');

        let productPriceSpan = $.createElement('span');
        productPriceSpan.classList.add('shop-item-price');
        productPriceSpan.innerHTML = '$ ' + product.price;

        let productAddButton = $.createElement('button');
        productAddButton.innerHTML = 'ADD TO CART';
        productAddButton.className = 'btn btn-primary shop-item-button';
        productAddButton.setAttribute('type', 'button');
        productAddButton.onclick = function () {
            addProductToBasketArray(product.id);
        }

        productDetailsContainer.append(productPriceSpan, productAddButton);
        productContainer.append(productTitleSpan, productImageElem, productDetailsContainer);

        shopItemsContainer.append(productContainer);
    });
}
displayUsersList(allProduct, shopItemsContainer, currentPage, rowsCount);



function setupPagination(allProduct, paginationContainer, rowsCount) {

    paginationContainer.innerHTML = '';

    let pageCount = Math.ceil(allProduct.length / rowsCount);

    for (let i = 1; i < pageCount + 1; i++) {
        let btn = paginationButtongenerator(i, allProduct);
        paginationContainer.append(btn);
    }
}
setupPagination(allProduct, paginationContainer, rowsCount);



function paginationButtongenerator(i, allProduct) {

    let button = document.createElement('button');
    button.innerHTML = i;

    if (i === currentPage) {
        button.classList.add('active');
    }

    button.addEventListener('click', function () {
        currentPage = i;

        displayUsersList(allProduct, shopItemsContainer, currentPage, rowsCount);

        let prevPage = document.querySelector('button.active');
        prevPage.classList.remove('active');

        button.classList.add('active');
    })

    return button;
}




function addProductToBasketArray(productId) {
    // console.log(productId);
    let changeCount = userBasket.some(function (product) {

        return product.id === productId;
    });

    // console.log(changeCount);

    if (changeCount) {
        console.log('Cute :)');
    }
    else {
        let mainProduct = allProduct.find(function (product) {
            // console.log(productId);
            // console.log(product.id);

            return product.id === productId;

        });

        userBasket.push(mainProduct);

        basketProductsGenerator(userBasket);
        calcTotalPrice(userBasket);

        console.log(userBasket);
        // console.log(mainProduct);
    }
}


function basketProductsGenerator(userBasket) {

    basketProductsContainer.innerHTML = '';

    userBasket.forEach(function (product) {

        let basketproductContainer = $.createElement('div');
        basketproductContainer.classList.add('cart-row');

        let basketProductDetailsContainer = $.createElement('div');
        basketProductDetailsContainer.className = 'cart-item cart-column';

        let basketProductImg = $.createElement('img');
        basketProductImg.classList.add('cart-item-image');
        basketProductImg.setAttribute('src', product.src);
        basketProductImg.setAttribute('width', '100');
        basketProductImg.setAttribute('height', '100');

        let basketProductTitleSpan = $.createElement('span');
        basketProductTitleSpan.classList.add('cart-item-title');
        basketProductTitleSpan.innerHTML = product.name;

        let basketProductPriceSpan = $.createElement('span');
        basketProductPriceSpan.className = 'cart-price cart-column';
        basketProductPriceSpan.innerHTML = '$ ' + product.price;

        let basketProductInputsContainer = $.createElement('div');
        basketProductInputsContainer.className = 'cart-quantity cart-column';

        let basketProductInput = $.createElement('input');
        basketProductInput.classList.add('cart-quantity-input');
        basketProductInput.setAttribute('value', product.count);
        basketProductInput.setAttribute('type', 'number');
        basketProductInput.onchange = function () {
            updateProductCount(product.id, basketProductInput.value);
        }

        let basketProductRemoveBtn = $.createElement('button');
        basketProductRemoveBtn.className = 'btn btn-danger';
        basketProductRemoveBtn.innerHTML = 'REMOVE';
        basketProductRemoveBtn.setAttribute('type', 'button');
        basketProductRemoveBtn.onclick = function () {
            removeProductFromBasket(product.id);
        }

        basketProductDetailsContainer.append(basketProductImg, basketProductTitleSpan);
        basketproductContainer.append(basketProductDetailsContainer, basketProductPriceSpan, basketProductInputsContainer);
        basketProductInputsContainer.append(basketProductInput, basketProductRemoveBtn);

        basketProductsContainer.append(basketproductContainer);

        // console.log(basketproductContainer);
    });
}


function removeProductFromBasket(productId) {
    // console.log(productId);

    userBasket = userBasket.filter(function (product) {
        return product.id != productId;
    });

    console.log(userBasket);

    basketProductsGenerator(userBasket);
}


removeAllProductsBtn.onclick = function () {
    userBasket = [];

    basketProductsGenerator(userBasket);

    alert('Thank You For Your Purchase');

}


function calcTotalPrice(userBasket) {

    let totalPriceValue = 0;

    userBasket.forEach(function (product) {

        totalPriceValue += Math.floor(product.count * product.price);
    })

    cartTotalPriceElem.innerHTML = '$ ' + totalPriceValue;
}

function updateProductCount(productId, newCount) {
    console.log('Product Id: ' + productId + '\n' + 'New Count : ' + newCount);

    userBasket.forEach(function (product) {

        if (product.id === productId) {
            product.count = newCount;
        }
    });

    calcTotalPrice(userBasket);
}
