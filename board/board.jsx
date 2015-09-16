var Board = React.createClass({
  
  propTypes:{
    level: React.PropTypes.number,
    complete : React.PropTypes.func
  },

  createCards: function(level) {
    // var level = this.props.level;

    console.log(level);

    var numberOfCards = level + 2,
      cards = {};

    var possibleCards = [
      'One', 'Two', 'Three', 'Four', 'Five', 'Six'
    ];

    for(var i = 0; i < numberOfCards; i++) {
      var j = i;
      var k = i + numberOfCards;

      cards[j] = {
        id: j,
        value: possibleCards[j],
        isTurned: false,
        isMatched: false
      }
      cards[k] = {
        id: k,
        value: possibleCards[j],
        isTurned: false,
        isMatched: false
      }
    }

    return cards;

  },
  
  getInitialState: function() {
    return ({
      level: this.props.level,
      cards: this.createCards(this.props.level)
    })
  },

  checkCards: function(chosenCard){
    
    var cards = this.state.cards;

    var turnedCard = null;

    Object.keys(cards).map((id) => {
      var card = cards[id];
      if(card.isTurned && card.id !== chosenCard.id){
        turnedCard = card;
      }
    });

    return turnedCard;

  },

  checkAllMatched: function() {
    return Object.keys(this.state.cards).filter((id) => {
      return this.state.cards[id].isMatched === false;
    }).length === 0;
  },
  
  cardClicked: function(chosenCard) {
      return () => {
        if(chosenCard.isMatched) return;

        var checkIfMatched = false;

        var turnedCard = this.checkCards(chosenCard);

        var updatedCards = Object.assign({}, this.state.cards);
        updatedCards[chosenCard.id].isTurned = true;

        if(turnedCard) {
          updatedCards[turnedCard.id].isTurned = false;
          updatedCards[chosenCard.id].isTurned = false;

          if(turnedCard.value === chosenCard.value) {
            updatedCards[turnedCard.id].isMatched = true;
            updatedCards[chosenCard.id].isMatched = true;

            checkIfMatched = true;
          }
        }

        this.setState({
          cards: updatedCards
        });

        if(checkIfMatched) {
          if(this.checkAllMatched()) {
            this.props.complete();
          }
        }
      } 
  },
  
  componentWillReceiveProps: function(nextProps) {
    if (this.props.level != nextProps.level) {
        console.log(this.props.level)
        console.log(nextProps);

        this.setState({
        cards: this.createCards(nextProps.level)
      });
    }
  },

  render: function() {
    return (
      <div>
        {Object.keys(this.state.cards).map((id) => {
          card = this.state.cards[id];
          return (
            <button onClick={this.cardClicked(card)}>
              {card.value} { card.isMatched ? 'Matched' : card.isTurned ? 'Turned' : 'Not turned' }
            </button>
          )
        })}
      </div>
    )
  }
});