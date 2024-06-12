
const User = require("./../db/user")

async function addUser(userModel){
    try {
        // Encontrar el usuario con el id más alto
        const lastUser = await User.findOne().sort({ id: -1 });
        console.log('Last user:', lastUser);

        const newId = lastUser ? lastUser.id + 1 : 1;
        console.log('New ID:', newId);

        // Crear el nuevo usuario con el nuevo id
        let user = new User({
            id: newId,
            ...userModel
        });
        console.log('New user before save:', user);

        // Guardar el nuevo usuario
        await user.save();
        console.log('User saved:', user);

        return user.toObject();
    } catch (error) {
        console.error('Error adding user:', error);
        throw new Error('Error adding user');
    }
}

async function getUsers(){
    const users = await User.find();
    return users.map(x=>x.toObject())
}

async function getUsersById(id){
    const users = await User.findOne({id: id});
    return users.toObject();
}

async function updateUser(id,userModel){
    const filter = {id: id};
    await User.findOneAndUpdate(filter, userModel);
}

async function delUserById(id){
    await User.findOneAndDelete({id: id});
}

async function loginAction(email, password) {
    const user = await User.findOne({ email: email });

    if (!user) {
        return null;
    }

    if (user.password === password) {
        return user;
    } else {
        return null; 
    }
}

module.exports={addUser, getUsers, getUsersById, updateUser, delUserById, loginAction}