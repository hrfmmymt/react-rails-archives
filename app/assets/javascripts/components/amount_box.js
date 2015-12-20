(function() {
  this.AmountBox = React.createClass({
    render: function() {
      return React.DOM.div({
        className: 'col-md-4'},
        React.DOM.div({
          className: 'panel panel-' + this.props.type},
          React.DOM.div({
            className: 'panel-heading'}, this.props.text),
          React.DOM.div({
            className: 'panel-body'},
            React.DOM.ul({
              className: 'today_list'},
              React.DOM.li({
                className: 'today_list-item'}, 'ミルク:' + amountFormat(this.props.milk_amount)
              )
            )
          )
        )
      );
    }
  });

}).call(this);