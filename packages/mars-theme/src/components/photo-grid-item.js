import React, { Component } from 'react'
import { styled } from 'frontity';
import YesIcon from './icons/yes';
import NoIcon from './icons/no';
import MaybeIcon from './icons/maybe';

export default class extends Component {
  render() {
    return (
      <div className="col-3 mb-3" data-category={this.props.category}>
        <div className="card">
          <img style={{ cursor: 'pointer' }} className="card-img-top img-responsive" src={this.props.imageUrl} alt="Images here..." onClick={this.props.onClick} />
          <div className="card-footer">
            {this.props.rating && <Badge><small>{this.props.rating}</small></Badge>}
            <RightFooterAction>
              <Span onClick={this.props.onRateClick.bind(null, {tag: 'Yes', index: this.props.index})}><YesIcon /></Span>
              <Span onClick={this.props.onRateClick.bind(null, {tag: 'No', index: this.props.index})}><NoIcon /></Span>
              <Span onClick={this.props.onRateClick.bind(null, {tag: 'Maybe', index: this.props.index})}><MaybeIcon /></Span>
            </RightFooterAction>
          </div>
        </div>
      </div>
    );
  }
}

const Span = styled.span`
  margin-right: 5px;
`;

const RightFooterAction = styled.div`
  float: right;
`;

const Badge = styled.span`
  color: #fff;
  background-color: #17a2b8;
  display: inline-block;
  padding: .25em .4em;
  font-size: 75%;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: .25rem;
  -webkit-transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
`;