var hero = {
    _name: 'John Doe',
    getSecretIdentity: function (){
        return this._name;
    }
};

var stoleSecretIdentity = hero.getSecretIdentity;

// console.log(stoleSecretIdentity.bind(hero)());// undefined
console.log(hero.getSecretIdentity());// 'John Doe'
// 将 getSecretIdentity 赋给 stoleSecretIdentity，等价于定义了 stoleSecretIdentity 函数：

var stoleSecretIdentity =  function (){
    return this._name;
}