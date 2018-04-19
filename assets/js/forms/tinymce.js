/*

*Project Name: Calibre Admin Bootstrap Template;
*Author: Lancecoder;
*Website: lancecoder.com;
*Filename: forms/tinymce.js;

*/


"use strict";



tinymce.init({
    selector: '.tinymce-editor',
    height: 500,
    plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table contextmenu paste code'
    ],
    toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
    content_css: [
       
    ]
});