<?php

global $Logger,$args,$SqlDatabase,$User;

require_once("php/friend.php");
$Logger->log("Loaded bookmarkapp.");
$SqlDatabase->SelectDatabase('friend');


if($args->command == "init")
        {
                //check if table exists (i.e app has run before), if not, create it.
                $tableCheck = $SqlDatabase->query("SHOW TABLES LIKE 'BookmarkApp'");
                $tableCheck = mysqli_num_rows($tableCheck);

                if($tableCheck != 1)
                        {
                                $SqlDatabase->query("CREATE TABLE BookmarkApp 
                                        (ID bigint(20) NOT NULL AUTO_INCREMENT, 
                                        UserID bigint(20) NOT NULL, 
                                        Url varchar(255) NOT NULL, 
                                        PRIMARY KEY (ID))
                                ");
				
				$Logger->log("Created table Bookmarkapp.");
                                die("created<!--separate-->{\"response\":\"created table BookmarkApp\"}");
                        }
                //load bookmarks if the table exists.
                if($tableCheck == 1)
                        {
                                $bookmarkArray = $SqlDatabase->fetchArray("SELECT * FROM BookmarkApp WHERE UserID = '" . $User->ID .  "'");
                                $Logger->log("Loaded bookmarks");

                                die("ok<!--separate-->" . json_encode($bookmarkArray));
                        }
                //if this one happens, something has gone very wrong.. check the database.
                else
                        {
                                $Logger->log("Error initializing Bookmark App.");
                                die("initerror<!--separate-->{\"response\":\"Error initializing Bookmark App\"}");
                        }
        }
//saving or creating a bookmark
elseif($args->command == "save")
        {
                $id = mysqli_real_escape_string($SqlDatabase->_link,$args->args->id);
                $url = mysqli_real_escape_string($SqlDatabase->_link,$args->args->url);

                $Logger->log("url and id are: ");
                $Logger->log($url);
                $Logger->log($id);

                //id exists, so update it. Make sure we got a string to update it with.
                if($id != null AND $url != null)
                        {
                                $sql = "SELECT * FROM BookmarkApp WHERE ID = '" . $id  . "' AND UserID = '" . $User->ID  . "'";
                                $result = mysqli_num_rows($SqlDatabase->query($sql));

                                if($result == 1)
                                        {
                                                $sql = "UPDATE BookmarkApp SET Url = '" . $url  . "' WHERE ID = '" . $id  . "' AND UserID ='" . $User->ID  . "'";
                                                $SqlDatabase->query($sql);
                                                die("savesuccess<!--separate-->{\"response\":\"Updated bookmark.\"}");
                                        }
                                else
                                        {
                                                $Logger->log("MySQL error when saving bookmark. ");
                                                die("saveerror<!--separate-->{\"response\":\"MySQL error when saving bookmark.\"}");
                                        }
                        }
                //no id, create a bookmark
                elseif($id == null AND $url != null)
                        {
                                $sql = "INSERT INTO BookmarkApp (Url, UserID) VALUES ('" . $url  . "','" . $User->ID  . "')";
                                $SqlDatabase->query($sql);
				die("savesuccess<!--separate-->{\"response\":\"Created bookmark.\"}");
                        }
                //something went wrong, most likely no content in $url
                else
                        {
                                $Logger->log("Saving error/Bookmark App.");
                                die("saveerror<!--separate-->{\"response\":\"Error when saving bookmark.\"}");
                        }
        }
//delete a bookmark
elseif($args->command == "delete")
        {
                $id = mysqli_real_escape_string($SqlDatabase->_link,$args->args->id);
                $sql = "SELECT * FROM BookmarkApp WHERE ID = '" . $id . "' AND UserID = '" . $User->ID . "'";
                $result = mysqli_num_rows($SqlDatabase->query($sql));

                if($result == 1)
                        {
                                $sql = "DELETE FROM BookmarkApp where ID = '" . $id . "' AND UserID = '" . $User->ID . "'";
                                $SqlDatabase->query($sql);
                                die("deletesuccess<!--separate-->{\"response\":\"Deleted bookmark.\"}");
                        }
                else
                        {
                                $Logger->log("Deleting error/Bookmark App");
                                die("deleteerror<!--separate-->{\"response\":\"Error when deleting bookmark.\"}");
                }
        }

?>                                                                                                                                                     1,5        
