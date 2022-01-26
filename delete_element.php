<?php
if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    header($_SERVER["SERVER_PROTOCOL"] . " 405 Method Not Allowed", true, 405);
    exit;
}
$inputJSON = file_get_contents('php://input');
$planete = json_decode($inputJSON, TRUE);
$file_name = "planetes.json";
$planetes = [];
if (file_exists($file_name)) {
    // chargement de la liste des planetes depuis le fichier
    $planetes = json_decode(file_get_contents($file_name), true);
}
$index = 0;
// parcourir les planetes
foreach($planetes as $key => $value){
    // comparer la planete parcourue et la planete séelectionné
    if($planete["nom_planete"] == $value["nom_planete"]){
        // efface la planete si la planete parcourue est la meme que celle sélectionné
        array_splice($planetes,$index,1);
        break;
    }
    $index++;
}

file_put_contents($file_name, json_encode($planetes));

?>