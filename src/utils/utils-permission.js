function colorMethod(method) {
    switch (method) {
        case "POST":
            return green[6];
        case "PUT":
            return orange[6];
        case "GET":
            return blue[6];
        case "DELETE":
            return red[6];
        default:
            return grey[10];
    }
}

function groupByPermission(data) {
    const groupedData = groupBy(data, x => x.module);
    return Object.keys(groupedData).map(key => {
        return { module: key, permissions: groupedData[key] };
    });
}