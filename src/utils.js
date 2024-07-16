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