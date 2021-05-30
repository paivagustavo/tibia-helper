import React from 'react';

class ExpCalc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      target: 0,
      required: 0,
      daily: 0,
      days: 0
    };

    this.handleCurrent = this.handleCurrent.bind(this);
    this.handleTarget = this.handleTarget.bind(this);
    this.handleDaily = this.handleDaily.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCurrent(event) {
    this.setState({ current: event.target.value })
  }

  handleTarget(event) {
    this.setState({ target: event.target.value });
  }

  handleDaily(event) {
    this.setState({ daily: event.target.value });
  }

  handleChange(event) {
    this.setState({ required: event.target.value });
  }

  calculateExp() {
    console.log(this.state)
    var required = exp(this.state.target) - exp(this.state.current)

    this.setState({days: required/this.state.daily}, function() {
      this.setState({required: required})
    })
  }

  handleSubmit(event) {
    this.calculateExp();
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Current level 
            <input value={this.state.current} onChange={this.handleCurrent} />
          </label>

          <p />

          <label>
            Target level 
            <input value={this.state.target} onChange={this.handleTarget} />
          </label>

          <p />

          <label>
            Daily Exp 
            <input value={this.state.daily} onChange={this.handleDaily} />
          </label>

          <p />

          <input type="submit" value="Submit" />
        </form>

        Missing exp: {this.state.required.toLocaleString()}
        <p/>
        You will reach level {this.state.target} in {this.state.days} days.

      </div>
    );
  }

  componentDidMount() {
    this.setState({
      current: 1,
      target: 8,
      required: 0,
      daily: 2000,
      days: 0
    }, this.calculateExp);
  }
}


function exp(level) {
  return Math.round((50 / 3) * level * level * level - (100 * level * level) + ((850 / 3) * level) - 200);
}

export default ExpCalc;
