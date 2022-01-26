<?php

if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    header($_SERVER["SERVER_PROTOCOL"] . " 405 Method Not Allowed", true, 405);
    exit;
}

// récupération du corps de la requete HTTP
$inputJSON = file_get_contents('php://input');
$planete = json_decode($inputJSON, TRUE);
$file_name = "planetes.json";
$planetes = [];
$index = 0;
if (file_exists($file_name)) {
    // chargement de la liste des planetes depuis le fichier
    $planetes = json_decode(file_get_contents($file_name), true);
}
// parcourir les planetes
foreach($planetes as $key => $value){
    // comparer la planete parcourue et la planete séelectionné
    if($planete["ancien_nom_planete"] == $value["nom_planete"]){
        // si la planete selectionné est la même que celle parcourue, alors on parcourt les données de la planète
        foreach ($planete as $key2 => $value2){
            // on ajoute toutes les données (modifiés) à l'exception de l'ancien_nom_planete (qu'on s'est servi d'id pour comparer) dans le fichier json
            if($key2 != "ancien_nom_planete") {
                $planetes[$key][$key2] = $planete[$key2]; 
            }     
        }
    }
    $index++;
}
// Mise à jour du fichier
file_put_contents($file_name, json_encode($planetes));
