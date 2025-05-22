
// main.js - Shared JavaScript for all pages

document.addEventListener("DOMContentLoaded", function () {
  // ===== 1. Mobile Navigation Toggle =====
  const hamburger = document.querySelector(".hamburger-btn");
  const navList = document.querySelector(".nav-list");
  if (hamburger && navList) {
    hamburger.addEventListener("click", () => {
      navList.classList.toggle("open");
    });
  }

  // ===== 2. Search Bar Functionality =====
  const searchBtn = document.getElementById("search-button");
  const searchInput = document.querySelector(".search-group input");
  if (searchBtn && searchInput) {
    searchBtn.addEventListener("click", () => {
      const query = searchInput.value.trim();
      if (query) {
        alert("Searching for: " + query);
        // Optionally redirect or fetch results
      } else {
        alert("Please enter a search term.");
      }
    });
  }

  // ===== 3. Countdown Timer (index.html) =====
  const countdown = () => {
    const target = new Date();
    target.setHours(target.getHours() + 48); // 48-hour countdown
    const updateTimer = () => {
      const now = new Date();
      const diff = target - now;
      if (diff <= 0) return;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / 1000 / 60) % 60);
      const secs = Math.floor((diff / 1000) % 60);
      if (document.getElementById("days")) {
        document.getElementById("days").textContent = String(days).padStart(2, '0');
        document.getElementById("hours").textContent = String(hours).padStart(2, '0');
        document.getElementById("mins").textContent = String(mins).padStart(2, '0');
        document.getElementById("secs").textContent = String(secs).padStart(2, '0');
      }
    };
    updateTimer();
    setInterval(updateTimer, 1000);
  };
  countdown();

  // ===== 4. Hero Form Validation =====
  const heroForm = document.querySelector(".hero__form");
  if (heroForm) {
    heroForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const inputs = heroForm.querySelectorAll("input, textarea, select");
      let valid = true;
      inputs.forEach((input) => {
        if (!input.value.trim()) valid = false;
      });
      if (valid) {
        alert("Inquiry submitted!");
        heroForm.reset();
      } else {
        alert("Please fill out all fields.");
      }
    });
  }

  // ===== 5. Thumbnail to Main Image Switch =====
  const mainImage = document.querySelector(".main-image");
  const thumbnails = document.querySelectorAll(".thumbnails img");
  if (mainImage && thumbnails.length > 0) {
    thumbnails.forEach((thumb) => {
      thumb.addEventListener("click", () => {
        mainImage.src = thumb.src;
      });
    });
  }

  // ===== 6. Tab Switch (product-detail.html) =====
  const tabs = document.querySelectorAll(".tabs li");
  const contents = document.querySelectorAll(".tab-content > div");
  if (tabs.length > 0 && contents.length > 0) {
    tabs.forEach((tab, idx) => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        contents.forEach(c => c.style.display = "none");
        tab.classList.add("active");
        contents[idx].style.display = "block";
      });
    });
    contents.forEach((c, i) => {
      c.style.display = i === 0 ? "block" : "none";
    });
  }

  // ===== 7. Favorite Toggle =====
  const favorites = document.querySelectorAll(".favorite");
  favorites.forEach((fav) => {
    fav.addEventListener("click", () => {
      fav.classList.toggle("active");
    });
  });

  // ===== 8. Save for Later Toggle =====
  const saveForLater = document.querySelector(".save-later");
  if (saveForLater) {
    saveForLater.addEventListener("click", () => {
      saveForLater.classList.toggle("saved");
      saveForLater.textContent = saveForLater.classList.contains("saved") ? "♥ Saved" : "♥ Save for later";
    });
  }

  // ===== 9. Filter Section Toggle =====
  const toggles = document.querySelectorAll(".filter-section .toggle, .filter h4 .toggle");
  toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const section = toggle.closest(".filter-section, section");
      if (section) {
        section.classList.toggle("collapsed");
        const ul = section.querySelector("ul");
        if (ul) ul.style.display = ul.style.display === "none" ? "block" : "none";
      }
    });
  });

  // ===== 10. Clear All Filters =====
  const clearBtn = document.querySelector(".clear-filters");
  if (clearBtn) {
    clearBtn.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelectorAll(".filter-section input[type='checkbox']").forEach((cb) => {
        cb.checked = false;
      });
    });
  }

  // ===== 11. View Switch Buttons =====
  const viewButtons = document.querySelectorAll(".view-toggle button");
  if (viewButtons.length === 2) {
    const [gridBtn, listBtn] = viewButtons;
    gridBtn.addEventListener("click", () => {
      window.location.href = "product-list.html";
    });
    listBtn.addEventListener("click", () => {
      window.location.href = "product-listview.html";
    });
  }
});


