var Game = React.createClass({
  
  timeout: 750,
  final: 3,
  
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
    if ( this.state.level === this.final ) return this.onWin();
    var _level = this.state.level + 1;
    setTimeout(() => {
      this.setState({
        level: _level
      });
    }, this.timeout);
  },
  
  onWin: function() {
    return setTimeout(() => {
      alert('You completed the game in ' + this.state.turns + ' turns! Play again?');
      
      var _level = 1;
      var _turns = 0;
      var _best = (this.state.best === 0 || this.state.best > this.state.turns ? this.state.turns : this.state.best);
      
      this.setState({
        level: _level,
        turns: _turns,
        best: _best
      });
    }, this.timeout);
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