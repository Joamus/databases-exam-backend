module.exports.seed = function(user) {
    user.bulkCreate([
        {email: "joakim@neonet.dk", password: "joamus", address: "Grønjordsvej 2703", city_postal_code: "2300",firstName: "Joakim", lastName: "Andersen"},
        {email: "anders@anderstofte.dk", password: "andersand", address: "Grønjordsvej 2805", cityPostalCode: "2300", firstName: "Anders", lastName: "Tofte"},
        {email: "capperba@gmail.com", password: "falster", address: "Sundbyvesterplads 1 4tv", cityPostalCode: "2300", firstName: "Casper", lastName: "Arnesen"} 
    ], {
        updateOnDuplicate: ["email", "password", "address", "cityPostalCode", "firstName", "lastName", ] 
    })
    .then(() => { 
        console.log('[MySQL] Users seeded ...') 
    })
    .catch((error) => {
        console.log('[MySQL] User seeding failed, users probably already exist ...')

    })


}