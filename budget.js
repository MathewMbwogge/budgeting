console.log("");

// load session data, initialising the dropdown menu.
function myBudget() {
    let htmlSelect1 = document.getElementById("incomeList");
    let htmlSelect2 = document.getElementById("expenseList");
    let htmlSelect3 = document.getElementById("savingList");
    htmlSelect1.style.visibility = "hidden";
    htmlSelect2.style.visibility = "hidden";
    htmlSelect3.style.visibility = "hidden";
    
    // Check if the page has been loaded before.
    if (sessionStorage.getItem("hasCodeRunBefore") === null) {
        // initialise an empty array if the above is true.
        sessionStorage.setItem("incomes", JSON.stringify(incomes));
        sessionStorage.setItem("expenses", JSON.stringify(expenses));
        sessionStorage.setItem("savings", JSON.stringify(savings));
        sessionStorage.setItem("hasCodeRunBefore", true);
    } else {
        // retrieve the user array from storage.
        incomes = JSON.parse(sessionStorage.getItem("incomes"));
        expenses = JSON.parse(sessionStorage.getItem("expenses"));
        savings = JSON.parse(sessionStorage.getItem("savings"));
        
        let i = 0;
        
        // To add new incomes to the dropdown list and update the session storage, loop through the incomes array.
        incomes.forEach(function(income) {
            let optItem = document.createElement("option");
            // Display the name of each income sourcee in the dropdown.
            optItem.innerHTML = income.name;
            // Assign the index as the value for each option.
            optItem.value = i;
            i += 1;
            htmlSelect1.appendChild(optItem);
        });
        
        // Make income list visible if at least one income source already exists.
        if (i > 0) {
            htmlSelect1.style.visibility = "visible";
        }

        // To add new expenses to the dropdown list and update the session storage, loop through the expenses array.
        expenses.forEach(function(expense) {
            let optItem = document.createElement("option");
            // Display the name of each expense in the dropdown.
            optItem.innerHTML = expense.name;
            // Assign the index as the value for each option.
            optItem.value = i;
            i += 1;
            htmlSelect2.appendChild(optItem);
        });
                
        // Make expenses list visible if at least one expense type already exists.
        if (i > 0) {
            htmlSelect2.style.visibility = "visible";
        }

        // To add new savings to the dropdown list and update the session storage, loop through the savings array.
        savings.forEach(function(saving) {
            let optItem = document.createElement("option");
            // Display the amount of each saving in the dropdown.
            optItem.innerHTML = saving.name;
            // Assign the index as the value for each option.
            optItem.value = i;
            i += 1;
            htmlSelect3.appendChild(optItem);
        });
            
        // Make saving list visible if at least one saving type already exists.
        if (i > 0) {
            htmlSelect3.style.visibility = "visible";
        }
    }
}

// Define a function to manage creation of income objects.
function Income(name, amount, type) {
    // Define object properties.
    this.name = name;
    this.amount = amount;
    this.type = type;
}

// Create 5 different instances of income objects.
let income1 = new Income("Salary", 50000, "yes");
let income2 = new Income("Business", 30000, "yes");
let income3 = new Income("Freelance", 5000, "no");
let income4 = new Income("Stocks", 1500, "no");
let income5 = new Income("Youtube", 500, "no");

let incomes = [income1, income2, income3, income4, income5];

// Adding new income to the income array
function addIncome() {
    incomes = JSON.parse(sessionStorage.getItem("incomes"));

    // Create a new Income object using data from the form.
    let newIncome = new Income(
        document.getElementById("Name1").value,
        document.getElementById("Amount1").value,
        document.getElementById("Type1").value,
    );

    // Add the newly created Income objects to the income array.
    incomes.push(newIncome);

    // Save the updated income array to sessionStorage.
    sessionStorage.setItem("incomes", JSON.stringify(incomes));  
}

// Define an Expense function to manage creation of expense objects.
function Expense(name, amount, type) {
    // Define properties for the object.
    this.name = name;
    this.amount = amount;
    this.type = type;
}

// Create 5 differrnt instances of expents onjects.
let expense1 = new Expense("Groceries", 400, "no");
let expense2 = new Expense("Rents",2500, "yes");
let expense3 = new Expense("Car", 45000, "no");
let expense4 = new Expense("Charity", 500, "no");
let expense5 = new Expense("Investment", 10000, "no");

let expenses = [expense1, expense2, expense3, expense4, expense5];

// To add a new expense to the expense array and update session storage.
function addExpense() {
    expenses = JSON.parse(sessionStorage.getItem("expenses"));

    // Create a new Expense object using data from the form.
    let newExpense = new Expense(
        document.getElementById("Name2").value,
        document.getElementById("Amount2").value,
        document.getElementById("Type2").value,
    );

    // Add the new Income objects to the income array.
    expenses.push(newExpense);

    // Save the updated income array to sessionStorage.
    sessionStorage.setItem("expenses", JSON.stringify(expenses));

}

// Define a Savings function to handle creation of savings objects.
function Saving(name, amount, type) {
    // Define properties for the object.
    this.name = name;
    this.amount = amount;
    this.type = type;
}

// Add a new savings onject to the savings array
let saving1 = new Saving("Saving", 5000, "yes");

let savings = [saving1];

// To add a new saving to the savings array and update session storage.
function addSaving() {
    savings = JSON.parse(sessionStorage.getItem("savings"));

    // Create a new Savings object using data from the form.
    let newSaving = new Saving(
        document.getElementById("Name3").value,
        document.getElementById("Amount3").value,
        document.getElementById("Type3").value,
    );

    // Add the new Savings objects to the savings array.
    savings.push(newSaving);

    // Save the updated savings array to sessionStorage.
    sessionStorage.setItem("savings", JSON.stringify(savings));

}

