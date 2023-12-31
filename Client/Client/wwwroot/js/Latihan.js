﻿console.log("testiingg");

//ajax
$.ajax({
    url: "https://pokeapi.co/api/v2/pokemon/",
    success: function (result) {
        //console.log(result.results);
        //var temp = "";

        //$.each(result.results, (key,val) => {
        //    temp += "<li>"+val.name+"</li>";
        //})
        //console.log(temp);
        //$("#listpoke").html(temp);
    }
}).done((result) => {
    var temp = "";

    $.each(result.results, (key, val) => {
        temp += `<tr>
                    <td>${key + 1}</td>
                    <td>${val.name}</td>
                    <td><button type="button" class="btn btn-primary" onclick="detail('${val.url}')" data-bs-toggle="modal" data-bs-target="#modalPoke">Detail</button></td>
                 </tr>`
    })
    $("#tbodyPoke").html(temp);
}).fail((error) => {
    console.log(error);
})

function getTypesHtml(types) {
    return types.map(type => getBadgeClass(type.type.name)).join('');
}

function getBadgeClass(typeName) {
    switch (typeName) {
        case 'fire':
            return '<span class="badge bg-danger">Fire</span>';
        case 'grass':
            return '<span class="badge bg-success">Grass</span>';
        case 'flying':
            return '<span class="badge bg-info text-dark">Flying</span>';
        case 'poison':
            return '<span class="badge bg-warning text-dark">Poison</span>';
        case 'water':
            return '<span class="badge bg-primary">Water</span>';
        case 'bug':
            return '<span class="badge bg-success">Bug</span>';
        case 'normal':
            return '<span class="badge bg-secondary">Normal</span>';
        default:
            return '';
    }
}

function detail(stringUrl) {
    $.ajax({
        url: stringUrl
    }).done((res) => {
        console.log(res);

        $("#pokeName").html(res.name);
        $("#photoPokemon").attr("src", res.sprites.other.dream_world.front_default);
        $("#pokeType").html(getTypesHtml(res.types));
        $("#pokeHeight").html(`<b>Height : </b>` + res.height);
        $("#pokeWeight").html(`<b>Weight : </b>` + res.weight);
        $("#pokeHP").html(`<b>HP : </b>` + res.stats[0].base_stat);
        $("#pokeAttack").html(`<b>Attack : </b>` + res.stats[1].base_stat);
        $("#pokeDefense").html(`<b>Defense : </b>` + res.stats[2].base_stat);
        //$(".stats").html(`
        //    <h6 class="fw-bold">
        //        Stats :
        //    </h6>
        //    <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" style="height: 25px">
        //            <div class="progress-bar" style="width: ${res.stats[0].base_stat}%"> <b>HP : </b> ${res.stats[0].base_stat}</div>
        //    </div>

        //`);
    })
}