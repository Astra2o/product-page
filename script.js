console.log('====================================');
console.log("Connected");
console.log('====================================');
const featuredImg = document.getElementById('featuredimg')
   const otherImgContainer = document.getElementById('otherImgContainer')  
   const brandName= document.getElementById('brandName') ;
   const title= document.getElementById('title') ;
   const discountedPrice   = document.getElementById('discountedPrice') 
   const  discountPercent  = document.getElementById('discountPercent') 
   const  mrp  = document.getElementById('mrp') 
   const  chooseColor  = document.getElementById('chooseColor') 
   const chooseSize   = document.getElementById('chooseSize') 
   const  minus  = document.getElementById('minus') 
   const  quantity  = document.getElementById('quantity') 
   const plus   = document.getElementById('plus') 
   const  addCart  = document.getElementById('addCart') 
   const  ifcart  = document.getElementById('ifcart') 
   const description  = document.getElementById('description') 
  const activeimg=document.getElementsByClassName('miniimg')
  const images =[
    {src:"https://m.media-amazon.com/images/I/61MV2A9t8WL._SY741_.jpg"},
    {src:"https://m.media-amazon.com/images/I/61NaPug8PSL._SY741_.jpg"},
    {src:"https://m.media-amazon.com/images/I/611hCFTRRvL._SY741_.jpg"},
    {src:"https://m.media-amazon.com/images/I/51yN-wPWqHL._SY741_.jpg"}
]

let selectedColor = null;
let selectedSize = 'small';
console.log(images[0].src);
// fetch data through api
const imgchange = (img, index) => {
    // Remove the class 'activeimg' from all images
    document.querySelectorAll('.miniimg').forEach(image => {
        image.classList.remove('activeimg');
    });
    // Add the class 'activeimg' to the clicked image
    img.classList.add('activeimg');
   featuredImg.src=images[index].src
// console.log(index);
    // Your other functionality here...
}




// API link
const apiUrl = 'https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448';
let productData; 

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    
    productData = data.product;
    // console.log(productData.images);  
    // const images = productData.images; // in api images url not working so i  create an array of images like as api 
    
    

 const imageChange=(index)=>{
          activeimg[index].classList.add("activeimg")
 }


//  featuredImg.innerHTML=`<img src='${images[0].src}' alt="">`
 featuredImg.src=images[0].src;
//  otherImgContainer.innerHTML=images.map((i,index)=>(
//     `<img class='miniimg '  onclick="myFunction(${index})" src="${i.src}" alt="">`
//  ))



// Use the imgchange function
otherImgContainer.innerHTML = images.map((image, index) => (
    `<img class="miniimg" onclick="imgchange(this, ${index})" src="${image.src}" alt="">`
)).join('');

const miniimgs=document.querySelectorAll('.miniimg');
miniimgs[0].classList.add('activeimg')











brandName.innerText=productData.vendor;
title.innerText=productData.title
discountedPrice.innerText=productData.price;
mrp.innerText=productData.compare_at_price;
if (isNaN(productData.price,productData.compare_at_price)) {
    productData.price= productData.price.slice(1);
    productData.compare_at_price =  productData.compare_at_price.slice(1);
}
let discountCal=  (productData.price / productData.compare_at_price) * 100
discountPercent.innerText=Math.trunc(discountCal)+'%'



const colorOptions = productData.options.find(option => option.name === 'Color').values; 
console.log(colorOptions);
chooseColor.innerHTML=colorOptions.map(i=>(
   ` <div  style='border-color:${i[Object.keys(i)[0]]}' class='coloroptcon'>
        <div  style='background-color:${i[Object.keys(i)[0]]};color:${i[Object.keys(i)[0]]}' class='coloropt'>
        ${Object.keys(i)[0]} 
        </div>
    </div>
    `
)).join('');
const coloroptcon=document.querySelectorAll('.coloroptcon')
coloroptcon[0].classList.add('activecolor');
chooseColor.addEventListener('click', function(event) {
    const colorOption = event.target.closest('.coloroptcon');
    if (colorOption) {
        // Remove 'activecolor' class from all color options
        document.querySelectorAll('.coloroptcon').forEach(option => {
            option.classList.remove('activecolor');
        });
        // Add 'activecolor' class to the selected color option
        colorOption.classList.add('activecolor');
        // Get the color value and log it
        selectedColor = colorOption.querySelector('.coloropt').textContent;
        // console.log('Selected color:', selectedColor);
    }
});


const sizeOptions = productData.options.find(option => option.name === 'Size').values; 
console.log(sizeOptions);

// Initialize a variable to keep track of whether the first input is added
let isFirstInput = true;

chooseSize.innerHTML = sizeOptions.map(size => {
    const checkedAttribute = isFirstInput ? 'checked' : ''; // Add 'checked' attribute to first input
    isFirstInput = false; // Update isFirstInput flag

    return `
        <span class="sizes">
            <input type="radio" id="sizeoption" name="fav_size" value="${size}" ${checkedAttribute}>
            <label for="${size}">${size}</label>
        </span>
    `;
}).join('');

chooseSize.addEventListener('change', function(event) {
    selectedSize = event.target.value;
    console.log('Selected size:', selectedSize);
});

description.innerHTML=productData.description;


addCart.addEventListener('click',()=>{
    console.log(selectedColor + selectedSize);
    ifcart.innerText=`${productData.title} with Color   ${selectedColor} and Size ${selectedSize} added to cart`
    ifcart.classList.add('addingcart')
    const brElements = ifcart.getElementsByTagName('br');
for (let i = brElements.length - 1; i >= 0; i--) {
    const brElement = brElements[i];
    ifcart.removeChild(brElement);
}
})
const brElements = ifcart.getElementsByTagName('br');
for (let i = brElements.length - 1; i >= 0; i--) {
    const brElement = brElements[i];
    ifcart.removeChild(brElement);
}
let quantityvalue=1
quantity.innerText=`${quantityvalue}` ;
minus.addEventListener('click', function() {
    // Decrease quantity by 1, but ensure it stays within the range 1 to 10
    if (quantityvalue > 1) {
        quantityvalue--;
        quantity.innerText=`${quantityvalue}` 
    }
});

// Event listener for plus button
plus.addEventListener('click', function() {
    // Increase quantity by 1, but ensure it stays within the range 1 to 10
    if (quantityvalue < 10) {
        quantityvalue++;
        quantity.innerText=`${quantityvalue}`    }
});




































    
  })
  .catch(error => console.error('Error fetching data:', error));

  

 console.log(productData);  



