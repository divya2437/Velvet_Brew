/* =========================================
   VELVET BREW - JAVASCRIPT
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
  // --- MENU DATA ---
  const menuItems = [
    // Coffee
    { id: 1, category: 'coffee', name: 'Velvet Signature Latte', price: 250, desc: 'Our house blend with steamed oat milk, a dash of vanilla, and rose petals.', img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&q=80' },
    { id: 2, category: 'coffee', name: 'Classic Cappuccino', price: 180, desc: 'Rich espresso topped with deep layer of foamed milk.', img: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=500&q=80' },
    { id: 3, category: 'coffee', name: 'Cold Brew Dream', price: 220, desc: 'Steeped for 18 hours, served over ice with a splash of sweet cream.', img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=80' },
    { id: 4, category: 'coffee', name: 'Mocha Hazelnut', price: 240, desc: 'Espresso, dark chocolate, hazelnut syrup, and whipped cream.', img: 'https://images.unsplash.com/photo-1576402187878-974f70c890a5?w=500&q=80' },
    // Desserts
    { id: 5, category: 'desserts', name: 'Artisan Chocolate Tart', price: 280, desc: 'Rich dark chocolate ganache in a buttery crust with sea salt flakes.', img: 'https://images.unsplash.com/photo-1621236378699-8597faf6a176?w=500&q=80' },
    { id: 6, category: 'desserts', name: 'Classic Tiramisu', price: 320, desc: 'Espresso-soaked ladyfingers layered with light mascarpone cream.', img: 'https://images.unsplash.com/photo-1571115177098-24c4281fba25?w=500&q=80' },
    { id: 7, category: 'desserts', name: 'Butter Croissant', price: 150, desc: 'Flaky, buttery, baked fresh every morning in-house.', img: 'https://images.unsplash.com/photo-1519682577862-22b62b24cb12?w=500&q=80' },
    { id: 8, category: 'desserts', name: 'Berry Cheesecake', price: 290, desc: 'New York style cheesecake topped with fresh mixed berry compote.', img: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500&q=80' },
    // Snacks
    { id: 9, category: 'snacks', name: 'Avocado Sourdough Toast', price: 350, desc: 'Mashed avocado, cherry tomatoes, feta, and microgreens on artisan sourdough.', img: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=500&q=80' },
    { id: 10, category: 'snacks', name: 'Truffle Fries', price: 220, desc: 'Crispy fries tossed in truffle oil and parmesan, served with garlic aioli.', img: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=500&q=80' },
    { id: 11, category: 'snacks', name: 'Grilled Pesto Panini', price: 310, desc: 'Fresh mozzarella, tomatoes, and house-made basil pesto on ciabatta.', img: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&q=80' }
  ];

  // --- STATE ---
  let cart = [];
  
  // --- DOM ELEMENTS ---
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const menuGrid = document.getElementById('menuGrid');
  const tabBtns = document.querySelectorAll('.tab-btn');
  const cartBtn = document.getElementById('cartBtn');
  const cartSidebar = document.getElementById('cartSidebar');
  const cartOverlay = document.getElementById('cartOverlay');
  const closeCartBtn = document.getElementById('closeCart');
  const cartItemsContainer = document.getElementById('cartItems');
  const cartCount = document.getElementById('cartCount');
  const cartTotal = document.getElementById('cartTotal');
  const cartFooter = document.getElementById('cartFooter');
  const toast = document.getElementById('toast');

  // --- SCROLL EVENTS (STICKY NAV) ---
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- MOBILE MENU ---
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // --- RENDER MENU ---
  function renderMenu(category) {
    menuGrid.innerHTML = '';
    const filteredItems = menuItems.filter(item => item.category === category);
    
    filteredItems.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'menu-card';
      card.style.animationDelay = `${index * 0.1}s`; // Staggered animation
      
      card.innerHTML = `
        <div class="menu-card-img-wrap">
          <img src="${item.img}" alt="${item.name}" class="menu-card-img" loading="lazy">
        </div>
        <div class="menu-card-info">
          <div class="menu-card-header">
            <h3 class="menu-card-title">${item.name}</h3>
            <span class="menu-card-price">₹${item.price}</span>
          </div>
          <p class="menu-card-desc">${item.desc}</p>
          <button class="btn btn-outline btn-full add-to-cart-btn" data-id="${item.id}">Add to Cart</button>
        </div>
      `;
      menuGrid.appendChild(card);
    });

    // Attach event listeners to new buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.target.dataset.id);
        addToCart(id);
      });
    });
  }

  // Initial render
  renderMenu('coffee');

  // Menu Tabs Logic
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all
      tabBtns.forEach(b => b.classList.remove('active'));
      // Add to clicked
      btn.classList.add('active');
      // Render specific category
      renderMenu(btn.dataset.category);
    });
  });

  // --- CART LOGIC ---
  function toggleCart() {
    cartSidebar.classList.toggle('active');
    cartOverlay.classList.toggle('active');
  }

  cartBtn.addEventListener('click', toggleCart);
  closeCartBtn.addEventListener('click', toggleCart);
  cartOverlay.addEventListener('click', toggleCart);

  function addToCart(id) {
    const item = menuItems.find(i => i.id === id);
    const existingItem = cart.find(i => i.id === id);

    if (existingItem) {
      existingItem.qty += 1;
    } else {
      cart.push({ ...item, qty: 1 });
    }

    updateCartUI();
    showToast(`Added ${item.name} to cart`);
  }

  function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
  }

  function updateCartUI() {
    // Update Count
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCount.textContent = totalItems;
    
    // Scale animation for count
    cartCount.style.transform = 'scale(1.5)';
    setTimeout(() => cartCount.style.transform = 'scale(1)', 200);

    // Update Items display
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
      cartFooter.style.display = 'none';
    } else {
      cartItemsContainer.innerHTML = '';
      let totalValue = 0;

      cart.forEach(item => {
        totalValue += item.price * item.qty;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
          <img src="${item.img}" alt="${item.name}">
          <div class="cart-item-details">
            <div class="cart-item-title">${item.name}</div>
            <div class="cart-item-price">₹${item.price} x ${item.qty}</div>
            <span class="cart-item-remove" data-id="${item.id}">Remove</span>
          </div>
        `;
        cartItemsContainer.appendChild(div);
      });

      cartTotal.textContent = `₹${totalValue}`;
      cartFooter.style.display = 'block';

      // Attach remove events
      document.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
          removeFromCart(parseInt(e.target.dataset.id));
        });
      });
    }
  }

  // --- TOAST NOTIFICATION ---
  function showToast(msg) {
    toast.innerHTML = `<span>✓</span> ${msg}`;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // --- SCROLL REVEAL ANIMATION ---
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // --- TESTIMONIALS SLIDER ---
  const track = document.getElementById('testimonialsTrack');
  const cards = document.querySelectorAll('.testimonial-card');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('sliderDots');
  
  let currentSlide = 0;
  
  // Create dots
  cards.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.className = `dot ${idx === 0 ? 'active' : ''}`;
    dot.dataset.index = idx;
    dotsContainer.appendChild(dot);
    
    dot.addEventListener('click', () => {
      goToSlide(idx);
    });
  });

  const dots = document.querySelectorAll('.dot');

  function updateSlider() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentSlide);
    });
  }

  function goToSlide(index) {
    currentSlide = index;
    updateSlider();
  }

  nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % cards.length;
    updateSlider();
  });

  prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + cards.length) % cards.length;
    updateSlider();
  });

  // Auto slide
  setInterval(() => {
    currentSlide = (currentSlide + 1) % cards.length;
    updateSlider();
  }, 6000);
});