// ===== Sidebar Category Toggle (Advanced) =====
const menuItems = document.querySelectorAll(".sidebar-left .menu-item");
menuItems.forEach(item => {
  item.addEventListener("click", () => {
    // Remove active class from all items
    menuItems.forEach(i => i.classList.remove("active"));
    // Add active to clicked item
    item.classList.add("active");

    // Update banner content dynamically
    const bannerTitle = document.querySelector(".text-overlay h1");
    const bannerSubtitle = document.querySelector(".text-overlay h2");
    const bannerImage = document.querySelector(".banner-image");

    if (bannerTitle && bannerSubtitle && bannerImage) {
      bannerTitle.textContent = "Explore top products in";
      bannerSubtitle.textContent = item.textContent;

      // Optional: Change image based on category keyword
      const category = item.textContent.toLowerCase();
      if (category.includes("auto")) {
        bannerImage.src = "assets/Image/auto-banner.jpg";
      } else if (category.includes("clothes")) {
        bannerImage.src = "assets/Image/clothes-banner.jpg";
      } else if (category.includes("home")) {
        bannerImage.src = "assets/Image/home-banner.jpg";
      } else if (category.includes("tech")) {
        bannerImage.src = "assets/Image/tech-banner.jpg";
      } else {
        bannerImage.src = "assets/Image/Banner-board-800x420 2.jpg";
      }
    }
  });
});
// Advanced Image Zoom
function initImageZoom() {
  const mainImage = document.querySelector('.main-image');
  if (mainImage) {
    const zoomContainer = document.createElement('div');
    zoomContainer.className = 'image-zoom-container';
    mainImage.parentNode.insertBefore(zoomContainer, mainImage.nextSibling);

    mainImage.addEventListener('mousemove', (e) => {
      const rect = mainImage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const zoomLevel = 2;
      
      zoomContainer.style.backgroundImage = `url(${mainImage.src})`;
      zoomContainer.style.backgroundSize = `${mainImage.width * zoomLevel}px`;
      zoomContainer.style.backgroundPosition = `-${x * zoomLevel}px -${y * zoomLevel}px`;
      zoomContainer.style.opacity = '1';
    });

    mainImage.addEventListener('mouseleave', () => {
      zoomContainer.style.opacity = '0';
    });
  }
}

// Advanced Product Filter Toggle
function initAdvancedFilters() {
  document.querySelectorAll('.filter-section').forEach(section => {
    const header = section.querySelector('h4');
    const content = section.querySelector('ul, .slider');
    
    header.addEventListener('click', () => {
      const isOpen = section.classList.toggle('open');
      content.style.maxHeight = isOpen ? `${content.scrollHeight}px` : '0';
    });
  });
}

// Dynamic Cart Counter
function updateCartCounter() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  document.querySelectorAll('.cart-counter').forEach(el => {
    el.textContent = cartItems.length;
    el.style.display = cartItems.length ? 'flex' : 'none';
  });
}

// 3D Card Hover Effect
function initCardHover() {
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = card.offsetWidth/2;
      const centerY = card.offsetHeight/2;
      
      card.style.transform = `
        perspective(1000px)
        rotateX(${(centerY - y)/10}deg)
        rotateY(${(x - centerX)/10}deg)
      `;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  });
}

// Add to Cart Animation
function addToCartAnimation(product) {
  const cartIcon = document.querySelector('.fa-shopping-cart');
  const clone = product.cloneNode(true);
  
  clone.style.position = 'absolute';
  clone.style.width = `${product.offsetWidth}px`;
  clone.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
  
  product.parentNode.appendChild(clone);
  
  const cartRect = cartIcon.getBoundingClientRect();
  const productRect = product.getBoundingClientRect();
  
  clone.style.left = `${productRect.left}px`;
  clone.style.top = `${productRect.top}px`;
  
  requestAnimationFrame(() => {
    clone.style.left = `${cartRect.left}px`;
    clone.style.top = `${cartRect.top}px`;
    clone.style.opacity = '0';
    clone.style.transform = 'scale(0.2)';
  });

  setTimeout(() => clone.remove(), 500);
}

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
  initImageZoom();
  initAdvancedFilters();
  initCardHover();
  updateCartCounter();
  
  // Add to Cart functionality
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const product = btn.closest('.product-card');
      addToCartAnimation(product);
      
      // Update cart in localStorage
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push(product.dataset.id);
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCounter();
    });
  });
});


