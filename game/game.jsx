var Game = React.createClass({
  
  getInitialState: function() {
    return ({
      level: 1,
      turns: 0,
      best: 0
    })
  },
  
  onTurn: function() {
    var _turn = this.state.turns;
    _turn++;
    this.setState({
      turns: _turn
    });
  },
  
  onLevel: function() {
    if ( this.state.level === 2 ) return this.onWin();
    var _level = this.state.level;
    _level++;
    this.setState({
      level: _level
    });
  },
  
  onWin: function() {
    var _best = (this.state.best === 0 || this.state.best >= this.state.turns ? this.state.turns : this.state.best);
    this.setState({
      level: 1,
      turns: 0,
      best: _best
    });
    alert('You completed the game! Play again?');
    return;
  },
  
  render: function() {
    return (
      <div className="ma-container">
        <h1 className="ma-level">Level {this.state.level}</h1>
        <div className="ma-turns">Turns: {this.state.turns}</div>
        <div className="ma-score">Best score: {this.state.best}</div>
        <Board level={this.state.level} onLevel={this.onLevel} onTurn={this.onTurn} />
      </div>
    )
  }
});