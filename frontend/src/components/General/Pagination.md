# Pagination Component

The `Pagination` component is a wrapper around Material-UI's `TablePagination` to handle pagination controls for tables.

## Features

- **Page Controls:**  
  Allows users to navigate between pages of data.

- **Rows Per Page:**  
  Users can select how many rows to display per page.

## Props

- **`count`** (`number`):  
  Total number of items to be paginated.

- **`rowsPerPage`** (`number`):  
  Number of rows displayed per page.

- **`page`** (`number`):  
  Current page index.

- **`onPageChange`** (`(event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void`):  
  Callback function for page changes.

- **`onRowsPerPageChange`** (`(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void`):  
  Callback function for changes in rows per page.

## Usage

```jsx
<Pagination
  count={100}
  rowsPerPage={10}
  page={0}
  onPageChange={(event, newPage) => console.log('Page changed to:', newPage)}
  onRowsPerPageChange={(event) => console.log('Rows per page changed to:', event.target.value)}
/>
