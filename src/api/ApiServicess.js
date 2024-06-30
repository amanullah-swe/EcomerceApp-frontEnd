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

        // Check if the response is ok (status in the range 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the response JSON
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
