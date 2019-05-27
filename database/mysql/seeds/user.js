module.exports.seed = function(user) {
    user.bulkCreate([
        {email: "joakim@neonet.dk", password: "joamus", address: "Grønjordsvej 2703", city_postal_code: "2300",first_name: "Joakim", last_name: "Andersen"},
        {email: "anders@anderstofte.dk", password: "andersand", address: "Grønjordsvej 2805", city_postal_code: "2300", first_name: "Anders", last_name: "Tofte"}
    ], {
        updateOnDuplicate: ["email", "password", "address", "city_postal_code", "first_name", "last_name", ] 
    })
    .then(() => { 
        console.log('[MySQL] Users seeded ...') 
    })
    .catch((error) => {
        console.log(error)

    })


}