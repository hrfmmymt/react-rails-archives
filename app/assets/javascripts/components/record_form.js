(function() {
  this.RecordForm = React.createClass({
    getInitialState: function() {
      return {
        // title: '',
        milk_amount: ''
      };
    },
    valid: function() {
      return this.state.milk_amount;
      // return this.state.title && this.state.milk_amount;
    },
    handleChange: function(e) {
      var name, obj;
      name = e.target.name;
      return this.setState((
        obj = {},
        obj['' + name] = e.target.value,
        obj
      ));
    },
    handleSubmit: function(e) {
      e.preventDefault();
      return $.post('', {
        record: this.state
      }, (function(_this) {
        return function(data) {
          _this.props.handleNewRecord(data);
          return _this.setState(_this.getInitialState());
        };
      })(this), 'JSON');
    },
    render: function() {
      return React.DOM.form({
        className: 'form-inline',
        onSubmit: this.handleSubmit},
        // React.DOM.div({
        //   className: 'form-group'},
        //   React.DOM.input({
        //     type: 'text',
        //     className: 'form-control',
        //     placeholder: 'モノ',
        //     name: 'title',
        //     value: this.state.title,
        //     onChange: this.handleChange
        //   })
        // ),
        React.DOM.div({
          className: 'form-group'},
          React.DOM.input({
            type: 'number',
            className: 'form-control',
            placeholder: 'ミルク分量',
            name: 'milk_amount',
            value: this.state.milk_amount,
            onChange: this.handleChange
          })
        ),
        React.DOM.button({
          type: 'submit',
          className: 'btn btn-primary',
          disabled: !this.valid()}, '保存'
        )
      );
    }
  });

}).call(this);