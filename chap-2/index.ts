// 코드 생성과 타입의 관계성

// 1. 타입스크립트의 컴파일러는 다음 동작을 독립적으로 수행한다.
// (1)브라우저에서 구버전의 자바스크립트를 운용할 수 있도록 트랜스파일하고, (2)타입의 오류를 체크한다.
{
  // 타입 오류가 있는 코드도 컴파일이 가능하다. (tsc index.ts -> index.js 생성됨.)
  let username = "jaehun";
  username = 1;

  // 만약 타입체커가 오류를 잡았을때 컴파일되게 하지 않으려면, noEmitOnError 를 설정한다.
}

// 2. 컴파일 타임에 타입체킹하고, 런타임에는 타입이 제거되어 타입체킹이 불가능하다.
{
  interface UserA {
    id: number;
    name: string;
    email: string;
  }

  interface UserB extends UserA {
    phone: string;
  }

  type User = UserA | UserB;

  function printUserInfo(user: User) {
    // instanceof 체크는 런타임에 일어나므로 타입을 사용할 수 없다.
    if (user instanceof UserB) {
      // ...
    }

    // user 객체에는 'phone' 필드가 있을수도 없을수도 있으므로, 타입을 좁혀 타입이 유지되도록 할 필요가 있다.
    if ("phone" in user) {
      console.log(user.phone);
    }
  }
}

// 3. '태깅' 으로 타입정보를 유지하기
{
  interface UserA {
    kind: "UserA";
    id: number;
    name: string;
    email: string;
  }

  // 필드에 타입을 새긴다.
  interface UserB {
    kind: "UserB";
    id: number;
    name: string;
    email: string;
    phone: string;
  }

  type User = UserA | UserB;

  function printUserInfo(user: User) {
    if (user.kind === "UserB") {
      console.log(user.phone);
    }
  }
}

// 4. 클래스로 타입 유지하기
{
  class UserA {
    constructor(public id: number, public name: string) {}
  }

  class UserB extends UserA {
    constructor(public id: number, public name: string, public email: string) {
      super(id, name);
    }
  }

  type User = UserA | UserB;

  function printUserInfo(user: User) {
    // 클래스로 선언하면 타입과 값을 둘 다 사용할 수 있다.
    if (user instanceof UserB) console.log(user.email);
  }
}

// 5. 타입을 정제하는 타입연산은 런타임에 영향을 영향을 주지않는다.
{
  function printUserId(userId: string | number) {
    console.log(userId as string);
  }

  // 변환된 코드 (아무런 변화가 없어 타입스크립트를 사용안하는 것만 못하다.)
  function printUserId(userId) {
    console.log(userId);
  }

  // 타입을 정제하는 행위는 단언보다는 자바스크립트 연산으로 정제되어야하고, 런타임에 타입을 체크할 수 있어야한다.
  function printUserId(userId: string | number) {
    const result = typeof userId === "string" ? Number(userId) : userId;

    console.log(result);
  }
}

// 6. 선언 타입과 런타임 타입의 불일치
{
  // 명시적으로 타입을 정의해서 타입을 사용한 데이터, 데이터를 사용하는 곳에서 원본(정의한 타입)을 바라보도록 해야한다고 했다.
  // 하지만, 정의한 타입 또한 런타임 타입과 다를 수 있음을 명심해야한다.
}

// 7. 타입스크립트에서는 구현체가 다른 함수 오버로딩은 지원하지않는다.
{
  // 단지, 타입 수준에서만 함수 오버로딩을 지원한다. (구현체는 오직 하나)
  function add(value: string, other: string): string;
  function add(value: number, other: number): number;
  function add(value: any, other: any): any {
    return value + other;
  }
}

// 8. 타입은 전혀 런타임 성능에 영향을 주지않는다.
{
  // 트랜스파일 시점에 타입은 제거되기 때문에 런타임에 타입이 영향이 주는 일은 없다.
}
