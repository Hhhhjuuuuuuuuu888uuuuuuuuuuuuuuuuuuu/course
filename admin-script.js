document.addEventListener('DOMContentLoaded', function() {
    const materialForm = document.getElementById('material-form');
    const adminMaterialsContainer = document.getElementById('admin-materials-container');
    
    // Load existing materials
    let materials = JSON.parse(localStorage.getItem('courseMaterials')) || [];
    displayAdminMaterials();
    
    // Form submission
    materialForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const type = document.getElementById('material-type').value;
        const title = document.getElementById('material-title').value;
        const url = document.getElementById('material-url').value;
        const description = document.getElementById('material-description').value;
        
        // Create new material
        const newMaterial = {
            id: Date.now(), // Simple unique ID
            type,
            title,
            url,
            description
        };
        
        // Add to array and save
        materials.push(newMaterial);
        localStorage.setItem('courseMaterials', JSON.stringify(materials));
        
        // Refresh display
        displayAdminMaterials();
        
        // Reset form
        materialForm.reset();
        
        alert('Material added successfully!');
    });
    
    function displayAdminMaterials() {
        adminMaterialsContainer.innerHTML = '';
        
        if (materials.length === 0) {
            adminMaterialsContainer.innerHTML = '<p>No materials added yet.</p>';
            return;
        }
        
        materials.forEach((material, index) => {
            const materialCard = document.createElement('div');
            materialCard.className = `material-card ${material.type}`;
            
            materialCard.innerHTML = `
                <h3 class="material-title">${material.title}</h3>
                <p class="material-description">${material.description}</p>
                <p><strong>Type:</strong> ${material.type}</p>
                <p><strong>URL:</strong> <a href="${material.url}" target="_blank">${material.url}</a></p>
                <div class="material-actions">
                    <button class="btn btn-danger" data-id="${material.id}">Delete</button>
                </div>
            `;
            
            adminMaterialsContainer.appendChild(materialCard);
        });
        
        // Add event listeners to delete buttons
        document.querySelectorAll('.btn-danger').forEach(button => {
            button.addEventListener('click', function() {
                const id = parseInt(this.dataset.id);
                if (confirm('Are you sure you want to delete this material?')) {
                    materials = materials.filter(material => material.id !== id);
                    localStorage.setItem('courseMaterials', JSON.stringify(materials));
                    displayAdminMaterials();
                }
            });
        });
    }
});