

import mongoose from 'mongoose';


const Schema = mongoose.Schema

const GrandeurSchema = new Schema({
  intitule: {
    type: String,
    required: true
  },
  unite: {
    type: String,
    required: true
  },
  resolution: {
    type: Number,
    required: true,
  },
    offset: {
    type: Number,
    required: true,
  },
  taille: {
    type: Number,
    required: true
  }
});




//create the model
const GrandeurModel = mongoose.model('grandeursPhysique', GrandeurSchema);


//export the model
module.exports = GrandeurModel;

//get all grandeur Physique
module.exports.getAllGrandeurs = (root,args,context) => {
  console.log('context.req',context.req.cookies)

  return GrandeurModel.find().exec()
}


// get grandeur physique by ID

  module.exports.getGrandeur = (root,args) => {
    return GrandeurModel.findById(args.id).exec()
  }
  

//add grandeur Phy
module.exports.addgrandeur=(root , args)=>{
    const gModel = new GrandeurModel( {intitule:args.intitule, unite:args.unite,resolution:args.resolution,offset:args.offset,taille:args.taille});
    const newGrandeur = gModel.save();
    return newGrandeur
  } 

  //update grandeur Phy
module.exports.updategrandeur=(root,args)=>{
    return GrandeurModel.findByIdAndUpdate(
      args.id,
      { $set: { ...args.data } },
      { new: true }
    )    
    .catch(err => new Error('Couldn\'t Update  ', err));
  }

  //remove grandeur Phy
  module.exports.removegrandeur=(root, args)=> {
    const removedgrandeur = GrandeurModel.findByIdAndRemove(args.id).exec();
    if (!removedgrandeur) {
      throw new Error('Error removing grandeur physique')
    }
    return removedgrandeur;
  }
  