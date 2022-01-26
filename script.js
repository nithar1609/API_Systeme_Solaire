document.addEventListener("DOMContentLoaded", async () => {
    await load_data();
});
// La fonction qui permet de recharcher planetes.json et d'afficher sur le webapp.
async function load_data() {
    //récupérer le contenu des éléments grâce à un id unique  
    const contentElement = document.getElementById("content");
    const modifierElement = document.getElementById("modifier_planete");
    const supprimerElement = document.getElementById("supprimer_planete");
    
    const request = await fetch("/list_element.php");
    const planetes = await request.json();
    
    contentElement.innerHTML = "";
    modifierElement.innerHTML = "";
    supprimerElement.innerHTML = "";

    for (const planete of planetes) {
        //affichage d'une planète
        contentElement.innerHTML += `<div class="planete">
        <p style="color:yellow; font-weight:bold;">${planete.nom_planete}<br></p>
        <img src="${planete.img_planete}">
        <p>Masse : ${planete.masse_planete} kg<br>Densité : ${planete.densite_planete} g/cm³<br> Température_Min : ${planete.tempMin_planete} °C<br>Température_Max : ${planete.tempMax_planete} °C<br></p></div>`;
        //affichage du sélecteur pour modifier ou supprimer une planète
        modifierElement.innerHTML += `<option value="${planete.nom_planete}">${planete.nom_planete}</option>`;
        supprimerElement.innerHTML += `<option value="${planete.nom_planete}">${planete.nom_planete}</option>`;
    }
    //récupérer les données de la planète correspondant à l'id sélectionné et pré-remplir les données avec ceux inscrits dans le fichier planetes.json
    document.getElementById("modifier_planete").addEventListener("change",async function(){
        const request = await fetch("/list_element.php");
        const planetes = await request.json();
        //parcourir toutes les planètes de planetes.json
        for(const planete of planetes){
            // comparer si la planete correspond à celle sélectionné
            if (planete.nom_planete == this.value){
                //si la planete parcourue correspond à celle sélectionné, on pré-remplit les données existants en tant que value de nos input. Ainsi, les valeurs non modifiés resteront les-mêmes et ne seront donc pas supprimés.
                document.getElementById("nouveau_nom_planete").value=planete.nom_planete;
                document.getElementById("nouveau_masse_planete").value=planete.masse_planete;
                document.getElementById("nouveau_densite_planete").value=planete.densite_planete;
                document.getElementById("nouveau_tempMin_planete").value=planete.tempMin_planete;
                document.getElementById("nouveau_tempMax_planete").value=planete.tempMax_planete;
                document.getElementById("nouveau_img_planete").value=planete.img_planete;
            }
        }
    });

}
//fonction pour ajouter une planète
async function send_planete() {
    // Récupérer les données de la planète
    const nom_planete = document.getElementById("nom_planete").value;
    const masse_planete = document.getElementById("masse_planete").value;
    const densite_planete = document.getElementById("densite_planete").value;
    const tempMin_planete = document.getElementById("tempMin_planete").value;
    const tempMax_planete = document.getElementById("tempMax_planete").value;
    const img_planete = document.getElementById("img_planete").value;
    // Construire la planète
    const planete = {
        "nom_planete": nom_planete, "masse_planete": masse_planete, "densite_planete":densite_planete, "tempMin_planete":tempMin_planete, "tempMax_planete":tempMax_planete, "img_planete": img_planete
    };
    // Envoyer la planete en POST
    await fetch("/add_element.php", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(planete)
    });
    // afficher la planète ajoutés
    await load_data();
}

// fonction pour modifier les données d'une planète
async function update_planete() {
    // Récupérer la value du sélecteur pour savoir quelle planete est à modifier et les valeurs saisis; Si rien n'est saisi, les valeurs par défaut qu'on a pré-rempli ci dessus (avec les données qui existaient déjà poufr la planète sélectionné) seront sauvegardés dans notre planetes.json 
    const select = document.getElementById("modifier_planete").value;
    const nom_planete = document.getElementById("nouveau_nom_planete").value;
    const masse_planete = document.getElementById("nouveau_masse_planete").value;
    const densite_planete = document.getElementById("nouveau_densite_planete").value;
    const tempMin_planete = document.getElementById("nouveau_tempMin_planete").value;
    const tempMax_planete = document.getElementById("nouveau_tempMax_planete").value;
    const img_planete = document.getElementById("nouveau_img_planete").value;
    // On reconstruit la planète avec ces données
    const planete = {
        "nom_planete": nom_planete, "ancien_nom_planete":select, "masse_planete": masse_planete, "densite_planete":densite_planete, "tempMin_planete":tempMin_planete, "tempMax_planete":tempMax_planete, "img_planete": img_planete
    };
    // On envoie la planète modifié en PUT (vu qu'il existe déjà) pour le modifier à la place de l'ancien
    await fetch("/edit_element.php", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(planete)
    });
    // On affiche la planète avec les nouvelles données modifiés (ou pas)
    await load_data();
}
// Fonction pour supprimer une planete
async function delete_planete() {
    // Récupérer la value du sélecteur pour savoir quelle planete est à supprimer
    const select = document.getElementById("supprimer_planete").value;
    // On envoi la planete en DELETE pour supprimer
    await fetch("/delete_element.php", {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "nom_planete": select
        })
    });
    // On affiche pour bien montrer que la planete a été supprimé
    await load_data();
}