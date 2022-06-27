const update = document.querySelector('.update-link')

update.addEventListener('click', _ => {
    fetch('/gods', {
        method: "put",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            god: 'Thor',
            domain: 'Thunder',
            desc: 'Brother of Loki'
        })
    })
})