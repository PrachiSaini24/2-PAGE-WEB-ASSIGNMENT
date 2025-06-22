// function for add file 
    function readFileAsDataURL(file) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    }

    document.getElementById('addItemForm').onsubmit = async (e) => {
      e.preventDefault();
      const name = document.getElementById('itemName').value;
      const type = document.getElementById('itemType').value;
      const desc = document.getElementById('itemDesc').value;
      const coverImageFile = document.getElementById('coverImage').files[0];
      const additionalFiles = document.getElementById('additionalImages').files;

      const coverImage = await readFileAsDataURL(coverImageFile);
      const additionalImages = [];
      for (let file of additionalFiles) {
        const img = await readFileAsDataURL(file);
        additionalImages.push(img);
      }

      const item = { name, type, desc, coverImage, additionalImages };

      const existing = JSON.parse(localStorage.getItem('items') || '[]');
      existing.push(item);
      localStorage.setItem('items', JSON.stringify(existing));

      document.getElementById('successMsg').style.display = 'block';
      document.getElementById('addItemForm').reset();
    };
