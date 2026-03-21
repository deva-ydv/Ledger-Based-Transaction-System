# 💰 Ledger-Based Transaction System

🔗 **Live Demo:** https://banksystem.devadeveloper.in/

A production-ready backend system simulating real-world banking infrastructure using **ledger-based accounting** and **MongoDB transactions**.

---

## 🚀 Deployment

Deployed a Dockerized Node.js application on **AWS EC2** using:
- Docker & Docker Compose
- Nginx reverse proxy
- Custom domain
- HTTPS (Let's Encrypt)

---

## ✨ Features

- Secure money transfer between accounts
- Ledger-based balance calculation (no direct balance storage)
- Double-entry accounting system (DEBIT/CREDIT)
- MongoDB ACID transactions for atomic operations
- Idempotency support to prevent duplicate transactions
- JWT Authentication with token blacklisting
- Email notifications for transactions
- Transaction status tracking (PENDING, COMPLETED, FAILED, REVERSED)
- RESTful API architecture

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Nodemailer
- Zod (Validation)
- Cookie-parser
- Docker

---

## 🧠 Architecture Overview

Instead of storing balance directly, the system calculates balance from ledger entries:

DEBIT - 1000
CREDIT + 500
Balance = -500



### ✅ Benefits:
- Prevents balance corruption
- Maintains complete transaction history
- Enables auditing
- Ensures financial integrity

---

## 🔄 Transaction Flow

1. Validate request  
2. Check idempotency key  
3. Start MongoDB session  
4. Create PENDING transaction  
5. Create DEBIT entry  
6. Create CREDIT entry  
7. Mark transaction COMPLETED  
8. Commit transaction  

---

## ⚙️ Installation

## 🐳 Run Locally (Docker)

```bash
git clone https://github.com/deva-ydv/Ledger-Based-Transaction-System.git
cd Ledger-Based-Transaction-System

docker-compose up -d --build
