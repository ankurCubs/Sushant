const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const UserSchema = new mongoose.Schema({
    id:{
        type:Number
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['Admin','Customer']
    },
    pan:{
        type:String
    }

})

UserSchema.plugin(AutoIncrement, { inc_field: 'id' });

module.exports = mongoose.model('User',UserSchema);
