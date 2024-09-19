# VehicleFilters Component Documentation

## Overview
The `VehicleFilters` component provides a set of form inputs that allow users to filter vehicles by various criteria such as title, brand, model, year, color, price range, and other fields. It offers search and clear functionality with Material-UI components.

## Props
- **filters (VehicleFilter):**  
  - The current filter values that are displayed in the input fields. (Required)
- **modelOptions (Array<{ value: string, label: string }>):**  
  - A list of available vehicle models for the user to choose from. (Required)
- **onFilterChange (function):**  
  - Callback function triggered when any filter value is changed by the user. The event type can be from text fields or selects. (Required)
- **onSearch (function):**  
  - Function called when the search button is clicked to trigger the filtering action. (Required)
- **onClearFilters (function):**  
  - Function called when the clear button is clicked to reset all filter inputs. (Required)

## Functionalities
- **Filter Inputs:** Users can input or select values to filter vehicles by title, brand, model, year, color, price range, license plate, and RENAVAM.
- **Search:** The "Buscar" button triggers the `onSearch` function.
- **Clear Filters:** The "Limpar" button clears all input fields via the `onClearFilters` function.

## Structure
- The form is divided into a grid layout for responsive design using Material-UI's `Grid` component.
- Each field is either a `TextFieldWithLabel` for text input or a `SelectWithLabel` for dropdown options.
- The search and clear buttons are placed at the bottom, with `Search` and `Clear` icons for better UI experience.

## Styling
- Grid spacing of `2` is applied for consistent gaps between fields.
- Buttons are aligned at the bottom of the grid for easier access to search and clear actions.
