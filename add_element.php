<?php

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header($_SERVER["SERVER_PROTOCOL"] . " 405 Method Not Allowed", true, 405);
    exit;
}

$inputJSON = file_get_contents('php://input'); // récupération du corps de la requete HTTP
$planete = json_decode($inputJSON, TRUE);
$file_name = "planetes.json";

if(!isset($planete["nom_planete"]) or !isset($planete["masse_planete"]) or !isset($planete["densite_planete"]) or !isset($planete["tempMin_planete"]) or !isset($planete["tempMax_planete"]) or !isset($planete["img_planete"])){
    header($_SERVER["SERVER_PROTOCOL"] . " 400 miss some(s) value(s) in request", true, 400);
    exit;
}

$planetes = [];
if (file_exists($file_name)) {
    // chargement de la liste des planetes depuis le fichier
    $planetes = json_decode(file_get_contents($file_name), true);
}
// ajouter la nouvelle planete dans planetes.json
array_push($planetes, $planete);

// Mise à jour du fichier
file_put_contents($file_name, json_encode($planetes));