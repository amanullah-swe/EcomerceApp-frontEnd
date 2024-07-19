export const handlePatchMultipartRequest = async (url, requestBody) => {
    try {
        const response = await fetch(url, {
            method: 'PATCH',
            body: requestBody, // Directly pass the FormData object
            credentials: "include",
            headers: {
                // Add necessary headers here
                // 'Authorization': 'Bearer YOUR_TOKEN' // Example header for authorization
                // Note: Do NOT set Content-Type header for multipart/form-data,
                // fetch API will set it automatically with the correct boundary
            },
        });
        // Parse the response JSON
        const data = await response.json();
        return data;
    } catch (error) {
        // console.error('Error:', error);
        throw error;
    }
};

export const handlePostMultipartRequest = async (url, requestBody) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: requestBody, // Directly pass the FormData object
            credentials: "include",
            headers: {
                // Add necessary headers here
                // 'Authorization': 'Bearer YOUR_TOKEN' // Example header for authorization
                // Note: Do NOT set Content-Type header for multipart/form-data,
                // fetch API will set it automatically with the correct boundary
            },
        });
        // Parse the response JSON
        const data = await response.json();
        return data;
    } catch (error) {
        // console.error('Error:', error);
        throw error;
    }
};


export const handleSimplePostCall = async (url, requestBody) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: requestBody, // Directly pass the FormData object
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // 'Authorization': 'Bearer YOUR_TOKEN' // Example header for authorization
                // Note: Do NOT set Content-Type header for multipart/form-data,
                // fetch API will set it automatically with the correct boundary
            },
        });
        // Parse the response JSON
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}


export const handleSimpleGetCall = async (url) => {
    try {
        const response = await fetch(url, {
            method: 'GET',
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                // 'Authorization': 'Bearer YOUR_TOKEN' // Example header for authorization
            },
        });
        // Parse the response JSON
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
