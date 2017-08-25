$(document).ready(function(){

    var render = function(){
        $('#theList').empty()
        for (var i = 0; i < theList.length; i++ ) {
            $('#theList').append(`<li>${theList[i]['theItem']} <button data-index="${i}" data-id="${theList[i]._id}">DELETE</button></li>`)
        }  
    }

    var getFreshData = function(){
        $.get('/to-do-list', function(data){
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
        console.log($(this).serialize())

        $.post('/to-do-list', $(this).serialize(), function(data){
            console.log(data)
            getFreshData()
        })
    })
    //add strikethrough
    $('#theList').on('click', 'li', function(evt){
        console.log(evt);
        $(this).toggleClass("strikethrough")
    })



    //delete the line item
    $('#theList').on('click', 'button', function(event){
        event.preventDefault()

        // in a jQuery event handler, `this` refers to the element that fired the event.
        console.log(event.target.attributes[1].nodeValue)
        var todoId = event.target.attributes[1].nodeValue;
        $(event.target).parent().remove()
        theList.splice(event.target.attributes["0"].value,1);
        console.log(theList)
        $.post('/todo/delete', {todoId:todoId}, function(data){
            console.log(data)
            getFreshData()
        })
    })
})