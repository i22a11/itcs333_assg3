// Define the API endpoint to fetch student data for IT Bachelor programs
const API_URL = "https://data.gov.bh/api/explore/v2.1/catalog/datasets/01-statistics-of-students-nationalities_updated/records?where=colleges%20like%20%22IT%22%20AND%20the_programs%20like%20%22bachelor%22&limit=100";

// Asynchronous function to fetch data from the API
async function fetchData() {
  try {
    // Send a GET request to the API URL
    const response = await fetch(API_URL);

    // Check if the HTTP response status is not OK (200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the response as JSON
    const data = await response.json();
    console.log(data); // Log the retrieved data for debugging

    // Verify if the data has a valid results array
    if (data.results && Array.isArray(data.results)) {
      // Call displayData to show the data in a table
      displayData(data.results);
    } else {
      // Log an error if data format is invalid or no records exist
      console.error("No records found or invalid data format");
    }
  } catch (error) {
    // Handle any errors that occur during the fetch or parsing process
    console.error("Failed to fetch data:", error);
  }
}

// Function to display student data in an HTML table
function displayData(records) {
  // Get the table body element where rows will be added
  const tableBody = document.querySelector("#studentTable tbody");

  // Clear any existing table rows
  tableBody.innerHTML = "";

  // Check if there are no records to display
  if (!records || records.length === 0) {
    console.error("No records to display."); // Log an error
    tableBody.innerHTML = "<tr><td colspan='6'>No data available</td></tr>"; // Show "no data" message
    return; // Exit the function
  }

  // Iterate over each record and create a row in the table
  records.forEach((record, index) => {
    console.log(`Record ${index}:`, record); // Log each record for debugging

    // Extract relevant data fields or use "N/A" if they are missing
    const year = record.year || "N/A";
    const semester = record.semester || "N/A";
    const program = record.the_programs || "N/A";
    const nationality = record.nationality || "N/A";
    const colleges = record.colleges || "N/A";
    const numberOfStudents = record.number_of_students || "N/A";

    // Create a new row for the table
    const row = document.createElement("tr");

    // Populate the row with columns for each data field
    row.innerHTML = `
      <td>${year}</td>
      <td>${semester}</td>
      <td>${program}</td>
      <td>${nationality}</td>
      <td>${colleges}</td>
      <td>${numberOfStudents}</td>
    `;

    // Append the row to the table body
    tableBody.appendChild(row);
  });
}

// Automatically fetch data when the page loads
fetchData();
