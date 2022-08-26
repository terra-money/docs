import React from 'react';
import Card from './Card';

function CardSection(props) {
  return (
    <div className="cards">
      {props.cards.map((card) => {
        return (
          <Card
            href={card.href}
            lightSvg={card.lightSvg}
            darkSvg={card.darkSvg}
            header={card.header}
            summary={card.summary}
          />  
        )
      })}
    </div>
  )
}

export default CardSection;
