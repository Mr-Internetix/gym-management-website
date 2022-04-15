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
  const sidebar = document.getElementById('sidebarMenu')


  // containers
  const dashboard_container = document.getElementById('dashboard_container');
  const announcements_container = document.getElementById('announcements_container');

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


  links = [dashboard, announcements]

  links.map(link => link.addEventListener('click', (e) => {


    if (e.target.innerText == 'Anouncements') {
      sidebar.classList.remove('show')
      announcements_container.classList.remove('d-none')
      dashboard_container.classList.add('d-none')
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
    else if(e.target.innerText == 'Dashboard'){
      sidebar.classList.remove('show')
      announcements_container.classList.add('d-none')
      dashboard_container.classList.remove('d-none')

      

    }

  }))

})

