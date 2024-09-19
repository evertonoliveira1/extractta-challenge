# VehicleForm Component Documentation

## Overview
The `VehicleForm` component is a form used to register or edit vehicle data. It provides input fields for title, brand, model, year, color, price, license plate, and RENAVAM. It handles input changes and form submission while formatting certain fields like RENAVAM and license plate.

## Props
- **formData (Vehicle):**  
  - The current state of the vehicle form data, which is displayed in the input fields. (Required)
- **onFormChange (function):**  
  - Callback function triggered when an input field value changes. It updates the form data state with the new value. (Required)
  - Parameters:
    - `name` (string): Name of the field.
    - `value` (any): Updated value for the field.
- **onSubmit (function):**  
  - Function triggered when the form is submitted. Typically used to send the form data to an API or handle validation. (Required)

## Functionalities
- **Input Fields:**
  - The form includes various fields such as title, brand, model, year, color, price, license plate, and RENAVAM.
  - Uses `TextFieldWithLabel` for text input and `SelectWithLabel` for dropdowns.
  - Price field accepts only numeric input.
- **License Plate & RENAVAM Formatting:**
  - The license plate and RENAVAM fields automatically format the input using the `formatLicensePlate` and `formatRenavam` utility functions.
  - The license plate input is restricted to a maximum of 8 characters.

## Structure
- The form is laid out using Material-UI's `Grid` system for a responsive design.
- Each field is placed inside a `Grid` item for easy adjustment across various screen sizes.
- The `Button` component is used for form submission, styled as a contained primary button.

## Code Example
```tsx
<form onSubmit={onSubmit}>
  <Grid container spacing={2}>
    <Grid item xs={12} md={6}>
      <TextFieldWithLabel
        name="title"
        label="Título"
        value={formData.title}
        onChange={event => onFormChange('title', event.target.value)}
        required
      />
    </Grid>
    <!-- Additional form fields here -->
    <Grid item xs={12}>
      <Button variant="contained" color="primary" type="submit">
        Registrar
      </Button>
    </Grid>
  </Grid>
</form>
