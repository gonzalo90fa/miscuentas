"use strict"
var view = [];
view[0] = 'accounts';
view[1] = 'all-accounts';
// import Todos from './todos.json';
// console.log(Todos)
$(document).ready(()=>{
    viewLoad(view);
    $('#btn-addMoney').on('click',()=>{
        $('.windowContainer').html(closeWindowBar+formWindow);
        show_hide('.windowContainer','flex');
        $('.closeWindowBar').on('click',()=>{
            show_hide('.windowContainer','none');
        })
    })
})