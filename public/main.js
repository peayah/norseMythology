const deleteText = document.querySelectorAll(".fa-trash")
const updateText = document.querySelectorAll(".fa-check")

Array.from(deleteText).forEach((element) => {
    // console.log("do we even get here")
    element.addEventListener("click", deleteGod)
})

async function deleteGod() {
    const sName = this.parentNode.parentNode.childNodes[3].innerText
    // console.log(aName)
    // const sName = this.parentNode.childNodes[1].innerText

    try {
        const response = await fetch('deleteGod', {
            method: "delete",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            'godS': sName,
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
        } catch(err) {
            console.log(err)
        }
    }


// Array.from(updateText).forEach((element) => {
//     element.addEventListener("click", updateEntry)
// })

// update.addEventListener('click', _ => {
//     fetch('/gods', {
//         method: "put",
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             'god': god,
//             'domain': domain,
//             'desc': desc
//         })
//     })
//     .then(response => {
//         if (response.ok) return response.json()
//     })
//     .then(data => {
//         console.log(data)
//         window.location.reload(true)
//     })
// })