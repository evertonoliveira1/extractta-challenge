# VehicleTable Component

The `VehicleTable` component displays a list of vehicles with sorting, pagination, and action buttons. It uses Material-UI components for a clean and responsive design.

## Features

- **Sorting:**  
  Click on column headers to sort the table data in ascending or descending order.

- **Pagination:**  
  Navigate through pages and adjust the number of rows per page with `TablePagination`.

- **Actions:**  
  Each row includes buttons for editing and deleting vehicles.

## Props

- **`vehicles`** (`Vehicle[]`):  
  Array of vehicle objects to be displayed in the table.

- **`total`** (`number`):  
  Total number of vehicle records.

- **`page`** (`number`):  
  Current page number.

- **`rowsPerPage`** (`number`):  
  Number of rows to display per page.

- **`onChangePage`** (`(event: unknown, newPage: number) => void`):  
  Callback for handling page changes.

- **`onChangeRowsPerPage`** (`(event: React.ChangeEvent<HTMLInputElement>) => void`):  
  Callback for handling changes in the number of rows per page.

- **`onEdit`** (`(vehicle: Vehicle) => void`):  
  Callback for handling vehicle edits.

- **`onDelete`** (`(id: string) => void`):  
  Callback for handling vehicle deletions.

## Head Cells

- **`title`**: Vehicle title.
- **`brand`**: Vehicle brand.
- **`vehicleModel`**: Vehicle model.
- **`year`**: Vehicle year.
- **`price`**: Vehicle price.
- **`licensePlate`**: Vehicle license plate.
- **`color`**: Vehicle color.
- **`renavam`**: Vehicle RENAVAM (registration number).

## Usage

```jsx
<VehicleTable
  vehicles={vehicles}
  total={total}
  page={page}
  rowsPerPage={rowsPerPage}
  onChangePage={handleChangePage}
  onChangeRowsPerPage={handleChangeRowsPerPage}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
