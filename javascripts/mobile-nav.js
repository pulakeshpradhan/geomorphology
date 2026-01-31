document.addEventListener('DOMContentLoaded', function () {
    // 1. Mobile Bottom Navigation
    if (window.innerWidth <= 768) {
        const nav = document.createElement('div');
        nav.className = 'mobile-nav';
        nav.innerHTML = `
            <a href="https://pulakeshpradhan.github.io/geomorphology/" class="mobile-nav-item">
                <i class="fas fa-home"></i>
                <span>Home</span>
            </a>
            <a href="https://pulakeshpradhan.github.io/geomorphology/unit-1/" class="mobile-nav-item">
                <i class="fas fa-mountain"></i>
                <span>Unit I</span>
            </a>
            <a href="https://pulakeshpradhan.github.io/geomorphology/unit-2/" class="mobile-nav-item">
                <i class="fas fa-layer-group"></i>
                <span>Unit II</span>
            </a>
            <div class="mobile-nav-item search-trigger" id="mobile-search">
                <i class="fas fa-search"></i>
                <span>Search</span>
            </div>
        `;
        document.body.appendChild(nav);

        // Search Trigger logic
        const searchTrigger = document.getElementById('mobile-search');
        if (searchTrigger) {
            searchTrigger.addEventListener('click', function () {
                const searchInput = document.querySelector('.md-search__input');
                if (searchInput) {
                    searchInput.focus();
                    searchInput.click();
                }
            });
        }
    }

    // 2. Small Icon-only action buttons at the bottom of the article
    setTimeout(function () {
        const mdContent = document.querySelector('.md-content__inner');
        if (!mdContent || document.querySelector('.bottom-actions')) return;

        const container = document.createElement('div');
        container.className = 'bottom-actions';

        const path = window.location.pathname.replace('/geomorphology/', '');
        const filename = path.endsWith('/') ? path + 'index.md' : path.replace('.html', '.md');

        const editUrl = `https://github.com/pulakeshpradhan/geomorphology/edit/main/docs/${filename}`;

        container.innerHTML = `
            <a href="${editUrl}" class="action-btn" title="Edit this page">
                <i class="fas fa-edit"></i>
            </a>
            <a href="javascript:window.print()" class="action-btn" title="Print to PDF">
                <i class="fas fa-file-pdf"></i>
            </a>
        `;
        mdContent.appendChild(container);
    }, 150);
});
