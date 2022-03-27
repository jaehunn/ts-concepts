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

// 3. 타입공간과 값공간의 심벌 구분하기
{
}

// ...

// 11. 잉여 속성 체크의 한계 인지하기
{
  interface Room {
    numDoors: number;
    ceilingHeightFt: number;
  }

  const r1: Room = {
    numDoors: 1,
    ceilingHeightFt: 10,
    elephant: "present", // 할당할 수 없다. (잉여 속성 체크)
  };

  const _r2 = {
    numDoors: 1,
    ceilingHeightFt: 10,
    elephant: "present",
  };

  const r2: Room = _r2; // _r2 는 Room 타입의 부분 집합을 포함하므로 타입체크를 통과한다. (할당 기능 검사)

  interface Options {
    title: string;
    darkMode?: boolean;
  }

  // opt 는 객체 리터럴이다. (타입을 걸면 잉여속성체크로 오류를 잡아낼 수 있다.)
  const opt = {
    title: "",
  };

  // opt2 는 객체리터럴이 아니다. (타입을 걸어도 title 을 포함하고, darkMode 라는 속성을 가졌을때 불리언이기만하면 모두 허용된다.)
  // darkMode 가 불리언이 아닌 경우를 제외하고, title: string 을 가지는 모든 객체는 Options 타입에 속한다.
  const opt2: Options = opt;

  const o1: Options = document;
  const o2: Options = new HTMLAnchorElement();

  // 따라서 잉여 속성 체크를 이용해야한다. (엄격한 객체 리터럴 체크)

  // 단언도 오류를 잡아내지 못한다.
  const o = { dark_mode: true, title: "ski" } as Options;

  // 단언보다 선언을 사용하고, 객체 리터럴에 타입을 걸도록 하자.

  // 인덱스 시그니처로 추가적인 속성을 예상하도록 설정할 수 있다.
  interface OptionsV2 {
    darkMode?: boolean;
    [otherOptions: string]: boolean | undefined; // 인덱스 시그니처
  }

  const optV2: OptionsV2 = {
    dark_mode: true,
  };

  // 옵셔널 속성만 가지는 타입은 약한 타입이다. (모든 객체가 허용됨)
  interface LineChartOptions {
    logscale?: boolean;
    invertedYAxis?: boolean;
    areaChart?: boolean;
  }

  const opts = {
    log_scale: true,
  };

  // 모든 속성이 옵셔널이라 모든 객체를 포함할 수 있지만,
  // 약한 타입에 대해서 타입스크립트는 값 타입과 선언 타입에 공통된 속성이 있는지 확인하는 로직을 수행한다. (공통 속성 체크)
  const opts2: LineChartOptions = opts;

  // 잉여 속성 체크는 객체 리터럴에서만 적용된다.
  // 공통 속성 체크는 약한 타입(모든 속성이 옵셔널)의 할당문마다 동작한다.
}

// 12. 함수 표현식에 타입 적용하기
{
  // function statement(문)
  function a() {}

  // function expression(식)
  const b = function () {};

  // expression 이 좋다. 함수 타입을 재사용할 수 있기 때문
  type BinaryFn = (a: number, b: number) => number;
  const add: BinaryFn = (a, b) => a + b;
  const sub: BinaryFn = (a, b) => a - b;
  const mul: BinaryFn = (a, b) => a * b;
  const div: BinaryFn = (a, b) => a / b;

  // 대부분의 라이브러리는 공통 함수 시그니처를 타입으로 제공한다. (MouseEventHandler)

  const responseP = fetch("/"); // 반환 타입: Promise<Response>

  async function getQuote() {
    const res = await fetch("/quote");
    const quote = await res.json();

    return quote;
  }

  // '/quote' 가 없는 API 라면, 404 를 뱉을 수 있고, 응답이 json 이 아닐 수 있다.
  // response.json() 은 json 이 아니라는 내용으로 오류메시지를 담고 rejected Promise 를 반환한다.
  // 그렇게 되면, 실제 근본적인 오류인 404 는 감추어진다. (응답이 json이 아니라는 내용으로)

  // fetch 타입 선언은 다음과 같다.
  declare function fetch(
    input: RequestInfo,
    init?: RequestInit
  ): Promise<Response>;

  async function checkedFetch(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);

    if (!response.ok) {
      throw new Error(`Request failed: ` + response.status);
    }

    return response;
  }

  // 더 간결하게
  const checkedFetchV2: typeof fetch = async (input, init) => {
    const response = await fetch(input, init);

    if (!response.ok) {
      throw new Error(`Request failed: ` + response.status);
      // return 'error' 오류가 발생한다.
    }

    return response;
  };

  // typeof fetch 는 타입스크립트가 함수의 타입을 추론할 수 있게 한다. (매개변수 타입 추론, 반환타입 추론)

  // 함수 표현식 전체 타입을 정의하는 것이 좋다.
}