// Handle the selection of an income from the dropdown and display its info.
function ChangeActiveIncome(indexOfIncomeObj) {
    // Add an info function to the selected Income object.
    incomes[indexOfIncomeObj].info = function() {
        // Define a function to handle whether the object attibute is a yes or no.
        if (this.type == "yes") {
            this.type = "recurring";
        } else {
            this.type = " a one-off";
        }
        // Display the income info with their name, amount, and type.
        alert(
            "The income from your" +
            " " +
            this.name +
            " " +
            " is £" +
            this.amount +
            ". This is " +
            this.type
        );
    };

    // Call the info method to display the selected income's information.
    incomes[indexOfIncomeObj].info();
}

// Handle the selection of an expense objective from the dropdown and display its info.
function ChangeActiveExpense(indexOfExpenseObj) {
    // Add an info function to the selected expense object.
    expenses[indexOfExpenseObj].info = function() {
        // Define a function to handle whether the object attibute is a yes or no.
        if (this.type == "yes") {
            this.type = "recurring";
        } else {
            this.type = " a one-off";
        }
        // Display the expense info with their name, amount, and type.
        alert(
            "The expense on your" +
            " " +
            this.name +
            " " +
            " is £" +
            this.amount +
            ". This is " +
            this.type
        );
    };

    // Call the info method to display the selected expense information.
    expenses[indexOfExpenseObj].info();
}

// Handle the selection of a savings object from the dropdown and display its info.
function ChangeActiveSaving(indexOfSavingObj) {
    // Add an info function to the selected Savings object.
    savings[indexOfSavingObj].info = function() {
        // Define a function to handle whether the object attibute is a yes or no.
        if (this.type == "yes") {
            this.type = "recurring";
        } else {
            this.type = " a one-off";
        }
        // Display the savings info with their name, amount, and type.
        alert(
            "Your current savings are " +
            " " +
            this.name +
            " " +
            " is £" +
            this.amount +
            ". This is " +
            this.type
        );
    };

    // Call the info method to display the selected savings information.
    savings[indexOfSavingObj].info();
}

// Display income objects to user using alert.
alert("Your current income sources are as follows: " + "\n"
    +
    income1.name + " = £" + income1.amount + ", Recurring: " + income1.type + "\n" 
    +
    income2.name + " = £" + income2.amount + ", Recurring: " + income2.type + "\n"
    +
    income3.name + " = £" + income3.amount + ", Recurring: " + income3.type + "\n"
    +
    income4.name + " = £" + income4.amount + ", Recurring: " + income4.type + "\n"
    +
    income5.name + " = £" + income5.amount + ", Recurring: " + income5.type + "\n"
    +
    "Total income = £" + (income1.amount + income2.amount + income3.amount + income4.amount + income5.amount) 
)

// Generate prompts to add income details.
let userInput1 = prompt("Add income source " + document.getElementById("Name1").value);
let userInput2 = Number(prompt("Add amount " + document.getElementById("Amount1").value));
let userInput3 = prompt("Is this recurring? " + document.getElementById("Type1").value);

// Create a new income object using the user input.
let newIncome = new Income(userInput1, userInput2, userInput3);
incomes.push(newIncome);

// Display expense objects to user using alert.
alert("Your current expenses are as follows: " + "\n"
    +
    expense1.name + " = £" + expense1.amount + ", Recurring: " + expense1.type + "\n" 
    +
    expense2.name + " = £" + expense2.amount + ", Recurring: " + expense2.type + "\n"
    +
    expense3.name + " = £" + expense3.amount + ", Recurring: " + expense3.type + "\n"
    +
    expense4.name + " = £" + expense4.amount + ", Recurring: " + expense4.type + "\n"
    +
    expense5.name + " = £" + expense5.amount + ", Recurring: " + expense5.type + "\n"
    +
    "Total expenses = £" + (expense1.amount + expense2.amount + expense3.amount + expense4.amount + expense5.amount) 
)

// Generate prompts to add expense details
let userInput4 = prompt("Add expense destination " + document.getElementById("Name2").value);
let userInput5 = Number(prompt("Add amount " + document.getElementById("Amount2").value));
let userInput6 = prompt("Is this recurring? " + document.getElementById("Type2").value);

// Create a new expense object using the user input.
let newExpense = new Expense(userInput4, userInput5, userInput6);
expenses.push(newExpense);

// Use forEach() loop to calculate total incomes and expenses.
let totalIncome = 0;
let totalExpenses = 0;

function disposableIncome() {
    for (i = 0; i < incomes.length; i++) {
        totalIncome += incomes[i].amount;
    }
    
    for (i = 0; i < expenses.length; i++) {
        totalExpenses += expenses[i].amount;
    }
    return totalIncome - totalExpenses;
}

// Render an alert to display user's disposable income.
alert("Your disposable income is = £" + (disposableIncome()));

// Generate prompts to add savings details.
let userInput7 = prompt("Add savings name " + document.getElementById("Name3").value);
let userInput8 = Number(prompt("Add savings amount " + document.getElementById("Amount3").value));
let userInput9 = prompt("Would you like this to be recurring? " + document.getElementById("Type3").value);

// Create a new savings object using the user input.
let newSaving = new Saving(userInput7, userInput8, userInput9);
savings.push(newSaving);

// Use a function to calculate user's income balance.
let totalSavings = 0;
function mySavings() {
    for (i = 0; i < savings.length; i++) {
        totalSavings += savings[i].amount;
    }
    return totalSavings;
}
alert ("Your total savings are £" + (mySavings()));
alert ("Your balance is £" + Number(((totalIncome) - (totalExpenses)) - (totalSavings)));

// Call myBudget() function to load session data.
myBudget();
console.log();
console.log("End of Code");
