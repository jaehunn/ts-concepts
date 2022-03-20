// 타입 시스템

// 1. IDE 적극 이용하기.

// 2. 타입 = 값들의 집합체(범위)
{
  // (1) never 타입 = 공집합(ø)
  const v: never = 12;

  // (2) literal 타입 = 원소
  type ERROR_MESSEAGE = "상품을 불러오지 못했습니다.";

  // (3) | Operator(= union)  = 합집합
  type MESSAGE =
    | "상품을 불러오지 못했습니다."
    | "네트워크 에러가 발생했습니다.";

  // 타입 체커의 역할: 이 집합이 내가 정의한 집합의 부분집합인가? 를 확인하는 것

  // (4) interface 타입 = 타입 서술자
  interface Person {
    name: string;
  }

  interface Pet {
    nickname?: string;
    age: number;
  }

  // (5) & Operator(= intersection) = 교집합
  type Family = Person & Pet;

  // Person 과 Pet 의 공통 속성이 없어 공집합 타입으로 생각할 수 있는데.
  // 타입 연산자 intersection 은 인터페이스의 속성이 아닌, *타입의 범위에 적용이 된다.
  // 따라서, 추가적인 속성(optional) 을 가져도 Family 타입에 속한다.
  const jaehunFamily: Family = {
    name: "jaehun",
    nickname: "hunny",
    age: 28,
  };

  // & Operator 는 각 타입 내 속성을 모두 포함하는 것으로 생각하면 된다.

  // 두 interface 의 유니온은 공집합이다.
  type K = keyof (Person | Pet);

  // * 이해하기,
  // keyof (A&B) = (keyof A) | (keyof B); -> 각 A, B 키의 합집합 = A & B
  // keyof (A|B) = (keyof A) & (keyof B); -> 각 A, B 키의 교집합 = A | B

  // A extends B 로, B 타입에 할당 가능한 A 를 정의할 수 있다. (서브 타입 정의)
  interface FamilyB extends Person {
    nickname?: string;
    age: number;
  }

  const jaehunFamilyB: FamilyB = {
    name: "jaehun", // 무조건 가져야한다.
    nickname: "hunny",
    age: 28, // 무조건 가져야한다.
  };

  // 한정자로서의 extends
  // K 는 string, string literal, string literal union 을 가지는 어떠한 타입이다.
  function getKey<K extends string>(v: any, k: K) {
    // ...
  }

  interface Point {
    x: number;
    y: number;
  }

  type PointK = keyof Point; // "x" | "y"

  // keyof T
  function soryBy<K extends keyof T, T>(v: T[], k: K) {
    // ...
  }

  // 배열과 튜플의 관계를 타입이 집합이라는 관점이라는 것으로 이해해보기.
  const list = [1, 2];

  // list 집합이 [number, number] 집합의 부분집합인가요?
  // number[] 는 [number, numbrer] 의 부분 집합이 아니다.
  const tuple: [number, number] = list;

  // 반대는 성립한다.
  const arr: number[] = [1, 2];

  const triple: [number, number, number] = [1, 2, 3];

  // triple 을 { 0: number, 1: number } 로 모델링하지 않고,
  // { 0: number, 1: number, 2: length } 로 모델링하여, length 값의 불일치로 할당되지않았다.
  const double: [number, number] = triple;

  // 일부 타입을 제외하기 (결과가 적절한 타입스크립트 타입일때만 유효하다.)
  type T = Exclude<string | Date, string | number>; // 타입은 Date
  type NonZeroNums = Exclude<number, 0>; // 타입은 여전히 number

  // (6) unknown 타입 = 전체 집합
  const val: unknown = "ø";

  // boolean, literal = 유한 집합
  // number, string = 무한 집합
}
