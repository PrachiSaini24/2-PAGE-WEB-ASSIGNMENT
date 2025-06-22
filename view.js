
    const container = document.getElementById('itemsContainer');
    const items = JSON.parse(localStorage.getItem('items') || '[]');

    function showModal(item) {
      document.getElementById('modalName').innerText = item.name;
      document.getElementById('modalType').innerText = "Type: " + item.type;
      document.getElementById('modalDesc').innerText = item.desc;
      const carousel = document.getElementById('carousel');
      carousel.innerHTML = '';

      [item.coverImage, ...item.additionalImages].forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.className = index === 0 ? 'active' : '';
        carousel.appendChild(img);
      });

      let current = 0;
      const imgs = carousel.querySelectorAll('img');
      setInterval(() => {
        imgs[current].classList.remove('active');
        current = (current + 1) % imgs.length;
        imgs[current].classList.add('active');
      }, 3000);

      document.getElementById('itemModal').style.display = 'block';
    }

    items.forEach(item => {
      const div = document.createElement('div');
      div.className = 'item';
      div.innerHTML = `<img src="${item.coverImage}" /><p>${item.name}</p>`;
      div.onclick = () => showModal(item);
      container.appendChild(div);
    });


    
//delete file within 10min
setTimeout(() => {
  localStorage.removeItem('items');
  alert('Images cleared after 10 minutes!');
  location.reload(); // optional to reflect changes
}, 10 * 60 * 1000); // 10 minutes
