

export const BackSection = (color, title) => {

    const background = `background-color:${color}`;
    const element = `
    <div class="back-section" style="${background}">
        <div class="back-section__content">
            <div class="back-section__back"></div>
            <div class="back-section__title">${title}</div>
        </div>
    </div>
    `;
    
    return element;
}

export const BackSectionVoddetail = (color, title) => {

    const background = `background-color:${color}`;
    const element = `
    <div class="back-section" style="${background}">
        <div class="back-section__content">
            <div class="back-section__back btn-back-vod-detail"></div>
            <div class="back-section__title">${title}</div>
        </div>
    </div>
    `;

    return element;

}