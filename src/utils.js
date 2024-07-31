export const isJsonString = (data) => {
    try {
        JSON.parse(data)
    } catch (error) {
        return false
    }
    return true
}

export const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

export const getItem = (key, label, icon, children, type) => {
    return {
        key,
        label,
        icon,
        children,
        type
    }
}

export const renderOptions = (arr) => {
    let result = []
    if (arr) {
        result = arr?.map((option) => {
            return {
                value: option,
                label: option
            }
        })
    }
    result.push({
        label: 'Thêm type',
        value: 'add_type'
    })
    return result
}

export const convertPrice = (price) => {
    try {
        const result  = price?.toLocaleString().replaceAll(',', '.')
        return `${result} VND`
    } catch (error) {
        return null
    }
}

export const convertInputPrice = (price) => {
    try {
        const result  = price?.replace(/[.,]/g, '')
        return result
    } catch (error) {
        return null
    }
}

export const formatDateTime = (dateString) => {
    const date = new Date(dateString);

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();

    return `${hours}:${minutes}:${seconds}-${month}/${day}/${year}`;
}
