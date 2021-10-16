const DBConn = require('../model/model')
const bcrypt = require('bcrypt')

exports.create = async (req, res) => {
    if (!req.body) {
        console.log('problem')
        res.status(400).send({ message:'Content cannot be empty' })
        return
    }

    const userInPwdDB = new DBConn.passwordDB({
        username: req.body.username,
        plainTextPassword: req.body.password,
        isAdmin: (req.body.admin === 'on')
    })



    const user = new DBConn.userDB({
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, 10),
        isAdmin: (req.body.admin === 'on')
    })

    // save user
    user.save().then(data => {
        // res.send(data)
        userInPwdDB.save(userInPwdDB).then(data1 => {
            res.redirect('/add-user')
        })
    }).catch( err => {
        res.status(500).send({ message: err.message })
    })
}

exports.find = (req, res) => {

    if (req.query.id) {
        const id = req.query.id
        DBConn.passwordDB.findById(id).then(data => {
            if (!data) {
                res.status(404).send({ message: `{id} not found` })
            } else {
                res.send(data)
            }
        }).catch(err => {
            res.status(500).send({ message: err.message })
        })
    } else {
        DBConn.passwordDB.find().then(user => {
            console.log(user)
            res.send(user)

        }).catch(err => {
            res.status(500).send({ message: err.message })
        })
    }

    
}

exports.update = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: 'content cannot be empty' })
    }

    if (req.body.isAdmin !== undefined) {
        req.body.isAdmin = (req.body.isAdmin === 'on').toString()
    } else {
        req.body.isAdmin = false
    }

    req.body.password = await bcrypt.hash(req.body.password, 10)
    console.log(req.body)

    const id = req.params.id
    DBConn.userDB.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({ message: `{id} not found` })
        } else {
            res.send(data)
            // console.log(data)
        }
    }).catch(err => {
        res.status(500).send({ message: err.message })
    })

}

exports.delete = (req, res) => {
    const id = req.params.id
    DBConn.userDB.findByIdAndDelete(id).then(data => {
        if (!data){
            res.status(404).send({ message: `{id} not found` })
        } else {
            res.send({data, message: 'user deleted'}) 
        }
    }).catch(err => {
        res.status(500).send({ message: err.message })
    })
}

