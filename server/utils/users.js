
// class Person{
//   constructor( name , age ){
//     this.name = name;
//     this.age = age;
//   }
//   getUesrDescription () {
//     return `${this.name} is ${this.age} year(s) old.`;
//   }
// }

// var me = new Person('Paz' , 30);
// console.log(me.getUesrDescription());

class Users{
  
  constructor(){
    this.users = [];
  }

  addUser (id , name , room) {
    var user = {id , name , room }
    this.users.push(user);
    return user;
  }

  removeUser(id){
    var userRemoved = this.users.filter((user) => user.id === id);
    if(userRemoved){
      var updatedUsers = this.users.filter((user) => user.id !== id);
      this.users = updatedUsers;
    }
    
    return userRemoved[0];
  }

  getUser(id){

    var searchedUser = this.users.filter((user) => user.id === id);
    return searchedUser[0];
  }

  getUserList(room){
    
    var users = this.users.filter((user) => user.room === room);
    var namesArray = users.map((user) => user.name);
    return namesArray;

  }
  
}

module.exports = {Users};