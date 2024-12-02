document.addEventListener('DOMContentLoaded', function () {
    const lookupButton = document.getElementById('lookup');
    const lookupCitiesButton = document.getElementById('lookup-cities');
    const countryInput = document.getElementById('country');
    const resultDiv = document.getElementById('result');
    const controlsDiv = document.getElementById('controls'); // Menu controls section

    // Function to fetch data based on country and lookup type (country/cities)
    function fetchData(lookupType) {
        const countryName = countryInput.value.trim();
        
        // If the country input is empty, pass an empty string to fetch all countries or cities
        const url = `world.php?country=${encodeURIComponent(countryName)}&lookup=${lookupType}`;
        
        fetch(url)
            .then(response => response.text())
            .then(data => {
                resultDiv.innerHTML = data; // Display the result

                // After displaying the table, add a close button to it
                addCloseButtonToTables();
            })
            .catch(error => {
                resultDiv.innerHTML = "<p>Error fetching data. Please try again later.</p>";
                console.error(error);
            });
    }

    // Function to add close buttons to all tables
    function addCloseButtonToTables() {
        const tables = resultDiv.querySelectorAll('table');
        
        tables.forEach(table => {
            // Check if the close button already exists
            if (!table.querySelector('.table-close-btn')) {
                // Create a close button for this table
                const closeBtn = document.createElement('button');
                closeBtn.classList.add('table-close-btn');
                closeBtn.textContent = 'X';
                
                // Add an event listener to close the table
                closeBtn.addEventListener('click', function() {
                    closeTable(table);
                });
                
                // Append the close button to the table
                table.appendChild(closeBtn);
            }
        });
    }

    // Function to remove the table and show the menu
    function closeTable(table) {
        table.remove(); // Remove the table
        controlsDiv.style.display = 'block'; // Show the controls/menu again
    }

    // Event listener for the "Lookup" button (country info)
    lookupButton.addEventListener('click', function () {
        fetchData('country');
        controlsDiv.style.display = 'none'; // Hide the controls/menu
    });

    // Event listener for the "Lookup Cities" button
    lookupCitiesButton.addEventListener('click', function () {
        fetchData('cities');
        controlsDiv.style.display = 'none'; // Hide the controls/menu
    });
});
