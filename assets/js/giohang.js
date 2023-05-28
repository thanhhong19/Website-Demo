
printLocalStorage();



function printLocalStorage()
{
    // Lấy danh sách sản phẩm từ LocalStorage
    const productList = JSON.parse(localStorage.getItem('productList')) || [];
    const mergedProductList = [];

    console.log(productList);

    if(productList.length!= 0)
    {
        let priceTotal = 0;
        // In ra danh sách các sản phẩm
        productList.forEach(function(product) {
            // kieerm tra ton tai id chua
            const existingProduct = mergedProductList.find(function(p) {
                return p.productId === product.productId;
            });
            
            if (existingProduct) {
                product.productCount += 1; 

                let price = product.productPrice.toLocaleString('vi-VN')
                let total = (product.productCount * product.productPrice).toLocaleString('vi-VN')
                priceTotal += (product.productCount * product.productPrice)

                console.log(product.productCount * product.productPrice);

                let newHtml = `
                    <div class="basket-product">
                        <div class="item">
                            <div class="product-image">
                                <img src="${product.productImage}" alt="Placholder Image 2" class="product-frame">
                            </div>
                            <div class="product-details">
                                <h1><strong><span class="item-quantity">${product.productCount}</span> x ${product.productName}</strong></h1>
                                <p>Mo ta san pham</p>
                            </div>
                        </div>
                        <div class="price">${price}</div>
                        <div class="quantity">
                            <input value="${product.productCount}" class="quantity-field product-count" productId='${product.productId}'>
                        </div>
                        <div class="subtotal">${total}</div>
                        <div class="remove">
                            <button class='remove-product' productId='${product.productId}>Remove</button>
                        </div>
                    </div>
                `

                var myDiv = document.getElementById("product-list");
                myDiv.insertAdjacentHTML("beforeend", newHtml);

            } else {

                // const formattedStr = str.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

                let price = product.productPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                let total = (product.productCount * product.productPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                priceTotal += (product.productCount * product.productPrice)

                console.log(product.productCount * product.productPrice);

                // Sản phẩm chưa có trong danh sách kết quả, thêm sản phẩm vào danh sách
                let newHtml = `
                    <div class="basket-product">
                        <div class="item">
                            <div class="product-image">
                                <img src="${product.productImage}" alt="Placholder Image 2" class="product-frame">
                            </div>
                            <div class="product-details">
                                <h1><strong><span class="item-quantity">${product.productCount}</span> x ${product.productName}</strong></h1>
                                <p>Product Code - 232321939</p>
                            </div>
                        </div>
                        <div class="price">${price}</div>
                        <div class="quantity">
                            <input type="number" value="${product.productCount}" class="quantity-field product-count" productId='${product.productId}'>
                        </div>
                        <div class="subtotal">${total}</div>
                        <div class="remove">
                            <button class='remove-product' productId='${product.productId}'>Remove</button>
                        </div>
                    </div>
                `

                var myDiv = document.getElementById("product-list");
                myDiv.insertAdjacentHTML("beforeend", newHtml);
            }

            // console.log(`Product ID: ${product.productId}, Product Name: ${product.productName}, Product Price: ${product.productPrice}`);
        });

        document.querySelector('.price-total').textContent = priceTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")


        updateCount()
        removeProduct()

    } else {

        let newHtml = `
            <p style="width: 100%; font-size: 14px; font-weight: 700; display: flex; justify-content: center; align-items: center;"> Empty </p>
        `

        var myDiv = document.getElementById("product-list");
            myDiv.insertAdjacentHTML("beforeend", newHtml);
    }
    
}


function removeProduct() 
{

    let removeProduct = document.querySelectorAll('.remove-product')
    removeProduct.forEach(item => {
        item.addEventListener('click', (e) => {
            let productId =  e.currentTarget.getAttribute('productId')

            const productLocal = JSON.parse(localStorage.getItem('productList')) || [];

            const updatedProductList = productLocal.filter(product => product.productId !== productId);

            localStorage.setItem('productList', JSON.stringify(updatedProductList));

            window.location.href = 'giohang.html'
        })
    })

}

function updateCount()
{
    let productCount = document.querySelectorAll('.product-count')
    productCount.forEach(item => {
        item.addEventListener('change', (e) => {
            let productId =  e.currentTarget.getAttribute('productId')

            const productLocal = JSON.parse(localStorage.getItem('productList')) || [];
            for (let i = 0; i < productLocal.length; i++) {
                if (productLocal[i].productId === productId) {
                    productLocal[i].productCount = e.currentTarget.value;
                    break; // thoát khỏi vòng lặp nếu đã tìm thấy phần tử cần thay đổi
                }
            }

            localStorage.setItem('productList', JSON.stringify(productLocal));

            window.location.href = 'giohang.html'
        })
    })
}
