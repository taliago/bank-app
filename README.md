#Personal Bank Account Manager – Angular Project

##Project Overview
This project is a personal bank account manager built with Angular and TypeScript. It allows users to simulate basic banking operations, manage transaction history, and update account details—all within a responsive, browser-based interface.

##Features
###Transaction Management

Users can perform transactions by entering the date, amount, and type (deposit or withdrawal).

Transactions are displayed in a dynamic table that includes: serial number, date, amount, type, resulting balance, and a delete button.

Negative balances are highlighted with red row backgrounds for easy visual identification.

If there are no transactions, a friendly yellow message is shown to the user.

###Real-Time Balance Calculation

The system automatically recalculates the account balance after each transaction.

A running balance is displayed alongside each transaction for full transparency.

###Data Persistence with Encryption

All transaction data and account information are stored in the browser’s localStorage.

AES encryption is used to securely store and retrieve data, ensuring user privacy and data integrity even after page reloads.

###Validation and Error Handling

All transaction inputs are validated:

Date must not be in the future and cannot precede the last transaction.

Amount must be a positive number.

A transaction type must be selected.

Invalid inputs trigger clear, context-aware error alerts.

###Branch Details Editor

Users can view and edit their bank branch name and number through a dedicated interface.

Other details like bank name and account number are displayed but locked from editing.

Updates are saved and persisted using encrypted local storage.

###Navigation and Routing

Uses Angular routing to navigate between the main account screen, transaction history, and branch editor.

Intuitive buttons and route links support smooth, user-friendly navigation.

###Polished UI with Angular Pipes

Angular currency and date pipes are used for properly formatting monetary values and dates.

Transaction types are displayed as readable text, not numeric codes.

Clean, readable table formatting enhances user experience.

##Technologies Used
Angular & TypeScript

HTML & CSS

LocalStorage with AES encryption

Angular Router & Forms

Angular Pipes for formatting
