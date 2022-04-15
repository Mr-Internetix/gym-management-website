window.addEventListener('DOMContentLoaded', () => {

    // targets 

    var notyf = new Notyf({
        position: {
            x: 'right',
            y: 'top',
        }
    });
    //links 
    const dashboard = document.getElementById('dashboard');
    const announcements = document.getElementById('announcements');
    const user = document.getElementById('adduser');
    const customers = document.getElementById('customers');
    const registrations = document.getElementById('registrations');
    const add_announcement = document.getElementById('add_announcement');

    // containers
    const dashboard_container = document.getElementById('dashboard_container');
    const announcements_container = document.getElementById('announcements_container');
    const add_user_container = document.getElementById('add_user_container');
    const customers_container = document.getElementById('customers_container');
    const registrations_container = document.getElementById('registrations_container');
    const add_announcements = document.getElementById('add_announcements');
    const sidebar = document.getElementById('sidebarMenu')

    // get data 

    async function getData(url) {
        const response = await fetch(url, {
            headers: {
                method: 'GET',
                'Content-Type': 'application/json',
            }
        })

        return response.json()
        console.log(response.json())

    }


    links = [add_announcement, dashboard, announcements, user, customers, registrations]

    links.map(link => link.addEventListener('click', (e) => {


        if (e.target.innerText == 'Anouncements') {
            announcements_container.classList.remove('d-none')
            dashboard_container.classList.add('d-none')
            add_user_container.classList.add('d-none')
            customers_container.classList.add('d-none')
            sidebar.classList.remove('show')
            registrations_container.classList.add('d-none')
            add_announcements.classList.add('d-none')
            let announcement_div = document.getElementById('announcements_container')
            announcement_div.innerHTML = ''
            getData('/announcements').then(data => {
                console.log(data)
                data.map((elem) => {
                    announcement_div.innerHTML += `<div id="announcement_append"class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
      <div class="alert alert-success w-100" role="alert">
        <h4 class="alert-heading">${elem.title}</h4>
        <p>${elem.announcement}</p>
        <hr>
        <p class="mb-0">${elem.time}</p>
      </div>
    </div>`
                })
            })


        }
        else if (e.target.innerText == 'Add Announcement') {
            announcements_container.classList.add('d-none')
            dashboard_container.classList.add('d-none')
            add_user_container.classList.add('d-none')
            customers_container.classList.add('d-none')
            registrations_container.classList.add('d-none')
            sidebar.classList.remove('show')
            add_announcements.classList.remove('d-none')
        }
        else if (e.target.innerText == 'Dashboard') {
            announcements_container.classList.add('d-none')
            dashboard_container.classList.remove('d-none')
            add_user_container.classList.add('d-none')
            customers_container.classList.add('d-none')
            registrations_container.classList.add('d-none')
            sidebar.classList.remove('show')
            add_announcements.classList.add('d-none')
        }
        else if (e.target.innerText == 'Add user') {
            announcements_container.classList.add('d-none')
            dashboard_container.classList.add('d-none')
            add_user_container.classList.remove('d-none')
            customers_container.classList.add('d-none')
            sidebar.classList.remove('show')
            registrations_container.classList.add('d-none')
            add_announcements.classList.add('d-none')
        }
        else if (e.target.innerText == 'Customers') {
            announcements_container.classList.add('d-none')
            dashboard_container.classList.add('d-none')
            add_user_container.classList.add('d-none')
            customers_container.classList.remove('d-none')
            registrations_container.classList.add('d-none')
            add_announcements.classList.add('d-none')
            sidebar.classList.remove('show')

            let customers_div = document.getElementById('customer_append');
            customers_div.innerHTML = ''

            getData('/customers').then(data =>{

                data.map((elem) =>{


                    customers_div.innerHTML += `
                    <div class="card" style="width: 18rem;">
            <img src="${elem.image}" class="card-img-top" alt="user-logo">
            <div class="card-body">
              <h5 class="card-title">Name : ${elem.name}
              </h5>
              <h5 class="card-title">Email : ${elem.email}
              </h5>
              <p class="card-text">Address : ${elem.address}
              </p>
              <p class="card-text">Age : ${elem.age}
              </p>
              <!-- <a href="#" class="btn btn-primary">Call Now</a> -->
            </div>
                    `
                })
            })


        }
        else if (e.target.innerText == 'Registrations') {
            announcements_container.classList.add('d-none')
            dashboard_container.classList.add('d-none')
            add_user_container.classList.add('d-none')
            sidebar.classList.remove('show')
            customers_container.classList.add('d-none')
            registrations_container.classList.remove('d-none')
            add_announcements.classList.add('d-none')
            let i = 0
            let table = document.getElementById('table_append');
            table.innerHTML = ''
            getData('/registrations').then(data=>{
                data.map((elem)=>{
                i = i + 1
                table.innerHTML +=`
                <tr>
                <th scope="row">${i}</th>
                <td>${elem.name}</td>
                <td>${elem.city}</td>
                <td>${elem.gender}</td>
                <td>${elem.address}</td>
                <td>${elem.number}</td>
              </tr>
                
                `

                })
            })
        }

    }))


    const add_announcement_button = document.getElementById('add_announcement_button')
    add_announcement_button.addEventListener('click', (e) => {
        e.preventDefault()
        let announcement_title = document.getElementById('announcement_title').value
        let announcement_message = document.getElementById('announcement_message').value
        console.log(announcement_title, announcement_message)
        fetch('/announcements', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "title": announcement_title, "message": announcement_message, "Date": Date() },),
        }).then((data) =>{ notyf.success("Announcement Saved")
        document.getElementById('announcement_form').reset()
    })
    })
})