// ===== 1. Simulated Login State =====
const loginBtn = document.querySelector('.login-btn');
const joinBtn = document.querySelector('.join-btn');
const userCard = document.querySelector('.user-card');

function updateUserGreeting() {
  const username = localStorage.getItem('username');
  if (username && userCard) {
    userCard.innerHTML = `
      <p>Hi, ${username}</p>
      <button class="logout-btn">Logout</button>
    `;
    userCard.querySelector('.logout-btn').addEventListener('click', () => {
      localStorage.removeItem('username');
      location.reload();
    });
  }
}

if (loginBtn && joinBtn) {
  loginBtn.addEventListener('click', () => {
    const name = prompt("Enter your name:");
    if (name) {
      localStorage.setItem('username', name);
      updateUserGreeting();
    }
  });
  joinBtn.addEventListener('click', () => {
    const name = prompt("Create a new account (name):");
    if (name) {
      localStorage.setItem('username', name);
      updateUserGreeting();
    }
  });
}
updateUserGreeting();

// ===== 2. Dark Mode Toggle =====
const darkToggle = document.createElement('button');
darkToggle.textContent = '🌓 Dark Mode';
darkToggle.className = 'dark-toggle';
document.body.appendChild(darkToggle);
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode'));
});
if (localStorage.getItem('dark-mode') === 'true') {
  document.body.classList.add('dark-mode');
}

// ===== 3. Simple Cart System =====
document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    const product = btn.dataset.product || "Unnamed Item";
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
  });
});

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartIcon = document.querySelector('.fa-shopping-cart');
  if (cartIcon) {
    cartIcon.dataset.count = cart.length;
  }
}
updateCartCount();

// ===== 4. Search Autocomplete =====
const suggestionList = ["Laptop", "Lamp", "Canon Camera", "Smart Watch", "T-Shirts", "Shoes", "Jacket"];
const inputField = document.querySelector('.search-group input');
if (inputField) {
  const suggestionBox = document.createElement('ul');
  suggestionBox.className = 'search-suggestions';
  inputField.parentNode.appendChild(suggestionBox);

  inputField.addEventListener('input', () => {
    const q = inputField.value.toLowerCase();
    suggestionBox.innerHTML = '';
    if (q.length > 0) {
      suggestionList.filter(item => item.toLowerCase().includes(q)).forEach(match => {
        const li = document.createElement('li');
        li.textContent = match;
        li.addEventListener('click', () => {
          inputField.value = match;
          suggestionBox.innerHTML = '';
        });
        suggestionBox.appendChild(li);
      });
    }
  });
}

// ===== 5. Sticky Sidebar with ScrollSpy =====
const sidebar = document.querySelector('.sidebar-left');
if (sidebar) {
  sidebar.style.position = 'sticky';
  sidebar.style.top = '80px';
  document.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPos = document.documentElement.scrollTop || document.body.scrollTop;
    sections.forEach((sec, index) => {
      const link = sidebar.querySelectorAll('.menu-item')[index];
      if (sec.offsetTop <= scrollPos + 100) {
        sidebar.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
        if (link) link.classList.add('active');
      }
    });
  });
}

// ===== 6. Load More Products =====
const loadMoreBtn = document.querySelector('.load-more');
if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', () => {
    const hidden = document.querySelectorAll('.product-card.hidden');
    hidden.forEach((card, i) => {
      if (i < 5) card.classList.remove('hidden');
    });
    if (document.querySelectorAll('.product-card.hidden').length === 0) {
      loadMoreBtn.style.display = 'none';
    }
  });
}

// ===== 7. Recently Viewed Products =====
const detailProduct = document.querySelector('.product-title');
if (detailProduct) {
  const viewed = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
  viewed.unshift(detailProduct.textContent);
  const unique = [...new Set(viewed)].slice(0, 5);
  localStorage.setItem('recentlyViewed', JSON.stringify(unique));
}

const recentBox = document.querySelector('.recently-viewed');
if (recentBox) {
  const items = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
  recentBox.innerHTML = items.map(i => `<li>${i}</li>`).join('');
}

// ===== 8. Auto-Save Quote Form =====
const quoteForm = document.querySelector('.hero__form');
if (quoteForm) {
  const fields = quoteForm.querySelectorAll('input, textarea, select');
  fields.forEach(f => {
    const key = 'form_' + f.name;
    f.value = localStorage.getItem(key) || '';
    f.addEventListener('input', () => {
      localStorage.setItem(key, f.value);
    });
  });
}
