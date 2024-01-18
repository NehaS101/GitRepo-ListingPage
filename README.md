# GitHub Repositories Listing Page

This web application allows users to view public repositories of a specified GitHub user. It displays the repositories in a paginated manner, with 10 repositories per page. Users can navigate through different pages and view repository details.

## Features

- **Pagination:** The repositories are displayed in pages, with the ability to navigate to the previous and next pages.

- **Dynamic Loading:** The application fetches data dynamically from the GitHub API based on the specified GitHub username.

- **Topics Display:** Each repository includes information about its associated topics.

## How to Use

1. Open the `index.html` file in a web browser.

2. Enter a valid GitHub username in the input field.

3. Click the "Fetch Repositories" button.

4. View the repositories displayed on the page. Use the pagination buttons to navigate through different pages.

## Implementation Details

- **API Integration:** The application uses the GitHub REST API to fetch user data and repositories.

- **Pagination:** Pagination is implemented on the server-side, with 10 repositories per page by default. Users can navigate through different pages using the pagination buttons.

- **Loading Indicator:** A loader is displayed while the application is fetching data from the GitHub API.

- **Search Functionality (Optional):** Optionally, a search bar can be implemented to filter repositories based on user input.

## References & Requirements

- GitHub API Documentation: [GitHub REST API Reference](https://docs.github.com/en/rest/reference)

- Topics Display: The application supports repositories having multiple topics.

## Additional Features (Optional)

- **Search Bar:** Implement a search bar to filter repositories based on user input.

- **Styling Enhancement:** Customize the CSS for a more visually appealing layout.

Feel free to explore and enhance the application based on your preferences and requirements.
