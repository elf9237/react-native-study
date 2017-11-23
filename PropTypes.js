// 第三方类型检查
prop-types

// 用法1(写在类外)--常用：
Greeting.propTypes = {
    name: PropTypes.string
};
Greeting.defaultProps = {
    statusBar:{
        barStyle:'light-content',
        hidden:false
    }
};

// 用法2（写在类内，构造函数前）：

const StatusBarShape={   //写在类外，作为全局常量
    backgroundColor:PropTypes.string,
    barStyle:PropTypes.oneOf(['default','light-content','dark-content']),
}

static propTypes = {
    style:View.propTypes.style,
    title:PropTypes.string,
    statusBar:PropTypes.shape(StatusBarShape)
}
static defaultProps={   //父组件没有传props过来时发生作用
    statusBar:{
        barStyle:'light-content',
        hidden:false
    }
}
/**
 * prop-types的使用
 */
import PropTypes from 'prop-types';

MyComponent.propTypes = {
    // 你可以声明一个 prop 是一个特定的 JS 原始类型。
    // 默认情况下，这些都是可选的。
    optionalArray: PropTypes.array,
    optionalBool: PropTypes.bool,
    optionalFunc: PropTypes.func,
    optionalNumber: PropTypes.number,
    optionalObject: PropTypes.object,
    optionalString: PropTypes.string,
    optionalSymbol: PropTypes.symbol,

    // 任何东西都可以被渲染:numbers, strings, elements,或者是包含这些类型的数组(或者是片段)。
    optionalNode: PropTypes.node,

    // 一个 React 元素。
    optionalElement: PropTypes.element,

    // 你也可以声明一个 prop 是类的一个实例。
    // 使用 JS 的 instanceof 运算符。
    optionalMessage: PropTypes.instanceOf(Message),

    // 你可以声明 prop 是特定的值，类似于枚举
    optionalEnum: PropTypes.oneOf(['News', 'Photos']),

    // 一个对象可以是多种类型其中之一
    optionalUnion: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.instanceOf(Message)
    ]),

    // 一个某种类型的数组
    optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

    // 属性值为某种类型的对象
    optionalObjectOf: PropTypes.objectOf(PropTypes.number),

    // 一个特定形式的对象
    optionalObjectWithShape: PropTypes.shape({
        color: PropTypes.string,
        fontSize: PropTypes.number
    }),

    // 你可以使用 `isRequired' 链接上述任何一个，以确保在没有提供 prop 的情况下显示警告。
    requiredFunc: PropTypes.func.isRequired,

    // 任何数据类型的值
    requiredAny: PropTypes.any.isRequired,

    // 你也可以声明自定义的验证器。如果验证失败返回 Error 对象。不要使用 `console.warn` 或者 throw ，
    // 因为这不会在 `oneOfType` 类型的验证器中起作用。
    customProp: function(props, propName, componentName) {
        if (!/matchme/.test(props[propName])) {
            return new Error(
                'Invalid prop `' + propName + '` supplied to' +
                ' `' + componentName + '`. Validation failed.'
            );
        }
    },

    // 也可以声明`arrayOf`和`objectOf`类型的验证器，如果验证失败需要返回Error对象。
    // 会在数组或者对象的每一个元素上调用验证器。验证器的前两个参数分别是数组或者对象本身，
    // 以及当前元素的键值。
    customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
        if (!/matchme/.test(propValue[key])) {
            return new Error(
                'Invalid prop `' + propFullName + '` supplied to' +
                ' `' + componentName + '`. Validation failed.'
            );
        }
    })
};



//你可以通过赋值特定的 defaultProps 属性为 props 定义默认值：

class Greeting extends React.Component {
    render() {
        return (
            <h1>Hello, {this.props.name}</h1>
        );
    }
}

// 指定 props 的默认值：
Greeting.defaultProps = {
    name: 'Stranger'
};

// 渲染为 "Hello, Stranger":
ReactDOM.render(
    <Greeting />,
    document.getElementById('example')
);

// 如果父组件没有为 this.props.name 传值，defaultProps 会给其一个默认值。propTypes 的类型检测是在defaultProps 解析之后发生的，因此也会对默认属性 defaultProps 进行类型检测。

//参考网址
//  http://www.css88.com/react/docs/typechecking-with-proptypes.html