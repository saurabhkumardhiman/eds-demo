async function fetchData(jsonURL) {
    const resp = await fetch(jsonURL);
    const data = await resp.json();
    const dataValue = data;
    const reqDataValue = dataValue.data;

    const titleDescCont = document.createElement('div');
    titleDescCont.classList.add('title-desc-details');

    reqDataValue.forEach(el => {

        const allTitles = document.createElement('div');
        allTitles.classList.add('title-value');
        allTitles.innerHTML = el.title;
        titleDescCont.appendChild(allTitles)

        const allDesc = document.createElement('div');
        allDesc.classList.add('title-desc');
        allDesc.innerHTML = el.description;
        titleDescCont.appendChild(allDesc)
    })

    return titleDescCont;
}

export default async function decorate(block) {
    const termsCondJson = block.querySelector('a[href$=".json"]');
    const completeData = document.createElement('div');
    completeData.classList.add('terms-cond-block');

    const allHrefs = termsCondJson.href;

    if (termsCondJson) {
        const details = await fetchData(allHrefs);
        completeData.append(details);
        termsCondJson.replaceWith(completeData);
    }
}
