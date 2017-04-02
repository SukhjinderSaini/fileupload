<?php
if (isset($_FILES['file'])) {
	$filedata = $_FILES["file"];

    if(move_uploaded_file($filedata['tmp_name'], "uploadedFiles/" . $filedata['name'])){
        echo $filedata['name']. " Uploaded Successfully.";
    } else {
        echo $filedata['name']. " Error";
    }
    exit;
} else {
    echo "No files uploaded ...";
}
?>