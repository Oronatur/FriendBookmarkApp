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
                        var numberOfListItems = list.length;
                    
                        document.getElementById('jslist').appendChild(listContainer);
                        
                        for (i = 0; i < numberOfListItems; i++)
                            {
                                listElement = document.createElement('div');
                                listElement.setAttribute("id", "entry" + list[i].ID);
                                
                                listUrl = document.createElement('div');
                                listUrl.setAttribute("class","HContent30 BorderRight Ellipsis FloatLeft");
                                listUrl.setAttribute("id", "Url"+list[i].ID);
                                listUrl.innerHTML = list[i].Url;
                                listElement.appendChild(listUrl);
                                
                                listEdit = document.createElement('button');
                                listEdit.setAttribute("class","HContent10 Ellipsis FloatLeft");
                                listEdit.setAttribute("onClick","save(this.value);")
                                listEdit.setAttribute("id","editButton" + list[i].ID);
                                listEdit.setAttribute("value", list[i].ID);
                                listEdit.innerHTML = "E";
                                listElement.appendChild(listEdit);
                                
                                listDelete = document.createElement('button');
                                listDelete.setAttribute("class","HContent10 Ellipsis FloatLeft");
                                listDelete.setAttribute("id","deleteButton" + list[i].ID);
                                listDelete.setAttribute("onClick","remove(value);")
                                listDelete.setAttribute("value", list[i].ID);
                                listDelete.innerHTML = "D";
                                listElement.appendChild(listDelete);
                                
                                listCopy = document.createElement('button');
                                listCopy.setAttribute("class","HContent10 Ellipsis FloatLeft");
                                listCopy.setAttribute("onClick","copy(this.value);")
                                listCopy.setAttribute("id","copyButton" + list[i].ID);
                                listCopy.setAttribute("value", list[i].Url);
                                listCopy.innerHTML = "C";
                                listElement.appendChild(listCopy);
                                
                                listGoTo = document.createElement('button');
                                listGoTo.setAttribute("class","HContent10 Ellipsis FloatLeft");
                                listGoTo.setAttribute("onClick", "goTo(this.value)");
                                listGoTo.setAttribute("id", "goToButton" + list[i].ID)
                                listGoTo.setAttribute("value", list[i].Url);
                                listGoTo.innerHTML = "G";
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
        else
            {
                console.log(d)
                document.getElementById('jslist').textContent = "Error initializing Bookmarks. Please restart the app or contact a system administrator if the problem persists.";
            }
            
    }      
    
m.execute('init');

//called when editing an existing bookmark or creating a new one.
function save(value)
{
    var url = prompt("Please enter URL");
    if (url != null && value != null)
        {
            m.execute('save', {id:value,url:url});
            //set the correct values when editing a bookmark without reloading the page.
            var urlShow = document.getElementById("Url" + value);
            document.getElementById("goToButton" + value).value = url;
            document.getElementById("copyButton" + value).value = url;
            urlShow.innerHTML = url;
        }
    else if(url != null && value == null)
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
                
    m.execute('delete', {id:value});   
}


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
function goTo(value)
{
    var newTab = window.open('https://' + value, '_blank');
}
