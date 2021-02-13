var m = new Module('bookmarkapp');  
var e;
var d;

m.onExecuted = function(e,d)
    {
        if(e == "ok")
            {
                //this creates the list of bookmarks from the json sent from module.php
                function bookmarkList()
                    {
                        var list = JSON.parse(d);
                        var listContainer = document.createElement('div');
                        listContainer.setAttribute("class","FullWidth");
                        var numberOfListItems = list.length;
                    
                        document.getElementById('jslist').appendChild(listContainer);
                        
                        for (i = 0; i < numberOfListItems; i++)
                            {
                                
                                listElement = document.createElement('div');
                                listElement.setAttribute("id", "entry" + list[i].ID);
                                listElement.setAttribute("class", "listElement")
                                
                                listUrl = document.createElement('button');
                                listUrl.setAttribute("class","HContent70 BorderRight Ellipsis FloatLeft");
                                listUrl.setAttribute("id", "Url" + i);
                                listUrl.setAttribute("onClick", "goTo(this.value)");
                                listUrl.setAttribute("title", "Go to site");
                                listUrl.setAttribute("value", list[i].Url);
                                listUrl.innerHTML = list[i].Url;
                                listElement.appendChild(listUrl);
                                
                                listEdit = document.createElement('button');
                                listEdit.setAttribute("class","HContent Ellipsis FloatLeft IconSmall fas fa-edit");
                                listEdit.setAttribute("onClick","save(this.value);")
                                listEdit.setAttribute("id","editButton" + i);
                                listEdit.setAttribute("title", "Edit");
                                listEdit.setAttribute("value", list[i].ID);
                                listEdit.innerHTML = "";
                                listElement.appendChild(listEdit);
                                
                                listDelete = document.createElement('button');
                                listDelete.setAttribute("class","HContent Ellipsis FloatLeft IconSmall fa fa-trash");
                                listDelete.setAttribute("id","deleteButton" + i);
                                listDelete.setAttribute("onClick","remove(value);")
                                listDelete.setAttribute("title", "Delete");
                                listDelete.setAttribute("value", list[i].ID);
                                listDelete.innerHTML = "";
                                listElement.appendChild(listDelete);
                                
                                listCopy = document.createElement('button');
                                listCopy.setAttribute("class","HContent Ellipsis FloatLeft IconSmall far fa-copy");
                                listCopy.setAttribute("onClick","copy(this.value);")
                                listCopy.setAttribute("id","copyButton" + i);
                                listCopy.setAttribute("title", "Copy to clipboard");
                                listCopy.setAttribute("value", list[i].Url);
                                listCopy.innerHTML = "";
                                listElement.appendChild(listCopy);
                                
                                listGoTo = document.createElement('button');
                                listGoTo.setAttribute("class","HContent Ellipsis FloatLeft IconSmall fa fa-external-link");
                                listGoTo.setAttribute("onClick", "goTo(this.value)");
                                listGoTo.setAttribute("id", "goToButton" + i);
                                listGoTo.setAttribute("title", "Go to site");
                                listGoTo.setAttribute("value", list[i].Url);
                                listGoTo.innerHTML = "";
                                listElement.appendChild(listGoTo);
                                
                                listContainer.appendChild(listElement);
                            }
                    }
                    
                bookmarkList();
            }
        else if(e == "created")
            {
                //no need to do anything, will only happen on first exec.
            }
        else if(e == "initerror")
            {
                console.log(d)
                document.getElementById('jslist').textContent = "Error initializing Bookmarks. Please restart the app.";
            }
            
    }      
    
m.execute('init');

//called when editing an existing bookmark or creating a new one.
//value = id
function save(value)
{
    var url = prompt("Please enter URL");
    
    if (url === null)
        {
            return;
            //if they hit cancel, do nothing.
        }
    else if (url == "")
        {
            alert("Bookmark cannot be empty.")
            var url = prompt("Please enter URL");
        }
    else if (url != null && value != null)
        {
            m.execute('save', {id:value,url:url});
            //set the correct values when editing a bookmark without reloading the page.
            var urlShow = document.getElementById("Url" + value);
            document.getElementById("goToButton" + value).value = url;
            document.getElementById("copyButton" + value).value = url;
            urlShow.innerHTML = url;
        }
    else if (url != null && value == null)
        {
            m.execute('save', {id:null,url:url})
            //should probably just use some ajax for this but good enough for now. Refreshes page after adding new bookmark.
            location.reload();
        }
    else
        {
            alert("Error saving bookmark.");
            location.reload();
        }
}

//value = id
function remove(value)
{
    m.onExecuted = function(e,d)
        {
            if(e == "deletesuccess")
                {
                    document.getElementById("entry" + value).remove();
                }
            else
                {
                    alert("Error when deleting bookmark.");
                    location.reload();
                }
        }        
 
    var confirm  = window.confirm("Delete bookmark?");
    
    if(confirm)
        {
            m.execute('delete', {id:value});   
        }
    else
        {
            return;
        }
            
}


//value = url
function copy(value)
{
    var copy = document.createElement('textarea');
    copy.value = value;
    document.body.appendChild(copy);
    copy.select();
    document.execCommand('copy');
    document.body.removeChild(copy);
}

//opens bookmark in a new tab. Uses the default browser, not the friend browser.
//value = url
function goTo(value)
{
    var newTab = window.open('https://' + value, '_blank');
}
