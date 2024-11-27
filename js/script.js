
(function ($, window) {
  "use strict";
  // Start FaQ Activation
  document.querySelectorAll(".faq-header").forEach((button) => {
    button.addEventListener("click", () => {
      const currentItem = button.parentElement;
      const isActive = currentItem.classList.contains("active");

      // Close all FAQ items
      document.querySelectorAll(".faq-item").forEach((item) => {
        item.classList.remove("active");
      });

      // If the clicked item wasn't active, open it
      if (!isActive) {
        currentItem.classList.add("active");
      }
    });
  });
  // End FaQ Activation

  // Start Video Play Stop and Browser Support
  document.addEventListener("DOMContentLoaded", () => {
    const videoItems = document.querySelectorAll(".video-item");

    videoItems.forEach((item) => {
      const video = item.querySelector("video");
      const playButtonContainer = item.querySelector(".play-button-container");

      // Function to toggle play and pause
      function toggleVideoPlay() {
        if (video.paused || video.ended) {
          video.play();
          playButtonContainer.style.display = "none"; // Hide play button
        } else {
          video.pause();
          playButtonContainer.style.display = "flex"; // Show play button
        }
      }

      // Event listener for video click
      video.addEventListener("click", toggleVideoPlay);

      // Event listener for play button click
      playButtonContainer.addEventListener("click", toggleVideoPlay);

      // Optional: Show play button when the video ends
      video.addEventListener("ended", () => {
        playButtonContainer.style.display = "flex";
      });
    });
  });
  // End Video Play Stop and Browser Support

  // Start Product Details
  $(document).ready(function () {
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
      breakpoints: {
        1500: {
          slidesPerView: 4,
        },
        1499: {
          slidesPerView: 6,
        },
        576: {
          slidesPerView: 6,
        },
        575: {
          slidesPerView: 5,
        },
        500: {
          slidesPerView: 5,
        },
        499: {
          slidesPerView: 4,
        },
        0: {
          slidesPerView: 4,
        },
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

  // End Rating Bar
  document.addEventListener("DOMContentLoaded", function () {
    const ratingBars = document.querySelectorAll(".rating-bar");

    function updateProgressBars() {
      const progressBars = document.querySelectorAll(".progress");
      progressBars.forEach((bar) => {
        const value = parseInt(bar.dataset.value);
        const total = parseInt(bar.dataset.total);
        if (value >= 5) {
          bar.style.width = "100%";
        } else {
          const percentage = (value / total) * 100;
          bar.style.width = percentage + "%";
        }
      });
    }

    function updateRating(data) {
      const totalReviews = Object.values(data).reduce((a, b) => a + b, 0);
      const weightedSum = Object.entries(data).reduce(
        (sum, [rating, count]) => {
          return sum + parseInt(rating) * count;
        },
        0
      );
      const average = (weightedSum / totalReviews).toFixed(2);

      document.querySelector(".rating-number").textContent = average;
      document.querySelector(
        ".review-count"
      ).textContent = `${totalReviews} reviews`;

      ratingBars.forEach((bar, index) => {
        const rating = 5 - index;
        const count = data[rating] || 0;
        const progressBar = bar.querySelector(".progress");
        const countLabel = bar.querySelector(".count");

        progressBar.dataset.value = count;
        progressBar.dataset.total = totalReviews;
        countLabel.textContent = `(${count})`;

        // Check if this rating has been clicked 5 or more times
        if (count >= 5) {
          progressBar.style.width = "100%";
        }
      });

      updateProgressBars();
      updateStars(average);
    }

    function updateStars(rating) {
      const stars = document.querySelectorAll(".star");
      const fullStars = Math.floor(rating);
      const decimal = rating - fullStars;

      stars.forEach((star, index) => {
        if (index < fullStars) {
          star.style.color = "#FDA769";
        } else if (index === fullStars && decimal > 0) {
          star.style.background = `linear-gradient(90deg, #FDA769 ${
            decimal * 100
          }%, #ccc ${decimal * 100}%)`;
          star.style.webkitBackgroundClip = "text";
          star.style.webkitTextFillColor = "transparent";
        } else {
          star.style.color = "#ccc";
        }
      });
    }

    ratingBars.forEach((bar, index) => {
      const rating = 5 - index;
      bar.addEventListener("click", () => {
        const currentData = getCurrentData();
        currentData[rating]++;
        updateRating(currentData);
      });
    });

    function getCurrentData() {
      const data = {};
      ratingBars.forEach((bar, index) => {
        const rating = 5 - index;
        const value = parseInt(bar.querySelector(".progress").dataset.value);
        data[rating] = value;
      });
      return data;
    }

    // Initial update
    updateRating({
      5: 1019,
      4: 152,
      3: 0,
      2: 0,
      1: 0,
    });
  });
  // Start Rating Bar

  // Start Review From Hide Show
  $(".moreless-button").click(function () {
    $(".moretext").slideToggle();
    if ($(".moreless-button").text() == "Write a Review More") {
      $(this).text("Write a Review Less");
    } else {
      $(this).text("Write a Review More");
    }
  });
  // End Review From Hide Show

  // Start Review From
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("review-form");
    const imageUploadArea = document.getElementById("image-upload-area");
    const imageInput = document.getElementById("image-input");
    const previewImage = document.getElementById("preview-image");
    const cancelBtn = document.getElementById("cancel-btn");

    // Handle image upload
    imageUploadArea.addEventListener("click", () => {
      imageInput.click();
    });

    imageInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          previewImage.src = e.target.result;
          previewImage.style.display = "block";
        };
        reader.readAsDataURL(file);
      }
    });

    // Handle form submission
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = {
        rating: document.querySelector('input[name="rating"]:checked')?.value,
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        review: document.getElementById("review").value,
        image: previewImage.src,
      };
      console.log("Form submitted:", formData);
      // Here you would typically send the data to your server
    });

    // Handle cancel button
    cancelBtn.addEventListener("click", () => {
      form.reset();
      previewImage.style.display = "none";
      previewImage.src = "";
    });
  });
  // End Review Form

  // Start Site Bar Hide Show
  const openCartButton = document.getElementById("openCartButton");
  const closeButton = document.getElementById("closeButton");
  const overlay = document.getElementById("overlay");
  const cartSidebar = document.getElementById("cartSidebar");

  function openSidebar() {
    cartSidebar.classList.add("open");
    overlay.style.display = "block";
    document.body.style.overflow = "hidden";
  }

  function closeSidebar() {
    cartSidebar.classList.remove("open");
    overlay.style.display = "none";
    document.body.style.overflow = "auto";
  }

  openCartButton.addEventListener("click", openSidebar);
  closeButton.addEventListener("click", closeSidebar);
  overlay.addEventListener("click", closeSidebar);

  // Call renderCartItems() to initialize the cart
  renderCartItems();
  // End Site Bar Hide Show

  // Start Add To Cart Sitebar
  const cartItems = {
    1: { id: 1, name: "Gift Wrapping", price: 800.0, quantity: 1 },
    2: { id: 2, name: "The Weighted Koala™", price: 8500.0, quantity: 1 },
  };
  const progressGoal = 5;
  let currentTotal = Object.values(cartItems).reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  function updateProgressBar() {
    const uniqueItemCount = Object.keys(cartItems).length;
    const progress = (uniqueItemCount / progressGoal) * 100;
    document.getElementById("progressFill").style.width = `${Math.min(
      progress,
      100
    )}%`;
    const remaining = Math.max(progressGoal - uniqueItemCount, 0);
    document.getElementById("amountRemaining").textContent = remaining;
  }
  function updateCheckoutValue() {
    const warrantyPrice = document.getElementById("warrantySwitch").checked
      ? 800.0
      : 0;
    const total = currentTotal + warrantyPrice;
    document.getElementById("checkoutValue").textContent = total.toFixed(2);
  }
  function updateCartCount() {
    const count = Object.values(cartItems).reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    document.getElementById("cartCount").textContent = count;
  }
  function renderCartItems() {
    const cartList = document.getElementById("cartItems");
    cartList.innerHTML = "";
    Object.values(cartItems).forEach((item) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
              <p>${item.name} • Tk ${item.price.toFixed(2)}</p>
              <div>
                <button class="decreaseQuantity" aria-label="Decrease quantity">-</button>
                <span>${item.quantity}</span>
                <button class="increaseQuantity" aria-label="Increase quantity">+</button>
                <button class="removeItem">Delete</button>
              </div>
            `;
      listItem.querySelector(".decreaseQuantity").onclick = () => {
        if (item.quantity > 1) {
          item.quantity--;
          currentTotal -= item.price;
        } else {
          delete cartItems[item.id];
          currentTotal -= item.price;
        }
        renderCartItems();
      };
      listItem.querySelector(".increaseQuantity").onclick = () => {
        item.quantity++;
        currentTotal += item.price;
        renderCartItems();
      };
      listItem.querySelector(".removeItem").onclick = () => {
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
    const cartItemsContainer = document.getElementById("cartItemsContainer");
    if (cartItemsContainer.scrollHeight > cartItemsContainer.clientHeight) {
      cartItemsContainer.style.overflowY = "scroll";
    } else {
      cartItemsContainer.style.overflowY = "auto";
    }
  }
  document.querySelectorAll(".addItemBtn").forEach((btn) => {
    btn.onclick = (e) => {
      const offerItem = e.target.closest(".offerItem");
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
  document
    .getElementById("warrantySwitch")
    .addEventListener("change", updateCheckoutValue);
  renderCartItems();
  // End Add To Cart Sitebar

  // Start Swiper Activatio

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

  // Start Sub Menu Clicked Activation
  document.querySelectorAll(".submenu-parrent").forEach((item) => {
    item.addEventListener("click", function () {
      const submenu = item.querySelector(".submenu");
      const submenuIcon = item.querySelector(".submenu-icon-item");
      if (submenu && submenuIcon) {
        submenu.classList.toggle("active");
        submenuIcon.classList.toggle("active");
      }
    });
  });
  // End Sub Menu Clicked Activation

  mtJs.m();
})(jQuery, window);
