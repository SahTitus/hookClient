import { useState } from "react";

async function readDataUrl(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		// async event handlers
		reader.onload = (e) => resolve(reader.result);
		reader.onerror = (e) => reject(reader.error);
		reader.readAsDataURL(file);
	});
}

const useUpload = () => {
	const [image, setImage] = useState(null);

	const handleOnChangeImageInput = (e) => {
		const target = e.currentTarget;
		const file = target.files.item(0);

		if (!file.type.startsWith("image/")) {
			alert("Hehehe 😆 file is not an image");
			return;
		}

		readDataUrl(file).then((dataUrl) => {
			setImage(dataUrl);
		});
	};

	const clearImage = (e) => {
		e.preventDefault();
		setImage("");
	};

	const emptyImg = () => setImage("");

	return {
		image,
		clearImage,
		emptyImg,
		handleOnChangeImageInput,
	};
};

export default useUpload;
