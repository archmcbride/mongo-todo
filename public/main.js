$(document).ready(function(){

    var render = function(){
        $('#theList').empty()
        for (var i = 0; i < theList.length; i++ ) {
            $('#theList').append(`<li>${theList[i]['theItem']}</li>`)
        }
    }

    var getFreshData = function(){
        $.get('/to-do-list', function(data){//where is the folder: /to-do-list?
            console.log(data)
            theList = data
            render()
        })
    }

    var theList = []
    getFreshData()

    $('#newForm').on('submit', function(event){
        event.preventDefault()

        // in a jQuery event handler, `this` refers to the element that fired the event.
        console.log($( this ).serialize())

        $.post('/to-do-list', $(this).serialize(), function(data){
            console.log(data)
            getFreshData()
        })
    })

})