var m = new Module('bookmarkapp');  
var e;
var d;

m.onExecuted = function(e,d)
    {
        if(e == "ok") 
            {
                console.log("the return from the module " + d);
            }
        else 
            {
                console.log("Failed to initialise BookmarkApp.");
                //die
            }
            
        function bookmarkList()
            {
                var list = JSON.parse(d);
                var listContainer = document.createElement('div');
                var numberOfListItems = list.length;
                var listUrl;
                var listEdit;
                var listDelete;
                var listCopy;
                var listGoTo;
                var listElement;
                var listItem;
                var i;
            
                document.getElementById('jslist').appendChild(listContainer);
                
                for (i = 0; i < numberOfListItems; i++)
                    {
                        listElement = document.createElement('div');
                        listUrl = document.createElement('div');
                        listUrl.setAttribute("class","HContent30 BorderRight Ellipsis FloatLeft");
                        listUrl.setAttribute("id", "Url");
                        listUrl.innerHTML = list[i].Url;
                        listElement.appendChild(listUrl);
                        
                        listEdit = document.createElement('button');
                        listEdit.setAttribute("class","HContent10 Ellipsis FloatLeft");
                        listEdit.setAttribute("onClick","edit(this.value);")
                        listEdit.setAttribute("id","editButton");
                        listEdit.setAttribute("value", list[i].ID);
                        listEdit.innerHTML = "E";
                        listElement.appendChild(listEdit);
                        
                        listDelete = document.createElement('button');
                        listDelete.setAttribute("class","HContent10 Ellipsis FloatLeft");
                        listDelete.setAttribute("id","deleteButton");
                        listDelete.setAttribute("onClick","remove(value);")
                        listDelete.setAttribute("value", list[i].ID);
                        listDelete.innerHTML = "D";
                        listElement.appendChild(listDelete);
                        
                        listCopy = document.createElement('button');
                        listCopy.setAttribute("class","HContent10 Ellipsis FloatLeft");
                        listCopy.setAttribute("onClick","copy(this.value);")
                        listCopy.setAttribute("id","goToButton");
                        listCopy.setAttribute("value", list[i].Url);
                        listCopy.innerHTML = "C";
                        listElement.appendChild(listCopy);
                        
                        listGoTo = document.createElement('button');
                        listGoTo.setAttribute("class","HContent10 Ellipsis FloatLeft");
                        listGoTo.setAttribute("onClick", "goTo(this.value)");
                        listGoTo.setAttribute("value", list[i].Url);
                        listGoTo.innerHTML = "G";
                        listElement.appendChild(listGoTo);
                        
                        listContainer.appendChild(listElement);
                    }
            }
            
        bookmarkList();
    }      
    
m.execute('init');

function edit()
{
    console.log("Edit");
}

function remove(value)
{
    console.log("Remove");
    console.log(value);

    //console.log(UserID);
    //console.log(value);
}

function copy(value)
{
    console.log('copy');
    var copy = document.createElement('textarea');
    copy.value = value;
    document.body.appendChild(copy);
    copy.select();
    document.execCommand('copy');
    document.body.removeChild(copy);
}

function goTo(value)
{
    console.log("go to");
    var newTab = window.open('https://' + value, '_blank');
    newTab.focus();
}