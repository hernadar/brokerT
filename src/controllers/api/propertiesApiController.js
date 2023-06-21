const { validationResult } = require('express-validator')
const db = require('../../database/models');
const path = require('path')
const fs = require('fs');


const controller = {

    list: async (req, res) => {
        let consulta = "SELECT * FROM `properties`"
        const [properties, metadata] = await db.sequelize.query(consulta)
        if (properties.length > 0) {
            for (i = 0; i < properties.length; i++) {
                let imagen = properties[i].image

                let imagenBase64 = fs.readFileSync(path.join(__dirname, '../../../public/images/properties/' + imagen), { encoding: 'base64' })
                let extension = imagen.slice(-3)

                if (extension === 'png') {

                    properties[i].image = 'data:image/png;base64,' + imagenBase64
                }
                if (extension === 'jpg') {

                    properties[i].image = 'data:image/jpg;base64,' + imagenBase64
                }
                if (extension === 'jpeg') {

                    properties[i].image = 'data:image/jpge;base64,' + imagenBase64
                }
            }
        }
        let response = {
            meta: {
                status: 200,
                total: properties.length,
                url: 'api/properties'
            },
            data: properties
        }
        res.json(response);
    },
    
    create: async (req, res) => {


        // const resultValidation = validationResult(req);

        // if (resultValidation.errors.length > 0) {
        //     //debería analizar cada uno de los errores cargando en una variable
        //     // errors:resultValidation.mapped(), esta última función me convierte
        //     // el array en un objeto literal, para luego trabajarlo más comodo
        //     return res.send(resultValidation)
        // }

        let imageMainProperty

        imageMainProperty = req.files.image[0].filename


        //VALUES ("` + req.body.name + `", "` + req.body.description + `", "` + imageCompany + `", "` + req.body.areas_id + `", "` + Number(req.body.pricePoint) + `", "` + req.body.address + `", "` + req.body.whatsapp + `, '0.5'")`
        // let consulta = `INSERT INTO properties (mode, type, image, price, money, address, location, departament,province,bedroom,bathroom,m2,garage,detail, pets, credit, qtyScope, pool, expenses, expensesCost, private, antiquity, careful, floors, heat, furniture, geolink) VALUES ("Venta", "Casa", "image5", "` + Number(95000) + `", "U$S", "San martin 8374", "Gob Benegas","Godoy Cruz","Mendoza","` + Number(3) + `","` + Number(2) + `","` + Number(180) + `", true, 'Este es el detalle de la propiedad', true, true,` + Number(5) + `, true, true,` + Number(15000) + `, true, '10 años', 'Excelente estado', ` + Number(2) + `, true, false, '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3348.12590768394!2d-68.85881772785474!3d-32.94768507193476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e0bca920275d9%3A0x3b70783bc551ee6!2sJoaqu%C3%ADn%20V.%20Gonz%C3%A1lez%202174%2C%20M5504HLH%20Godoy%20Cruz%2C%20Mendoza!5e0!3m2!1ses-419!2sar!4v1686848108413!5m2!1ses-419!2sar" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>')`
        let consulta = `INSERT INTO properties (mode, type, image, price, money, address, location, departament,province,bedroom,bathroom,m2,garage,detail,pets,credit,qtyScope,pool,expenses,expensesCost,private,antiquity,careful,floors,heat,furniture,geoLink,m2Total) VALUES ('` + req.body.mode + `', '` + req.body.type + `','` + imageMainProperty + `', '` + Number(req.body.price) + `', '` + req.body.money + `', '` + req.body.address + `', ' ` + req.body.location + `',' ` + req.body.departament + `','` + req.body.province + `','` + Number(req.body.bedroom) + `','` + Number(req.body.bathroom) + `','` + Number(req.body.m2) + `', '` + req.body.garage + `', ' ` + req.body.detail + `', ' ` + Number(req.body.pets) + `', '` + Number(req.body.credit) + `', '` + Number(req.body.qtyScope) + `', '` + Number(req.body.pool) + `', '` + Number(req.body.expenses) + `', '` + Number(req.body.expensesCost) + `', '` + Number(req.body.private) + `', '` + req.body.antiquity + `', '` + req.body.careful + `', '` + Number(req.body.floors) + `', '` + Number(req.body.heat) + `', '` + Number(req.body.furniture) + `', '` + req.body.geoLink + `', '` + Number(req.body.m2Total) + `')`
        const [property, metadata] = await db.sequelize.query(consulta)

        let consulta2 = `SELECT MAX(id) ultimo FROM properties;`
        const [maxProperties, metadata2] = await db.sequelize.query(consulta2)

        let galleryProperty = [];

        if (req.files.gallery !== undefined) {
            req.files.gallery.forEach(element => {
                galleryProperty.push(element.filename)
            });
            for (let i = 0; i < galleryProperty.length; i++) {
                let consulta3 = `INSERT INTO propertypictures (image, properties_id) VALUES ('` + galleryProperty[i] + `', '` + maxProperties[0].ultimo + `')`
                const [propertyPictures, metadata3] = await db.sequelize.query(consulta3)

            }
        }


        let response = {
            meta: {
                status: 200,
                total: property.length,
                url: 'api/properties/create'
            },
            data: property
        }
        res.json(response);


    },
    edit: async (req, res) => {


        // const resultValidation = validationResult(req);

        // if (resultValidation.errors.length > 0) {
        //     //debería analizar cada uno de los errores cargando en una variable
        //     // errors:resultValidation.mapped(), esta última función me convierte
        //     // el array en un objeto literal, para luego trabajarlo más comodo
        //     return res.send(resultValidation)
        // }


        // Actualizo solo los campos de texto
        let consulta = `UPDATE properties SET mode='` + req.body.mode + `',
        type='`+ req.body.type + `', 
        price='` + Number(req.body.price) + `', 
        money='`+ req.body.money + `', 
        address='` + req.body.address + `', 
        location=' ` + req.body.location + `', 
        departament=' ` + req.body.departament + `',
        province='`+ req.body.province + `',
        bedroom='` + Number(req.body.bedroom) + `',
        bathroom='` + Number(req.body.bathroom) + `',
        m2='` + Number(req.body.m2) + `',
        garage='`+ req.body.garage + `',
        detail=' `+ req.body.detail + `',
        pets=' ` + Number(req.body.pets) + `',
        credit='` + Number(req.body.credit) + `',
        qtyScope='` + Number(req.body.qtyScope) + `',
        pool='` + Number(req.body.pool) + `',
        expenses='` + Number(req.body.expenses) + `',
        expensesCost='` + Number(req.body.expensesCost) + `',
        private='` + Number(req.body.private) + `',
        antiquity='` + req.body.antiquity + `',
        careful='` + req.body.careful + `',
        floors='` + Number(req.body.floors) + `',
        heat='` + Number(req.body.heat) + `',
        furniture='` + Number(req.body.furniture) + `',
        geoLink='` + req.body.geoLink + `',
        m2Total='` + Number(req.body.m2Total) + `'  
        WHERE id='` + req.params.idProperty + `'`
        const [property, metadata] = await db.sequelize.query(consulta)
        //Analizo si se enviaron archivos para actualizar base y eliminar archivos que no se utilicen más
        if (req.files.image !== undefined) {
            //Se envió una nueva imagen de portada 
            //Debo eliminar el archivo exitente y actualzar la DB con el nuevo nombre de archivo
            let consulta1 = `SELECT image from properties WHERE id='` + req.params.idProperty + `'`
            const [image, metadata] = await db.sequelize.query(consulta1)
            try {
                fs.unlinkSync(path.join(__dirname, '../../../public/images/properties/') + image[0].image)
                console.log('File removed')
            } catch (err) {
                console.error('Something wrong happened removing the file', err)
            }
            let imageMainProperty
            imageMainProperty = req.files.image[0].filename
            let consulta2 = `UPDATE properties SET image='` + imageMainProperty + `' 
            WHERE id='` + req.params.idProperty + `'`
            const [newImage, metadata1] = await db.sequelize.query(consulta2)
        }




        //Analizo si enviaron archivos de la galeria de imagenes para reemplazarlos por los existes y eliminar archivos exitentes
        if (req.files.gallery !== undefined) {
            let consulta3 = `SELECT image from propertypictures WHERE properties_id='` + req.params.idProperty + `'`
            const [images, metadata2] = await db.sequelize.query(consulta3)
            for (let i = 0; i < images.length; i++) {
                try {
                    fs.unlinkSync(path.join(__dirname, '../../../public/images/properties/') + images[i].image)
                    console.log('File removed')
                } catch (err) {
                    console.error('Something wrong happened removing the file', err)
                }
            }
            //Elimino todos los registros en la tabla de imagenes con el ID correspondiente 
            let consulta4 = `DELETE from propertypictures WHERE properties_id='` + req.params.idProperty + `'`
            const [deleteImages, metadata] = await db.sequelize.query(consulta4)

            // Los vuelvo a crear con los nuevos archivos   
            let galleryProperty = [];
            req.files.gallery.forEach(element => {
                galleryProperty.push(element.filename)
            });
            for (let i = 0; i < galleryProperty.length; i++) {
                let consulta3 = `INSERT INTO propertypictures (image, properties_id) VALUES ('` + galleryProperty[i] + `', '` + req.params.idProperty + `')`
                const [propertyPictures, metadata3] = await db.sequelize.query(consulta3)

            }
        }


        let response = {
            meta: {
                status: 200,
                total: property.length,
                url: 'api/properties/create'
            },
            data: property
        }
        res.json(response);


    },
    delete: async (req, res) => {
        
        //Verifico si existen archivos en la galeria de imagenes y los elimino
        let consulta3 = `SELECT image from propertypictures WHERE properties_id='` + req.params.idProperty + `'`
        const [images, metadata2] = await db.sequelize.query(consulta3)
        console.log('imagenes de galeria ' + images)
        if (images.length !== undefined) {
            for (let i = 0; i < images.length; i++) {
                try {
                    fs.unlinkSync(path.join(__dirname, '../../../public/images/properties/') + images[i].image)
                    console.log('File removed')
                } catch (err) {
                    console.error('Something wrong happened removing the file', err)
                }
            }
        }
        //Elimino el archivo de imagen de la portada
        let consulta = "SELECT * from properties WHERE id='" + req.params.idProperty + "'";
        const [property, metadata] = await db.sequelize.query(consulta)
        console.log('propiedad a eliminar' + property)
        try {
            fs.unlinkSync(path.join(__dirname, '../../../public/images/properties/') + property[0].image)
            console.log('File removed')
        } catch (err) {
            console.error('Something wrong happened removing the file', err)
        }
        //Elimino registros en ambas tablas
        let consulta4 = `DELETE from propertypictures WHERE properties_id='` + req.params.idProperty + `'`
        const [images4, metadata4] = await db.sequelize.query(consulta4)
        let consulta5 = `DELETE from properties WHERE id='` + req.params.idProperty + `'`
        const [property5, metadata5] = await db.sequelize.query(consulta5)
        let response = {
            meta: {
                status: 200,
                total: property5.length,
                url: 'api/properties/:idProperty/delete'
            },
            data: property5
        }
        res.json(response);


    },

    detail: async (req, res) => {

        let consulta = "SELECT * from properties WHERE id='" + req.params.idProperty + "'";
        const [property, metadata] = await db.sequelize.query(consulta)

        for (i = 0; i < property.length; i++) {
            let imagen = property[i].image

            let imagenBase64 = fs.readFileSync(path.join(__dirname, '../../../public/images/properties/' + imagen), { encoding: 'base64' })
            let extension = imagen.slice(-3)

            if (extension === 'png') {

                property[i].image = 'data:image/png;base64,' + imagenBase64
            }
            if (extension === 'jpg') {

                property[i].image = 'data:image/jpg;base64,' + imagenBase64
            }
            if (extension === 'jpeg') {

                property[i].image = 'data:image/jpg;base64,' + imagenBase64
            }
        }
        let response = {
            meta: {
                status: 200,
                total: property.length,
                url: 'api/properties/:idProperty'
            },
            data: property
        }
        res.json(response);


    },
    images: async (req, res) => {

        let consulta = "SELECT * from propertypictures WHERE properties_id='" + req.params.idProperty + "'";
        const [property, metadata] = await db.sequelize.query(consulta)

        for (i = 0; i < property.length; i++) {
            let imagen = property[i].image

            let imagenBase64 = fs.readFileSync(path.join(__dirname, '../../../public/images/properties/' + imagen), { encoding: 'base64' })
            let extension = imagen.slice(-3)

            if (extension === 'png') {

                property[i].image = 'data:image/png;base64,' + imagenBase64
            }
            if (extension === 'jpg') {

                property[i].image = 'data:image/jpg;base64,' + imagenBase64
            }
            if (extension === 'jpeg') {

                property[i].image = 'data:image/jpg;base64,' + imagenBase64
            }
        }
        let response = {
            meta: {
                status: 200,
                total: property.length,
                url: 'api/properties/:idProperty'
            },
            data: property
        }
        res.json(response);


    },
    //     edit: async (req, res) => {

    //         let consulta = "SELECT companies.id, companies.name, description, recomendations, image, pricePoint, areas.name as areas_name from companies JOIN areas WHERE companies.id='" + req.params.idCompany + "' AND companies.areas_id = areas.id";
    //         const [company, metadata] = await db.sequelize.query(consulta)

    //         for ( i=0 ; i<company.length ; i++ ) {
    //             let imagen = company[i].image

    //             let imagenBase64 = fs.readFileSync(path.join(__dirname,'../../../public/images/logos/'+ imagen),{encoding: 'base64'})
    //             let extension = imagen.slice(-3)

    //             if (extension ==='png') {

    //                 company[i].image='data:image/png;base64,'+ imagenBase64
    //             }
    //             if (extension ==='jpg') {

    //                 company[i].image='data:image/jpg;base64,'+ imagenBase64
    //             }
    //         }
    //         let response = {
    //             meta: {
    //                 status: 200,
    //                 total: company.length,
    //                 url: 'api/companies/profile/edit/:idCompany'
    //             },
    //             data: company
    //         }
    //         res.json(response);


    //     },
    //     update: async (req, res) => {
    //         let imageCompany

    //         if (req.file == undefined) {
    //             imageCompany = 'company.png'
    //         } else {
    //             imageCompany = req.file.filename
    //         }

    //         let consulta = `UPDATE recomendame.companies SET name = '` + req.body.name + `', description = '` + req.body.description + `', image = '` + imageCompany + `', areas_id = '`  + req.body.areas_id + `', pricePoint = '`  + parseInt(req.body.pricePoint) + `' WHERE (id = '` + req.params.idCompany + `')`

    //         const [company, metadata] = await db.sequelize.query(consulta)
    //         let response = {
    //             meta: {
    //                 status: 200,
    //                 total: company.length,
    //                 url: 'api/companies/profile/edit/:idCompany'
    //             },
    //             data: company
    //         }
    //         res.json(response);


    //     },
    //     delete: (req, res) => {
    //         db.Company.destroy({
    //             where: {
    //                 id: req.params.idCompany
    //             }
    //         })
    //             .then(function (response) {
    //                 return res.redirect('/companies')
    //             })
    //             .catch(function (e) {
    //                 console.log(e)
    //             })
    //     }
   
}

module.exports = controller