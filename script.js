const apiUrl = 'http://127.0.0.1:3000/';

const cardsContainer = document.getElementById('cards-container');
const popup = document.getElementById('popup');
const popupContent = document.getElementById('popup-content');
const popupClose = document.getElementById('popup-close');

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute('data-id', item.id);

            const nameElement = document.createElement('h2');
            nameElement.textContent = `${item.name}`;
            card.appendChild(nameElement);

            const phoneElement = document.createElement('p');
            const phoneIcon = document.createElement('img');
            phoneIcon.src = 'phone_icon.png';
            phoneIcon.classList.add('icon');
            phoneElement.appendChild(phoneIcon);
            phoneElement.innerHTML += `${item.phone}`;
            card.appendChild(phoneElement);

            const emailElement = document.createElement('p');
            const emailIcon = document.createElement('img');
            emailIcon.src = 'email_icon.png';
            emailIcon.classList.add('icon');
            emailElement.appendChild(emailIcon);
            emailElement.innerHTML += `${item.email}`;
            card.appendChild(emailElement);


            card.addEventListener('click', () => {
                showPopup(item);
            });

            cardsContainer.appendChild(card);
        });

    })
    .catch(error => {
        console.error('Ошибка при получении данных:', error);
    });

function showPopup(user) {
    const popupContent = document.getElementById('popup-content');
    popupContent.innerHTML = '';

    const dynamicName = `
        <h2>${user.name}</h2>
    `;
    popupContent.insertAdjacentHTML('beforeend', dynamicName);

    const staticContent = `
        <div class="static-part">
            <p>Телефон:</p>
            <p>Почта:</p>
            <p>Дата приема:</p>
            <p>Должность:</p>
        </div>
    `;
    popupContent.insertAdjacentHTML('beforeend', staticContent);

    const dynamicContent = `
        <div class="dynamic-part">
            <p id="phoneField"></p>
            <p id="emailField"></p>
            <p id="hireDateField"></p>
            <p id="positionNameField"></p>
        </div>
    `;
    popupContent.insertAdjacentHTML('beforeend', dynamicContent);

    document.getElementById('phoneField').textContent = ` ${user.phone}`;
    document.getElementById('emailField').textContent = ` ${user.email}`;
    document.getElementById('hireDateField').textContent = ` ${user.hire_date}`;
    document.getElementById('positionNameField').textContent = ` ${user.position_name}`;

    const departmentContent = `
        <div class="department-container">
                <p class="department-label">Подразделение:</p>
                <p id="departmentField" class="department-dynamic"></p>
        </div>
    `;

    popupContent.insertAdjacentHTML('beforeend', departmentContent);
    document.getElementById('departmentField').textContent = ` ${user.department}`;

    const moreInfo = `
        <div class="userinfo">
            <p class="userinfo-label">Дополнительная информация:</p>
            <p id="moreInfoField" class="userinfo-dynamic"></p>
        </div>
    `;

    popupContent.insertAdjacentHTML('beforeend', moreInfo);
    document.getElementById('moreInfoField').textContent = ` ${user.department}`;

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    document.body.appendChild(overlay); 

    popup.style.display = 'block';
}
            
document.addEventListener('mousedown', function(e){
    if(e.target.closest('.popup') === null || e.target === popup || e.target === popupClose){
        popup.style.display = 'none';
        const overlay = document.querySelector('.overlay');
        if (overlay) {
            overlay.remove();
        }
    }
});

document.addEventListener('mousedown', function(e){
    if (!e.target.closest('.popup') || e.target === popupClose || e.target === document.getElementById('no-results-popup-close')) {
        popup.style.display = 'none';
        document.getElementById('no-results-popup').style.display = 'none';
        const overlay = document.querySelector('.overlay');
        if (overlay) {
            overlay.remove();
        }
    }
});



function searchByName(name) {
    const searchUrl = apiUrl + `?term=${name}`;
    
    fetch(searchUrl)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                const noResultsPopup = document.getElementById('no-results-popup');
                const overlay = document.createElement('div');
                overlay.classList.add('overlay');

                document.body.appendChild(overlay); 
                noResultsPopup.style.display = 'block';
            } else {
                cardsContainer.innerHTML = '';
                
                data.forEach(item => {
                    const card = document.createElement('div');
                    card.classList.add('card');
                    card.setAttribute('data-id', item.id);

                    const nameElement = document.createElement('h2');
                    nameElement.textContent = item.name; 
                    card.appendChild(nameElement);

                    const phoneElement = document.createElement('p');
                    const phoneIcon = document.createElement('img');
                    phoneIcon.src = 'phone_icon.png';
                    phoneIcon.classList.add('icon');
                    phoneElement.appendChild(phoneIcon);
                    phoneElement.innerHTML += `${item.phone}`;
                    card.appendChild(phoneElement);
                    const emailElement = document.createElement('p');
                    const emailIcon = document.createElement('img');
                    emailIcon.src = 'email_icon.png';
                    emailIcon.classList.add('icon');
                    emailElement.appendChild(emailIcon);
                    emailElement.innerHTML += `${item.email}`;
                    card.appendChild(emailElement);

                    card.addEventListener('click', () => {
                        showPopup(item);
                    });

                    cardsContainer.appendChild(card);
                });
            }
        })
        .catch(error => {
            console.error('Ошибка при получении данных:', error);
        });
}
const searchButton = document.getElementById('search-button');

searchButton.addEventListener('click', () => {
    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput.value.trim(); 

    if (searchTerm) {
        searchByName(searchTerm);
    } else {
        const noResultsPopup = document.getElementById('no-results-popup1');
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        document.body.appendChild(overlay); 
        noResultsPopup.style.display = 'block';
    }
});