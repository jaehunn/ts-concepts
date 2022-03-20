// 타입스크립트와 자바스크립트의 관계성

// 1. 모든 자바스크립트는 모든 타입스크립트다. 하지만, 모든 타입스크립트는 모든 자바스크립트가 될 수 없다.
{
  // 자바스크립트는 매개변수에 타입을 지정할 수 없다.
  function sayHi(name: string) {
    console.log(`Hi, ${name}!`);
  }

  sayHi("Jaehun");
}

// 2. 타입스크립트의 타입시스템의 목적은, 런타임 이전(컴파일 타임)에 오류를 찾아내는 것이다. (정적 타입시스템)
{
  const title = "TypeScript Concepts";

  // 미리 toUppercase() 가 없다고 알려준다.
  console.log(title.toUppercase());
}

// 3. 의도와 다르게 동작하는 것을 잡아내지만, 잘못된 의도로 잘못된 오류를 잡아낼 수 있다.
{
  const users = [
    {
      id: 0,
      name: "Jaehun",
      email: "jaehun@public.com",
      thumnail: "./1.jpg",
    },
    {
      id: 1,
      name: "Jimin",
      email: "jimin@example.com",
      thumnail: "./2.jpg",
    },
  ];

  for (const user of users) {
    console.log(user.thumbnail); // thumbnail 이 없다고 알려준다. (사실 thumbnail 이 맞지만)
  }
}

// 4. 명시적으로 타입을 정의해 (1) 데이터를 정의하는 곳과 (2) 데이터를 사용하는 곳에서 같은 원본을 바라보게 하기.
{
  interface User {
    id: number;
    name: string;
    email: string;
    thumnbnail: string;
  }

  const users: User[] = [
    {
      id: 0,
      name: "Jaehun",
      email: "jaehun@public.com",
      thumnbnail: "./1.jpg",
    },
    {
      id: 1,
      name: "Jimin",
      email: "jimin@example.com",
      thumnbnail: "./2.jpg",
    },
  ];

  for (const user of users) {
    console.log(user.thumnbnail);
  }
}

// 5. 타입스크립트 타입시스템은 자바스크립트의 런타임 동작을 모델링한다.
{
  const string = 2 + "3"; // 오류가 발생하지 않는다.

  const error = [] + 7; // 오류가 발생한다.
}

// 6. 타입체커를 통과하더라도 런타입에 오류가 발생할 수 있다. ('타입스크립트가 이해하는 값의 타입'과 '실제 값의 타입' 사이의 차이)
{
  const usernames = ["jaehun", "jimin"];

  console.log(usernames[2].toUpperCase()); // index: 2 에 대한 개체가 없음에도 오류가 발생하지않는다.
}
