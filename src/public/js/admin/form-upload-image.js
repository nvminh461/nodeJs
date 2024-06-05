document.addEventListener('DOMContentLoaded', async () => {
    const imageContainer = document.getElementById('preview');
    const imageInput = document.getElementById('images');
    let files = [];

    // add delete button to existing images and set value for input file
    const checkImagesExist = () => {
        const images = document.querySelectorAll('#preview img');
        return images.length > 0;
    };

    const handleFileSelect = (event) => {
        const newFiles = Array.from(event.target.files);
        imageContainer.innerHTML = '';
        files = newFiles;
        displayImages(newFiles);
    };

    const displayImages = (files) => {
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imgContainer = document.createElement('div');
                imgContainer.className = 'image-container';
                const img = createImageElement(e.target.result);
                const deleteButton = createDeleteButton(file);
                imgContainer.appendChild(img);
                imgContainer.appendChild(deleteButton);
                imageContainer.appendChild(imgContainer);
            };
            reader.readAsDataURL(file);
        });
    };

    const createImageElement = (src) => {
        const img = document.createElement('img');
        img.src = src;
        img.style.maxWidth = '200px';
        img.style.maxHeight = '200px';
        return img;
    };

    const createDeleteButton = (file) => {
        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger';
        deleteButton.addEventListener('click', () => {
            const imgContainer = deleteButton.parentElement;
            imageContainer.removeChild(imgContainer);
            files = files.filter(f => f !== file);
            updateFileInput();
        });

        const trashIcon = document.createElement('i');
        trashIcon.className = 'fas fa-trash';
        deleteButton.appendChild(trashIcon);

        return deleteButton;
    };

    const updateFileInput = () => {
        const dataTransfer = new DataTransfer();
        files.forEach(file => dataTransfer.items.add(file));
        imageInput.files = dataTransfer.files;
    };

    imageInput.addEventListener('change', handleFileSelect);

    const images = document.querySelectorAll('#preview img');
    const deleteButtons = document.querySelectorAll('#preview button');

    async function getFileFromServer(url) {
        const response = await fetch(url);
        const data = await response.blob();
        return new File([data], url.split('/').pop(), {type: data.type});
    }

    const filesPromises = Array.from(images).map(async (img) => {
        deleteButtons.forEach((button, index) => {
            if (button.previousElementSibling === img) {
                button.addEventListener('click', () => {
                    const imgContainer = button.parentElement;
                    imageContainer.removeChild(imgContainer);
                    files = files.filter(f => f.name !== file.name);
                    updateFileInput();
                    // updateFileInputStatus();
                });
                const trashIcon = document.createElement('i');
                trashIcon.className = 'fas fa-trash';
                button.appendChild(trashIcon);
            }
        });
        const file = await getFileFromServer(img.src);
        return file;
    });

    files = await Promise.all(filesPromises);

    const dataTransfer = new DataTransfer();
    files.forEach(file => dataTransfer.items.add(file));
    imageInput.files = dataTransfer.files;
});
