
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Product=require('./productModel');
const port = 5000;
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.get('/', (req, res) => {
  res.send('Hello World!');
  
});

app.delete('/products/:id',async(req,res)=>{
  try{
    const{id}=req.params;
    const product=await Product.findByIdAndDelete(id);
    if(!product){
      return res.status(404).json({message:`no item with this id ${id}`})
    }
    
    res.status(200).json(product)

  }catch(error){
    res.status(500).json({message:error.message})

  }
})
app.put('/products/:id',async(req,res)=>{
  try{
    const {id}=req.params;
    const product= await Product.findByIdAndUpdate(id,req.body);
    if(!product){
      return res.status(404).json({message:`no item with this id ${id}`})
    }
    const updatedProduct=await Product.findById(id);
    res.status(200).json(updatedProduct);
  }
  catch(error){
   res.status(500).json({message:error.message})
  }
});
app.get('/products/:id',async(req,res)=>{
try{
  const{id}=req.params;
  const products=await Product.findById(id);
  res.status(200).json(products);

  
    
}
catch(error){
// res.status(404).json({message:`no item with this id `});
res.status(500).json({message : error.message})

}
})

app.get('/products',async(req,res)=>{
try{
const products=await Product.find({});
res.status(200).json(products);

}catch(error)
 {
  res.status(500).json({message : error.message})
 }
})
app.post('/product',async(req,res)=>{
  // console.log(req.body);
  // res.send(req.body);
  try{
    const product= await Product.create(req.body);
    res.status(200).json(product);

  }catch(error){
   console.log(error.message); 
   res.status(500).json({message:error.message});
  }
})
mongoose.set("strictQuery",false)
mongoose.connect('mongodb+srv://ogyadelhamed:12345678ha@cluster0.3phe6zp.mongodb.net/')
  .then(() => console.log('Connected!')).catch(()=>{
    console.log('err')
  });


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  
});