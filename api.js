//spinner
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
};
const toggleSearchResult = displayStyle => {
    document.getElementById('books').style.display = displayStyle;
};

//searching on input for finding books info
const searchBook = () => {
    const searchText = document.getElementById('search-field').value;
    //error
    const errorDiv = document.getElementById("error");
    if (searchText === '') {
        errorDiv.innerText = "Search field cannot be empty or enter a valid book name.";
        return;
    }
    //display spinner
    toggleSpinner('block');
    toggleSearchResult('none');
    loadBooks(searchText);
    document.getElementById('search-field').value = '';
}
const loadBooks = searchText => {
    const url = ` https://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data.docs));
};
//finding data from docs
const displayBooks = docs => {
    const container = document.getElementById('books');
    container.textContent = '';
    docs.forEach(book => {
        console.log(book);
        const div = document.createElement('div');
        div.innerHTML = `
            <h2>Book Name: ${book.title}</h2>
            <p>Author Name: ${book.author_name}</p>
            <p>Publish Date: ${book.publish_date}</p>
            <p>Publisher: ${book.publisher}</p>
            <img src="https://covers.openlibrary.org/b/id/554106-M.jpg" alt="">
            <pre>

            </pre>
            `;
        container.appendChild(div);
    });
    toggleSpinner('none');
    toggleSearchResult('block');

};
loadBooks();