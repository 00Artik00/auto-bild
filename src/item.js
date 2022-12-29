const ITEM_TYPES = {
    image: drawImage,
    audio: drawAudio,
    video: drawVideo,
}
function drawImage(item) {
    return `
    <img src="${item.src}" class="gallery-item__img">
    <h2 class="gallery-item__title">${item.head}</h2>
    `
}
function drawAudio(item) {
    return `
    <div class="gallery-item__audio">
    <audio controls src="${item.src}"></audio>
    </div>
    <h2 class="gallery-item__title">${item.head}</h2>
    `
}
function drawVideo(item) {
    return `

    <div class="gallery-item__video">
    <video controls src="${item.src}"></video>
    </div>

    <h2 class="gallery-item__title">${item.head}</h2>
    `
}
export function getItem(item) {
    const markUp = ITEM_TYPES[item.type](item)
    return `
    <div class="gallery-item">
        ${markUp}
    </div>
    `
}