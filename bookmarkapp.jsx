Application.run = function( msg )
    {   
        var v = new View( 
            {       
                title: 'Bookmarks',
                width: 640,
                height: 500
            } 
        );

        var f = new File( 'Progdir:Data/Template/main.html' );      
   
        f.onLoad = function(data)   
            {              
                v.setContent(data);   
            }   

        f.load();

    
        v.onClose = function()   
            {       
                Application.quit();
            }
    }