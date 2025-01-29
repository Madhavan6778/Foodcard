// const carticon = document.querySelector("#carticon");
// const close = document.querySelector("#close");
// const addcart = document.querySelector(".addcart");

// carticon.addEventListener("click", () => {
//     addcart.classList.add('addcart-active');
// })
// close.addEventListener("click", () => {
//     addcart.classList.remove('addcart-active');
// })



// document.addEventListener('DOMContentLoaded', foodcontent())

// function foodcontent() {
//     foodload()
// }

// function foodload() {
//     //remove food in cart
//     const delbtn = document.querySelectorAll("#delete");
//     delbtn.forEach((btn) => {
//         btn.addEventListener("click", removeitem)
//     })
//     //add qty
//     const qty = document.querySelectorAll(".input");
//     qty.forEach((input) => {
//         input.addEventListener("change", chqty)
//     })
//     // product cart
//     const addcrtbtn = document.querySelectorAll("#cardbtn");
//     addcrtbtn.forEach((btn) => {
//         btn.addEventListener("click", additems)
//     })

//     updatetotal();
// }
// function removeitem() {
//     let title = this.parentElement.querySelector('.foodtitle').innerHTML;

//     itemlist = itemlist.filter(el => el.title != title);

//     this.parentElement.remove();
//     foodload()
// }
// function chqty() {
//     if (isNaN(this.value) || (this.value < 1)) {
//         this.value = 1;
//     }

//     foodload() ;
// }
// let itemlist = [ ];
// function additems() {
//     let food = this.parentElement;
//     let title = food.querySelector('.card-title').innerHTML;
//     let img = food.querySelector('.card-img').src;
//     let price = food.querySelector('.card-price').innerHTML;
//     const crt=document.querySelector('.count')
//     let cout=itemlist.length;
//     crt.innerHTML=cout; 

//     let newproduct = { title, img, price }

//     if (itemlist.find((el) => el.title == newproduct.title)) {
//         alert('product alredy in cart');
//         return;
//     } else {
//         itemlist.push(newproduct)
//     };

//     let newproductelement = creatcartproduct(title, img, price);
//     let element = document.createElement('div');
//     element.innerHTML = newproductelement;
//     let cartbasket = document.querySelector(".additem");
//     cartbasket.append(element);

       

                           

//     foodload();

// }
// function creatcartproduct(title, img, price) {
//     return `
//     <div class="addbox">
//             <div class="addimg"><img src="${img}" alt="" height="70px" width="90px"></div>
//             <div class="foodname">
//                 <h3 class="foodtitle">${title}</h3>
//                 <div class="addprice">
//                     <div class="cartprice">${price}</div>
//                     <div class="cartamt">${price}</div>
//                 </div>
//                 <div class="addinput">
//                     <input type="number" value="1" class="input">

//                 </div>
//             </div>

//             <ion-icon name="trash-sharp" id="delete"></ion-icon>
//         </div>`;
// }

// function updatetotal() {
//     const cartitems = document.querySelectorAll('.addbox')
//     const totalval = document.querySelector('.total')
//     let total = 0;
//     cartitems.forEach(product => {
//         let priceelement = product.querySelector('.cartprice');
//         let amount = parseFloat(priceelement.innerHTML.replace("Rs.", ""));
//         let qty = product.querySelector('input').value;
//         total += (amount * qty)
//         product.querySelector(".cartamt").innerHTML = "Rs." + (amount * qty)
//     });
//     totalval.innerHTML = "Rs." + total;
   
// //



// }
// let items=["Salad","Cake","fish fry","Chicken Noddles " ]
const carticon = document.querySelector("#carticon");
const close = document.querySelector("#close");
const addcart = document.querySelector(".addcart");

carticon.addEventListener("click", () => {
    addcart.classList.add('addcart-active');
})
 close.addEventListener("click", () => {
     addcart.classList.remove('addcart-active');
})
document.addEventListener("DOMContentLoaded", () => {
    let cart = [];

    const cartIcon = document.getElementById("carticon");
    const cartCount = document.querySelector(".count");
    const cartContainer = document.querySelector(".additem");
    const totalPriceElement = document.querySelector(".total h4:last-child");
    const addCartButtons = document.querySelectorAll("#cardbtn");

    // Function to update cart display
    function updateCart() {
        cartContainer.innerHTML = "";
        let total = 0;

        cart.map((item) => {
            total += item.price * item.quantity;
            const cartItem = document.createElement("div");
            cartItem.classList.add("addbox");

            cartItem.innerHTML = `
                <div class="addimg"><img src="${item.image}" alt="${item.name}" height="70px" width="90px"></div>
                <div class="foodname">
                    <h3 class="foodtitle">${item.name}</h3>
                    <div class="addprice">
                        <div class="cartprice">Rs.${item.price}</div>
                        <div class="cartamt">Rs.${item.price * item.quantity}</div>
                    </div>
                    <div class="addinput">
                        <button class="decrease" data-id="${item.id}">-</button>
                        <input type="number" value="${item.quantity}" class="input" readonly>
                        <button class="increase" data-id="${item.id}">+</button>
                    </div>
                </div>
                <ion-icon name="trash-sharp" class="delete" data-id="${item.id}"></ion-icon>
            `;

            cartContainer.appendChild(cartItem);
        });

        totalPriceElement.textContent = `Rs.${total}`;
        cartCount.textContent = cart.length;

        addEventListeners();
    }

    // Function to add event listeners for buttons
    function addEventListeners() {
        document.querySelectorAll(".increase").forEach(button => {
            button.addEventListener("click", (event) => {
                const id = event.target.dataset.id;
                cart = cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item);
                updateCart();
            });
        });

        document.querySelectorAll(".decrease").forEach(button => {
            button.addEventListener("click", (event) => {
                const id = event.target.dataset.id;
                cart = cart.map(item => {
                    if (item.id === id) {
                        if (item.quantity > 1) {
                            return { ...item, quantity: item.quantity - 1 };
                        } else {
                            return null;
                        }
                    }
                    return item;
                }).filter(item => item !== null);
                updateCart();
            });
        });

        document.querySelectorAll(".delete").forEach(button => {
            button.addEventListener("click", (event) => {
                const id = event.target.dataset.id;
                cart = cart.filter(item => item.id !== id);
                updateCart();
            });
        });
    }

    // Add to cart functionality
    addCartButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const card = event.target.closest(".cards");
            const name = card.querySelector(".card-title").textContent;
            const price = parseInt(card.querySelector(".card-price").textContent.replace("Rs.", ""));
            const image = card.querySelector(".card-img").src;
            const id = name.toLowerCase().replace(/\s+/g, "-");

            const existingItem = cart.find(item => item.id === id);
            if (existingItem) {
                cart = cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item);
            } else {
                cart.push({ id, name, price, image, quantity: 1 });
            }

            updateCart();
        });
    });

   

});
