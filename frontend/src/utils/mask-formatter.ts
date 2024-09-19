export const formatRenavam = (value: string): string => {
    const cleanedValue = value.replace(/\D/g, '');
    return cleanedValue.substring(0, 11);
};

export const formatLicensePlate = (value: string): string => {
    const cleanedValue = value.replace(/[^a-zA-Z0-9]/g, '');

    const formattedValue = cleanedValue
        .substring(0, 3)
        .toUpperCase() + '-' +
        cleanedValue
            .substring(3, 7)
            .toUpperCase();

    return formattedValue;
};