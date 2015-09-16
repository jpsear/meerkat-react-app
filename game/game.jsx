var Game = React.createClass({

  getInitialState: function() {
    return ({
      level : 1
    })
  },
  
  generateCards: function() {
    
  },
  
  completedLevel: function(){
    var _level = this.state.level;
    
    if(_level > 9){
      alert('Completed the game :)')
      this.setState({level:1})
      return;
    }
    
    _level++;
    this.setState({level:_level})
  },
  
  render: function() {
    return (
      <div>
        <h1>{this.state.level}</h1>
        <Board complete={this.completedLevel} level={this.state.level}/>
      </div>
    )
  }
})