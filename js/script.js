/*=== Javascript function indexing hear===========




==================================================*/

(function ($, window) {
  "use strict";

  var mtJs = {
    m: function () {
      mtJs.d();
      mtJs.methods();
    },
    d: function () {
      this._window = $(window);
      this._document = $(document);
      this._body = $("body");
      this._html = $("html");
    },
    methods: function () {
      this.swiperActivation();
      this.submenuClickedActivation();
      this.faqActivation();
      this.addToCartSiteBar();
      this.siteBarShowHide();
    },


    // Start Site Bar Hide Show
    siteBarShowHide: function (){
      const openCartButton = document.getElementById('openCartButton');
      const closeButton = document.getElementById('closeButton');
      const overlay = document.getElementById('overlay');
      const cartSidebar = document.getElementById('cartSidebar');
  
      function openSidebar() {
        cartSidebar.classList.add('open');
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
      }
  
      function closeSidebar() {
        cartSidebar.classList.remove('open');
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
  
      openCartButton.addEventListener('click', openSidebar);
      closeButton.addEventListener('click', closeSidebar);
      overlay.addEventListener('click', closeSidebar);
  
      // Call renderCartItems() to initialize the cart
      renderCartItems();
    },
    // End Site Bar Hide Show

    // Start Add To Cart Sitebar
    addToCartSiteBar: function (){
      const cartItems = {
        1: { id: 1, name: "Gift Wrapping", price: 800.00, quantity: 1 },
        2: { id: 2, name: "The Weighted Koala™", price: 8500.00, quantity: 1 }
      };
      const progressGoal = 5; 
      let currentTotal = Object.values(cartItems).reduce((total, item) => total + (item.price * item.quantity), 0);
      function updateProgressBar() {
        const uniqueItemCount = Object.keys(cartItems).length;
        const progress = (uniqueItemCount / progressGoal) * 100;
        document.getElementById('progressFill').style.width = `${Math.min(progress, 100)}%`;
        const remaining = Math.max(progressGoal - uniqueItemCount, 0);
        document.getElementById('amountRemaining').textContent = remaining;
      }
      function updateCheckoutValue() {
        const warrantyPrice = document.getElementById('warrantySwitch').checked ? 800.00 : 0;
        const total = currentTotal + warrantyPrice;
        document.getElementById('checkoutValue').textContent = total.toFixed(2);
      }
      function updateCartCount() {
        const count = Object.values(cartItems).reduce((acc, item) => acc + item.quantity, 0);
        document.getElementById('cartCount').textContent = count;
      }
      function renderCartItems() {
        const cartList = document.getElementById('cartItems');
        cartList.innerHTML = '';
        Object.values(cartItems).forEach((item) => {
          const listItem = document.createElement('li');
          listItem.innerHTML = `
            <p>${item.name} • Tk ${item.price.toFixed(2)}</p>
            <div>
              <button class="decreaseQuantity" aria-label="Decrease quantity">-</button>
              <span>${item.quantity}</span>
              <button class="increaseQuantity" aria-label="Increase quantity">+</button>
              <button class="removeItem">Delete</button>
            </div>
          `;
          listItem.querySelector('.decreaseQuantity').onclick = () => {
            if (item.quantity > 1) {
              item.quantity--;
              currentTotal -= item.price;
            } else {
              delete cartItems[item.id];
              currentTotal -= item.price;
            }
            renderCartItems();
          };
          listItem.querySelector('.increaseQuantity').onclick = () => {
            item.quantity++;
            currentTotal += item.price;
            renderCartItems();
          };
          listItem.querySelector('.removeItem').onclick = () => {
            currentTotal -= item.price * item.quantity;
            delete cartItems[item.id];
            renderCartItems();
          };
          cartList.appendChild(listItem);
        });
        updateCheckoutValue();
        updateProgressBar();
        updateCartCount();
        addScrollbarIfNeeded();
      }
      function addScrollbarIfNeeded() {
        const cartItemsContainer = document.getElementById('cartItemsContainer');
        if (cartItemsContainer.scrollHeight > cartItemsContainer.clientHeight) {
          cartItemsContainer.style.overflowY = 'scroll';
        } else {
          cartItemsContainer.style.overflowY = 'auto';
        }
      }
      document.querySelectorAll('.addItemBtn').forEach((btn) => {
        btn.onclick = (e) => {
          const offerItem = e.target.closest('.offerItem');
          const id = offerItem.dataset.id;
          const name = offerItem.dataset.name;
          const price = parseFloat(offerItem.dataset.price);
          if (!cartItems[id]) {
            cartItems[id] = { id, name, price, quantity: 0 };
          }
          cartItems[id].quantity++;
          currentTotal += price;
          renderCartItems();
        };
      });
      document.getElementById('warrantySwitch').addEventListener('change', updateCheckoutValue);
      renderCartItems();
    },
    // End Add To Cart Sitebar

    // Start FaQ Activation
    faqActivation: function (){
      document.querySelectorAll('.faq-header').forEach(button => {
        button.addEventListener('click', () => {
            const currentItem = button.parentElement;
            const isActive = currentItem.classList.contains('active');

            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // If the clicked item wasn't active, open it
            if (!isActive) {
                currentItem.classList.add('active');
            }
        });
    });
    },
    // End FaQ Activation

    // Start Swiper Activation
    swiperActivation: function () {

      // Start Header Part Top Slider
      $(document).ready(function () {
        var swiper = new Swiper(".header-top-text-slides", {
          slidesPerView: 1,
          loop: true,
          autoplay: {
            delay: 2000,
          },
        });
      });
      // End Header Part Top Slider

      // Start Product Details 
      $(document).ready(function (){
        var swiper = new Swiper(".mySwiper", {
          loop: true,
          spaceBetween: 5,
          slidesPerView: 4,
          freeMode: true,
          watchSlidesProgress: true,
          navigation: {
            nextEl: ".thumb-slider-prev-arrro",
            prevEl: ".thumb-slider-next-arrow",
          },
          breakpoints:{
            1500:{
              slidesPerView:4,
            },
            1499:{
              slidesPerView:6,
            },
            576:{
              slidesPerView:6,
            },
            575:{
              slidesPerView:5,
            },
            500:{
              slidesPerView:5
            },
            499:{
              slidesPerView:4,
            },
            0:{
              slidesPerView:4,
            }
          },
        });
        var swiper2 = new Swiper(".mySwiper2", {
          loop: true,
          spaceBetween: 10,
          navigation: {
            nextEl: ".slider-prev-arrrow",
            prevEl: ".slider-next-arrrow",
          },
          thumbs: {
            swiper: swiper,
          },
        });
      });
      // End Product Details

    },
    // End Swiper Activation

    // Start Sub Menu Clicked Activation
    submenuClickedActivation: function () {
      document.querySelectorAll('.submenu-parrent').forEach(item => {
          item.addEventListener('click', function() {
              const submenu = item.querySelector('.submenu');
              const submenuIcon = item.querySelector('.submenu-icon-item');
              if (submenu && submenuIcon) {
                  submenu.classList.toggle('active');
                  submenuIcon.classList.toggle('active');
              }
          });
      });
  }
  
    // End Sub Menu Clicked Activation
  };

  mtJs.m();
})(jQuery, window);