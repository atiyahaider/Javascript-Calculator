const endsWithOperator = /[\*\+\-\/]$/;
let calculationArr = [];

class Display extends React.Component {
  render() {
    return (
      React.createElement("div", { id: "display-box" },
      React.createElement("div", { id: "expression" }, this.props.expression),
      React.createElement("div", { id: "display" }, this.props.entry)));


  }}


class Buttons extends React.Component {
  render() {
    return (
      React.createElement("div", { id: "buttons" },
      React.createElement("button", { id: "clear", value: "AC", onClick: this.props.handleClear }, "AC"),
      React.createElement("button", { id: "divide", class: "operator", value: "/", onClick: this.props.handleOperator }, "/"),
      React.createElement("button", { id: "multiply", class: "operator", value: "*", onClick: this.props.handleOperator }, "x"),
      React.createElement("button", { id: "seven", class: "numbers", value: "7", onClick: this.props.handleNumbers }, "7"),
      React.createElement("button", { id: "eight", class: "numbers", value: "8", onClick: this.props.handleNumbers }, "8"),
      React.createElement("button", { id: "nine", class: "numbers", value: "9", onClick: this.props.handleNumbers }, "9"),
      React.createElement("button", { id: "subtract", class: "operator", value: "-", onClick: this.props.handleOperator }, "-"),
      React.createElement("button", { id: "four", class: "numbers", value: "4", onClick: this.props.handleNumbers }, "4"),
      React.createElement("button", { id: "five", class: "numbers", value: "5", onClick: this.props.handleNumbers }, "5"),
      React.createElement("button", { id: "six", class: "numbers", value: "6", onClick: this.props.handleNumbers }, "6"),
      React.createElement("button", { id: "add", class: "operator", value: "+", onClick: this.props.handleOperator }, "+"),
      React.createElement("button", { id: "one", class: "numbers", value: "1", onClick: this.props.handleNumbers }, "1"),
      React.createElement("button", { id: "two", class: "numbers", value: "2", onClick: this.props.handleNumbers }, "2"),
      React.createElement("button", { id: "three", class: "numbers", value: "3", onClick: this.props.handleNumbers }, "3"),
      React.createElement("button", { id: "zero", class: "numbers", value: "0", onClick: this.props.handleNumbers }, "0"),
      React.createElement("button", { id: "decimal", class: "numbers", value: ".", onClick: this.props.handleDecimal }, "."),
      React.createElement("button", { id: "equals", value: "=", onClick: this.props.handleResult }, "=")));


  }}


class Footer extends React.Component {
  render() {
    return (
      React.createElement("div", { id: "footer" },
      React.createElement("p", null, "Designed and coded by"),
      React.createElement("a", { target: "_blank", href: "https://s.codepen.io/atiyahaider/debug/oaZxeb/dGrXWdOKgPWM" }, "Atiya Haider")));


  }}



