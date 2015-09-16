var Card = React.createClass({
  propTypes: {
    card: React.PropTypes.object.isRequired,
    cardClicked: React.PropTypes.func.isRequired
  },

  cardClicked: function(){
    console.log(this.props.card);
    this.setProps({
      isTurned:true
    });
    this.props.cardClicked();
  },
  render: function() {
    return (
       <button onClick={this.cardClicked}>{this.props.card.value}</button>
    )
  }
});