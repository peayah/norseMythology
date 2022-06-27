const update = document.querySelector('.update-link')

update.addEventListener('click', _ => {
    fetch('/gods', {
        method: "put",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'god': god,
            'domain': domain,
            'desc': desc
        })
    })
    .then(response => {
        if (response.ok) return response.json()
    })
    .then(data => {
        console.log(data)
        window.location.reload(true)
    })
})