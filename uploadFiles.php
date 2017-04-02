if (isset($_FILES['inputfiles'])) {
    if(move_uploaded_file($_FILES['inputfiles']['tmp_name'], "uploadedFiles/" . $_FILES['inputfiles']['name'])){
        echo $_FILES['inputfiles']['name']. " OK";
    } else {
        echo $_FILES['inputfiles']['name']. " KO";
    }
    exit;
} else {
    echo "No files uploaded ...";
}