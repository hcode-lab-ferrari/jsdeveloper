import Cropper from "cropperjs";

const page = document.querySelector("#change-photo") as HTMLElement;

if (page) {

    let cropper: Cropper | null = null;
    const imageElement = page.querySelector("#photo-preview") as HTMLImageElement;
    const buttonElement = page.querySelector(".choose-photo") as HTMLButtonElement;
    const inputFileElement = page.querySelector("#file") as HTMLInputElement;
    const form = imageElement.closest("form") as HTMLFormElement;
    const btnSubmit = form.querySelector("[type=submit]") as HTMLButtonElement;

    form.addEventListener("submit", e => {

        e.preventDefault();

        if (cropper) {

            form.classList.remove("cropping");

            btnSubmit.disabled = true;
            btnSubmit.innerHTML = "Salvando...";

            imageElement.src = cropper.getCroppedCanvas().toDataURL("image/png");

            cropper.getCroppedCanvas().toBlob(blob => {

                console.log(blob);

                cropper?.destroy();

            });

        }

    });

    imageElement.addEventListener("click", () => {

        inputFileElement.click();

    });

    buttonElement.addEventListener("click", () => {

        inputFileElement.click();

    });

    inputFileElement.addEventListener("change", e => {

        const input = e.target as HTMLInputElement;

        if (input.files && input.files.length) {

            const file = input.files[0];

            const reader = new FileReader();

            reader.onload = () => {

                if (reader.result) {

                    imageElement.src = reader.result as string;

                    form.classList.add("cropping");

                    cropper = new Cropper(imageElement, {
                        aspectRatio: 1 / 1
                    });

                }

            }   

            reader.readAsDataURL(file);

            input.value = "";

        }

    });

}