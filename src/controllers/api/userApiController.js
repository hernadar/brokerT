const { validationResult } = require('express-validator');

const db = require('../../database/models');

const path = require('path')
const fs= require('fs');





const controller = {
    list: async (req, res) => {
        let consulta= "SELECT * FROM `users`"
        const [users, metadata] = await db.sequelize.query(consulta)
                 let response = {
                    meta: {
                        status : 200,
                        total: users.length,
                        url: 'api/users'
                    },
                    data: users
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
       
     

        
        let consulta = `INSERT INTO users (name, lastname, phone, email, password) VALUES ("` + req.body.name + `", "` + req.body.lastname + `", "` + req.body.phone + `", "` + req.body.email + `", "` + req.body.password + `")`
        const [user, metadata] = await db.sequelize.query(consulta)
          
        let response = {
            meta: {
                status : 200,
                total: user.length,
                url: 'api/users/register'
            },
            data: user
            }
            res.json(response);  
 
       
    },
    recoverPass: async (req, res) => {
        
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            //debería analizar cada uno de los errores cargando en una variable
            // errors:resultValidation.mapped(), esta última función me convierte
            // el array en un objeto literal, para luego trabajarlo más comodo
            return res.send(resultValidation)
        }
       
       
        
        let consulta = `UPDATE 'recomendame'.'users' SET 'password' = '` + req.body.password + `'WHERE ('email' = '` + req.body.email + `')`
        const [user, metadata] = await db.sequelize.query(consulta)
          
        return user
 
       
    },
   

   
    profile: async (req, res) => {
        let consulta= "SELECT * FROM users WHERE id='" + req.params.id + "'"
        const [user, metadata] = await db.sequelize.query(consulta)
        
       
        
        let response = {
                    meta: {
                        status : 200,
                        total: user.length,
                        url: 'api/user/profile/:iduser'
                    },
                    data: user
                    }
                    res.json(response);               
            },
    update: (req, res) => {
       
        // let imageProfile

        // if (req.file == undefined) {
        //     imageProfile = 'user.png'
        // } else {
        //     imageProfile = req.file.filename
        // }

        // // encrypto la contraseña 
        // let userToEdit = {
        //     ...req.body,
        //     password: bcryptjs.hashSync(req.body.password, 10),
        //     image: imageProfile,
        // }
        // db.User.update(userToEdit, {
        //     where: {
        //         id: req.params.id
        //     }
        // })
        //     .then(function () {
        //         return res.redirect('/users')
        //     })
        //     .catch(function (e) {
        //         console.log(e)
        //     })
    },

    delete: (req, res) => {
        db.User.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(function (response) {
                return res.redirect('/users')
            })
            .catch(function (e) {
                console.log(e)
            })

    },
    logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	},
 
}
module.exports = controller