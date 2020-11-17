let arrayOfUsers = []

const user = () => {
    const numUsers = document.getElementById('numUsers').value
    arrayOfUsers = []
    fetch(`https://randomuser.me/api/?results=${numUsers}`)
        .then(res => res.json())
        .then(user => {
            for (let i = 0; i < user.results.length; i++) {
                arrayOfUsers.push(user.results[i])
            }
            console.log('Array of Users: ', arrayOfUsers)
        })
        .then(() => displayUser(arrayOfUsers))
}

// .then(arrayOfUsers.sort((a, b) => a.name.last.localeCompare(b.name.last)))

const displayUser = (arrayOfUsers) => {
    let cardContainer = document.getElementById('userResults')
    for (let i in arrayOfUsers) {
        let user = arrayOfUsers[i]
        let userName = `${user.name.first} ${user.name.last}`
        let userImage = user.picture.large
        let userAge = `Age: ${user.dob.age}`
        let userNumber = `Phone: ${user.phone}`
        let userAddress = `Address: ${user.location.street.number} ${user.location.street.name}` + '<br>' +
            `${user.location.city}, ${user.location.state}, ${user.location.country}`

        console.log(userAddress)

        let cardDiv = document.createElement('div')
        cardDiv.classList = 'userCard'
        cardContainer.append(cardDiv)

        let cardImage = document.createElement('div')
        cardImage.classList = 'cardImage'
        let img = new Image()
        img.src = userImage
        cardImage.append(img)
        cardDiv.append(cardImage)

        let cardInfo = document.createElement('div')
        cardInfo.classList = "cardInfo"

        let nameSpan = document.createElement('span')
        nameSpan.innerHTML = '<br>' + userName + '<br>'
        cardImage.append(nameSpan)

        let button = document.createElement('button')
        button.innerHTML = 'Show Info'
        button.id = i
        button.addEventListener('click', function () {
            if (document.getElementById('info' + i).style.display == 'block') {
                document.getElementById('info' + i).style.display = 'none'
                button.innerHTML = 'Show Info'
            } else {
                document.getElementById('info' + i).style.display = 'block'
                button.innerHTML = 'Hide Info'
            }
        })
        cardImage.append(button)

        let info = document.createElement('div')
        info.id = 'info' + i
        info.classList = 'info'
        cardInfo.append(info)
        let ageSpan = document.createElement('span')
        ageSpan.innerHTML = userAge + '<br>'
        info.append(ageSpan)
        let numberSpan = document.createElement('span')
        numberSpan.innerHTML = userNumber + '<br>'
        info.append(numberSpan)
        let addressSpan = document.createElement('span')
        addressSpan.innerHTML = userAddress + '<br>'
        info.append(addressSpan)

        cardDiv.append(cardInfo)
    }
}