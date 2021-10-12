$('#add-user').submit(function(event) {
    alert("data inserted successfully")
})

$('#update-user').submit(function(event) {
    event.preventDefault()
 
    var array = $(this).serializeArray()
    var data = {}
    console.log(array)

    //same as taking values from array and putting into object 'data' manually
    $.map(array, function(n, i) {
        data[n['name']] = n['value']

    })
    if (array.length === 4) {
        data['isAdmin'] = document.getElementById('admin').value
    }

    // data['admin'] = $('#admin').value
    console.log(data)

    var request = {
        'url': `http://localhost:1234/api/users/${data.id}`,
        'method': 'PUT',
        'data': data
    }

    $.ajax(request).done(function(res) {
        alert('data updated')
    })
})

if (window.location.pathname === '/') {
    $ondelete = $('.del-user-btn')
    $ondelete.click(function() {
        var id = $(this).attr('data-id')

        var request = {
            'url': `http://localhost:1234/api/users/${id}`,
            'method': 'DELETE'
        }
        console.log(request)
        if (confirm('delete user?')) {
            $.ajax(request).done(function(res) {
                alert('data deleted')
                location.reload()
            })
        }
    })
}

// function updateUser(event) {
//     event.preventDefault()
//     let username = document.getElementById('username').value
//     let password = document.getElementById('password').value
//     let admin = document.getElementById('admin').value

// }