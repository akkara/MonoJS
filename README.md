MonoJS
======

Monolize images with two colors via canvas element

    $("img").mono({
        // Main color for lighten colors  
        color : '#ffffff',  
        // Second color for darken colors  
        black : '#000000',  
        // Max width/height for speed process:  
        // Image natural sizes will be kept  
        // But new image datas will be fitted as  
        bounce : 700,  
        // Fade in speed:  
        speed : 1000,  
        // Hide images on failer  
        hide : false  
    },function(images,error){  
        // Callback function  
    }) ;

Visit <a href="http://akkara.github.com/MonoJS/">Demo Page</a>