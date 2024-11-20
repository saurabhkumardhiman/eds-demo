let currentPage = 1;
const itemsPerPage = 10;  
let countryURL = '';  
 
 
async function createList(page) {
    let offset = (page - 1) * itemsPerPage;
    let pathname = `${countryURL}?offset=${offset}&limit=${itemsPerPage}`;
   
    try {
        const resp = await fetch(pathname);
        if (!resp.ok) throw new Error('Failed to fetch data');
        const json = await resp.json();
       
        const list = document.createElement('ol');
        json.data.forEach((row) => {
            let country = document.createElement("li");
            country.innerText = row.Country;
            list.appendChild(country);
        });
        return list;
    } catch (error) {
        console.error(error);
        return document.createTextNode('Failed to load countries');
    }
}
 
function createPaginationControls(totalItems) {
    const paginationDiv = document.createElement('div');
    paginationDiv.classList.add('pagination');
   
   
    const totalPages = Math.ceil(totalItems / itemsPerPage);
   
   
    const prevBtn = document.createElement('button');
    prevBtn.innerText = "Previous";
    prevBtn.disabled = currentPage === 1;  
    prevBtn.addEventListener('click', () => changePage(currentPage - 1));
    paginationDiv.append(prevBtn);
   
   
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.classList.add('page-number');
        pageButton.innerText = i;
        pageButton.disabled = i === currentPage;
        pageButton.addEventListener('click', () => changePage(i));
        paginationDiv.append(pageButton);
    }
 
   
    const nextBtn = document.createElement('button');
    nextBtn.innerText = "Next";
    nextBtn.disabled = currentPage === totalPages;  
    nextBtn.addEventListener('click', () => changePage(currentPage + 1));
    paginationDiv.append(nextBtn);
   
    return paginationDiv;
}
 
 
async function changePage(newPage) {
    const totalRows = await getTotalRowCount(countryURL);
    const totalPages = Math.ceil(totalRows / itemsPerPage);
   
    if (newPage < 1 || newPage > totalPages) return;  
 
    currentPage = newPage;
    const parentDiv = document.querySelector(".countries-block");
   
   
    parentDiv.innerHTML = "";
   
 
    parentDiv.append(await createList(currentPage));
   
   
    const paginationControls = createPaginationControls(totalRows);
    parentDiv.append(paginationControls);
}
 
 
async function getTotalRowCount(jsonURL) {
    const resp = await fetch(jsonURL);
    const json = await resp.json();
    return json.total || 0;  
}
 
 
export default async function decorate(block) {
    const countries = block.querySelector('a[href$=".json"]');
    const parentDiv = document.createElement('div');
    parentDiv.classList.add('countries-block');
   
    countryURL = countries.href;  
   
    if (countries) {
        const totalRows = await getTotalRowCount(countries.href);
        parentDiv.append(await createList(currentPage));
        const paginationControls = createPaginationControls(totalRows);  
        parentDiv.append(paginationControls);  
       
     
        countries.replaceWith(parentDiv);
    }
}
 