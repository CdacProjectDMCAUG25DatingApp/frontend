export const utils = {
    urlConverter: (url) => {
        return `http://localhost:4000/profilePhotos/${url}`;
    },

    dataURLtoFile: (id, canvas, setImg) => {
        canvas.toBlob(
            (blob) => {
                if (!blob || blob.size === 0) {
                    console.error("Blob creation failed — canvas is invalid");
                    return;
                }

                const file = new File([blob], `image${id}.jpg`, {
                    type: "image/jpeg",
                });

                setImg((prev) => ({
                    ...prev,
                    [`img${id}`]: file,
                }));
            },
            "image/jpeg",
            0.95
        );

    },

    urlToFile: async (url, fileName) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            return new File([blob], fileName, { type: blob.type });
        } catch (error) {
            console.error("Conversion failed:", error);
        }
    },
};
