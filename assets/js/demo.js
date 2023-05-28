// lấy tất cả các nút add Cart
let addCart = document.querySelectorAll('.add-cart')
addCart.forEach((item) => {
    // gắn sự kiện click cho từng nút
    item.addEventListener('click', (e) => {
        // e.currentTarget để lấy chính nó

        // getAttribute để lấy thuộc tính trên div
        let productId = e.currentTarget.getAttribute('product-id')
        let productName = e.currentTarget.closest('.product-cart').querySelector('.product-name').textContent.trim()
        let productPrice = e.currentTarget.closest('.product-cart').querySelector('.product-price').textContent.trim()
        let productImage = e.currentTarget.closest('.product-cart').querySelector('.home-product-img').getAttribute('src')

        productPrice = productPrice.replace(/\./g, '').replace('₫', '');

        // console.log(productId + ' ' + productName + ' ' + productPrice )

        saveLocalStorage(productId, productName, productPrice, productImage);

    
    })
})


function saveLocalStorage(productId, productName, productPrice, productImage) {

    const productLocal = JSON.parse(localStorage.getItem('productList')) || [];

    const filteredProducts = productLocal.filter(product => product.productId === productId);

    if(filteredProducts.length !== 0)
    {
        for (let i = 0; i < productLocal.length; i++) {
            console.log(productLocal[i].productId);
            if (productLocal[i].productId === productId) {
                productLocal[i].productCount += 1;
                break; // thoát khỏi vòng lặp nếu đã tìm thấy phần tử cần thay đổi
            }
        }

        localStorage.setItem('productList', JSON.stringify(productLocal));
    } 
    else
    {
        const product = {
            productId: productId,
            productName: productName,
            productImage: productImage,
            productCount: 1,
            productPrice: productPrice
            
        };
    
    
        // Kiểm tra xem đã có danh sách sản phẩm trong LocalStorage chưa
        let productList = JSON.parse(localStorage.getItem('productList')) || [];
    
        // Thêm sản phẩm mới vào danh sách
        productList.push(product);
    
        // Lưu danh sách sản phẩm mới vào LocalStorage
        localStorage.setItem('productList', JSON.stringify(productList));
    }

    
}

