// 코드 생성과 타입의 관계성
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// 1. 타입스크립트의 컴파일러는 다음 동작을 독립적으로 수행한다.
// (1)브라우저에서 구버전의 자바스크립트를 운용할 수 있도록 트랜스파일하고, (2)타입의 오류를 체크한다.
{
    // 타입 오류가 있는 코드도 컴파일이 가능하다. (tsc index.ts -> index.js 생성됨.)
    var username = "jaehun";
    username = 1;
    // 만약 타입체커가 오류를 잡았을때 컴파일되게 하지 않으려면, noEmitOnError 를 설정한다.
}
// 2. 컴파일 타임에 타입체킹하고, 런타임에는 타입이 제거되어 타입체킹이 불가능하다.
{
    function printUserInfo(user) {
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
    function printUserInfo(user) {
        if (user.kind === "UserB") {
            console.log(user.phone);
        }
    }
}
// 4. 클래스로 타입 유지하기
{
    var UserA = /** @class */ (function () {
        function UserA(id, name) {
            this.id = id;
            this.name = name;
        }
        return UserA;
    }());
    var UserB_1 = /** @class */ (function (_super) {
        __extends(UserB, _super);
        function UserB(id, name, email) {
            var _this = _super.call(this, id, name) || this;
            _this.id = id;
            _this.name = name;
            _this.email = email;
            return _this;
        }
        return UserB;
    }(UserA));
    function printUserInfo(user) {
        // 클래스로 선언하면 타입과 값을 둘 다 사용할 수 있다.
        if (user instanceof UserB_1)
            console.log(user.email);
    }
}
// 5. 타입을 정제하는 타입연산은 런타임에 영향을 영향을 주지않는다.
{
    function printUserId(userId) {
        console.log(userId);
    }
}
