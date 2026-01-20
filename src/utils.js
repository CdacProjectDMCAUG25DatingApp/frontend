export const utils = {
    urlConverter: (url) => {
        return `http://localhost:4000/profilePhotos/${url}`
    },
    dataURLtoFile: async (id, canvas) => {
        canvas.toBlob((blob) => {
            const file = new File([blob], `image${id}.png`, { type: blob.type });
            console.log(file)
            setImg((prev) => ({
                ...prev,
                [`img${id}`]: file
            }))
            console.log(img)
        })
    },
    urlToFile: async (url, fileName) => {
        try {
            // 1. Fetch the data from the URL
            const response = await fetch(url);

            // 2. Convert the response into a Blob
            const blob = await response.blob();

            // 3. Create a File object from the Blob
            // The type is automatically inherited from the Blob's MIME type
            return new File([blob], `image${fileName}`, { type: blob.type });
        } catch (error) {
            console.error("Conversion failed:", error);
        }
    },
}