const repositoriesContainer = document.getElementById('repositoriesContainer');
const paginationContainer = document.getElementById('pagination');
const usernameInput = document.getElementById('usernameInput');
const repositoriesPerPage = 10; // Number of repositories to display per page

let currentPage = 1;

// Display a placeholder message on page load
repositoriesContainer.innerHTML = '<p>Enter a GitHub username and click "Fetch Repositories" to get started.</p>';

function fetchRepositories(pageNumber) {
    const username = usernameInput.value.trim();

    if (!username) {
        alert('Please enter a valid GitHub username');
        return;
    }

    // Clear previous data
    repositoriesContainer.innerHTML = '';
    paginationContainer.innerHTML = '';

    // Display loader while fetching data
    repositoriesContainer.innerHTML = '<div class="loader"></div>';

    // Fetch total repositories count (for pagination)
    const totalCountUrl = `https://api.github.com/users/${username}`;
    fetch(totalCountUrl)
        .then(response => response.json())
        .then(user => {
            const totalRepositories = user.public_repos;
            const pageCount = Math.ceil(totalRepositories / repositoriesPerPage);

            currentPage = pageNumber;

            // Fetch repositories data using GitHub API
            const apiUrl = `https://api.github.com/users/${username}/repos?per_page=${repositoriesPerPage}&page=${pageNumber}`;
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        displayRepositories(data);
                        displayPagination(pageCount, currentPage);
                    } else {
                        repositoriesContainer.innerHTML = '<p>No repositories found.</p>';
                    }
                })
                .catch(error => {
                    repositoriesContainer.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
                });
        })
        .catch(error => {
            repositoriesContainer.innerHTML = `<p>Error fetching user data: ${error.message}</p>`;
        });
}

function displayRepositories(data) {
    repositoriesContainer.innerHTML = '';

    if (data.length === 0) {
        repositoriesContainer.innerHTML = '<p>No repositories found.</p>';
        return;
    }

    data.forEach(repository => {
        const repositoryElement = document.createElement('div');
        repositoryElement.className = 'repository';
        repositoryElement.innerHTML = `<h3>${repository.name}</h3>
                                       <p>${repository.description || 'No description available'}</p>
                                       <p>Topics: ${repository.topics.join(', ') || 'No topics'}</p>`;
        repositoriesContainer.appendChild(repositoryElement);
    });
}

function displayPagination(pageCount, currentPage) {
    paginationContainer.innerHTML = '';

    const prevButton = createPaginationButton('◄', () => {
        if (currentPage > 1) {
            fetchRepositories(currentPage - 1);
        }
    });
    paginationContainer.appendChild(prevButton);

    for (let page = 1; page <= pageCount; page++) {
        const pageButton = createPaginationButton(page.toString(), () => fetchRepositories(page));
        if (page === currentPage) {
            pageButton.classList.add('active');
        }
        paginationContainer.appendChild(pageButton);
    }

    const nextButton = createPaginationButton('►', () => {
        if (currentPage < pageCount) {
            fetchRepositories(currentPage + 1);
        }
    });
    paginationContainer.appendChild(nextButton);
}

function createPaginationButton(text, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.onclick = onClick;
    return button;
}

// Initial page load (page 1) - Removed the automatic fetch
// fetchRepositories(1);
