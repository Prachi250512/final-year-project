# 🕉️ Shree Sidhivinayak – Bhakti Essentials Hub

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

> A comprehensive, modern full-stack web application serving as both an authentic **Hindu Devotional & Informational Hub** and a localized **E-Commerce Portal for Pooja Essentials**.

---

## Table of Contents
- [Overview](#-overview)
- [Core Features](#-core-features)
- [Tech Stack Architecture](#-tech-stack-architecture)
- [Database Schema (ERD)](#-database-schema-erd)
- [Local Development Setup](#-local-development-setup)
  - [Prerequisites](#1-prerequisites)
  - [Database Configuration](#2-database-configuration)
  - [Backend Setup (Spring Boot)](#3-backend-setup-spring-boot)
  - [Frontend Setup (React / Vite)](#4-frontend-setup-react--vite)
- [Operational & Fulfillment Policy](#-operational--fulfillment-policy)
- [Future Scope (v2.0)](#-future-scope-v20)

---

##  Overview

**Shree Sidhivinayak – Bhakti Essentials Hub** bridges the gap between digital spiritual guidance and the physical procurement of ritualistic items. Designed for modern devotees, it offers high-accuracy panchang tracking, ritual manuals, and a seamless storefront to purchase standard or customized Pooja Samagri kits.

To ensure immediate operational feasibility and maintain a strong connection with the local community, the platform operates strictly on an **In-Store Pick-Up** fulfillment model.

---

##  Core Features

###  1. Devotional & Informational Hub
* **Interactive Hindu Calendar:** Dynamic month-view tracking major festivals, *Ekadashis*, *Sankashtis*, and *Purnimas*.
* **Auspicious Muhurat Engine:** Displays precise, verified timeframes for conducting household rituals.
* **Ritual & Vrat Guides:** Step-by-step verified procedures for traditional domestic poojas.
* **Digital Devotional Library:** High-legibility, structured lyrics for standard *Aartis*, *Chalisas*, and *Bhajans*.
* **Daily Spiritual Feed:** A dynamic daily banner serving sacred *Shlokas* and philosophical quotes.

###  2. E-Commerce Storefront
* **Curated Pooja Kits:** Pre-packaged standard kits for major milestones (*Satyanarayan Pooja*, *Laxmi Poojan*, *Vastu Shanti*, *Ganesh Chaturthi*).
* **Custom Kit Builder:** Allows users to hand-pick individual *Samagri* items to generate custom ritual packages.
* **Cart & Wishlist:** Persistent session storage allowing users to plan item checklists well in advance of their family pooja dates.

###  3. Secure Checkout & Fulfillment
* **Fulfillment:** Dedicated **In-Store Pick-Up** slot reservation.
* **Payments:** Zero-friction **UPI QR code generation** at the counter or traditional **Cash on Pick-Up**.

---

##  Tech Stack Architecture

| Layer | Technology | Purpose / Description |
| :--- | :--- | :--- |
| **Frontend** | React.js (v18) + TypeScript | Component-driven UI built for strict client-side type safety |
| **Bundler / Styling** | Vite + Tailwind CSS | Lightning-fast HMR compilation paired with utility-first responsive styling |
| **Backend API** | Java 17 + Spring Boot 3.x | Scalable, robust RESTful API architecture handling core business logic |
| **Security** | Spring Security + JWT | Stateless, encrypted token-based user authentication and role authorization |
| **Database** | MySQL Server | ACID-compliant relational data persistence |
| **HTTP Client** | Axios | Interceptor-driven API calls bridging React to the Spring backend |

---

##  Database Schema (ERD)

The system relies on a tightly coupled, highly normalized 4-table relational architecture:

```text
+-------------------+             +-------------------+
|       USERS       |             |      ORDERS       |
+-------------------+             +-------------------+
| PK  id            |<------------| FK  username      |
|     name          |   1     N   | PK  id            |
|     email (UQ)    |             |     order_date    |
|     password      |             |     total_amount  |
|     role          |             |     pickup_slot   |
+-------------------+             +-------------------+
                                            |
                                          1 |
                                            | N
+-------------------+             +-------------------+
|      PRODUCT      |             |    ORDER_ITEMS    |
+-------------------+             +-------------------+
| PK  id            |   1     N   | PK  id            |
|     name          |<------------| FK  product_id    |
|     price         |             | FK  order_id      |
|     stock         |             |     quantity      |
|     category      |             |                   |
+-------------------+             +-------------------+
```

---

##  Local Development Setup

Follow these instructions to get a working copy of the project running on your local machine.

### 1. Prerequisites
* **Java Development Kit (JDK):** Version 17 or higher
* **Node.js:** v18.0.0+ (with `npm` or `yarn`)
* **MySQL Server:** v8.0+
* **IDE:** IntelliJ IDEA (Backend) / VS Code (Frontend)

### 2. Database Configuration

Log into your local MySQL instance and provision the database:

```sql
CREATE DATABASE IF NOT EXISTS shree_sidhivinayak_db;
USE shree_sidhivinayak_db;
```
*(Note: Tables will be automatically generated upon backend boot via Spring Data JPA).*

### 3. Backend Setup (Spring Boot)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Open `src/main/resources/application.properties` and verify your local SQL credentials:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/shree_sidhivinayak_db
   spring.datasource.username=root
   spring.datasource.password=YOUR_MYSQL_PASSWORD

   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true

   # Base64 Encoded 256-bit JWT Secret
   app.jwt.secret=4f2c8d3b7a1e6f45c8a0b3f2e5d8c1a4f7b0e9d2c5f8a3b6e9d1c4f7b0e2d5a9
   app.jwt.expiration-ms=86400000
   ```
3. Compile and execute the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```
   *The REST API will initialize on `http://localhost:8080`.*

### 4. Frontend Setup (React / Vite)

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the required Node dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file at the root of the frontend folder:
   ```env
   VITE_API_BASE_URL=http://localhost:8080/api/v1
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *Open your browser and navigate to `http://localhost:8081`.*

---

## 📌 Operational & Fulfillment Policy

* **Order Holding:** Packaged Pooja kits are held at the physical store counter for a maximum of **48 hours** past the requested pick-up window. Unclaimed kits automatically dissolve, returning items to the active `product.stock` pool.
* **Custom Kit Thresholds:** A custom-built kit requires a minimum selection of **3 distinct items** to qualify for custom box packaging.

---

## 🔮 Future Scope (v2.0)

1. **Hyper-Local Home Delivery:** API integration with third-party local courier services (e.g., Dunzo/Shadowfax) to offer a 5–7 km delivery radius.
2. **Pandit Booking Portal:** An expansion of the devotional hub allowing users to view verified local Pandits, check their availability, and book them directly for domestic rituals.
3. **Vernacular Localization:** Adding an instant language toggle to render Aarti/Bhajan texts in **Marathi** and **Hindi**.

***

<p align="center">
   <i>Designed & Built with devotion for the community. 🙏</i>
</p>