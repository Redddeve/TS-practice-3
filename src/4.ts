class Key {
  private readonly signature: number;
  constructor() {
    this.signature = Math.random();
  }

  getSignature(): number {
    return this.signature;
  }
}

class Person {
  constructor(private key: Key) {
    this.key = key;
  }
  getKey(): Key {
    return this.key;
  }
}

abstract class House {
  protected door: boolean;
  protected key: Key | undefined;
  private tenants: Person[] = [];

  abstract openDoor(key: Key): void;

  constructor(key: Key) {
    this.door = false;
    this.key = key;
  }

  comeIn(person: Person): void {
    if (this.door) {
      this.tenants.push(person);
      console.log(`${person} came in!`);
    } else {
      console.log('Door is closed!');
    }
  }
}

class MyHouse extends House {
  openDoor(key: Key): void {
    if (this.key?.getSignature() === key.getSignature()) {
      this.door = true;
      console.log('Key is correct, door is opened!');
    } else {
      console.log('Key is incorrect, door is closed!');
    }
  }
}

const key = new Key();

const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());

house.comeIn(person);

export {};
