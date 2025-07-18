import multer from "multer"
import DataParser from "datauri/parser.js"
import path from "path"

//Disk Storage
// const storage = multer.diskStorage({
//  destination:(req,file,cb)=>{
//     cb(null,"public/uploads")
//  },
 
//  filename:(req,file,cb)=>{
//     const filename = file.originalname
//     cb(null,filename)
//  }
// })

//Memory Storage
const storage = multer.memoryStorage();


export const upload = multer({ storage });
const parser = new DataParser()

export const formatImage = (file)=>{
   // console.log(file);
   const fileExtension = path.extname(file.originalname).toString();
   return parser.format(fileExtension,file.buffer).content
   
}