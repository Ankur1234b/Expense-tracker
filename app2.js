let expenses = localStorage.getItem("expenses") ? JSON.parse(localStorage.getItem('expenses')) : [];



document.addEventListener('DOMContentLoaded', function () {
    // let submitButton = document.querySelector(".vk51 button");
    let expencestablebodyyy = document.getElementById("expences-table-bodyyy");
    let expencestablebodyyyy = document.getElementById("expences-table-bodyyyy");
    
    // let total = document.getElementById("com38")
    let submitbutton= document.getElementById("vk99");
    

    function displayExpenses() {
        expencestablebodyyy.innerHTML = "";
        expencestablebodyyyy.innerHTML = "";
        let totalCredit = 0;
        let totalDebit = 0;
        expenses.forEach(function (expense,index) {
            let row1;
            if (expense.type === "credit") {
                row1 = expencestablebodyyy.insertRow();
                totalCredit += parseFloat(expense.amount);
            } else {
                row1 = expencestablebodyyyy.insertRow();
                totalDebit += parseFloat(expense.amount);
            }
            row1.innerHTML = '<td>' + expense.amount + '</td>' +
                '<td>' + expense.reason + '</td>' +
                '<td>' + expense.date + '</td>' +
                // '<td><input value="" type="checkbox" id="checkbox"></td>'   ;
                // `<td><input  type="checkbox" id="checkbox" checked></td>`;
                '<td><input type="checkbox" id="checkbox' + index + '" checked></td>'; // Unique ID for each checkbox

        });
        expenses.forEach(function (expense, index) {
            let checkbox = document.getElementById("checkbox" + index);
           
            // checkbox.addEventListener("change", function() {
                submitbutton.addEventListener("click", function() { 
                if (!checkbox.checked) {
                    // console.log("checkbox is false");
                    expense.validation = false; // Set validation to false for the corresponding expense
                    // console.log(expense);
                    
                    localStorage.setItem('expenses', JSON.stringify(expenses));
                } else {
                    // console.log("checkbox is true");
                    expense.validation = true; // Set validation to true for the corresponding expense
                    // console.log(expense);
                    localStorage.setItem('expenses', JSON.stringify(expenses));
                }
                
            });
        });
        
   
    }
    
// Function to filter and display expenses based on the selected start date
function filterExpensesByDate() {
    // Get the selected start date
    var selectedStartDate = new Date(document.getElementById("com58").value);
    
    // Filter expenses based on the selected start date
    var filteredExpenses = expenses.filter(function(expense) {
        // Convert expense date to Date object
        var expenseDate = new Date(expense.date);
        // Check if the expense date is greater than or equal to the selected start date
        // return expenseDate > selectedStartDate;
        return expenseDate.getTime() === selectedStartDate.getTime();
      
    });
  
    // Display filtered expenses
    displayFilteredExpenses(filteredExpenses);
  }
  
  // Function to display filtered expenses
  function displayFilteredExpenses(filteredExpenses) {
    // Clear the table body
    expencestablebodyyy.innerHTML = "";
    expencestablebodyyyy.innerHTML = "";
  
    // Iterate over filtered expenses and display them
    filteredExpenses.forEach(function(expense) {
       var  row;
        if (expense.type === "credit") {
            row = expencestablebodyyy.insertRow();
        } else {
            row = expencestablebodyyyy.insertRow();
        }
        row.innerHTML = '<td>' + expense.amount + '</td>' +
                        '<td>' + expense.reason + '</td>' +
                        '<td>' + expense.date + '</td>' +
                    
                        // '<td><input value="" type="checkbox" id="checkbox"></td>';
                        '<td><input value="" type="checkbox" id="checkbox" checked></td>';
                        
    });
  }
  

  // Event listener for the START date input field change
  document.getElementById("com58").addEventListener("change", function() {
    // Filter and display expenses based on the selected start date
    filterExpensesByDate();
  });
 
    localStorage.setItem('expenses', JSON.stringify(expenses));
    window.onload = function () {
        displayExpenses();
        resetCheckboxes();
    };
   
 

   
    function resetCheckboxes() {
        expenses.forEach(function(expense, index) {
            let checkbox = document.getElementById("checkbox" + index);
            if (expense.validation === false) {
                checkbox.checked = false;
            }
        });
    }

 
    
});
