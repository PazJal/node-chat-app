const expect = require('expect');

const {Users} = require('./users');

describe('Users' , () => {

  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id:1,
      name: 'Mike',
      room: 'NodeA'
    } , {
      id:2,
      name: 'Jen',
      room: 'ReactA'
    },{
      id:3,
      name: 'Julie',
      room: 'NodeA'
    }]
  });

  it('should add new user' , () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Paz',
      room: 'Learn something.'
    }
    var resUser = users.addUser(user.id , user.name , user.room);
    expect(users.users).toEqual([user]);

  });

  it('should remove a user.', () => {

    removedUser = users.removeUser(1);
    expect(users.users.length).toBe(2);
    expect(removedUser.id).toBe(1);
  });

  it('should not remove user' , () => {
    removedUser = users.removeUser(4);
    expect(users.users.length).toBe(3);
    expect(removedUser).toNotExist();
  });


  it('should find user' , () => {

    var searchedUser = users.getUser(2);
    expect(searchedUser.id).toBe(2);

  });

  it('should not find user' , () => {
    var searchedUser = users.getUser(4);
    expect(searchedUser).toNotExist();
  });

  it('should reutrn names for NodeA.', () => {
    var userList = users.getUserList('NodeA');
    expect(userList).toEqual(['Mike' , 'Julie']);
  });

  it('should reutrn names for ReactA.', () => {
    var userList = users.getUserList('ReactA');
    expect(userList).toEqual(['Jen']);
  });
});