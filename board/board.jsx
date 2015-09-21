var Board = React.createClass({
  
  propTypes:{
    level: React.PropTypes.number,
    onTurn: React.PropTypes.func,
    onLevel: React.PropTypes.func
  },
  
  getInitialState: function() {
    return ({
      level: this.props.level,
      cards: this.generateCards(this.props.level)
    })
  },

  generateCards: function (level) {
    var numberOfCards = level + 2;

    var possibleCards = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];
    
    var cards = {};

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

    return this.randomiseCards(cards);

  },
  
  randomiseCards: function (cards) {
    var length = Object.keys(cards).length;
    
    for (var n = 0; n < length - 1; n++) {
        var k = n + Math.floor(Math.random() * (length - n));
        var temp = cards[k];
        cards[k] = cards[n];
        cards[n] = temp;
        cards[k].id = k;
        cards[n].id = n;
    }
    
    return cards;
  },
  
  compareCards: function(chosenCard){
    
    var cards = this.state.cards;

    var turnedCard = null;

    Object.keys(cards).map((id) => {
      var card = cards[id];
      if (card.isTurned && card.id !== chosenCard.id) {
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
  
  cardClicked: function(id) {
  
    return () => {
      
      var chosenCard = this.state.cards[id];
    
      if (chosenCard.isMatched) return;

      var checkIfMatched = false;

      var turnedCard = this.compareCards(chosenCard);

      var updatedCards = Object.assign({}, this.state.cards);
      updatedCards[chosenCard.id].isTurned = true;

      if(turnedCard) {
        
        this.props.onTurn();
      
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
          this.props.onLevel();
        }
      }
    } 
  },
  
  componentWillReceiveProps: function(nextProps) {
    if (this.props.level != nextProps.level) {
      this.setState({
        cards: this.generateCards(nextProps.level)
      });
    }
  },

  render: function() {

    return (
      <div>
        {Object.keys(this.state.cards).map((id) => {
          card = this.state.cards[id];
          cssClass = 'card ma-card-' + card.value;
          flipContainer = 'flip-container';
          back = 'back';
          front = 'front';

          return (
            <section className={ card.isMatched ? 'flip' + ' ' + cssClass : card.isTurned ? 'flip' + ' ' + cssClass : 'not-flipped' + ' ' + cssClass } 
            onClick={this.cardClicked(card.id)}>
              {card.value} { card.isMatched ? 'Matched' : card.isTurned ? 'Turned' : 'Not turned' }
              <div className={flipContainer}>
                <div className={back}>
                    <span>
                      <b>Compare the meerkat</b>
                    </span>
                </div>
                <div className={front}></div>
              </div>
            </section>
          )
        })}
      </div>
    )
  }
});