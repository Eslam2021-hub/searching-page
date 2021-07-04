(function () {
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');
    document.querySelector('#search-form').addEventListener('submit', function (e) {
        e.preventDefault();
        searchedForText = document.querySelector('#search-keyword').value;
        const xhr = new XMLHttpRequest();
                xhr.onload  = function() {
                    let response = JSON.parse(this.responseText);
                    if(response.total !== 0) {
                    let htmlContent = `<img src="${response.results[0].urls.regular}" alt = "${searchedForText}" class="fit">`
                    responseContainer.innerHTML = htmlContent;
                } else {
                    responseContainer.innerHTML = "no result";
                }
                };
        xhr.open("GET", `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,true);
        xhr.setRequestHeader('Authorization', 'Client-ID e8NfRJSTCoZ4A_1xTVA0Xe39EADQe4vJsldt2uS6w0Y');
        xhr.send();
        const articleRequest = new XMLHttpRequest();
        articleRequest.onload = function () {
            let data = JSON.parse(this.responseText);
            let htmlContent = '';
            if(data.response && data.response.docs && data.response.docs.length > 1) {
                htmlContent = '<ul>'  + 
                data.response.docs.map(article => `<li class="article"><h2>
                            <a href="${article.web_url}">${article.headline.main}</a>
                            </h2>
                            </li>`).join('') + '</ul>'; }
            else {
                htmlContent = '<div class="error-no-article">No article available</div>'


                }
                responseContainer.insertAdjacentHTML('beforeend', htmlContent);
            };
        articleRequest.open('GET', `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=Ac9V44Al1jvhbuBAUxzG8fTX2LnIhugz`);
        articleRequest.send();
    });
})();
