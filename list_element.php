<?php
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    header($_SERVER["SERVER_PROTOCOL"] . " 405 Method Not Allowed", true, 405);
    exit;
}

header('Content-Type: application/json; charset=utf-8');

$file_name = "planetes.json";
$planetes = [];
if (file_exists($file_name)){
    //chargement de la liste planetes depuis le fichier
    $planetes = json_decode(file_get_contents($file_name),true);
}
//afficher le fichier planetes.json dans notre webapp
$json_text = json_encode($planetes);
echo $json_text;