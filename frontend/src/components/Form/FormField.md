# FormField Component Documentation

## Overview
The `FormField` component is a customizable input field for forms, built using Material-UI's `TextField` component. It supports various field types and can be required or optional.

## Props
- **name (string):**  
  - The name of the input field. (Required)
- **label (string):**  
  - The label displayed above the input field. (Required)
- **value (string):**  
  - The current value of the input field. (Required)
- **onChange (function):**  
  - Callback function triggered when the input value changes. (Required)
- **fullWidth (boolean):**  
  - Specifies whether the input should take the full width of the container. Defaults to `true`.
- **required (boolean):**  
  - Marks the field as required if set to `true`. Defaults to `false`.
- **type (string):**  
  - The type of the input field (e.g., 'text', 'password', 'email'). Defaults to `'text'`.

## Functionalities
- Handles form inputs and triggers `onChange` events.
- Supports different input types and form field configurations.

## Styling
- Uses Material-UI's `TextField` with the `outlined` variant.
- Styled with margin-bottom (`mb: 2`) for spacing between fields.
