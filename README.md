# Ledger-Based Transaction System
live at -> https://ledger-based-transaction-system.onrender.com/

A production-level backend system that simulates real-world banking transaction infrastructure using ledger-based accounting and MongoDB transactions.

## Features

- Secure money transfer between accounts
- Ledger-based balance calculation
- Double-entry accounting system (DEBIT/CREDIT)
- MongoDB ACID transactions for atomic operations
- Idempotency support to prevent duplicate transactions
- JWT Authentication
- Email notifications for transactions
- Transaction status tracking (PENDING, COMPLETED, FAILED, REVERSED)
- RESTful API architecture

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Nodemailer
- Zod Validation
- Cookie-parser

## Architecture Overview

Instead of storing balance directly, the system calculates balance from ledger entries:

Ledger Example:

DEBIT  - 1000  
CREDIT + 500  

Balance = -500

This ensures:

- No balance corruption
- Full transaction history
- Audit capability
- Financial integrity

## Transaction Flow

1. Validate request
2. Check idempotency key
3. Start MongoDB session
4. Create PENDING transaction
5. Create DEBIT entry
6. Create CREDIT entry
7. Mark transaction COMPLETED
8. Commit transaction

## Installation
npm install
