document.addEventListener('DOMContentLoaded', function() {
    // Sample data - in a real app, this would come from a database
    const materials = JSON.parse(localStorage.getItem('courseMaterials')) || [
        {
            id: 1,
            type: 'document',
            title: 'Introduction to JavaScript',
            url: 'https://nitroflare.com/view/sample-document',
            description: 'PDF document covering JavaScript basics'
        },
        {
            id: 2,
            type: 'video',
            title: 'JavaScript Functions Tutorial',
            url: 'https://www.youtube.com/embed/PkZNo7MFNFg',
            description: 'Learn how to use functions in JavaScript'
        },
        {
            id: 3,
            type: 'link',
            title: 'MDN JavaScript Documentation',
            url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
            description: 'Official JavaScript documentation'
        }
    ];
    
    const materialsContainer = document.getElementById('materials-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Display all materials initially
    displayMaterials(materials);
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter materials
            const filter = button.dataset.filter;
            if (filter === 'all') {
                displayMaterials(materials);
            } else {
                const filteredMaterials = materials.filter(material => material.type === filter);
                displayMaterials(filteredMaterials);
            }
        });
    });
    
    function displayMaterials(materialsToDisplay) {
        materialsContainer.innerHTML = '';
        
        if (materialsToDisplay.length === 0) {
            materialsContainer.innerHTML = '<p>No materials found for this filter.</p>';
            return;
        }
        
        materialsToDisplay.forEach(material => {
            const materialCard = document.createElement('div');
            materialCard.className = `material-card ${material.type}`;
            
            let contentHTML = '';
            
            if (material.type === 'video') {
                // Embed YouTube video
                contentHTML = `
                    <h3 class="material-title">${material.title}</h3>
                    <p class="material-description">${material.description}</p>
                    <div class="video-container">
                        <iframe width="560" height="315" src="${material.url}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                `;
            } else {
                // Document or link
                contentHTML = `
                    <h3 class="material-title">${material.title}</h3>
                    <p class="material-description">${material.description}</p>
                    <div class="material-actions">
                        <a href="${material.url}" class="btn btn-primary" target="_blank">
                            ${material.type === 'document' ? 'Download' : 'Visit Link'}
                        </a>
                    </div>
                `;
            }
            
            materialCard.innerHTML = contentHTML;
            materialsContainer.appendChild(materialCard);
        });
    }
});