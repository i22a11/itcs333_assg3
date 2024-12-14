// Endpoint URL for the API
const API_URL = "https://data.gov.bh/api/explore/v2.1/catalog/datasets/01-statistics-of-students-nationalities_updated/records?where=colleges%20like%20%22IT%22%20AND%20the_programs%20like%20%22bachelor%22&limit=100";

// Fetch data from the API
async function fetchData() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data); 

    
    if (data.results && Array.isArray(data.results)) {
      displayData(data.results); 
    } else {
      console.error("No records found or invalid data format");
    }
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}

// Display data in the HTML table
function displayData(records) {
  const tableBody = document.querySelector("#studentTable tbody");

  tableBody.innerHTML = "";

  if (!records || records.length === 0) {
    console.error("No records to display.");
    tableBody.innerHTML = "<tr><td colspan='6'>No data available</td></tr>";
    return;
  }

  // Populate rows dynamically
  records.forEach((record, index) => {
    console.log(`Record ${index}:`, record);

    // Access the properties directly from the record
    const year = record.year || "N/A";
    const semester = record.semester || "N/A";
    const program = record.the_programs || "N/A";
    const nationality = record.nationality || "N/A";
    const colleges = record.colleges || "N/A";
    const numberOfStudents = record.number_of_students || "N/A";

    // Add a row to the table
    const row = document.createElement("tr");

    // Add columns for each data field
    row.innerHTML = `
      <td>${year}</td>
      <td>${semester}</td>
      <td>${program}</td>
      <td>${nationality}</td>
      <td>${colleges}</td>
      <td>${numberOfStudents}</td>
    `;

    tableBody.appendChild(row);
  });
}

// Call the fetch function on page load
fetchData();
