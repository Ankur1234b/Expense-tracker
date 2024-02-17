

let amountInput = document.getElementById("ss3");
        let reasonInput = document.getElementById("ss4");
        let submitButton = document.getElementById("vk50");
        let expencestablebody = document.getElementById("expences-table-body");
        let expencestablebodyy = document.getElementById("expences-table-bodyy");
      
        let selectOption = document.getElementById("com50");
        let sdate = document.getElementById("com56");
        let edate = document.getElementById("com57");
        let selectors= document.getElementById("com50");
        let expenses = localStorage.getItem("expenses") ? JSON.parse(localStorage.getItem('expenses')) : [];
     
   

        // Function to display expenses
        function displayExpenses() {
            expencestablebody.innerHTML = "";
            expencestablebodyy.innerHTML = "";
        
            let totalCredit = 0;
            let totalDebit = 0; 
            expenses.forEach(function(expense) {
                var row1;
               
                 if(expense.type === "credit") {
                    row1 = expencestablebody.insertRow();
                    totalCredit += parseFloat(expense.amount); 
                    
                } else {
                    row1 = expencestablebodyy.insertRow();
                    totalDebit += parseFloat(expense.amount);
                }
                if(expense.validation === false) {
                    row1.classList.add("underline");
                } else {
                    row1.classList.remove("underline");
                }
                row1.innerHTML = '<td>' + expense.amount + '</td>' +
                                '<td>' + expense.reason + '</td>' +
                                '<td>' + expense.date + '</td>' +
                                // '<td><button class="edit-btn">Edit</button></td>'; // Add edit button
                                `<td><button class="edit-btn" data-index="${expenses.indexOf(expense)}">Edit</button></td>`;
                                
                                

                             
                                
         });
         
          // Calculate the difference between totalDebit and totalCredit
    let difference = totalCredit-totalDebit;

    // Display the difference in the element with id "com38"
    if(difference>0 ){
    document.getElementById("com38").innerText = "₹" + difference.toFixed(2); // Displaying with two decimal places
    }
         

        }



  
        // Add event listener to submit button
        submitButton.addEventListener("click", function(){
        
            if(amountInput.value===""){
                // alert("please fill the Amount")
                return;
             }

             if((amountInput.value)<=0){
                alert("please fill the positive Amount")
                return;
             }
             if(reasonInput.value===""){
                // alert("please fill the reason")
                return;
             }
             if(selectOption.value===""){
              alert("please fill the reason")
              return;
           }
        //    if(dat===""){
        //     alert("please fill the reason")
        //     return;
        //  }
         
         // Create a new Date object
var currentDate = new Date();

// Get the current date components
var year = currentDate.getFullYear();
var month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Month starts from 0, so add 1
var day = ('0' + currentDate.getDate()).slice(-2);

// Concatenate the components into the "yyyy-mm-dd" format
var dat = year + '-' + month + '-' + day;

// Output the formatted date
// console.log(formattedDate); // Example output: "2024-02-16"


            let obj = {
                type: selectOption.value,
                amount:amountInput.value ,
                reason: reasonInput.value,
                date: dat,
                validation:true
                
            };
 

             
   
  


            expenses.push(obj);
            localStorage.setItem('expenses', JSON.stringify(expenses));

            displayExpenses(); // Display expenses after adding new one
        
        // document.getElementById("ss3").value = "";
        // document.getElementById("ss4").value = "";
        
        });
        
        function showEditModal(selectedExpense, index) {
          // console.log("ankur")
          // Create a modal and populate it with the selected expense details
          const modalContent = `
            <label for="editAmount">Amount:</label>
            <input type="number" id="editAmount" value="${selectedExpense.amount}">
            <br>
            <label for="editDescription">Description:</label>
            <textarea id="editDescription">${selectedExpense.reason}</textarea>
            <br>
            
            
            
            <button id="saveEditBtn">Save Changes</button>
          `;
          // console.log(modalContent);
        
          const modal = document.createElement('div');
          // console.log(modal);
          modal.classList.add('modal');
          modal.innerHTML = modalContent;
          // console.log(modal);
        
          // Append the modal to the body
          document.body.appendChild(modal);
        
          // Add event listener for the "Save Changes" button
          document.getElementById('saveEditBtn').addEventListener('click', function () {
            // Update the selected expense with the edited values
            selectedExpense.amount = document.getElementById('editAmount').value;
            selectedExpense.reason= document.getElementById('editDescription').value;
            // selectedExpense.date= document.getElementById('dateedit').value;
        
            // Update the expenses array in localStorage
            localStorage.setItem("expenses", JSON.stringify(expenses));
        
            // Remove the modal from the DOM
            document.body.removeChild(modal);
        
            // Update the table on the screen
            displayExpenses(); // Assuming you have a function to display expenses
          });
        }
        
        document.body.addEventListener('click', function (event) {
          if (event.target.classList.contains('edit-btn')) {
            const index = event.target.getAttribute('data-index');
            const selectedExpense = expenses[index];
            
            // Show the pop-up modal
            showEditModal(selectedExpense, index);
          }
        });
       
      
        
        
        
      
          
          
        // Display expenses when the page loads
        window.onload = function() {
            displayExpenses();
        };
 


// Function to filter and display expenses based on the selected date range
function filterExpensesByDate() {
  // Get the selected start date and end date
  var startDate = document.getElementById("com56").value;
  var endDate = document.getElementById("com57").value;

  // Convert start date and end date strings to Date objects
  var start = new Date(startDate);
  var end = new Date(endDate);

  // Filter expenses based on the selected date range
  var filteredExpenses;

  if (startDate && endDate) {
      // Both start date and end date are selected
      filteredExpenses = expenses.filter(function(expense) {
          var expenseDate = new Date(expense.date);
          return expenseDate >= start && expenseDate <= end;
      });
  } else if (startDate) {
      // Only start date is selected
      filteredExpenses = expenses.filter(function(expense) {
          var expenseDate = new Date(expense.date);
          return expenseDate >= start;
      });
  } else if (endDate) {
      // Only end date is selected
      filteredExpenses = expenses.filter(function(expense) {
          var expenseDate = new Date(expense.date);
          return expenseDate <= end;
      });
  } else {
      // No dates selected, display all expenses
      filteredExpenses = expenses;
  }

  // Display filtered expenses
  displayFilteredExpenses(filteredExpenses);
}

// Function to display filtered expenses
function displayFilteredExpenses(filteredExpenses) {
  // Clear the table body
  expencestablebody.innerHTML = "";
  expencestablebodyy.innerHTML = "";

  // Iterate over filtered expenses and display them
  filteredExpenses.forEach(function(expense) {
      var row;
      if (expense.type === "credit") {
          row = expencestablebody.insertRow();
      } else {
          row = expencestablebodyy.insertRow();
      }


    
      
      row.innerHTML = '<td>' + expense.amount + '</td>' +
                      '<td>' + expense.reason + '</td>' +
                      '<td>' + expense.date + '</td>' +
                      '<td><button class="edit-btn" data-index="' + expenses.indexOf(expense) + '">Edit</button></td>';
  });
}

// Event listeners for the START date and END date input fields
document.getElementById("com56").addEventListener("change", filterExpensesByDate);
document.getElementById("com57").addEventListener("change", filterExpensesByDate);
