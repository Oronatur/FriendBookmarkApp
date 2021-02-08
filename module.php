<?php

global $Logger,$args,$SqlDatabase,$User;

require_once("php/friend.php");
$Logger->log("Loaded bookmarkapp 1.");
$SqlDatabase->SelectDatabase('friend');


if($args->command == "init")
	{
		$Logger->log("Loaded bookmarkapp 2.");
		$tableCheck = $SqlDatabase->query("SHOW TABLES LIKE 'BookmarkApp'");
		$tableCheck = mysqli_num_rows($tableCheck);
		$Logger->log("Loaded bookmarkapp 3.");
		if($tableCheck != 1)
		{
			$Logger->log("Bookmarkapp if1");
			$Logger->log(var_dump($SqlDatabase));
			$SqlDatabase->query("CREATE TABLE BookmarkApp 
				(ID bigint(20) NOT NULL AUTO_INCREMENT, 
				UserID bigint(20) NOT NULL, 
				Url varchar(255) NOT NULL, 
				PRIMARY KEY (ID))
			");
			
			$Logger->log("Bookmarkapp after query 1.");
			die("created<!--separate-->{\"response\":\"created table BookmarkApp\"}");
		}
		else
		{
			$Logger->log("Bookmarkapp else1");
			$bookmarkArray = $SqlDatabase->fetchArray("SELECT * FROM BookmarkApp WHERE UserID = '" . $User->ID .  "'");
			$Logger->log("Loaded bookmarks");

			die("ok<!--separate-->" . json_encode($bookmarkArray));
		}


	}
die("fail<!--separate-->{\"response\":\"no known command\"}");
/*
              
          		$query = "SELECT * FROM 'BookmarkApp' WHERE 'UserID' = '" . $User->ID . "'";
				$bookmarkArray = $SqlDatabase->FetchArray($query);
				$Logger->log("Loaded bookmarks (if any exist)");
				return $bookmarkArray;
				die("Loaded table BookmarkApp.";
			}
	
	}
else
	{
		$Logger->log("init error");
	}



//check if entry exists: update if yes, create if no
if($args->command == "save")
	{
		$sql = "SELECT * FROM 'bookmarkapp' WHERE 'ID' = '" . $id . "' AND 'UserID' = '" . $User->ID  .  "'";
		$result = mysql_num_rows($SqlDatabase->query($sql));

		if($result != 0)
			{
				$sql = "INSERT INTO 'bookmarkapp' ('Url', 'UserID') VALUES ('" . $url  . "','" . $User->ID  . "'";	
				$Logger->log("Creating bookmark.");
			}
		elseif($result == 1)
			{
				$sql = "UPDATE 'bookmarkapp' SET 'Url' = '". $url . "' WHERE 'ID' = '" . $id . "' AND 'UserID' ='" . $User->ID . "'";
				$Logger->log("Updating bookmark " . $id;
			}
		else
			{
				$Logger->log("MySQL error when saving bookmark. " . $e->getMessage());
				die();
			}

		$SqlDatabase->query($sql);
		return;
	}

if($args->command == "delete")
	{
		$sql = "SELECT * FROM 'BookmarkApp' WHERE 'ID' = '" . $id . "' AND 'UserID' = '" . $User->ID . "'";
		$result = mysql_num_rows($SqlDatabase->query($sql);

		if($result == 1)
			{
			i	$sql = "DELETE FROM 'BookmarkApp' where 'ID' = '" . $id . "' AND 'UserID' = '" - $User->ID . "'";
				$SqlDatabase->query($sql);
				$Logger->log("Deleted bookmark " . $id);
			}
		else
			{
				$Logger->log("MySQL error" . $e->getMessage());
				die();
			}

		return;

	}
*/
?>
