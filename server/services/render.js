const axios = require('axios')

exports.rootRoute = (req, res) => {
    // get req to api/users
    axios.get('http://localhost:1234/api/users').then(axiosres => {
        // console.log(axiosres)
        res.render('index', { users: axiosres.data })
    }).catch(err => {
        res.status(500).send({ message: err.message })
    })
}

exports.addUser = (req, res) => {
    res.render('add-user')
}

exports.editUser = (req, res) => {
    axios.get('http://localhost:1234/api/users', {params: {id: req.query.id }}).then(axiosres => {
        console.log(axiosres.data)

        res.render('edit-user', { userData: axiosres.data })
    }).catch((err) => {
        res.status(500).send({ message: err.message })
    })
}

exports.login = (req, res) => {
    res.render('login')
}
