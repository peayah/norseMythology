const deleteText = document.querySelectorAll(".fa-trash")
const updateText = document.querySelectorAll(".fa-check")
var elements = document.getElementsByClassName("classname");


Array.from(deleteText).forEach((element) => {
    // console.log("do we even get here")
    element.addEventListener("click", deleteGod)
})

async function deleteGod() {
    console.log("the bucket was clicked")
    const gName = this.parentNode.parentNode.childNodes[3].innerText
    console.log(`we're looking to delete ${gName}`)
    try {
        const response = await fetch('/deleteGod', {
            method: "delete",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            'god': gName.trim()
            })
        })
        .then(response => {
            if(response.ok) return response.json()
            
        })
        .then(data => {
            window.location.reload()
        })

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