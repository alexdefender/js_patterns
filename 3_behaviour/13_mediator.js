class User {
  constructor(name) {
    this.name = name;
    this.room = null;
  }

  send(message, to) {
    this.room.send(message, this, to);
  }

  receive(message, from) {
    console.log(`${from.name} => ${this.name}: ${message}`);
  }
}

class ChatRoom {
  constructor() {
    this.users = {};
  }

  register(user) {
    this.users[user.name] = user;
    user.room = this;
  }

  send(message, from, to) {
    if (to) {
      to.receive(message, from);
    } else {
      Object.keys(this.users).forEach((user) => {
        if (this.users[user] !== from) {
          this.users[user].receive(message, from);
        }
      });
    }
  }
}

const alex = new User('Alex');
const elena = new User('Elena');
const igor = new User('Igor');

const room = new ChatRoom();

room.register(alex);
room.register(elena);
room.register(igor);

alex.send('Hello', elena);
elena.send('Hello hello', alex);
igor.send('Hello everybody!');
