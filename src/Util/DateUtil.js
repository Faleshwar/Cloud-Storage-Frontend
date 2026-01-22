



export const getCurrentDate = function (dateTime) {
    const date = new Date(dateTime);
    const yy = date.getFullYear();
    const mm = (date.getMonth() + 1).toString().padStart(2, '0');
    const dd = date.getDate().toString().padStart(2, '0');

    const hh = date.getHours().toString().padStart(2, '0');
    const MM = date.getMinutes().toString().padStart(2, '0');
    const ss = date.getSeconds().toString().padStart(2, '0');
    return `${yy}-${mm}-${dd}T${hh}:${MM}:${ss}`;
}