class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expression: '0',
      entry: '0',
      pushed: false,
      lastOperator: '',
      lastNumber: '0' };


    this.handleClear = this.handleClear.bind(this);
    this.handleNumbers = this.handleNumbers.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleResult = this.handleResult.bind(this);
  }

  handleClear() {
    calculationArr = [];
    this.setState({
      expression: '0',
      entry: '0',
      pushed: false,
      lastOperator: '',
      lastNumber: '0' });

  }

  handleNumbers(e) {
    //if prev expression has been evaluated, and a new number clicked, initialize with new entry
    if (this.state.expression.includes('=')) {
      calculationArr = [];
      this.setState({ expression: e.target.value,
        entry: e.target.value,
        pushed: false,
        lastOperator: '',
        lastNumber: '0' });

    } else
    {
      //if a number has been previously stored in the array and now a new number is being entered, store the operator
      if (this.state.pushed) {
        var tmpOperator = this.state.expression.substr(this.state.expression.length - 1, 1);
        if (tmpOperator === '.')
        tmpOperator = this.state.expression.substr(this.state.expression.length - 3, 1);

        calculationArr.push(tmpOperator);
        this.setState({ pushed: false,
          lastOperator: tmpOperator });
      }

      //number entered should be less than 16 digits
      if (this.state.entry.length <= 15) {
        this.setState({ expression: this.state.expression === '0' ? e.target.value :
          this.state.expression + e.target.value });
        this.setState({ entry: this.state.entry === '0' || this.state.pushed ? e.target.value :
          this.state.entry + e.target.value });
      }
    }
  }

  handleOperator(e) {
    if (this.state.expression.includes('=')) {
      calculationArr = [this.state.entry]; //start new calculation from prev result
      this.setState({ expression: this.state.entry + e.target.value, //get result from prev evaluation
        pushed: true,
        lastNumber: this.state.entry });
    } else
    {
      if (endsWithOperator.test(this.state.expression)) {//operator entered after a prev operator, replace with new operator
        this.setState({ expression: this.state.expression.substring(0, this.state.expression.length - 1) + e.target.value });
      } else
      {// new operator, push prev number
        calculationArr.push(this.state.entry);
        this.setState({ expression: this.state.expression + e.target.value,
          pushed: true,
          lastNumber: this.state.entry });
      }
    }
  }

  handleDecimal(e) {
    if (this.state.pushed) {//entering a new number after a prev one, add '0.'
      var tmpOperator = this.state.expression.substr(this.state.expression.length - 1, 1);
      calculationArr.push(tmpOperator);
      this.setState({ expression: this.state.entry !== '0' ?
        this.state.expression + '0' + e.target.value :
        this.state.expression + e.target.value,
        entry: '0' + e.target.value,
        pushed: false,
        lastOperator: tmpOperator });
    } else
    {
      if (!this.state.entry.includes('.'))
      this.setState({ expression: this.state.expression + e.target.value,
        entry: this.state.entry + e.target.value });
    }
  }

  handleResult(e) {
    //if prev expression had been evaluated, and '=' pressed again, perform the last operation on the result with the last operand
    if (this.state.expression.includes('=')) {
      calculationArr = [this.state.entry, this.state.lastOperator, this.state.lastNumber]; //start new calculation from prev result
    } else
    {
      if (endsWithOperator.test(this.state.expression)) {//operator entered right before '=', push the operator
        calculationArr.push(this.state.expression.substr(this.state.expression.length - 1, 1));
        this.setState({ lastOperator: calculationArr[calculationArr.length - 1] });
      }

      //when equal is clicked the first time, store the previous number in the array
      if (this.state.expression != '0') {
        calculationArr.push(this.state.entry);
        this.setState({ pushed: false,
          lastNumber: this.state.entry });
      }

      //Evaluate multiplication first
      let i = 0;
      do {
        i = calculationArr.indexOf('*', i);
        if (i !== -1) {
          calculationArr[i - 1] = eval(calculationArr[i - 1] + '*' + calculationArr[i + 1]);
          calculationArr.splice(i, 2);
          i -= 1;
        }
      } while (
      i !== -1);

      //Evaluate division first
      i = 0;
      do {
        i = calculationArr.indexOf('/', i);
        if (i !== -1) {
          calculationArr[i - 1] = eval(calculationArr[i - 1] + '/' + calculationArr[i + 1]);
          calculationArr.splice(i, 2);
          i -= 1;
        }
      } while (
      i !== -1);
    }

    let result = Math.round(1000000000000 * eval(calculationArr.join(''))) / 1000000000000;

    if (this.state.expression.includes('=')) {//pressing just equal again after an evaluation
      this.setState({ expression: this.state.entry + this.state.lastOperator + this.state.lastNumber + e.target.value + result,
        pushed: false }); //get result from prev evaluation, and the last operator and operand
    } else
    {
      if (endsWithOperator.test(this.state.expression)) //operator entered right before '=', perform operation on first operand
        this.setState({ expression: this.state.expression + this.state.lastNumber + e.target.value + result });else
        //normal case
        this.setState({ expression: this.state.expression === '0' ? '0' :
          this.state.expression + e.target.value + result });
    }

    this.setState({ entry: this.state.entry === '0' ? '0' :
      result.toString() });
  }

  render() {
    return (
      React.createElement("div", { id: "container" },
      React.createElement("div", null, React.createElement("h1", null, "Javascript Calculator")),
      React.createElement("div", { id: "calculator" },
      React.createElement(Display, { expression: this.state.expression,
        entry: this.state.entry }),
      React.createElement(Buttons, { handleClear: this.handleClear,
        handleNumbers: this.handleNumbers,
        handleOperator: this.handleOperator,
        handleDecimal: this.handleDecimal,
        handleResult: this.handleResult })),

      React.createElement(Footer, null)));


  }}


ReactDOM.render(React.createElement(Calculator, null), document.getElementById('CalculatorApp'));