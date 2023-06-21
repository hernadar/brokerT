var express = require('express');
var router = express.Router();
const path =require('path');
const propertiesApiController=require('../../controllers/api/propertiesApiController');

// Requiero Multer para recibir la imagen del perfil de usuario y lo configuro
const multer=require('multer');

const storageProperty = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, path.join(__dirname, '../../../public/images/properties'));
  },
  filename: function(req,file,cb){
    
    cb(null, `${Date.now()}_img${path.extname(file.originalname)}`);

  }
})
const  uploadFileProperty = multer ({storage: storageProperty});
const multileUploadPropierty = uploadFileProperty.fields([{name:'image',maxCount: 1}, {name:'gallery', maxCount:20}])


// //Requiero Express_validator para validar los datos que vienen del formulario y cnfiguro las validaciones que debe realizar

// const { body }=require ('express-validator');
// const validationsCompany=[
//   body('name').notEmpty().withMessage('Tienes que escribir un Nombre de empresa'),
//   body('areas_id').notEmpty().withMessage('Tienes que escribir un rubro'),
//   body('description').notEmpty().withMessage('Tienes que escribir una breve descripcion'),
//   body('pricePoint')
//           .notEmpty().withMessage('Tienes que escribir un precio').bail()
//           .isNumeric().withMessage('Tienes que escribir valor numérico del precio'),
//   body('image').custom((value, {req}) =>{
//     let file = req.file;
//     let acceptedExtensions=['.jpg','.png','.gif','.webp']
    
//     if (!file) {
   
//     } else {
//       let fileExtension = path.extname(file.originalname)
     
//         if (!acceptedExtensions.includes(fileExtension)) {
//         throw new Error('Tienes que subir una imagen en formato válido .jpg, .png, .gif')
//         } 
//     }
    
      
//     return true;
//   })
// ]

// const validationsProduct=[
//   body('name').notEmpty().withMessage('Tienes que escribir un Nombre de producto'),
//   body('points')
//           .notEmpty().withMessage('Tienes que escribir una cantidad de puntos de canje').bail()
//           .isNumeric().withMessage('Tienes que escribir valor numérico de puntos'),
//   body('image').custom((value, {req}) =>{
//    console.log(req.file)
//     let file = req.file;
//     let acceptedExtensions=['.jpg','.png','.gif','.webp']
    
//     if (!file) {
//       console.log('no viene imagen de producto')
//     } else {
      
//       let fileExtension = path.extname(file.originalname)
     
//         if (!acceptedExtensions.includes(fileExtension)) {
//         throw new Error('Tienes que subir una imagen en formato válido .jpg, .png, .gif')
//         } 
//     }
    
      
//     return true;
//   })
// ]

// Lista de Propiedades
router.get('/', propertiesApiController.list);


// Procesar el registro de nueva propiedad
router.post('/create', multileUploadPropierty, propertiesApiController.create);

//Detalle de Propiedad
router.get('/:idProperty', propertiesApiController.detail);
//Imagenes de la Propiedad
router.get('/:idProperty/images', propertiesApiController.images);
// Editar Propiedad
router.post('/:idProperty/edit', multileUploadPropierty, propertiesApiController.edit);
// Eliminar Propiedad
router.post('/:idProperty/delete', propertiesApiController.delete);


module.exports = router;