const slider = [{ //array objetos (imagens e titulos)
    src: "./img/porto1.jpg",
    title: "Porto",
    active: true
},
{
    src: "./img/porto2.jpg",
    title: "Porto",
},
{
    src: "./img/lisboa1.jpg",
    title: "Lisboa"
},
{
    src: "./img/lisboa2.jpg",
    title: "Lisboa"
},
{
    src: "./img/braga1.jpg",
    title: "Braga"
},
{
    src: "./img/braga2.jpg",
    title: "Braga"
},
{
    src: "./img/douro1.jpg",
    title: "Douro"
},
{
    src: "./img/douro2.jpg",
    title: "Douro"
},
{
    src: "./img/geres1.jpg",
    title: "Gerês"
},
{
    src: "./img/geres2.jpg",
    title: "Gerês"
},
{
    src: "./img/açores1.jpg",
    title: "Açores"
},
{
    src: "./img/açores2.jpg",
    title: "Açores"
},
{
    src: "./img/madeira1.jpg",
    title: "Madeira"
},
{
    src: "./img/madeira2.jpg",
    title: "Madeira"
}
]


document.addEventListener("DOMContentLoaded", function (event) { //carregamento e posição zero
    renderThumbnails();

    changeSliderImage(slider[0].src, slider[0].title);
    document.querySelector(".row").scrollLeft = 0;
})

document.addEventListener("click", function (event) { // ao clicar
    if (event.target && event.target.id === "thumbnail-image") {
        unSelectThumbnails();
        changeSliderImage(event.target.src, event.target.getAttribute("data-title"));
        selectThumbnail(event.target.getAttribute("data-index"));
        renderThumbnails();
    }
})

function changeSliderImage(img, description) { // mudar imagem do slider
    const sliderImage = document.getElementById("slider-image");
    const descriptionBox = document.getElementById("description");

    sliderImage.classList = "";

    setTimeout(() => { // animação (CSS)
        sliderImage.classList += "fade";
        sliderImage.style.backgroundImage = `url(${img})`;
    }, 100);
    descriptionBox.innerText = description;
}


function renderThumbnails() { //renderização miniaturas
    let thumbnails = "";
    slider.forEach((slide, index) => {

        thumbnails += `<div class="column"><img id="thumbnail-image" data-title="${slide.title}" data-index="${index}" class="thumbnails cursor ${slide.active === true ? "active" : ""}" src="${slide.src}"></div>`
    })

    document.getElementById("thumbnails-content").innerHTML = thumbnails;
}

function unSelectThumbnails() { // desmarcar miniatura
    slider.forEach(slide => {
        slide.active = false;
    })
}

function selectThumbnail(index) { // selecionar miniatura
    Object.assign(slider[index], { active: true });
}

function plusSlides(direction) { // ao clicar na direção

    let indexThumbnail = 0;

    slider.forEach((slide, index) => {
        if (slide.active === true) {
            indexThumbnail = index;
        }
    })

    let changeThumbnailIndex = indexThumbnail + direction;
    if (direction === 1) {
        document.querySelector(".row").scrollLeft += 75;
    } else {
        document.querySelector(".row").scrollLeft -= 75;
    }

    if (slider.length - 1 === indexThumbnail && direction === 1) {
        changeThumbnailIndex = 0;
        document.querySelector(".row").scrollLeft = 0;

    }
    if (indexThumbnail === 0 && direction === -1) {
        changeThumbnailIndex = slider.length - 1;
        document.querySelector(".row").scrollLeft += 100 * slider.length - 1
    }


    unSelectThumbnails();
    changeSliderImage(slider[changeThumbnailIndex].src, slider[changeThumbnailIndex].title);
    selectThumbnail(changeThumbnailIndex);
    renderThumbnails();
}