# Invoice Management System

This project is an **Invoice Management System** built with **Angular 18** for the frontend and **NestJS** for the backend. The system allows users to create, search, filter, and manage invoices, with a focus on responsive views (full screen and half screen) and export functionality to PDF.

## Features

- **Invoice Listing**: View a list of invoices with details like customer name, amount, status, and date.
- **Filtering and Searching**: Search invoices by customer name or description, and filter them by date range.
- **Full View / Half View Toggle**: Switch between full screen and half screen views.
- **PDF Export**: Export invoice details as a PDF.
- **REST API**: Backend service to create, retrieve, and search invoices using **NestJS**.
- **Form Validation**: All forms are validated using `class-validator` for backend validation.

## Installation

### Prerequisites
- **Node.js** (version 16.x or above)
- **Angular CLI** (version 18 or above)
- **NestJS CLI**
- **MongoDB** (or any other database supported by NestJS)
- **npm** (version 8.x or above)

### Frontend (Angular)

1. Clone the repository:
   ```bash
   git clone https://github.com/yossilu/invoice-management-system.git
   cd invoice-management-system/frontend
2. Install dependencies:
    npm install
3. Start the Angular development server:
   ng serve
The frontend will be available at http://localhost:4200.

### Backend (NestJS)

1.Navigate to the backend folder:
cd ../backend

2.Install dependencies:
npm install

3.Start the NestJS backend server:
npm run start
The backend API will be available at http://localhost:3000.

## API Endpoints
### GET /invoices
Retrieve all invoices, with optional filters (searchText, startDate, endDate).
GET http://localhost:3000/invoices

Query Params:
- searchText: Filter invoices by customer name or description.
- startDate: Filter invoices by the starting date.
- endDate: Filter invoices by the ending date.

### GET /invoices/:id
Retrieve a specific invoice by ID.
GET http://localhost:3000/invoices/:id

### Search Invoices
URL: GET /invoices
Description: Fetch all invoices based on filter criteria.
Query Parameters:
- customerName: Filter invoices by customer name (optional).
- startDate: Filter invoices starting from this date (optional).
- endDate: Filter invoices up to this date (optional).
- Response: Returns an array of filtered invoices.

Example:
GET http://localhost:3000/invoices?customerName=Stark&startDate=2023-07-01&endDate=2023-07-

### Project Structure
.
├── frontend               # Angular frontend
│   ├── src
│   │   ├── app
│   │       ├── components # Header, Invoice List, Invoice Detail, etc.
│   │       ├── services   # InvoiceService, ViewStateService
│   │      
├── backend                # NestJS backend
│   ├── src
│   │   ├── invoices       # Invoice modules, services, controllers
│   │   ├── dto            # DTOs for validation
│   │   └── models         # Invoice schema and interface
└── README.md              # Project documentation

Exporting Invoice as PDF
The frontend allows exporting invoice details as a PDF using html2canvas and jsPDF.

To use this feature:

1. View the invoice details by selecting an invoice.
2. Click on the export button to generate and download the PDF.


