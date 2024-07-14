import {listData} from "./list.js";

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app'),
        addForm = document.getElementById('add-form'),
        table = createTable(),
        btnSortFIO = document.getElementById('sort__fio'),
        btnSortAge = document.getElementById('sort__age'),
        filterFIO = document.getElementById('filter-form__fio-inp'),
        filterAge = document.getElementById('filter-form__age-inp'),
        filterHobby = document.getElementById('filter-form__hobby-inp')
    ;
    let sortFlag = true;

    app.append(table);
    renderTable(listData);

    btnSortFIO.addEventListener('click', sortByFio);
    btnSortAge.addEventListener('click', sortByAge);

    filterFIO.addEventListener('input', (event) => {
        const value = event.target.value.trim().toLowerCase();
        const updatedList = listData.filter(item => {
            const fio = `${item.name} ${item.surname} ${item.lastname}`.toLowerCase();
            if (fio.includes(value)) return true;
        });
        renderTable(updatedList);
    });

    filterAge.addEventListener('input', event => {
        const value = String(event.target.value.trim());
        const updatedList = listData.filter(item => item.age.toString().includes(value));
        renderTable(updatedList);
    });

    filterHobby.addEventListener('input', event => {
        const value = event.target.value.trim().toLowerCase();
        const updatedList = listData.filter(item => item.hobby.toLowerCase().includes(value));
        renderTable(updatedList);
    });

    function createTable() {
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
        const tr = document.createElement('tr');
        const headers = ['ФИО',' Возраст', 'Год рождения', 'Хоби'];

        table.classList.add('table', 'table-dark', 'table-striped');


        headers.forEach(item => {
            const th = document.createElement('th');
            th.textContent = item;
            tr.append(th);
        });

        thead.append(tr);
        table.append(thead, tbody);

        return table;
    }

    function renderTable(data) {
        const tbody = table.querySelector('tbody');
        tbody.innerHTML = '';
        const currentYear = new Date().getFullYear();

        data.forEach(item => {
            const { name, surname, lastname, age, hobby } = item;
            const tr = document.createElement('tr');
            const userData = [
                `${name} ${surname} ${lastname}`,
                age,
                currentYear - age,
                hobby
            ];

            userData.forEach(value => {
                const th = document.createElement('th');
                th.textContent = value;
                tr.append(th);
            });

            tbody.append(tr);
        });
    }

    addForm.addEventListener('submit', event => {
        event.preventDefault();
        const formData = new FormData(event.target);

        if (formData.get('name').trim() === '') {
            alert('Имя не введено');
            return;
        }
        if (formData.get('surname').trim() === '') {
            alert('Отчество не введено');
            return;
        }
        if (formData.get('lastname').trim() === '') {
            alert('Фамилия не введена');
            return;
        }
        if (formData.get('age').trim() === '') {
            alert('Возраст не введен');
            return;
        }

        const user = {
            name: formData.get('name').trim(),
            surname: formData.get('surname').trim(),
            lastname: formData.get('lastname').trim(),
            age: Number(formData.get('age').trim()),
            hobby: formData.get('hobby').trim(),
        }

        listData.push(user);
        renderTable(listData);
    });
    
    function sortByFio() {
        const updatedList = listData.sort((a, b) => {
            const fioA = `${a.name} ${a.surname} ${a.lastname}`;
            const fioB = `${b.name} ${b.surname} ${b.lastname}`;

            return sortFlag ? fioA.localeCompare(fioB) : fioB.localeCompare(fioA);
        });
        sortFlag = !sortFlag;
        renderTable(updatedList);
    }

    function sortByAge() {
        const updatedList = listData.sort((a, b) => {
            return sortFlag ? a.age - b.age : b.age - a.age;
         });
        sortFlag = !sortFlag;
        renderTable(updatedList);
    }


})