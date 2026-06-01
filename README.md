# Payments Backend

A mini Paytm-style wallet application where users can sign up, authenticate, check their account balance, search for other users, and transfer money securely between accounts.

## Features

* User Signup & Signin
* JWT-based Authentication
* View Account Balance
* Search Users
* Transfer Money Between Users
* MongoDB Transactions for Safe Transfers

---

## Project Structure

### Backend

```text
backend/
├── config.js
├── db.js
├── index.js
├── middleware.js
└── routes/
    ├── user.js
    ├── account.js
    └── index.js
```

As per the assignment requirements, all business logic is implemented directly inside the route files (`user.js` and `account.js`). No separate controllers, services, or models folders are used.

---

## User Flow

```text
Signup
   ↓
Signin
   ↓
View Balance
   ↓
Search Users
   ↓
Transfer Money
   ↓
Updated Balance
```

---

## Database Design

### User Collection

```json
{
  "username": "shubham",
  "password": "hashed-password",
  "firstName": "Shubham",
  "lastName": "Singh"
}
```

### Account Collection

```json
{
  "userId": "userObjectId",
  "balance": 10000
}
```

When a new user signs up:

1. A new document is created in the `User` collection.
2. A corresponding document is created in the `Account` collection.
3. The account is initialized with a random balance.

---

## Authentication

### Signup

**POST** `/api/v1/user/signup`

Creates a new user account and an associated wallet account.

### Signin

**POST** `/api/v1/user/signin`

Authenticates the user and returns a JWT token.

### JWT Middleware

Protected routes use middleware to verify the token.

```js
req.userId = decoded.userId;
```

This allows the backend to identify the authenticated user for every protected request.

---

## Account APIs

### Get Balance

**GET** `/api/v1/account/balance`

Returns the current balance of the logged-in user.

Example:

```json
{
  "balance": 5000
}
```

Implementation:

```js
Account.findOne({
  userId: req.userId,
});
```

---

## User Search

Users can search for other users before sending money.

### Endpoint

**GET** `/api/v1/user/bulk?filter=shu`

### Response

```json
[
  {
    "_id": "123",
    "firstName": "Shubham",
    "lastName": "Singh"
  }
]
```

The API returns users whose names match the provided filter.

---

## Money Transfer

### Endpoint

**POST** `/api/v1/account/transfer`

### Request Body

```json
{
  "to": "receiverUserId",
  "amount": 100
}
```

### Transfer Flow

1. Identify sender using `req.userId`
2. Find sender account
3. Find receiver account
4. Validate sufficient balance
5. Deduct amount from sender
6. Add amount to receiver
7. Commit MongoDB transaction

This ensures transfers are atomic and prevents inconsistent balances.

---

## Summary

This project is a simplified digital wallet application inspired by Paytm. Users can create accounts, authenticate securely, view balances, search for other users, and transfer money with transaction safety using MongoDB transactions.
